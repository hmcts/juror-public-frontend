;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      incomeAffected: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('EXPENSE_CALCULATOR.INCOME.ERROR_SUMMARY', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('EXPENSE_CALCULATOR.INCOME.ERROR_DETAIL', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'incomeAffectedYes'
          }
        },
      },
    };
  };
})();
