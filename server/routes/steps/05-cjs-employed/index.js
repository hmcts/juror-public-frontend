;(function(){
  'use strict';

  var controller = require('./cjs-employed.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/05-cjs-employed', 'steps.cjs.employed.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 5), controller.index());
    // eslint-disable-next-line max-len
    app.get('/steps/05-cjs-employed/tp', 'steps.cjs.employed.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 5), controller.index());

    // eslint-disable-next-line max-len
    app.post('/steps/05-cjs-employed', 'steps.cjs.employed.post', auth.verify, auth.completeCheck, controller.create(app));

    // eslint-disable-next-line max-len
    app.get('/steps/05-cjs-employed/change', 'steps.cjs.employed.change.get', auth.verify, auth.completeCheck, controller.change(app));
    // eslint-disable-next-line max-len
    app.get('/steps/05-cjs-employed/change/tp', 'steps.cjs.employed.change.tp.get', auth.verify, auth.completeCheck, controller.change(app));
  };

})();
