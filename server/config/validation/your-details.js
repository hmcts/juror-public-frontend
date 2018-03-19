;(function(){
  'use strict';

  var moment = require('moment')
    , filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  require('./custom-validation');

  module.exports = function(req) {
    return {
      title: {
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.TITLE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.TITLE_CHECK_INVALID', texts),
          },
        },
        length: {
          maximum: 10,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.TITLE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.TITLE_CHECK_INVALID', texts),
          },
        },
      },
      firstName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_MISSING', texts),
          }
        },
        length: {
          maximum: 20,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_CHECK', texts),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.FIRST_NAME_CHECK', texts),
          }
        }
      },
      lastName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_MISSING', texts),
          }
        },
        length: {
          maximum: 20,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_CHECK', texts),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.LAST_NAME_CHECK', texts),
          }
        },
      },

      address: {
        addressGroup: {
          group: [
            'addressLineOne',
            'addressLineTwo',
            'addressLineThree'
          ],
        },
      },
      addressLineOne: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_MISSING', texts),
          }
        },
        length: {
          maximum: 35,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_CHECK', texts),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_CHECK', texts),
          },
        }
      },
      addressLineTwo: {
        length: {
          maximum: 35,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_TWO_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_TWO_CHECK', texts),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_TWO_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_TWO_CHECK', texts),
          },
        }
      },
      addressLineThree: {
        length: {
          maximum: 35,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_THREE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_THREE_CHECK', texts),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_THREE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_THREE_CHECK', texts),
          },
        }
      },
      addressTown: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_MISSING', texts),
          }
        },
        length: {
          maximum: 35,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_CHECK', texts),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_CHECK', texts),
          },
        }
      },
      addressCounty: {
        length: {
          maximum: 35,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_CHECK', texts),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_COUNTY_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_COUNTY_CHECK', texts),
          },
        }
      },
      addressPostcode: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_MISSING', texts),
          }
        },
        format: {
          // eslint-disable-next-line max-len
          pattern: '^$|(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_MISSING', texts),
          }
        },
        length: {
          maximum: 8,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_CHECK', texts),
          }
        },
        // comment to sort out syntax highlighting
      },

      dateOfBirth: {
        dateOfBirth: req,
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.DATETIME_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.DATETIME_CHECK', texts),
          },
        },
        datetime: {
          latest: moment.utc().subtract(1, 'day'),
          earliest: moment.utc().subtract(125, 'years'),
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.DATETIME_PAST_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.DATETIME_PAST_CHECK', texts),
          },
        },
      },

      primaryPhone: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_MISSING', texts),
          }
        },
        format: {
          pattern: '^[0-9 +]{8,15}$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_CHECK', texts),
          }
        },
      },

      secondaryPhone: {
        format: {
          pattern: '^([0-9 +]{8,15}|)$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.OTHER_PHONE_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.OTHER_PHONE_CHECK', texts),

          },
        },
      },

      emailAddress: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK_MISSING', texts),
          }
        },
        email: {
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK_INVALID', texts),
          }
        },
      },

      emailAddressConfirmation: {
        presenceIf: {
          field: 'emailAddress',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CONFIRM_MISSING', texts),
          }
        },
        equality: {
          attribute: 'emailAddress',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK', texts),
            details: filters.translate('VALIDATION.YOUR_DETAILS.EMAIL_CHECK_EQUALITY', texts)
          },
        },
      },
    };
  };
})();
