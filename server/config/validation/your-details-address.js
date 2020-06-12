;(function(){
  'use strict';

  var moment = require('moment')
    , filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  require('./custom-validation');

  module.exports = function(req) {
    return {
      addressLineOne: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        length: {
          maximum: 35,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_ONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        }
      },
      addressLineTwo: {
        length: {
          maximum: 35,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_TWO_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_TWO_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_TWO_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_TWO_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        }
      },
      addressLineThree: {
        length: {
          maximum: 35,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_THREE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_THREE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_THREE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_LINE_THREE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        }
      },
      addressTown: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        length: {
          maximum: 35,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_TOWN_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        }
      },
      addressCounty: {
        length: {
          maximum: 35,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_COUNTY_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_COUNTY_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_COUNTY_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.ADDRESS_COUNTY_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        }
      },
      addressPostcode: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          // eslint-disable-next-line max-len
          pattern: '^$|(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$',
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        length: {
          maximum: 8,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.POSTCODE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },
    };
  };
})();
