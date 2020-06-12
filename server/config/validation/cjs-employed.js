/*
 * The order of rules to be validated is important, this controls
 * the order they are output on front-end. Which is a requirement
 * for matching the content matrix.
 */
;(function(){
  'use strict';

  var filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  module.exports = function(req) {
    return {
      cjsEmployer: {
        presenceIf: {
          field: 'cjsEmployed',
          value: (req.session.ulang === 'cy' ? (req.session.user.thirdParty === 'Yes' ? texts_cy.EMPLOYED_PAGE.YES_OB : texts_cy.EMPLOYED_PAGE.YES) : texts_en.EMPLOYED_PAGE.YES),
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.WORKED_FOR' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.CJS_EMPLOYED.CHOOSE_ONE_OR_MORE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'cjsEmployer-police'
          }
        },
      },
      cjsPoliceDetails: {
        presenceIf: {
          field: 'cjsEmployer',
          value: 'Police Force',
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.POLICE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.CJS_EMPLOYED.POLICE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
        length: {
          maximum: 1000,
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.POLICE_DETAILS_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.CJS_EMPLOYED.POLICE_DETAILS_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        }
      },
      cjsPrisonDetails: {
        presenceIf: {
          field: 'cjsEmployer',
          value: 'HM Prison Service',
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.PRISON_SERVICE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.CJS_EMPLOYED.PRISON_SERVICE' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
        length: {
          maximum: 1000,
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.PRISON_SERVICE_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.CJS_EMPLOYED.PRISON_SERVICE_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        }
      },
      cjsEmployed: {
        presence: {
          allowEmpty: false,
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.EMPLOYED' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.CJS_EMPLOYED.EMPLOYED' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            summaryLink: 'employedCjs-Yes'
          }
        }
      },
      cjsEmployerDetails: {
        presenceIf: {
          field: 'cjsEmployer',
          value: 'Other',
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.OTHER' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.CJS_EMPLOYED.OTHER' + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        },
        length: {
          maximum: 1000,
          message: {
            summary: filters.translate('VALIDATION.CJS_EMPLOYED.OTHER_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.CJS_EMPLOYED.OTHER_LENGTH' + (req.session.user.thirdParty === 'Yes' ? '_OB': ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
          }
        }
      }
    };
  }

})();
