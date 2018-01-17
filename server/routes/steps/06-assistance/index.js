;(function(){
  'use strict';

  var controller = require('./assistance.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/steps/06-assistance', 'steps.assistance.get', auth.verify, utils.checkPageAccess(app, 6), controller.index());
    app.post('/steps/06-assistance', 'steps.assistance.post', auth.verify, controller.create(app));
    app.get('/steps/06-assistance/change', 'steps.assistance.change.get', auth.verify, controller.change(app));
  };

})();
