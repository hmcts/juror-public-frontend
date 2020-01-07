;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      thirdPartyReason: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_REASON.REASON_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_REASON.REASON_CHECK_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'thirdPartyReasonNotHere',
          }
        },
      },
      thirdPartyOtherReason: {
        presenceIf: {
          field: 'thirdPartyReason',
          value: 'other',
          message: filters.translate('VALIDATION.PROVIDE_DETAILS', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
        },
        length: {
          maximum: 100
        }
      },
    };
  };
})();
