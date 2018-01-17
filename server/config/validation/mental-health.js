;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function() {
    return {
      mentalHealthAct: {
        presence: {
          allowEmpty: false,
          message: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_CAPACITY', texts)
        },
      },
      mentalHealthActDetails: {
        presenceIf: {
          field: 'mentalHealthAct',
          value: 'Yes',
          message: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_CAPACITY_DETAILS', texts),
        },
        length: {
          maximum: 1000,
          message: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_CAPACITY_LENGTH', texts),
        },
      },
    };
  };
})();
