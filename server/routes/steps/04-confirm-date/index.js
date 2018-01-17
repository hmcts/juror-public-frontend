;(function(){
  'use strict';

  var controller = require('./confirm-date.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/04-confirm-date', 'steps.confirm.date.get', auth.verify, utils.checkPageAccess(app, 4), controller.index());
    app.post('/steps/04-confirm-date', 'steps.confirm.date.post', auth.verify, controller.create(app));
    app.get('/steps/04-confirm-date/change', 'steps.confirm.date.change.get', auth.verify, controller.change(app));
    // Deferr and Excusal
    require('./deferr')(app);
    require('./excusal')(app);
  };

})();
