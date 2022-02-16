;(function(){
  'use strict';

  var controller = require('./confirm-date-excusal.controller')
    , auth = require('../../../../components/auth')
    , utils = require('../../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/confirm-date/excusal', 'steps.confirm.date.excusal.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.2), controller.index());
    // eslint-disable-next-line max-len
    app.get('/steps/confirm-date/excusal/tp', 'steps.confirm.date.excusal.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.2), controller.index());

    // eslint-disable-next-line max-len
    app.post('/steps/confirm-date/excusal', 'steps.confirm.date.excusal.post', auth.verify, auth.completeCheck, controller.create(app));

    // eslint-disable-next-line max-len
    app.get('/steps/confirm-date/excusal/change', 'steps.confirm.date.excusal.change.get', auth.verify, controller.change(app));
    // eslint-disable-next-line max-len
    app.get('/steps/confirm-date/excusal/change/tp', 'steps.confirm.date.excusal.change.tp.get', auth.verify, controller.change(app));

    // eslint-disable-next-line max-len
    app.get('/steps/confirm-date/excusal/back', 'steps.confirm.date.excusal.back.get', auth.verify, controller.change(app));
  };

})();
