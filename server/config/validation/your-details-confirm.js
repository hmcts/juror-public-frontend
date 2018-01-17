;(function(){
  'use strict';

  var moment = require('moment')
    , filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req){
    return {
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
    }
  }
})();
