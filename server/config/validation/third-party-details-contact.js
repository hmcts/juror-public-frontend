/* eslint-disable max-len */
;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {

      contactPhone: {
        checkboxGroup: {
          fields: ['contactPhone', 'contactEmail'],
          req: req,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.CONTACT_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.CONTACT_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        }
      },

      mainPhone: {
        presenceIf: {
          field: 'contactPhone',
          value: 'By phone',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.MAIN_PHONE_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.MAIN_PHONE_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
        formatIf: {
          pattern: '^[0-9 +]{8,15}$',
          field: 'contactPhone',
          value: 'By phone',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.MAIN_PHONE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.MAIN_PHONE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
      },

      otherPhone: {
        formatIf: {
          pattern: '^([0-9 +]{8,15}|)$',
          field: 'contactPhone',
          value: 'By phone',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.OTHER_PHONE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.OTHER_PHONE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
      },

      emailAddress: {
        presenceIf: {
          field: 'contactEmail',
          value: 'By email',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
        emailIf: {
          field: 'contactEmail',
          value: 'By email',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },

      emailAddressConfirmation: {
        presenceIf: {
          field: 'contactEmail',
          value: 'By email',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CONFIRMATION_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CONFIRMATION_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        equality: {
          attribute: 'emailAddress',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CONFIRMATION_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CONFIRMATION_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          },
        },
      }
    };
  };
})();
