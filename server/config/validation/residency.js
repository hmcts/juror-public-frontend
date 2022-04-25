;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      livedConsecutive: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.QUALIFY.WHERE_YOU_LIVE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.QUALIFY.WHERE_YOU_LIVE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'livedConsecutive-Yes'
          }
        },
      },
      livedConsecutiveDetails: {
        presenceIf: {
          field: 'livedConsecutive',
          value: (req.session.ulang === 'cy' ? texts_cy.QUALIFY_PAGE.NO : texts_en.QUALIFY_PAGE.NO),
          message: {
            summary: filters.translate('VALIDATION.QUALIFY.WHERE_YOU_LIVE_DETAILS' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.QUALIFY.WHERE_YOU_LIVE_DETAILS' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          },
        },
        length: {
          maximum: 1000,
          message: {
            summary: filters.translate('VALIDATION.QUALIFY.WHERE_YOU_LIVE_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.QUALIFY.WHERE_YOU_LIVE_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        }
      },
    };
  };
})();
