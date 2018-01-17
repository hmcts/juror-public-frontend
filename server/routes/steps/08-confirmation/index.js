/* eslint-disable max-len */
;(function(){
  'use strict';

  var controller = require('./confirmation.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    app.get('/steps/08-confirmation', 'steps.confirmation.straight.get', auth.verify, utils.checkPageAccess(app, 8), controller.index(app));
    app.get('/steps/08-confirmation/excusal', 'steps.confirmation.excusal.get', auth.verify, utils.checkPageAccess(app, 8), controller.excusal(app));
    app.get('/steps/08-confirmation/deferral', 'steps.confirmation.deferral.get', auth.verify, utils.checkPageAccess(app, 8), controller.deferral(app));
    app.get('/steps/08-confirmation/age', 'steps.confirmation.age.get', auth.verify, utils.checkPageAccess(app, 8), controller.age(app));
    app.get('/steps/08-confirmation/deceased', 'steps.confirmation.deceased.get', auth.verify, utils.checkPageAccess(app, 8), controller.deceased(app));
  };

})();
