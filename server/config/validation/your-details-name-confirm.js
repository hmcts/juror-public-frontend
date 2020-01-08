;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  require('./custom-validation');

  module.exports = function(req) {
    return {
      nameConfirm: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.NAME_CONFIRM_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.NAME_CONFIRM_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'nameConfirm-Yes'
          }
        },
      },
    };
  };
})();