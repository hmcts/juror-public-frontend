;(function(){
  'use strict';

  var controller = require('./third-party-personal-details.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-personal-details/name/change', 'branches.third.party.personal.details.name.change.get', auth.verify, controller.changeName(app));
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-personal-details/address/change', 'branches.third.party.personal.details.address.change.get', auth.verify, controller.changeAddress(app));
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-personal-details/date-of-birth/change', 'branches.third.party.personal.details.date-of-birth.change.get', auth.verify, controller.changeDateOfBirth(app));

    // eslint-disable-next-line max-len
    app.get('/branches/third-party-personal-details/name', 'branches.third.party.personal.details.name.get', auth.verify, utils.checkBranchAccess(app, 3), controller.getNameConfirm(app));
    // eslint-disable-next-line max-len
    app.post('/branches/third-party-personal-details/name', 'branches.third.party.personal.details.name.post', auth.verify, utils.checkBranchAccess(app, 3), controller.createNameConfirm(app));
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-personal-details/name-change', 'branches.third.party.personal.details.name-change.get', auth.verify, utils.checkBranchAccess(app, 3), controller.getNameChange(app));
    // eslint-disable-next-line max-len
    app.post('/branches/third-party-personal-details/name-change', 'branches.third.party.personal.details.name-change.post', auth.verify, utils.checkBranchAccess(app, 3), controller.createNameChange(app));

    // eslint-disable-next-line max-len
    app.get('/branches/third-party-personal-details/address', 'branches.third.party.personal.details.address.get', auth.verify, utils.checkBranchAccess(app, 3), controller.getAddressConfirm(app));
    // eslint-disable-next-line max-len
    app.post('/branches/third-party-personal-details/address', 'branches.third.party.personal.details.address.post', auth.verify, utils.checkBranchAccess(app, 3), controller.createAddressConfirm(app));
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-personal-details/address-change', 'branches.third.party.personal.details.address-change.get', auth.verify, utils.checkBranchAccess(app, 3), controller.getAddressChange(app));
    // eslint-disable-next-line max-len
    app.post('/branches/third-party-personal-details/aaddress-change', 'branches.third.party.personal.details.address-change.post', auth.verify, utils.checkBranchAccess(app, 3), controller.createAddressChange(app));

    // eslint-disable-next-line max-len
    app.get('/branches/third-party-personal-details/date-of-birth', 'branches.third.party.personal.details.date-of-birth.get', auth.verify, utils.checkBranchAccess(app, 3), controller.getDateOfBirth(app));
    // eslint-disable-next-line max-len
    app.post('/branches/third-party-personal-details/date-of-birth', 'branches.third.party.personal.details.date-of-birth.post', auth.verify, controller.createDateOfBirth(app));


  };

})();
