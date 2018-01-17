/*
 * The order of rules to be validated is important, this controls
 * the order they are output on front-end. Which is a requirement
 * for matching the content matrix.
 */
;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json');

  module.exports = function(req) {
    return {
      cjsEmployer: {
        presenceIf: {
          field: 'cjsEmployed',
          value: 'Yes',
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.WORKED_FOR'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.CJS_EMPLOYED.CHOOSE_ONE_OR_MORE', texts)
          }
        },
      },
      cjsPoliceDetails: {
        presenceIf: {
          field: 'cjsEmployer',
          value: 'Police Force',
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.POLICE'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.GIVE_DETAILS', texts)
          }
        },
        length: {
          maximum: 1000,
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.CJS_EMPLOYED_LENGTH'
              + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), texts),
          }
        }
      },
      cjsPrisonDetails: {
        presenceIf: {
          field: 'cjsEmployer',
          value: 'HM Prison Service',
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.PRISON_SERVICE'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.GIVE_DETAILS', texts)
          }
        },
        length: {
          maximum: 1000,
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.CJS_EMPLOYED_LENGTH'
              + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), texts),
          }
        }
      },
      cjsEmployed: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.EMPLOYED'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.PLEASE_ANSWER', texts)
          }
        }
      },
      cjsEmployerDetails: {
        presenceIf: {
          field: 'cjsEmployer',
          value: 'Other',
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.OTHER'
              + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
            details: filters.translate('VALIDATION.GIVE_DETAILS', texts)
          }
        },
        length: {
          maximum: 1000,
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.CJS_EMPLOYED_LENGTH'
              + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), texts),
          }
        }
      }
    };
  }

})();
