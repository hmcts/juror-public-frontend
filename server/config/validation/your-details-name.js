;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  require('./custom-validation');

  module.exports = function(req) {
    return {
      title: {
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.TITLE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.TITLE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
        length: {
          maximum: 10,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.TITLE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.TITLE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
      },

      firstName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        length: {
          maximum: 20,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        }
      },

      lastName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        length: {
          maximum: 20,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },
    };
  };
})();
