;(function(){
  'use strict';

  var controller = require('./your-details-confirm.controller')
    , auth = require('../../../../components/auth');

  module.exports = function(app) {
    app.get('/steps/02-your-details/confirm', 'steps.your.details.confirm.get', auth.verify, auth.completeCheck, controller.index(app));
    app.post('/steps/02-your-details/confirm', 'steps.your.details.confirm.post', auth.verify, auth.completeCheck, controller.create(app));
  };

})();
