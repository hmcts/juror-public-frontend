;(function(){
  'use strict';

  var controller = require('./your-details.controller')
    , auth = require('../../../components/auth');

  module.exports = function(app) {
    app.get('/steps/02-your-details', 'steps.your.details.get', auth.verify, auth.completeCheck, controller.index(app));
    app.post('/steps/02-your-details', 'steps.your.details.post', auth.verify, auth.completeCheck, controller.create(app));
    app.get('/steps/02-your-details/change', 'steps.your.details.change.get', auth.verify, auth.completeCheck, controller.change(app));

    // Confirmation variant
    require('./confirm')(app);
  };

})();
