/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var _ = require('lodash')
    , validate = require('validate.js')
    , filters = require('../../../components/filters')
    , texts = require('../../../../client/js/i18n/en.json')
    , utils = require('../../../lib/utils');

  module.exports.index = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      return res.render('steps/04-confirm-date/index.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', texts),
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
      var returnObj
        , validatorResult;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;


      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/confirm-date')(req));
      if (typeof validatorResult !== 'undefined') {
        /*req.session.errors = {
          confirmedDate: [
            filters.translate('VALIDATION.CONFIRMED_DATE', texts)
          ],
        };*/
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.confirm.date.get'));
      }

      // Store new info
      req.session.user.confirmedDate = req.body['confirmedDate'];

      // Redirect as appropriate
      switch (req.body['confirmedDate']) {
      case 'Yes':
        if (req.session.change === true){
          returnObj = res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
        } else {
          returnObj = res.redirect(app.namedRoutes.build('steps.cjs.employed.get'));
        }
        break;
      case 'Change':
        returnObj = res.redirect(app.namedRoutes.build('steps.confirm.date.deferral.get'));
        break;
      default:
        returnObj = res.redirect(app.namedRoutes.build('steps.confirm.date.excusal.get'));
        break;
      }

      return returnObj;
    };
  };

  module.exports.change = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.confirm.date.get'));
    };
  };

})();
