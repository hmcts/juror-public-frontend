;(function(){
  'use strict';

  var controller = require('./qualify.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    app.get('/steps/03-qualify/residency/info', 'steps.qualify.residency.info', controller.getResidencyInfo(app));
    app.get('/steps/03-qualify/mental-health/info', 'steps.qualify.mental.health.info', controller.getMentalHealthInfo(app));
    app.get('/steps/03-qualify/bail/info', 'steps.qualify.bail.info', controller.getBailInfo(app));
    app.get('/steps/03-qualify/convictions/info', 'steps.qualify.convictions.info', controller.getConvictionsInfo(app));


    app.get('/steps/03-qualify/residency/change', 'steps.qualify.residency.change.get', auth.verify, auth.completeCheck, controller.changeResidency(app));
    app.get('/steps/03-qualify/mental-health/change', 'steps.qualify.mental.health.change.get', auth.verify, auth.completeCheck, controller.changeMentalHealth(app));
    app.get('/steps/03-qualify/bail/change', 'steps.qualify.bail.change.get', auth.verify, auth.completeCheck, controller.changeBail(app));
    app.get('/steps/03-qualify/convictions/change', 'steps.qualify.convictions.change.get', auth.verify, auth.completeCheck, controller.changeConvictions(app));

    app.get('/steps/03-qualify/residency', 'steps.qualify.residency.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3), controller.getResidency());
    app.post('/steps/03-qualify/residency', 'steps.qualify.residency.post', auth.verify, auth.completeCheck, controller.createResidency(app));

    app.get('/steps/03-qualify/mental-health', 'steps.qualify.mental.health.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.1), controller.getMentalHealth());
    app.post('/steps/03-qualify/mental-health', 'steps.qualify.mental.health.post', auth.verify, auth.completeCheck, controller.createMentalHealth(app));

    app.get('/steps/03-qualify/bail', 'steps.qualify.bail.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.2), controller.getBail());
    app.post('/steps/03-qualify/bail', 'steps.qualify.bail.post', auth.verify, auth.completeCheck, controller.createBail(app));

    app.get('/steps/03-qualify/convictions', 'steps.qualify.convictions.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.3), controller.getConvictions());
    app.post('/steps/03-qualify/convictions', 'steps.qualify.convictions.post', auth.verify, auth.completeCheck, controller.createConvictions(app));

    app.get('/steps/03-qualify', 'steps.qualify.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3), controller.index());
    app.post('/steps/03-qualify/store', 'steps.qualify.store', auth.verify, auth.completeCheck, controller.store());
  };
})();
