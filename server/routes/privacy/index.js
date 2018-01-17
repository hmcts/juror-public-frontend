;(function(){
  'use strict';

  var controller = require('./privacy.controller');

  module.exports = function(app) {
    app.get('/help/privacy-policy', 'privacy.get', controller.index());
  };

})();
