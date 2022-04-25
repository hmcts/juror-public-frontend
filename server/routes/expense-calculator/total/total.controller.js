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
      backLinkUrl = 'expense.calculator.confirm.information.get';

      return res.render('expense-calculator/total/index.njk', {
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

      try {
        // Reset error and saved field sessions
        delete req.session.errors;
        delete req.session.formFields;

        // Reset change flag
        req.session.change = false;

        return res.redirect(app.namedRoutes.build('expense.calculator.earnings.get'));

      } catch (err){
        console.error(err.message)

        // Return to start page
        return res.redirect(app.namedRoutes.build('start-expense-calculator.get'));
      }

    };
  };




})();
