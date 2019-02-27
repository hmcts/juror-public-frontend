;(function(){
  'use strict';

  var controller = require('./your-details.controller')
    , auth = require('../../../components/auth');

  module.exports = function(app) {
    app.get('/steps/02-your-details', 'steps.your.details.get', auth.verify, auth.completeCheck, controller.index(app));
    
    app.get('/steps/02-your-details/name', 'steps.your.details.name.get', auth.verify, auth.completeCheck, controller.getName(app));
    app.post('/steps/02-your-details/name', 'steps.your.details.name.post', auth.verify, auth.completeCheck, controller.createName(app));
    app.get('/steps/02-your-details/name/change', 'steps.your.details.name.change.get', auth.verify, auth.completeCheck, controller.changeName(app));

    app.get('/steps/02-your-details/address', 'steps.your.details.address.get', auth.verify, auth.completeCheck, controller.getAddress(app));
    app.post('/steps/02-your-details/address', 'steps.your.details.address.post', auth.verify, auth.completeCheck, controller.createAddress(app));
    app.get('/steps/02-your-details/address/change', 'steps.your.details.address.change.get', auth.verify, auth.completeCheck, controller.changeAddress(app));

    app.get('/steps/02-your-details/date-of-birth', 'steps.your.details.date-of-birth.get', auth.verify, auth.completeCheck, controller.getDateOfBirth(app));
    app.post('/steps/02-your-details/date-of-birth', 'steps.your.details.date-of-birth.post', auth.verify, auth.completeCheck, controller.createDateOfBirth(app));
    app.get('/steps/02-your-details/date-of-birth/change', 'steps.your.details.date-of-birth.change.get', auth.verify, auth.completeCheck, controller.changeDateOfBirth(app));

    app.get('/steps/02-your-details/phone', 'steps.your.details.phone.get', auth.verify, auth.completeCheck, controller.getPhone(app));
    app.post('/steps/02-your-details/phone', 'steps.your.details.phone.post', auth.verify, auth.completeCheck, controller.createPhone(app));
    app.get('/steps/02-your-details/phone/change', 'steps.your.details.phone.change.get', auth.verify, auth.completeCheck, controller.changePhone(app));

    app.get('/steps/02-your-details/email', 'steps.your.details.email.get', auth.verify, auth.completeCheck, controller.getEmail(app));
    app.post('/steps/02-your-details/email', 'steps.your.details.email.post', auth.verify, auth.completeCheck, controller.createEmail(app));
    app.get('/steps/02-your-details/email/change', 'steps.your.details.email.change.get', auth.verify, auth.completeCheck, controller.changeEmail(app));


    // Confirmation variant
    require('./confirm')(app);
  };

})();
