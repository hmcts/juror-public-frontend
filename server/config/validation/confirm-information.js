;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      informationConfirmed: {
        mustBeTrue: {
          message: {
            summary: filters.translate('VALIDATION.CONFIRM_INFO.CONFIRM_CORRECT', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.CONFIRM_INFO.CONFIRM_CORRECT'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        }
      },
    };
  };

})();
