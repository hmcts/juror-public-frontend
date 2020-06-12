/* eslint-disable max-len */
;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {

      firstName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.FIRST_NAME_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.FIRST_NAME_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          },
        },
        length: {
          maximum: 50,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.FIRST_NAME_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.FIRST_NAME_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
      },

      lastName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.LAST_NAME_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.LAST_NAME_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          },
        },
        length: {
          maximum: 50,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.LAST_NAME_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.LAST_NAME_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
      }

    };
  };
})();
