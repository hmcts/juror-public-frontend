/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var _ = require('lodash')
    , validate = require('validate.js')
    , filters = require('../../../components/filters')
    , texts_en = require('../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../client/js/i18n/cy.json')
    , utils = require('../../../lib/utils');

  module.exports.index = function() {
    return function(req, res) {
      var cjsActive
        , mergedUser
        , tmpErrors;

      // Get current value for cjsEmployer
      mergedUser = _.merge(_.cloneDeep(req.session.user), req.session.formFields);

      // If cjsEmployer is not present on formFields then ensure it is not merged in,
      // because this probably means that the user unselected all and submitted.
      //
      // Without this, when the error feedback comes back to say no employer are selected, the previously stored
      // values will be output from the user session.
      if (typeof req.session.formFields !== 'undefined' && typeof req.session.formFields.cjsEmployer === 'undefined') {
        delete mergedUser.cjsEmployer;
      }

      // Check what is active based on merger between user stored values and form submitted values
      if (typeof mergedUser !== 'undefined' && typeof mergedUser.cjsEmployer !== 'undefined') {
        cjsActive = {
          police: (mergedUser.cjsEmployer.indexOf('Police Force') !== -1),
          prison: (mergedUser.cjsEmployer.indexOf('HM Prison Service') !== -1),
          nca: (mergedUser.cjsEmployer.indexOf('National Crime Agency') !== -1),
          other: (mergedUser.cjsEmployer.indexOf('Other') !== -1)
        };
      }

      // Merge and then delete form fields and errors, prevents retention after pressing back l
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      return res.render('steps/05-cjs-employed/index.njk', {
        user: mergedUser,
        cjsActive: cjsActive,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
      });
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {

      // Validate form submission
      var validatorResult
        , validatorResultTmp
        , validatorRules
        , validatorKey;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // clear checkboxes if no is selected
      if (req.body['cjsEmployed'] === 'No'){
        delete req.body['cjsEmployer'];
      }

      // Validate form submission
      validatorRules = require('../../../config/validation/cjs-employed')(req);
      validatorResult = validate(req.body, validatorRules);
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.cjs.employed.get'));
      }

      // Store new info
      req.session.user.cjsEmployed = req.body['cjsEmployed'];
      req.session.user.cjsEmployer = req.body['cjsEmployer'];
      req.session.user.cjsEmployerDetails = req.body['cjsEmployerDetails'];
      req.session.user.cjsPrisonDetails = req.body['cjsPrisonDetails'];
      req.session.user.cjsPoliceDetails = req.body['cjsPoliceDetails'];

      // Redirect as appropriate
      if (req.session.change === true){
        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }
      return res.redirect(app.namedRoutes.build('steps.assistance.get'));
    };
  };

  module.exports.change = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.cjs.employed.get'));
    };
  };
})();
