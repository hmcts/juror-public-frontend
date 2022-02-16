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
      if ((req.session.change === true) && (req.session.user['incomeAffected'] === 'Yes') && (typeof req.session.user['earningsThreshold'] === 'undefined')){
        backLinkUrl = 'expense.calculator.earnings.threshold.get';
      } else if (req.session.change === true){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else {
        backLinkUrl = '';
      }

      return res.render('expense-calculator/earnings/index.njk', {
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
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/earnings')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build('expense.calculator.earnings.post'));
      }

      // Update session data
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }
      req.session.user['incomeAffected'] = req.body['incomeAffected'];

      if (req.session.user['incomeAffected'] !== 'Yes'){
        if (typeof req.session.user['earningsAmount'] !== 'undefined') {
          delete req.session.user['earningsAmount'];
        }
        if (typeof req.session.user['earningsThreshold'] !== 'undefined') {
          delete req.session.user['earningsThreshold'];
        }
      }

      if ((req.session.user['incomeAffected'] === 'Yes') && (typeof req.session.user['earningsThreshold'] === 'undefined')){
        redirectUrl = 'expense.calculator.earnings.threshold.get';
      } else if (req.session.change === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else if (req.session.user['incomeAffected'] === 'Yes'){
        redirectUrl = redirectUrl = 'expense.calculator.earnings.threshold.get';
      } else {
        redirectUrl = redirectUrl = 'expense.calculator.extra.costs.get';
      }

      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.change = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('expense.calculator.earnings.get'));
    };
  };

  module.exports.getEarningsThreshold = function() {
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
      if ((req.session.change === true) && (typeof req.session.user['earningsThreshold'] === 'undefined')){
        backLinkUrl = 'expense.calculator.earnings.get';
      } else if ((req.session.change === true) && (req.session.user['earningsThreshold'] === 'No') && (typeof req.session.user['earningsAmount'] === 'undefined')){
        backLinkUrl = 'expense.calculator.earnings.amount.get';
      } else if ((req.session.change === true) && (req.session.user['earningsThreshold'] === 'Yes')){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else if (req.session.change === true){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else {
        backLinkUrl = 'expense.calculator.earnings.get';
      }

      return res.render('expense-calculator/earnings/earnings-threshold.njk', {
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

  module.exports.createEarningsThreshold = function(app) {
    return function(req, res) {
      // Validate form submission
      var validatorResult
        , redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/earnings-threshold')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build('expense.calculator.earnings.threshold.post'));
      }

      // Update session data
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }
      req.session.user['earningsThreshold'] = req.body['earningsThreshold'];

      if (req.session.user['earningsThreshold'] !== 'No'){
        if (typeof req.session.user['earningsAmount'] !== 'undefined') {
          delete req.session.user['earningsAmount'];
        }
      }

      if ((req.session.user['earningsThreshold'] === 'No') && (typeof req.session.user['earningsAmount'] === 'undefined')){
        redirectUrl = 'expense.calculator.earnings.amount.get';
      } else if (req.session.change === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else if (req.session.user['earningsThreshold'] === 'No'){
        redirectUrl = 'expense.calculator.earnings.amount.get';
      } else {
        redirectUrl = 'expense.calculator.extra.costs.get';
      }

      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.changeEarningsThreshold = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('expense.calculator.earnings.threshold.get'));
    };
  };

  module.exports.getEarningsAmount = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if ((req.session.change === true) && (req.session.user['incomeAffected'] === 'Yes') && (typeof req.session.user['earningsAmount'] === 'undefined')){
        backLinkUrl = 'expense.calculator.earnings.threshold.get';
      } else if (req.session.change === true){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else {
        backLinkUrl = 'expense.calculator.earnings.threshold.get';
      }

      return res.render('expense-calculator/earnings/earnings-amount.njk', {
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

  module.exports.createEarningsAmount = function(app) {
    return function(req, res) {
      var validatorResult
        , redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Format input value
      if (typeof req.body['earningsAmount'] !== 'undefined'){
        req.body['earningsAmount'] = utils.getCurrencyValue(req.body['earningsAmount']);
      }

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/earnings-amount')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build('expense.calculator.earnings.amount.post'));
      }

      // Update session data
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }

      req.session.user['earningsAmount'] = utils.formatCurrencyValue(req.body['earningsAmount']);

      if (req.session.change === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else {
        redirectUrl = 'expense.calculator.extra.costs.get';
      }

      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.changeEarningsAmount = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('expense.calculator.earnings.amount.get'));
    };
  };

  module.exports.getEarningsInfo = function() {
    return function(req, res) {
      var backLinkUrl;

      // Set back link URL
      backLinkUrl = 'expense.calculator.earnings.get';

      return res.render('expense-calculator/earnings/earnings-info.njk', {
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof req.session.errors !== 'undefined' ? Object.keys(req.session.errors).length : 0,
          items: req.session.errors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

})();
