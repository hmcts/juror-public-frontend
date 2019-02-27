/* eslint-disable max-len */
;(function(){
  'use strict';


  var moment = require('moment')
    , filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      title: {
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.TITLE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.TITLE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        length: { maximum: 10 },
      },
      firstName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.FIRST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.FIRST_NAME_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        length: {
          maximum: 20,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.FIRST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.FIRST_NAME_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.FIRST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.FIRST_NAME_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },
      lastName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.LAST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.LAST_NAME_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        length: {
          maximum: 20,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.LAST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.LAST_NAME_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.LAST_NAME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.LAST_NAME_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },
      addressLineOne: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_LINE_ONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_LINE_ONE_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_LINE_ONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_LINE_ONE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },
      addressLineTwo: {
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_LINE_TWO_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_LINE_TWO_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },
      addressLineThree: {
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_LINE_THREE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_LINE_THREE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },
      addressTown: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_TOWN_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_TOWN_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_TOWN_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_TOWN_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },
      addressCounty: {
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_COUNTY_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_COUNTY_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },
      addressPostcode: {
        format: {
          pattern: '^$|(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$',
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_POSTCODE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_POSTCODE_CHECK_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_POSTCODE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_PERSONAL_DETAILS.ADDRESS_POSTCODE_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },

      dateOfBirth: {
        dateOfBirth: req,
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.DATETIME_OB', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.DATETIME_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
        datetime: {
          latest: moment.utc().subtract(1, 'day'),
          earliest: moment.utc().subtract(125, 'years'),
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.DATETIME_PAST_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.DATETIME_PAST_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
      },
    };
  };
})();
