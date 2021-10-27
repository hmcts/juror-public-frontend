;(function(){
  'use strict';

  var controller = require('./third-party-reason.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-reason', 'branches.third.party.reason.get', auth.verify, utils.checkBranchAccess(app, 2), controller.index());

    // eslint-disable-next-line max-len
    app.post('/branches/third-party-reason', 'branches.third.party.reason.post', auth.verify, controller.create(app));

    // eslint-disable-next-line max-len
    app.get('/branches/third-party-reason/change', 'branches.third.party.reason.change.get', auth.verify, controller.change(app));
  };

})();
