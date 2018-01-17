/* eslint-disable max-len */
;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');


  require('./custom-validation');

  module.exports = function(req) {
    return {
      useJurorPhoneDetails: {
        ifValueMatch: {
          ifValue: 'No',
          actualValue: req.session.user.thirdPartyDetails.contactPhone,
          expectedValue: 'By phone',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_PHONE', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_PHONE_INLINE', texts),
          },
        },
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.USE_PHONE_CHECK', texts)
          },
        },
      },

      primaryPhone: {
        presenceIf: {
          field: 'useJurorPhoneDetails',
          actualValue: req.session.user.thirdPartyDetails.contactPhone,
          value: 'Yes',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_CHECK_MISSING', texts),
          },
        },
        formatIf: {
          field: 'useJurorPhoneDetails',
          value: 'Yes',
          pattern: '^[0-9 +]{8,15}$',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_CHECK_INVALID', texts)
          },
        },
      },
      secondaryPhone: {
        format: {
          pattern: '^([0-9 +]{8,15}|)$',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_OTHER_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.PHONE_NUMBER_OTHER_CHECK_INVALID', texts)
          },
        },
      },



      useJurorEmailDetails: {
        ifValueMatch: {
          ifValue: 'No',
          actualValue: req.session.user.thirdPartyDetails.contactEmail,
          expectedValue: 'By email',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_EMAIL', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_EMAIL_INLINE', texts),
          },
        },
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.USE_EMAIL_CHECK', texts)
          },
        },
      },

      emailAddress: {
        presenceIf: {
          field: 'useJurorEmailDetails',
          value: 'Yes',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CHECK_MISSING', texts),
          },
        },
        emailIf: {
          field: 'useJurorEmailDetails',
          value: 'Yes',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CHECK_INVALID', texts),
          }
        },
      },

      emailAddressConfirmation: {
        presenceIf: {
          field: 'useJurorEmailDetails',
          value: 'Yes',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CONFIRMATION_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CONFIRMATION_CHECK_MISSING', texts),
          }
        },
        equality: {
          attribute: 'emailAddress',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CONFIRMATION_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.EMAIL_CONFIRMATION_CHECK_INVALID', texts),
          }
        },
      }
    }
  }
})();
