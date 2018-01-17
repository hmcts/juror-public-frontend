;(function(){
  'use strict';

  var controller = require('./confirm-information.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/07-confirm-information', 'steps.confirm.information.get', auth.verify, utils.checkPageAccess(app, 7), controller.index(app));
    app.post('/steps/07-confirm-information', 'steps.confirm.information.post', auth.verify, controller.create(app));
  };

})();
