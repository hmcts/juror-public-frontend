;(function(){
  'use strict';

  var controller = require('./third-party-personal-details.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/branches/03-third-party-personal-details', 'branches.third.party.personal.details.get', auth.verify, utils.checkBranchAccess(app, 3), controller.index(app));

    // eslint-disable-next-line max-len
    app.post('/branches/03-third-party-personal-details', 'branches.third.party.personal.details.post', auth.verify, controller.create(app));

    // eslint-disable-next-line max-len
    app.get('/branches/03-third-party-personal-details/change', 'branches.third.party.personal.details.change.get', auth.verify, controller.change(app));

  };

})();
