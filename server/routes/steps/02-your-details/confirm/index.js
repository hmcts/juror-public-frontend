;(function(){
  'use strict';

  var controller = require('./your-details-confirm.controller')
    , auth = require('../../../../components/auth');

  module.exports = function(app) {
    app.get('/steps/02-your-details/confirm', 'steps.your.details.confirm.get', auth.verify, controller.index(app));
    app.post('/steps/02-your-details/confirm', 'steps.your.details.confirm.post', auth.verify, controller.create(app));
  };

})();
