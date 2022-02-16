;(function(){
  'use strict';

  var controller = require('./your-details.controller')
    , auth = require('../../../components/auth');

  module.exports = function(app) {
    app.get('/steps/your-details', 'steps.your.details.get', auth.verify, auth.completeCheck, controller.index(app));
    
    app.get('/steps/your-details/name/change', 'steps.your.details.name.change.get', auth.verify, auth.completeCheck, controller.changeName(app));
    
    app.get('/steps/your-details/name', 'steps.your.details.name.get', auth.verify, auth.completeCheck, controller.getNameConfirm(app));
    app.post('/steps/your-details/name', 'steps.your.details.name.post', auth.verify, auth.completeCheck, controller.createNameConfirm(app));
    app.get('/steps/your-details/name-change', 'steps.your.details.name-change.get', auth.verify, auth.completeCheck, controller.getNameChange(app));
    app.post('/steps/your-details/name-change', 'steps.your.details.name-change.post', auth.verify, auth.completeCheck, controller.createNameChange(app));

    app.get('/steps/your-details/address/change', 'steps.your.details.address.change.get', auth.verify, auth.completeCheck, controller.changeAddress(app));

    app.get('/steps/your-details/address', 'steps.your.details.address.get', auth.verify, auth.completeCheck, controller.getAddressConfirm(app));
    app.post('/steps/your-details/address', 'steps.your.details.address.post', auth.verify, auth.completeCheck, controller.createAddressConfirm(app));
    app.get('/steps/your-details/address-change', 'steps.your.details.address-change.get', auth.verify, auth.completeCheck, controller.getAddressChange(app));
    app.post('/steps/your-details/address-change', 'steps.your.details.address-change.post', auth.verify, auth.completeCheck, controller.createAddressChange(app));

    app.get('/steps/your-details/date-of-birth', 'steps.your.details.date-of-birth.get', auth.verify, auth.completeCheck, controller.getDateOfBirth(app));
    app.post('/steps/your-details/date-of-birth', 'steps.your.details.date-of-birth.post', auth.verify, auth.completeCheck, controller.createDateOfBirth(app));
    app.get('/steps/your-details/date-of-birth/change', 'steps.your.details.date-of-birth.change.get', auth.verify, auth.completeCheck, controller.changeDateOfBirth(app));

    app.get('/steps/your-details/phone', 'steps.your.details.phone.get', auth.verify, auth.completeCheck, controller.getPhone(app));
    app.post('/steps/your-details/phone', 'steps.your.details.phone.post', auth.verify, auth.completeCheck, controller.createPhone(app));
    app.get('/steps/your-details/phone/change', 'steps.your.details.phone.change.get', auth.verify, auth.completeCheck, controller.changePhone(app));

    app.get('/steps/your-details/email', 'steps.your.details.email.get', auth.verify, auth.completeCheck, controller.getEmail(app));
    app.post('/steps/your-details/email', 'steps.your.details.email.post', auth.verify, auth.completeCheck, controller.createEmail(app));
    app.get('/steps/your-details/email/change', 'steps.your.details.email.change.get', auth.verify, auth.completeCheck, controller.changeEmail(app));

    // Confirmation variant
    require('./confirm')(app);
  };

})();
