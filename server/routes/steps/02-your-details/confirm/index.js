;(function(){
  'use strict';

  var controller = require('./your-details-confirm.controller')
    , auth = require('../../../../components/auth');

  module.exports = function(app) {
    app.get('/steps/your-details/confirm', 'steps.your.details.confirm.get', auth.verify, auth.completeCheck, controller.index(app));
    app.get('/steps/your-details/confirm/tp', 'steps.your.details.confirm.tp.get', auth.verify, auth.completeCheck, controller.index(app));
    app.post('/steps/your-details/confirm', 'steps.your.details.confirm.post', auth.verify, auth.completeCheck, controller.create(app));
  };

})();
