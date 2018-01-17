;(function(){
  'use strict';

  var controller = require('./responder-type.controller');

  module.exports = function(app) {
    app.get('/steps/00-responder-type', 'steps.responder.type.get', controller.index(app));
    app.post('/steps/00-responder-type', 'steps.responder.type.post', controller.create(app));
  };

})();
