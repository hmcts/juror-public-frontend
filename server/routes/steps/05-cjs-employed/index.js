;(function(){
  'use strict';

  var controller = require('./cjs-employed.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/05-cjs-employed', 'steps.cjs.employed.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 5), controller.index());
    app.post('/steps/05-cjs-employed', 'steps.cjs.employed.post', auth.verify, auth.completeCheck, controller.create(app));
    app.get('/steps/05-cjs-employed/change', 'steps.cjs.employed.change.get', auth.verify, auth.completeCheck, controller.change(app));
  };

})();
