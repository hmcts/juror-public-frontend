;(function(){
  'use strict';

  var controller = require('./confirm-date-excusal.controller')
    , auth = require('../../../../components/auth')
    , utils = require('../../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/04-confirm-date/excusal', 'steps.confirm.date.excusal.get', auth.verify, utils.checkPageAccess(app, 4.2), controller.index());
    app.post('/steps/04-confirm-date/excusal', 'steps.confirm.date.excusal.post', auth.verify, controller.create(app));
    app.get(
      '/steps/04-confirm-date/excusal/change',
      'steps.confirm.date.excusal.change.get',
      auth.verify,
      controller.change(app)
    );
    app.get(
      '/steps/04-confirm-date/excusal/back',
      'steps.confirm.date.excusal.back.get',
      auth.verify,
      controller.change(app)
    );
  };

})();
