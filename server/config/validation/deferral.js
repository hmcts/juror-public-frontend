;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      deferralReason: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.DEFERRAL.CHECK_REASON'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.DEFERRAL.CHECK_REASON_MISSING'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
        length: {
          maximum: 1000,
          message: filters.translate('VALIDATION.DEFERRAL.CHECK_REASON_LENGTH', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
        }
      },
    };
  };

})();
