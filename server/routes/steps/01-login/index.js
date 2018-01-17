;(function(){
  'use strict';

  var controller = require('./login.controller')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    app.get('/steps/01-login', 'steps.login.get', utils.checkPageAccess(app, 2), controller.index(app));
    app.post('/steps/01-login', 'steps.login.post', controller.create(app));
  };

})();
