;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      onBail: {
        presence: {
          allowEmpty: false,
          message: filters.translate('VALIDATION.QUALIFY.ON_BAIL'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
        },
      },
      onBailDetails: {
        presenceIf: {
          field: 'onBail',
          value: (req.session.ulang === 'cy' ? texts_cy.QUALIFY_PAGE.YES : texts_en.QUALIFY_PAGE.YES),
          message: filters.translate('VALIDATION.QUALIFY.ON_BAIL_DETAILS'
            + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
        },
        length: {
          maximum: 1000,
          message: filters.translate('VALIDATION.QUALIFY.ON_BAIL_LENGTH', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
        },
      },
    };
  };
})();
