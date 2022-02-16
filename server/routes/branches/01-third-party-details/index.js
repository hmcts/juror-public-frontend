;(function(){
  'use strict';

  var controller = require('./third-party-details.controller')
    , auth = require('../../../components/auth');

  module.exports = function(app) {
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-details/name', 'branches.third.party.details.name.get', auth.verify, controller.getName());
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-details/relationship', 'branches.third.party.details.relationship.get', auth.verify, controller.getRelationship());
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-details/contact', 'branches.third.party.details.contact.get', auth.verify, controller.getContact());

    // eslint-disable-next-line max-len
    app.post('/branches/third-party-details/name', 'branches.third.party.details.name.post', auth.verify, controller.createName(app));
    // eslint-disable-next-line max-len
    app.post('/branches/third-party-details/relationship', 'branches.third.party.details.relationship.post', auth.verify, controller.createRelationship(app));
    // eslint-disable-next-line max-len
    app.post('/branches/third-party-details/contact', 'branches.third.party.details.contact.post', auth.verify, controller.createContact(app));

    // eslint-disable-next-line max-len
    app.get('/branches/third-party-details/name/change', 'branches.third.party.details.change.name.get', auth.verify, controller.changeName(app));
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-details/relationship/change', 'branches.third.party.details.change.relationship.get', auth.verify, controller.changeRelationship(app));
    // eslint-disable-next-line max-len
    app.get('/branches/third-party-details/contact/change', 'branches.third.party.details.change.contact.get', auth.verify, controller.changeContact(app));

  };

})();
