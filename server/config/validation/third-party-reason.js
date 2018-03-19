;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function() {
    return {
      thirdPartyReason: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_REASON.REASON_CHECK', texts),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_REASON.REASON_CHECK_MISSING', texts),
          }
        },
      },
      thirdPartyOtherReason: {
        presenceIf: {
          field: 'thirdPartyReason',
          value: 'other',
          message: filters.translate('VALIDATION.PROVIDE_DETAILS', texts),
        },
        length: {
          maximum: 100
        }
      },
    };
  };
})();
