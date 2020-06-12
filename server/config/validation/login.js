;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      jurorNumber: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_SUM'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_DETAILS'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
        numericality: {
          onlyInteger: true,
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_SUM', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_SUM', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        length: {
          is: 9,
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_SUM', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_SUM', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },

      jurorLastName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_LAST_NAME_SUM'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_LAST_NAME_DETAILS'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_LAST_NAME_INVALID'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_LAST_NAME_INVALID'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },

      jurorPostcode: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_POSTCODE_SUM'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_POSTCODE_DETAILS'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
        format: {
          // eslint-disable-next-line max-len
          pattern: '^$|(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$',
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_POSTCODE_DETAILS_FORMAT'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_POSTCODE_DETAILS_FORMAT'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
      },
    };
  };
})();
