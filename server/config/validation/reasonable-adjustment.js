;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      assistanceNeeded: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.ASSISTANCE.ASSISTANCE_REQUIRED' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ASSISTANCE.ASSISTANCE_REQUIRED' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'assistanceNeeded-Yes'
          }
        },
      },

      assistanceType: {
        presenceIf: {
          field: 'assistanceNeeded',
          value: 'Yes',
          message: {
            summary: filters.translate('VALIDATION.ASSISTANCE.DISSABILITY_OR_IMPAIRMENT' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ASSISTANCE.DISSABILITY_OR_IMPAIRMENT' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'assistanceType-mobility'
          }
        }
      },

      assistanceTypeDetails: {
        presenceIf: {
          field: 'assistanceType',
          value: 'Other',
          message: {
            summary: filters.translate('VALIDATION.ASSISTANCE.ASSISTANCE_GIVE_DETAILS' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ASSISTANCE.ASSISTANCE_GIVE_DETAILS' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        length: {
          maximum: 1000,
          message: {
            summary: filters.translate('VALIDATION.ASSISTANCE.ASSISTANCE_OTHER_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ASSISTANCE.ASSISTANCE_OTHER_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        }
      },

      assistanceSpecialArrangements: {
        length: {
          maximum: 1000,
          message: {
            summary: filters.translate('VALIDATION.ASSISTANCE.SPECIAL_ARRANGEMENTS_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ASSISTANCE.SPECIAL_ARRANGEMENTS_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        }
      }

    };
  }

})();
