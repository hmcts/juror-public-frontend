/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var _ = require('lodash')
    , validate = require('validate.js')
    , validatorRules = require('../../../../config/validation')
    , filters = require('../../../../components/filters')
    , texts_en = require('../../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../../client/js/i18n/cy.json')
    , utils = require('../../../../lib/utils');

  module.exports.index = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        if (req.session.user.confirmedDate === req.session.lastValidConfirmedDate.selection){
          backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
        } else {
          backLinkUrl = utils.getRedirectUrl('steps.confirm.date', req.session.user.thirdParty);
        }
      } else {
        backLinkUrl = utils.getRedirectUrl('steps.confirm.date', req.session.user.thirdParty);
      }

      return res.render('steps/04-confirm-date/excusal.njk', {
        user: mergedUser,
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
      var validatorResult;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Store new info
      req.session.user.excusal = {
        reason: req.body['excusalReason']
      };

      // Validate form submission
      validatorResult = validate(req.body, require('../../../../config/validation/excusal')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date.excusal', req.session.user.thirdParty)));
      }

      // If we previously answered a deferral, wipe that information
      if (typeof req.session.user.deferral !== 'undefined') {
        delete req.session.user.deferral;
      }

      req.session.lastValidConfirmedDate.selection = 'No';
      req.session.lastValidConfirmedDate.data = req.session.user.excusal;

      // Move on
      if (req.session.change === true){
        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty)));
      }
      return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.assistance', req.session.user.thirdParty)));
    };
  };

  module.exports.change = function(app) {
    return function(req, res) {
      req.session.change = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date.excusal', req.session.user.thirdParty)));
    };
  };
})();
