;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function() {
    return {
      thirdParty: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.RESPONDER_TYPE.MISSING', texts)
          }
        },
      },
    }
  };

})();
