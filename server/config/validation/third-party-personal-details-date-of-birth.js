/* eslint-disable max-len */
;(function(){
  'use strict';


  var moment = require('moment')
    , filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      dobDay: {
        dateOfBirthDay: req
      },
      dobMonth: {
        dateOfBirthMonth: req
      },
      dobYear: {
        dateOfBirthYear: req
      },
      dateOfBirth: {
        dateOfBirthLimits: req,
      },
      /*
      dateOfBirth: {
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
      }
      */
    };
  };
})();
