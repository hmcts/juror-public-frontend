;(function(){
  'use strict';

  var controller = require('./confirm-date-deferr.controller')
    , auth = require('../../../../components/auth')
    , utils = require('../../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/04-confirm-date/deferral-reason', 'steps.confirm.date.deferral.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.11), controller.index());
    app.get('/steps/04-confirm-date/deferral-dates', 'steps.confirm.date.deferral-dates.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.12), controller.getDates());
    // eslint-disable-next-line max-len
    app.post('/steps/04-confirm-date/deferral-reason', 'steps.confirm.date.deferral.post', auth.verify, auth.completeCheck, controller.create(app));
    app.post('/steps/04-confirm-date/deferral-dates', 'steps.confirm.date.deferral-dates.post', auth.verify, auth.completeCheck, controller.createDates(app));
    app.get(
      '/steps/04-confirm-date/deferral-reason/change',
      'steps.confirm.date.deferral.change.get',
      auth.verify,
      controller.change(app)
    );
    app.get('/steps/04-confirm-date/deferral-dates/change',
      'steps.confirm.date.deferral-dates.change.get',
      auth.verify,
      controller.changeDates(app)
    );
    app.get(
      '/steps/04-confirm-date/deferral-reason/back',
      ' steps.confirm.date.deferral.back.get',
      auth.verify,
      controller.change(app)
    );
  };

})();
