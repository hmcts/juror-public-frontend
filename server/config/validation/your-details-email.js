;(function(){
  'use strict';

  var moment = require('moment')
    , filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  require('./custom-validation');

  module.exports = function(req) {
    return {
      emailAddress: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        email: {
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },

      emailAddressConfirmation: {
        presenceIf: {
          field: 'emailAddress',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK_EQUALITY', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK_EQUALITY', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        equality: {
          attribute: 'emailAddress',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK_EQUALITY', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK_EQUALITY', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          },
        },
      },
    };
  };
})();
