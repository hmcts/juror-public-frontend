;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      assistanceNeeded: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.PLEASE_ANSWER', texts),
            details: filters.translate('VALIDATION.PLEASE_ANSWER', texts),
          }
        },
      },

      assistanceType: {
        presenceIf: {
          field: 'assistanceNeeded',
          value: 'Yes',
          message: {
            summary: filters.translate('VALIDATION.GIVE_DETAILS', texts),
            details: filters.translate('VALIDATION.GIVE_DETAILS', texts),
          }
        }
      },

      assistanceTypeDetails: {
        presenceIf: {
          field: 'assistanceType',
          value: 'Other',
          message: {
            summary: filters.translate('VALIDATION.ASSISTANCE.DISSABILITY_OR_IMPAIRMENT'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.ASSISTANCE.DISSABILITY_OR_IMPAIRMENT'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
          }
        }
      }
    };
  }

})();
