;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      deferralReason: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_REASON'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_REASON_MISSING'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
          }
        },
        length: {
          maximum: 1000,
          message: filters.translate('VALIDATION.DEFERRAL.CHECK_REASON_LENGTH', texts),
        }
      },
    };
  };

})();
