;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      earningsThreshold: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('EXPENSE_CALCULATOR.EARNINGS_THRESHOLD.ERROR_SUMMARY', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('EXPENSE_CALCULATOR.EARNINGS_THRESHOLD.ERROR_DETAIL', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'earningsThresholdYes'
          }
        },
      }
    };
  };
})();
