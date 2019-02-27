;(function(){
  'use strict';

  var moment = require('moment')
    , filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  require('./custom-validation');

  module.exports = function(req) {
    return {
      primaryPhone: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^[0-9 +]{8,15}$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },

      secondaryPhone: {
        format: {
          pattern: '^([0-9 +]{8,15}|)$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.OTHER_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.OTHER_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
      },
    };
  };
})();
