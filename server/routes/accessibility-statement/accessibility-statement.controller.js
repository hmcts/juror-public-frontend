;(function(){
  'use strict';

  var fs = require('fs')

  module.exports.index = function() {
    return function(req, res) {
      return res.render('accessibility-statement.njk');
    }
  };

  module.exports.dacReport = function(app) {
    return function(req, res) {
      var filePath = app.get('appPath') + '/assets/documents/jury-summons-accessibility-report.pdf';

      fs.readFile(filePath, function(err, data){
        res.contentType('application/pdf');
        res.send(data);
      });

    }
  };

})();
