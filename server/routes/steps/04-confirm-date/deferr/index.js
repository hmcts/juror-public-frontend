;(function(){
  'use strict';

  var controller = require('./confirm-date-deferr.controller')
    , auth = require('../../../../components/auth')
    , utils = require('../../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/04-confirm-date/defer-reason', 'steps.confirm.date.deferral.get', auth.verify, utils.checkPageAccess(app, 4.11), controller.index());
    app.get('/steps/04-confirm-date/defer-dates', 'steps.confirm.date.deferral-dates.get', auth.verify, utils.checkPageAccess(app, 4.12), controller.getDates());
    // eslint-disable-next-line max-len
    app.post('/steps/04-confirm-date/defer-reason', 'steps.confirm.date.deferral.post', auth.verify, controller.create(app));
    app.post('/steps/04-confirm-date/defer-dates', 'steps.confirm.date.deferral-dates.post', auth.verify, controller.createDates(app));
    app.get(
      '/steps/04-confirm-date/defer-reason/change',
      'steps.confirm.date.deferral.change.get',
      auth.verify,
      controller.change(app)
    );
    app.get('/steps/04-confirm-date/defer-dates/change',
      'steps.confirm.date.deferral-dates.change.get',
      auth.verify,
      controller.changeDates(app)
    );
    app.get(
      '/steps/04-confirm-date/defer-reason/back',
      ' steps.confirm.date.deferral.back.get',
      auth.verify,
      controller.change(app)
    );
  };

})();
