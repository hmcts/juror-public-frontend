/* eslint-disable max-len */
;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  require('./custom-validation');

  module.exports = function(req) {
    var phoneRegExOld = '^([0-9 +]{8,15}|)$'
      , phoneRegEx = '^$|^(0[012345689][0-9]{8,9})$|(07[0-9]{9})$';

    return {
      useJurorPhoneDetails: {
        ifValueMatch: {
          ifValue: 'No',
          actualValue: req.session.user.thirdPartyDetails.contactPhone,
          expectedValue: 'By phone',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_PHONE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_PHONE_INLINE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'phoneNumber_existing'
          },
        },
        presenceIfSet: {
          field: 'useJurorEmailDetails',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.USE_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.USE_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'phoneNumber_existing'
          },
        },
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.USE_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.USE_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'phoneNumber_existing'
          },
        },
      },

      primaryPhone: {
        presenceIf: {
          field: 'useJurorPhoneDetails',
          value: 'Yes',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
        presenceMainPhone: {
          thirdPartyMainPhone: req.session.user.thirdPartyDetails.mainPhone,
          thirdPartyEmail: req.session.user.thirdPartyDetails.emailAddress,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
        format: {
          pattern: phoneRegEx,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          },
        },
      },
      secondaryPhone: {
        format: {
          pattern: phoneRegEx,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_OTHER_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_OTHER_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          },
        },
      },

      useJurorEmailDetails: {
        ifValueMatch: {
          ifValue: 'No',
          actualValue: req.session.user.thirdPartyDetails.contactEmail,
          expectedValue: 'By email',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_EMAIL', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_EMAIL_INLINE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'emailAddress_existing',
          },
        },
        presenceIfSet: {
          field: 'useJurorPhoneDetails',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.USE_EMAIL_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.USE_EMAIL_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'emailAddress_existing',
          },
        },
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.USE_EMAIL_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.USE_EMAIL_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'emailAddress_existing',
          },
        },
      },

      emailAddress: {
        presenceIf: {
          field: 'useJurorEmailDetails',
          value: 'Yes',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
        emailIf: {
          field: 'useJurorEmailDetails',
          value: 'Yes',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },

      emailAddressConfirmation: {
        equality: {
          attribute: 'emailAddress',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CONFIRMATION_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CONFIRMATION_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      }
    }
  }
})();
