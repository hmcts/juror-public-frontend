/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var _ = require('lodash')
    , validate = require('validate.js')
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

      return res.render('steps/04-confirm-date/deferr.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl,
      });
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {

      // Validate form submission
      var validatorResult,
        redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Store new info


      if (req.session.change === true && typeof(req.session.user.deferral) !== 'undefined') {
        req.session.user.deferral['reason'] = req.body['deferralReason'];
      } else if (typeof(req.session.user.deferral) === 'undefined') {
        req.session.user.deferral = {
          reason: req.body['deferralReason']
        }
      } else {
        req.session.user.deferral['reason'] = req.body['deferralReason'];
      }

      // Validate form submission
      validatorResult = validate(req.body, require('../../../../config/validation/deferral')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date.deferral', req.session.user.thirdParty)));
      }

      // If we previously answered an excusal, wipe that information
      if (typeof req.session.user.excusal !== 'undefined') {
        delete req.session.user.excusal;
      }

      if (req.session.change === true && typeof(req.session.user.deferral.dates) === 'undefined') {
        redirectUrl = utils.getRedirectUrl('steps.confirm.date.deferral-dates', req.session.user.thirdParty);
      } else if (req.session.change === true) {
        if (req.session.lastValidConfirmedDate.selection !== req.session.user.confirmedDate) {
          redirectUrl = utils.getRedirectUrl('steps.confirm.date.deferral-dates', req.session.user.thirdParty);
        } else {
          req.session.lastValidConfirmedDate.data = req.session.user.deferral;
          redirectUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
        }
      } else {
        redirectUrl = utils.getRedirectUrl('steps.confirm.date.deferral-dates', req.session.user.thirdParty);
      }

      // Move on
      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.change = function(app){
    return function(req, res) {
      req.session.change = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date.deferral', req.session.user.thirdParty)));
    };
  };

})();
