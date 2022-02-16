;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json')

  module.exports = function(req) {
    return {
      thirdParty: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.RESPONDER_TYPE.MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.RESPONDER_TYPE.MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'thirdParty_No'
          }
        },
      },
    }
  };

})();
