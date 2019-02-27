/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';
  var validate = require('validate.js')
    , filters = require('../../../components/filters')
    , texts_en = require('../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../client/js/i18n/cy.json')
    , utils = require('../../../lib/utils');

  module.exports.index = function() {
    return function(req, res) {
      return res.render('steps/00-responder-type/index.njk', {
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

      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/responder-type')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;

        return res.redirect(app.namedRoutes.build('steps.responder.type.get'));
      }

      req.session.user['thirdParty'] = req.body['thirdParty'];

      return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.login', req.session.user.thirdParty)));

    };
  };

})();
