;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      mentalHealthSectioned: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_SECTIONED' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_SECTIONED' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'mentalHealthSectioned-Yes'
          }
        },
      },
      mentalHealthSectionedDetails: {
        presenceIf: {
          field: 'mentalHealthSectioned',
          value: (req.session.ulang === 'cy' ? texts_cy.QUALIFY_PAGE.YES : texts_en.QUALIFY_PAGE.YES),
          message: {
            summary: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_SECTIONED_DETAILS' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_SECTIONED_DETAILS' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          },
        },
        length: {
          maximum: 1000,
          message: {
            summary: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_SECTIONED_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_SECTIONED_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
      },
    };
  };
})();
