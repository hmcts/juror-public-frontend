;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      date1: {
        deferralDateValid: {
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES', texts),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts)
          }
        },
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
        }
      },
      date2: {
        deferralDateValid: {
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES', texts),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts)
          }
        },
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
        }
      },
      date3: {
        deferralDateValid: {
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES', texts),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts)
          }
        },
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
        }
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
