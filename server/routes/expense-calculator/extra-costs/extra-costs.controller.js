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
      if ((req.session.change === true) && (req.session.user['extraCosts'] === 'Yes') && (typeof req.session.user['extraCostsAmount'] === 'undefined')){
        backLinkUrl = 'expense.calculator.extra.costs.amount.get';
      } else if (req.session.change === true){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else {
        backLinkUrl = 'expense.calculator.earnings.get';
      }

      return res.render('expense-calculator/extra-costs/index.njk', {
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
      var validatorResult
        , redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/extra-costs')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build('expense.calculator.extra.costs.post'));
      }

      // Update session data
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }
      req.session.user['extraCosts'] = req.body['extraCosts'];

      if (req.session.user['extraCosts'] !== 'Yes'){
        if (typeof req.session.user['extraCostsAmount'] !== 'undefined') {
          delete req.session.user['extraCostsAmount'];
        }
      }

      if ((req.session.user['extraCosts'] === 'Yes') && (typeof req.session.user['extraCostsAmount'] === 'undefined')){
        redirectUrl = 'expense.calculator.extra.costs.amount.get';
      } else if (req.session.change === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else if (req.session.user['extraCosts'] === 'Yes'){
        redirectUrl = 'expense.calculator.extra.costs.amount.get';
      } else {
        redirectUrl = 'expense.calculator.travel.get';
      }

      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.change = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('expense.calculator.extra.costs.get'));
    };
  };

  module.exports.getExtraCostsAmount = function() {
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
      if ((req.session.change === true) && (typeof req.session.user['extraCostsAmount'] !== 'undefined')){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else if ((req.session.change === true) && (typeof req.session.user['extraCostsAmount'] === 'undefined')){
        //backLinkUrl = '';
        backLinkUrl = 'expense.calculator.extra.costs.get';
      } else {
        backLinkUrl = 'expense.calculator.extra.costs.get';
      }

      return res.render('expense-calculator/extra-costs/amount.njk', {
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

  module.exports.getExtraCostsInfo = function() {
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
      backLinkUrl = 'expense.calculator.extra.costs.get';

      return res.render('expense-calculator/extra-costs/info.njk', {
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

  module.exports.createExtraCostsAmount = function(app) {
    return function(req, res) {
      // Validate form submission
      var validatorResult
        , redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Format input value
      if (typeof req.body['extraCostsAmount'] !== 'undefined'){
        req.body['extraCostsAmount'] = utils.getCurrencyValue(req.body['extraCostsAmount']);
      }

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/extra-costs-amount')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build('expense.calculator.extra.costs.amount.post'));
      }

      // Update session
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }
      req.session.user['extraCostsAmount'] = utils.formatCurrencyValue(req.body['extraCostsAmount']);

      if (req.session.change === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else {
        redirectUrl = 'expense.calculator.travel.get';
      }

      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.changeExtraCostsAmount = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('expense.calculator.extra.costs.amount.get'));
    };
  };

})();
