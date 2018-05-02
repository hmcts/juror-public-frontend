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
      return res.render('steps/04-confirm-date/excusal.njk', {
        user: _.merge(req.session.user, req.session.formFields),
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof req.session.errors !== 'undefined' ? Object.keys(req.session.errors).length : 0,
          items: req.session.errors,
        }
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

        return res.redirect(app.namedRoutes.build('steps.confirm.date.excusal.get'));
      }

      // If we previously answered a deferral, wipe that information
      if (typeof req.session.user.deferral !== 'undefined') {
        delete req.session.user.deferral;
      }

      // Move on
      if (req.session.change === true){
        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }
      return res.redirect(app.namedRoutes.build('steps.cjs.employed.get'));
    };
  };

  module.exports.change = function(app) {
    return function(req, res) {
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.confirm.date.excusal.get'));
    };
  };
})();
