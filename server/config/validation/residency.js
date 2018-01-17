;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      livedConsecutive: {
        presence: {
          allowEmpty: false,
          message: filters.translate('VALIDATION.QUALIFY.WHERE_YOU_LIVE'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
        },
      },
      livedConsecutiveDetails: {
        presenceIf: {
          field: 'livedConsecutive',
          value: 'No',
          message: filters.translate('VALIDATION.QUALIFY.WHERE_YOU_LIVE_DETAILS'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
        },
        length: {
          maximum: 1000,
          message: filters.translate('VALIDATION.QUALIFY.WHERE_YOU_LIVE_LENGTH', texts),
        }
      },
    };
  };
})();
