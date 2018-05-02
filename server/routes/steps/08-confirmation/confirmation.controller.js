var _ = require('lodash')
  , pdfMake = require('pdfmake')
  , printer
  , fs = require('fs')
  , pdfExport = require('../../../lib/pdfExport')
  , englishLanguageText = require('../../../../client/js/i18n/en.json')
  , welshLanguageText = require('../../../../client/js/i18n/cy.json');


;(function(){
  'use strict';

  function popSessionData(req) {
    var finalData = _.cloneDeep(req.session);

    // Make sure the user session exists
    if (typeof finalData.user === 'undefined') {
      finalData.user = {};
    }

    return new Promise(function(resolve, reject) {
      req.session.destroy(function(err) {
        if (err) {
          reject(err);
        }

        resolve(finalData);
      });
    });

  }

  module.exports.index = function(app) {
    return function(req, res) {
      var template = 'index.njk';

      req.session.user.completed = 'steps.confirmation.straight.get';

      return res.render('steps/08-confirmation/' + template, {
        user: req.session.user
      });

    };
  };

  module.exports.excusal = function(app) {
    return function(req, res) {
      var template = 'excusal.njk';

      req.session.user.completed = 'steps.confirmation.excusal.get';

      return res.render('steps/08-confirmation/' + template, {
        user: req.session.user
      });
    };
  };

  module.exports.deferral = function(app) {
    return function(req, res) {
      var template = 'deferral.njk';

      req.session.user.completed = 'steps.confirmation.deferral.get';

      return res.render('steps/08-confirmation/' + template, {
        user: req.session.user
      });

    };
  };

  module.exports.age = function(app) {
    return function(req, res) {
      var template = 'age.njk';

      req.session.user.completed = 'steps.confirmation.age.get';

      return res.render('steps/08-confirmation/' + template, {
        user: req.session.user
      });

    };
  };

  module.exports.deceased = function(app) {
    return function(req, res) {
      var template = 'deceased.njk';

      req.session.user.completed = 'steps.confirmation.deceased.get';

      return res.render('steps/08-confirmation/' + template, {
        user: req.session.user
      });

    };
  };

  module.exports.download = function(app) {
    return function(req, res) {
      var pdfDoc
        , fonts = {
          Roboto: {
            normal: './client/fonts/lightFont.ttf',
            bold: './client/fonts/boldFont.ttf'
          }
        }
        , chunks = []
        , result
        , docDef;

      printer = new pdfMake(fonts);



      if (req.session.user.ineligibleDeceased) {
        docDef = pdfExport.getPdfDocumentDescriptionDeceased(req.session.user, (req.session.ulang === 'cy' ? welshLanguageText.PDF : englishLanguageText.PDF));
      } else if (req.session.user.ineligibleAge) {
        docDef = pdfExport.getPdfDocumentDescriptionIneligibleAge(req.session.user, (req.session.ulang === 'cy' ? welshLanguageText.PDF : englishLanguageText.PDF));
      } else if (req.session.user.thirdPartyDetails) {
        docDef = pdfExport.getPdfDocumentDescriptionThirdParty(req.session.user, (req.session.ulang === 'cy' ? welshLanguageText.PDF : englishLanguageText.PDF));
      } else {
        docDef = pdfExport.getPdfDocumentDescription(req.session.user, (req.session.ulang === 'cy' ? welshLanguageText.PDF : englishLanguageText.PDF));
      }

      pdfDoc = printer.createPdfKitDocument(docDef);

      pdfDoc.on('data', function(data) {
        chunks.push(data);
      });

      pdfDoc.on('end', function() {
        result = Buffer.concat(chunks);
        res.contentType('application/pdf');
        res.send(result);
      })
      pdfDoc.end();
    }
  }

})();
