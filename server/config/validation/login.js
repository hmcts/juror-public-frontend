;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      jurorNumber: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_SUM'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_DETAILS'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
          }
        },
        numericality: {
          onlyInteger: true,
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_SUM', texts),
            details: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_SUM', texts),
          }
        },
        length: {
          is: 9,
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_SUM', texts),
            details: filters.translate('VALIDATION.LOGIN.JUROR_NUMBER_CHECK_SUM', texts),
          }
        },
      },

      jurorLastName: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_LAST_NAME_SUM'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_LAST_NAME_DETAILS'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
          },
        },
        format: {
          pattern: '^$|^[^|"]+$',
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_LAST_NAME_SUM'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_LAST_NAME_INVALID'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
          }
        },
      },

      jurorPostcode: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_POSTCODE_SUM'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_POSTCODE_DETAILS'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
          },
        },
        format: {
          // eslint-disable-next-line max-len
          pattern: '^$|(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$',
          message: {
            summary: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_POSTCODE_SUM', texts),
            details: filters.translate('VALIDATION.LOGIN.JUROR_CHECK_POSTCODE_DETAILS_FORMAT', texts),
          },
        },
      },
    };
  };
})();
