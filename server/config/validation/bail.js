;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      onBail: {
        presence: {
          allowEmpty: false,
          message: filters.translate('VALIDATION.QUALIFY.ON_BAIL'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
        },
      },
      onBailDetails: {
        presenceIf: {
          field: 'onBail',
          value: 'Yes',
          message: filters.translate('VALIDATION.QUALIFY.ON_BAIL_DETAILS'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
        },
        length: {
          maximum: 1000,
          message: filters.translate('VALIDATION.QUALIFY.ON_BAIL_LENGTH', texts),
        },
      },
    };
  };
})();
