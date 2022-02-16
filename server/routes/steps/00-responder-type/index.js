;(function(){
  'use strict';

  var controller = require('./responder-type.controller');

  module.exports = function(app) {
    app.get('/steps/responder-type', 'steps.responder.type.get', controller.index(app));
    app.post('/steps/responder-type', 'steps.responder.type.post', controller.create(app));

    // Start URL from GOVUK landing page
    app.get('/steps/00-responder-type', 'steps.responder.type.get', controller.index(app));
  };

})();
