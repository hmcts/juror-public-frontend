;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  require('./custom-validation');

  module.exports = function(req) {
    return {
      addressConfirm: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_CONFIRM_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_CONFIRM_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'addressConfirm-Yes'
          }
        },
      },
    };
  };
})();
