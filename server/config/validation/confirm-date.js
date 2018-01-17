;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      confirmedDate: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.CONFIRM_DATE.CONFIRM'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.CONFIRM_DATE.CONFIRM'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
          }
        },
      },
    };
  };

})();
