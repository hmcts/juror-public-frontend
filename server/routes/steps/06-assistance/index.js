;(function(){
  'use strict';

  var controller = require('./assistance.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/assistance', 'steps.assistance.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 6), controller.index());
    // eslint-disable-next-line max-len
    app.get('/steps/assistance/tp', 'steps.assistance.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 6), controller.index());

    app.post('/steps/assistance', 'steps.assistance.post', auth.verify, auth.completeCheck, controller.create(app));

    // eslint-disable-next-line max-len
    app.get('/steps/assistance/change', 'steps.assistance.change.get', auth.verify, auth.completeCheck, controller.change(app));
    // eslint-disable-next-line max-len
    app.get('/steps/assistance/change/tp', 'steps.assistance.change.tp.get', auth.verify, auth.completeCheck, controller.change(app));
  };

})();
