;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      convicted: {
        presence: {
          allowEmpty: false,
          message: filters.translate('VALIDATION.QUALIFY.CONVICTION'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
        },
      },
      convictedDetails: {
        presenceIf: {
          field: 'convicted',
          value: 'Yes',
          message: filters.translate('VALIDATION.QUALIFY.CONVICTION_DETAILS'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
        },
        length: {
          maximum: 1000,
          message: filters.translate('VALIDATION.QUALIFY.CONVICTION_LENGTH', texts),
        }
      },
    };
  };
})();
