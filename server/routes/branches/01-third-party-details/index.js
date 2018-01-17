;(function(){
  'use strict';

  var controller = require('./third-party-details.controller')
    , auth = require('../../../components/auth');

  module.exports = function(app) {
    app.get('/branches/01-third-party-details', 'branches.third.party.details.get', auth.verify, controller.index());

    // eslint-disable-next-line max-len
    app.post('/branches/01-third-party-details', 'branches.third.party.details.post', auth.verify, controller.create(app));

    // eslint-disable-next-line max-len
    app.get('/branches/01-third-party-details/change', 'branches.third.party.details.change.get', auth.verify, controller.change(app));

  };

})();
