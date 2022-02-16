;(function(){
  'use strict';

  var controller = require('./third-party-contact-details.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-contact-details', 'branches.third.party.contact.details.get', auth.verify, utils.checkBranchAccess(app, 4), controller.index(app));

    // eslint-disable-next-line max-len
    app.post('/branches/third-party-contact-details', 'branches.third.party.contact.details.post', auth.verify, controller.create(app));

    // eslint-disable-next-line max-len
    app.get('/branches/third-party-contact-details/change', 'branches.third.party.contact.details.change.get', auth.verify, controller.change(app));

  };

})();
