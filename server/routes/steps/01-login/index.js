;(function(){
  'use strict';

  var controller = require('./login.controller')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    app.get('/steps/login', 'steps.login.get', utils.checkPageAccess(app, 2), controller.index(app));
    app.get('/steps/login/tp', 'steps.login.tp.get', utils.checkPageAccess(app, 2), controller.index(app));
    app.get('/steps/login/replied', 'steps.login.replied.get', utils.checkPageAccess(app, 2), controller.getReplied(app));
    app.get('/steps/login/replied/tp', 'steps.login.replied.tp.get', utils.checkPageAccess(app, 2), controller.getReplied(app));
    app.post('/steps/login', 'steps.login.post', controller.create(app));
  };

})();
