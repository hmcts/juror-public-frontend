;(function(){
  'use strict';

  var moment = require('moment')
    , filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  require('./custom-validation');

  module.exports = function(req) {
    var phoneRegExOld = '^[0-9 ]{10,15}$'
      , phoneRegEx = '^$|^(0[012345689][0-9]{8,9})$|(07[0-9]{9})$';

    return {
      primaryPhone: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_MISSING', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
        format: {
          pattern: phoneRegEx,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.MAIN_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }
        },
      },

      secondaryPhone: {
        format: {
          pattern: phoneRegEx,
          message: {
            summary: filters.translate('VALIDATION.YOUR_DETAILS.OTHER_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.YOUR_DETAILS.OTHER_PHONE_CHECK', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          },
        },
      },
    };
  };
})();
