;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      date1: {
        deferralDateValid: {
          index: 1,
          jurorDOB: req.session.user.dateOfBirth,
          message: {
            invalidDay: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ONE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            invalidMonth: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ONE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            invalidYear: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ONE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            invalidDate: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ONE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            dateLowerLimit: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ERROR_ONE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)).replace('[earliestDate]', filters.translateDate(req.session.user.deferral.dateRange.earliestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)).replace('[latestDate]', filters.translateDate(req.session.user.deferral.dateRange.latestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)),
            dateUpperLimit: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ERROR_ONE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)).replace('[earliestDate]', filters.translateDate(req.session.user.deferral.dateRange.earliestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)).replace('[latestDate]', filters.translateDate(req.session.user.deferral.dateRange.latestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)),
            dateAgeLimit: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_AGE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            dateUnique: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_UNIQUE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        }
      },

      date2: {
        deferralDateValid: {
          index: 2,
          jurorDOB: req.session.user.dateOfBirth,
          message: {
            invalidDay: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_TWO' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            invalidMonth: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_TWO' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            invalidYear: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_TWO' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            invalidDate: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_TWO' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            dateLowerLimit: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ERROR_TWO' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)).replace('[earliestDate]', filters.translateDate(req.session.user.deferral.dateRange.earliestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)).replace('[latestDate]', filters.translateDate(req.session.user.deferral.dateRange.latestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)),
            dateUpperLimit: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ERROR_TWO' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)).replace('[earliestDate]', filters.translateDate(req.session.user.deferral.dateRange.earliestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)).replace('[latestDate]', filters.translateDate(req.session.user.deferral.dateRange.latestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)),
            dateAgeLimit: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_AGE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            dateUnique: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_UNIQUE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        }
      },

      date3: {
        deferralDateValid: {
          index: 3,
          jurorDOB: req.session.user.dateOfBirth,
          message: {
            invalidDay: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_THREE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            invalidMonth: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_THREE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            invalidYear: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_THREE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            invalidDate: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_THREE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            dateLowerLimit: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ERROR_THREE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)).replace('[earliestDate]', filters.translateDate(req.session.user.deferral.dateRange.earliestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)).replace('[latestDate]', filters.translateDate(req.session.user.deferral.dateRange.latestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)),
            dateUpperLimit: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_ERROR_THREE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)).replace('[earliestDate]', filters.translateDate(req.session.user.deferral.dateRange.earliestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)).replace('[latestDate]', filters.translateDate(req.session.user.deferral.dateRange.latestDateShort, 'D MM YYYY', 'D MMMM YYYY', req.session.ulang)),
            dateAgeLimit: filters.translate('VALIDATION.DEFERRAL.CHECK_DATE_AGE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            dateUnique: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_UNIQUE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        }
      },
    };
  };

})();
