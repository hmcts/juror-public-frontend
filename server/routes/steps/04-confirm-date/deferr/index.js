;(function(){
  'use strict';

  var deferReasonController = require('./defer-reason.controller')
    , deferDatesController = require('./defer-dates.controller')
    , deferCheckController = require('./defer-check.controller')
    , deferHolidayController = require('./defer-holiday.controller')
    , auth = require('../../../../components/auth')
    , utils = require('../../../../lib/utils');

  module.exports = function(app) {

    // Deferral reason page routes
    app.get('/steps/confirm-date/deferral-reason', 'steps.confirm.date.deferral.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.11), deferReasonController.index());
    app.get('/steps/confirm-date/deferral-reason/tp', 'steps.confirm.date.deferral.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.11), deferReasonController.index());
    
    app.post('/steps/confirm-date/deferral-reason', 'steps.confirm.date.deferral.post', auth.verify, auth.completeCheck, deferReasonController.create(app));
    
    app.get('/steps/confirm-date/deferral-reason/change', 'steps.confirm.date.deferral.change.get', auth.verify, deferReasonController.change(app));
    app.get('/steps/confirm-date/deferral-reason/change/tp', 'steps.confirm.date.deferral.change.tp.get', auth.verify, deferReasonController.change(app));
    
    //app.get('/steps/confirm-date/deferral-reason/back', ' steps.confirm.date.deferral.back.get', auth.verify, controller.change(app));

    // Deferral dates page routes
    app.get('/steps/confirm-date/deferral-dates', 'steps.confirm.date.deferral-dates.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.12), deferDatesController.index());
    app.get('/steps/confirm-date/deferral-dates/tp', 'steps.confirm.date.deferral-dates.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.12), deferDatesController.index());

    app.post('/steps/confirm-date/deferral-dates', 'steps.confirm.date.deferral-dates.post', auth.verify, auth.completeCheck, deferDatesController.create(app));

    app.get('/steps/confirm-date/deferral-dates/change', 'steps.confirm.date.deferral-dates.change.get', auth.verify, deferDatesController.change(app));
    app.get('/steps/confirm-date/deferral-dates/change/tp', 'steps.confirm.date.deferral-dates.change.tp.get', auth.verify, deferDatesController.change(app));

    // Deferral Check Dates routes
    app.get('/steps/confirm-date/deferral-check', 'steps.confirm.date.deferral-check.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.12), deferCheckController.index());
    app.get('/steps/confirm-date/deferral-check/tp', 'steps.confirm.date.deferral-check.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.12), deferCheckController.index());

    app.post('/steps/confirm-date/deferral-check', 'steps.confirm.date.deferral-check.post', auth.verify, auth.completeCheck, deferCheckController.create(app));

    // Deferral Public Holiday routes
    app.get('/steps/confirm-date/deferral-holiday', 'steps.confirm.date.deferral-holiday.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.12), deferHolidayController.index());
    app.get('/steps/confirm-date/deferral-holiday/tp', 'steps.confirm.date.deferral-holiday.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 4.12), deferHolidayController.index());

  };

})();
