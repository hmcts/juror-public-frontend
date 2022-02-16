;(function(){
  'use strict';

  var controller = require('./confirm-date.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/confirm-date', 'steps.confirm.date.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4), controller.index());
    app.get('/steps/confirm-date/tp', 'steps.confirm.date.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4), controller.index());
    app.post('/steps/confirm-date', 'steps.confirm.date.post', auth.verify, auth.completeCheck, controller.create(app));
    app.get('/steps/confirm-date/change', 'steps.confirm.date.change.get', auth.verify, auth.completeCheck, controller.change(app));
    app.get('/steps/confirm-date/change/tp', 'steps.confirm.date.change.tp.get', auth.verify, auth.completeCheck, controller.change(app));

    // Deferr and Excusal
    require('./deferr')(app);
    require('./excusal')(app);
  };

})();
