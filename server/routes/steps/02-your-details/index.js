;(function(){
  'use strict';

  var controller = require('./your-details.controller')
    , auth = require('../../../components/auth');

  module.exports = function(app) {
    app.get('/steps/02-your-details', 'steps.your.details.get', auth.verify, controller.index(app));
    app.post('/steps/02-your-details', 'steps.your.details.post', auth.verify, controller.create(app));
    app.get('/steps/02-your-details/change', 'steps.your.details.change.get', auth.verify, controller.change(app));

    // Confirmation variant
    require('./confirm')(app);
  };

})();
