;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      mentalHealthAct: {
        presence: {
          allowEmpty: false,
          message: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_CAPACITY', (req.session.ulang === 'cy' ? texts_cy : texts_en))
        },
      },
      mentalHealthActDetails: {
        presenceIf: {
          field: 'mentalHealthAct',
          value: (req.session.ulang === 'cy' ? texts_cy.QUALIFY_PAGE.YES : texts_en.QUALIFY_PAGE.YES),
          message: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_CAPACITY_DETAILS', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
        },
        length: {
          maximum: 1000,
          message: filters.translate('VALIDATION.QUALIFY.MENTAL_HEALTH_CAPACITY_LENGTH', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
        },
      },
    };
  };
})();
