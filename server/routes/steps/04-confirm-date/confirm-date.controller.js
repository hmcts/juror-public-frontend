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
        backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        backLinkUrl = utils.getRedirectUrl('steps.qualify.mental.health.capacity', req.session.user.thirdParty);
      }

      return res.render('steps/04-confirm-date/index.njk', {
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
            filters.translate('VALIDATION.CONFIRMED_DATE', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          ],
        };*/
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date', req.session.user.thirdParty)));
      }

      // Store new info
      req.session.user.confirmedDate = req.body['confirmedDate'];

      if (typeof req.session.lastValidConfirmedDate === 'undefined'){
        req.session.lastValidConfirmedDate = {selection: null};
      }

      // Redirect as appropriate
      switch (req.body['confirmedDate']) {
      case 'Yes':
        req.session.lastValidConfirmedDate.selection = req.body['confirmedDate'];
        req.session.lastValidConfirmedDate.data = null;
        if (req.session.change === true){
          delete req.session.user.deferral;
          delete req.session.user.excusal;
          returnObj = res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty)));
        } else {
          delete req.session.user.deferral;
          returnObj = res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.assistance', req.session.user.thirdParty)));
        }
        break;
      case 'Change':
        if (req.session.change === true && req.session.user.deferral){
          if (req.session.lastValidConfirmedDate.selection === req.body['confirmedDate']){
            returnObj = res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty)));
          } else {
            returnObj = res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date.deferral', req.session.user.thirdParty)));
          }
        } else {
          delete req.session.user.deferral;
          returnObj = res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date.deferral', req.session.user.thirdParty)));
        }
        break;
      default:
        delete req.session.user.deferral;
        delete req.session.user.excusal;
        if (req.session.lastValidConfirmedDate.selection === req.body['confirmedDate']){
          returnObj = res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty)));
        } else {
          returnObj = res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date.excusal', req.session.user.thirdParty)));
        }
        break;
      }

      return returnObj;
    };
  };

  module.exports.change = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date', req.session.user.thirdParty)));
    };
  };

})();
