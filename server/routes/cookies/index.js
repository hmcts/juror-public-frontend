;(function(){
  'use strict';

  var controller = require('./cookie.controller');

  module.exports = function(app) {
    app.get('/help/cookies', 'cookie.get', controller.index());
  };

})();
