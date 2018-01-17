;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      date1: {
        datetime: {
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts),
          },
        },
        deferralDateValid: req,
        dateFuture: {
          checkDate: req.session.user.hearingDateTimestamp,
          limit: {
            unit: 'months',
            multiplier: 12,
          },
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_FUTURE', texts),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts),
          }
        },
      },
      date2: {
        datetime: {
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts),
          },
        },
        deferralDateValid: req,
        dateFuture: {
          checkDate: req.session.user.hearingDateTimestamp,
          limit: {
            unit: 'months',
            multiplier: 12,
          },
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_FUTURE', texts),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts),
          }
        },
      },
      date3: {
        datetime: {
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts),
          },
        },
        deferralDateValid: req,
        dateFuture: {
          checkDate: req.session.user.hearingDateTimestamp,
          limit: {
            unit: 'months',
            multiplier: 12,
          },
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_FUTURE', texts),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts),
          }
        },
      },
      dates: {
        datesDistinct: {
          group: [
            'date1',
            'date2',
            'date3'
          ],
        }
      },
    };
  };

})();
