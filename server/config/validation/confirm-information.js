;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      informationConfirmed: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ERROR_TITLE', texts),
            details: filters.translate('VALIDATION.CONFIRM_INFO.CONFIRM_CORRECT'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
          }
        }
      },
    };
  };

})();
