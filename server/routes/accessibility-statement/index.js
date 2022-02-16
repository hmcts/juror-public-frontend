;(function(){
  'use strict';

  var controller = require('./accessibility-statement.controller');

  module.exports = function(app) {
    app.get('/help/accessibility-statement', 'accessibility-statement.get', controller.index(app));
    app.get('/help/accessibility-statement/report', 'accessibility-statement-report.get', controller.dacReport(app));
  };

})();
