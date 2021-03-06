;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      date1: {
        deferralDateValid: {
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ONE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ONE', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
        dateFuture: {
          texts: req.session.ulang === 'cy' ? texts_cy : texts_en,
          checkDate: req.session.user.hearingDateTimestamp,
          limit: {
            unit: 'months',
            multiplier: 12,
          },
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_FUTURE_ONE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_FUTURE_ERROR_ONE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        ageDeferredDate: {
          texts: req.session.ulang === 'cy' ? texts_cy : texts_en,
          jurorDOB: req.session.user.dateOfBirth,
          limit: {
            unit: 'years',
            multiplier: 76,
          },
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_AGE'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_AGE_ERROR', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        }
      },
      date2: {
        deferralDateValid: {
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_TWO' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_TWO', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
        dateFuture: {
          texts: req.session.ulang === 'cy' ? texts_cy : texts_en,
          checkDate: req.session.user.hearingDateTimestamp,
          limit: {
            unit: 'months',
            multiplier: 12,
          },
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_FUTURE_TWO', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_FUTURE_ERROR_TWO', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        ageDeferredDate: {
          texts: req.session.ulang === 'cy' ? texts_cy : texts_en,
          jurorDOB: req.session.user.dateOfBirth,
          limit: {
            unit: 'years',
            multiplier: 76,
          },
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_AGE'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_AGE_ERROR', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        }
      },
      date3: {
        deferralDateValid: {
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_THREE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_THREE', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
        dateFuture: {
          texts: req.session.ulang === 'cy' ? texts_cy : texts_en,
          checkDate: req.session.user.hearingDateTimestamp,
          limit: {
            unit: 'months',
            multiplier: 12,
          },
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_FUTURE_THREE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_FUTURE_ERROR_THREE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
        ageDeferredDate: {
          texts: req.session.ulang === 'cy' ? texts_cy : texts_en,
          jurorDOB: req.session.user.dateOfBirth,
          limit: {
            unit: 'years',
            multiplier: 76,
          },
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_AGE'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_AGE_ERROR', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        }
      },
      dates: {
        datesDistinct: {
          texts: req.session.ulang === 'cy' ? texts_cy : texts_en,
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
