;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      carMiles: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('EXPENSE_CALCULATOR.TRAVEL_CAR.ERROR_SUMMARY_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('EXPENSE_CALCULATOR.TRAVEL_CAR.ERROR_DETAIL_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'carMiles'
          }
        },
        format: {
          pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
          message: {
            summary: filters.translate('EXPENSE_CALCULATOR.TRAVEL_CAR.ERROR_SUMMARY_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('EXPENSE_CALCULATOR.TRAVEL_CAR.ERROR_DETAIL_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'carMiles'
          },
        },
      },
    };
  };
})();
