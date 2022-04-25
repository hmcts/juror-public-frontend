;(function(){
  'use strict';

  var controller = require('./actuator.controller');

  module.exports = function(app) {
    app.get('/actuator/health', 'actuator.health.get', controller.health(app));
  };
})();
