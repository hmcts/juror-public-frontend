;(function(){
  'use strict';

  var controller = require('./confirm-information.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/07-confirm-information', 'steps.confirm.information.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 7), controller.index(app));
    // eslint-disable-next-line max-len
    app.post('/steps/07-confirm-information', 'steps.confirm.information.post', auth.verify, auth.completeCheck, controller.create(app));
  };

})();
