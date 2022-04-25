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
        , tmpErrors
        , backLinkUrl;

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
          judiciary: (mergedUser.cjsEmployer.indexOf('Judiciary') !== -1),
          hmcts: (mergedUser.cjsEmployer.indexOf('HMCTS') !== -1),
          other: (mergedUser.cjsEmployer.indexOf('Other') !== -1)
        };
      }

      // Merge and then delete form fields and errors, prevents retention after pressing back l
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        switch (req.session.user.confirmedDate){
        case 'Change':
          //Deferral
          backLinkUrl = utils.getRedirectUrl('steps.confirm.date.deferral-dates', req.session.user.thirdParty);
          break;
        case 'No':
          //Excusal
          backLinkUrl = utils.getRedirectUrl('steps.confirm.date.excusal', req.session.user.thirdParty);
          break;
        default:
          backLinkUrl = utils.getRedirectUrl('steps.confirm.date', req.session.user.thirdParty);
        }
      }

      return res.render('steps/05-cjs-employed/index.njk', {
        user: mergedUser,
        cjsActive: cjsActive,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {

      // Validate form submission
      var validatorResult
        , validatorResultTmp
        , validatorRules
        , validatorKey
        , cjsTmpArr
        , redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // clear checkboxes if no is selected
      if ((req.body['cjsEmployed'] === 'No') || (req.body['cjsEmployed'] === 'Nac ydw') || (req.body['cjsEmployed'] === 'Nac ydy') || (req.body['cjsEmployed'] === 'Naddo')){
        delete req.body['cjsEmployer'];
        delete req.body['cjsEmployerDetails'];
        delete req.body['cjsPoliceDetails'];
        delete req.body['cjsPrisonDetails'];
        req.session.user.cjsEmployerDetails = '';
        req.session.user.cjsPoliceDetails = '';
        req.session.user.cjsPrisonDetails = '';
      } else if (typeof req.body['cjsEmployer'] !== 'undefined'){
        cjsTmpArr = _.clone(
          (_.isArray(req.body['cjsEmployer'])) ?
            req.body['cjsEmployer'] :
            [req.body['cjsEmployer']]);

        // delete down any non-selected item details
        if (cjsTmpArr.indexOf('Police Force') < 0){
          delete req.body['cjsPoliceDetails'];
        }
        if (cjsTmpArr.indexOf('HM Prison Service') < 0){
          delete req.body['cjsPrisonDetails'];
        }
        if (cjsTmpArr.indexOf('Other') < 0){
          delete req.body['cjsEmployerDetails'];
        }
      }

      // Validate form submission
      validatorRules = require('../../../config/validation/cjs-employed')(req);
      validatorResult = validate(req.body, validatorRules);
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        //return res.redirect(app.namedRoutes.build('steps.cjs.employed.get'));
        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.cjs.employed', req.session.user.thirdParty, null)));
      }

      // Store new info
      req.session.user.cjsEmployed = req.body['cjsEmployed'];
      req.session.user.cjsEmployer = req.body['cjsEmployer'];

      
      if (typeof req.session.user.cjsEmployer !== 'undefined') {
        cjsTmpArr = _.clone(
          (_.isArray(req.session.user.cjsEmployer)) ?
            req.session.user.cjsEmployer :
            [req.session.user.cjsEmployer]);

        // Clear down any non-selected item details
        if (cjsTmpArr.indexOf('Police Force') > -1){
          req.session.user.cjsPoliceDetails = req.body['cjsPoliceDetails'];
        } else {
          req.session.user.cjsPoliceDetails = '';
        }
        if (cjsTmpArr.indexOf('HM Prison Service') > -1){
          req.session.user.cjsPrisonDetails = req.body['cjsPrisonDetails'];
        } else {
          req.session.user.cjsPrisonDetails = '';
        }
        if (cjsTmpArr.indexOf('Other') > -1){
          req.session.user.cjsEmployerDetails = req.body['cjsEmployerDetails'];
        } else {
          req.session.user.cjsEmployerDetails = '';
        }
      }
      

      // Redirect as appropriate
      if (req.session.change === true){
        redirectUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        redirectUrl = utils.getRedirectUrl('steps.assistance', req.session.user.thirdParty);
      }
      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.change = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.cjs.employed', req.session.user.thirdParty)));
    };
  };
})();
