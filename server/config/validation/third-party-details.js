/* eslint-disable max-len */
;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      firstName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.FIRST_NAME_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.FIRST_NAME_CHECK_MISSING', texts)
          },
        },
        length: {
          maximum: 50,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.FIRST_NAME_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.FIRST_NAME_CHECK_INVALID', texts)
          }
        },
      },

      lastName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.LAST_NAME_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.LAST_NAME_CHECK_MISSING', texts)
          },
        },
        length: {
          maximum: 50,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.LAST_NAME_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.LAST_NAME_CHECK_INVALID', texts)
          }
        },
      },

      relationship: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.RELATIONSHIP_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.RELATIONSHIP_CHECK_MISSING', texts)
          },
        },
        length: {
          maximum: 100,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.RELATIONSHIP_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.RELATIONSHIP_CHECK_INVALID', texts)
          }
        },
      },

      contactPhone: {
        checkboxGroup: {
          fields: ['contactPhone', 'contactEmail'],
          req: req,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.CONTACT_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.CONTACT_CHECK_MISSING', texts),
          }
        }
      },

      mainPhone: {
        presenceIf: {
          field: 'contactPhone',
          value: 'By phone',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.MAIN_PHONE_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.MAIN_PHONE_CHECK_MISSING', texts)
          }
        },
        formatIf: {
          pattern: '^[0-9 +]{8,15}$',
          field: 'contactPhone',
          value: 'By phone',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.MAIN_PHONE_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.MAIN_PHONE_CHECK_INVALID', texts)
          }
        },
      },

      otherPhone: {
        formatIf: {
          pattern: '^([0-9 +]{8,15}|)$',
          field: 'contactPhone',
          value: 'By phone',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.OTHER_PHONE_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.OTHER_PHONE_CHECK_INVALID', texts)
          }
        },
      },

      emailAddress: {
        presenceIf: {
          field: 'contactEmail',
          value: 'By email',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CHECK_MISSING', texts)
          }
        },
        emailIf: {
          field: 'contactEmail',
          value: 'By email',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CHECK_INVALID', texts),
          }
        },
      },

      emailAddressConfirmation: {
        presenceIf: {
          field: 'contactEmail',
          value: 'By email',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CONFIRMATION_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CONFIRMATION_CHECK_MISSING', texts),
          }
        },
        equality: {
          attribute: 'emailAddress',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CONFIRMATION_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_DETAILS.EMAIL_CONFIRMATION_CHECK_INVALID', texts)
          },
        },
      }
    };
  };
})();
