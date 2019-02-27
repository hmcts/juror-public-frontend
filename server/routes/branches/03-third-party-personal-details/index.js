;(function(){
  'use strict';

  var controller = require('./third-party-personal-details.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/branches/03-third-party-personal-details/name', 'branches.third.party.personal.details.name.get', auth.verify, utils.checkBranchAccess(app, 3), controller.getName(app));
    // eslint-disable-next-line max-len
    app.get('/branches/03-third-party-personal-details/address', 'branches.third.party.personal.details.address.get', auth.verify, utils.checkBranchAccess(app, 3), controller.getAddress(app));
    // eslint-disable-next-line max-len
    app.get('/branches/03-third-party-personal-details/date-of-birth', 'branches.third.party.personal.details.date-of-birth.get', auth.verify, utils.checkBranchAccess(app, 3), controller.getDateOfBirth(app));

    // eslint-disable-next-line max-len
    app.post('/branches/03-third-party-personal-details/name', 'branches.third.party.personal.details.name.post', auth.verify, controller.createName(app));
    // eslint-disable-next-line max-len
    app.post('/branches/03-third-party-personal-details/address', 'branches.third.party.personal.details.address.post', auth.verify, controller.createAddress(app));
    // eslint-disable-next-line max-len
    app.post('/branches/03-third-party-personal-details/date-of-birth', 'branches.third.party.personal.details.date-of-birth.post', auth.verify, controller.createDateOfBirth(app));

    // eslint-disable-next-line max-len
    app.get('/branches/03-third-party-personal-details/name/change', 'branches.third.party.personal.details.name.change.get', auth.verify, controller.changeName(app));
    // eslint-disable-next-line max-len
    app.get('/branches/03-third-party-personal-details/address/change', 'branches.third.party.personal.details.address.change.get', auth.verify, controller.changeAddress(app));
    // eslint-disable-next-line max-len
    app.get('/branches/03-third-party-personal-details/date-of-birth/change', 'branches.third.party.personal.details.date-of-birth.change.get', auth.verify, controller.changeDateOfBirth(app));

  };

})();
