;(function(){
  'use strict';

  var controller = require('./qualify.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {

    app.get('/steps/qualify/residency/change', 'steps.qualify.residency.change.get', auth.verify, auth.completeCheck, controller.changeResidency(app));
    app.get('/steps/qualify/residency/change/tp', 'steps.qualify.residency.change.tp.get', auth.verify, auth.completeCheck, controller.changeResidency(app));
    app.get('/steps/qualify/mental-health-sectioned/change', 'steps.qualify.mental.health.sectioned.change.get', auth.verify, auth.completeCheck, controller.changeMentalHealthSectioned(app));
    app.get('/steps/qualify/mental-health-sectioned/change/tp', 'steps.qualify.mental.health.sectioned.change.tp.get', auth.verify, auth.completeCheck, controller.changeMentalHealthSectioned(app));
    app.get('/steps/qualify/mental-health-capacity/change', 'steps.qualify.mental.health.capacity.change.get', auth.verify, auth.completeCheck, controller.changeMentalHealthCapacity(app));
    app.get('/steps/qualify/mental-health-capacity/change/tp', 'steps.qualify.mental.health.capacity.change.tp.get', auth.verify, auth.completeCheck, controller.changeMentalHealthCapacity(app));
    app.get('/steps/qualify/bail/change', 'steps.qualify.bail.change.get', auth.verify, auth.completeCheck, controller.changeBail(app));
    app.get('/steps/qualify/bail/change/tp', 'steps.qualify.bail.change.tp.get', auth.verify, auth.completeCheck, controller.changeBail(app));
    app.get('/steps/qualify/convictions/change', 'steps.qualify.convictions.change.get', auth.verify, auth.completeCheck, controller.changeConvictions(app));
    app.get('/steps/qualify/convictions/change/tp', 'steps.qualify.convictions.change.tp.get', auth.verify, auth.completeCheck, controller.changeConvictions(app));
    app.get('/steps/qualify/cjs-employed/change', 'steps.qualify.cjs.employed.change.get', auth.verify, auth.completeCheck, controller.changeCJSEmployed(app));
    app.get('/steps/qualify/cjs-employed/change/tp', 'steps.qualify.cjs.employed.change.tp.get', auth.verify, auth.completeCheck, controller.changeCJSEmployed(app));

    // Qualify / Eligibility start
    app.get('/steps/qualify', 'steps.qualify.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3), controller.index());
    app.get('/steps/qualify/tp', 'steps.qualify.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3), controller.index());

    // Residency
    app.get('/steps/qualify/residency', 'steps.qualify.residency.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3), controller.getResidency());
    app.get('/steps/qualify/residency/tp', 'steps.qualify.residency.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3), controller.getResidency());
    app.post('/steps/qualify/residency', 'steps.qualify.residency.post', auth.verify, auth.completeCheck, controller.createResidency(app));

    // CJS Employment
    app.get('/steps/qualify/cjs-employed', 'steps.qualify.cjs.employed.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.1), controller.getCJSEmployed());
    app.get('/steps/qualify/cjs-employed/tp', 'steps.qualify.cjs.employed.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.1), controller.getCJSEmployed());
    app.post('/steps/qualify/cjs-employed', 'steps.qualify.cjs.employed.post', auth.verify, auth.completeCheck, controller.createCJSEmployed(app));

    // Bail
    app.get('/steps/qualify/bail', 'steps.qualify.bail.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.2), controller.getBail());
    app.get('/steps/qualify/bail/tp', 'steps.qualify.bail.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.2), controller.getBail());
    app.post('/steps/qualify/bail', 'steps.qualify.bail.post', auth.verify, auth.completeCheck, controller.createBail(app));

    // Convictions
    app.get('/steps/qualify/convictions', 'steps.qualify.convictions.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.3), controller.getConvictions());
    app.get('/steps/qualify/convictions/tp', 'steps.qualify.convictions.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.3), controller.getConvictions());
    app.post('/steps/qualify/convictions', 'steps.qualify.convictions.post', auth.verify, auth.completeCheck, controller.createConvictions(app));

    // MH Sectioned
    app.get('/steps/qualify/mental-health-sectioned', 'steps.qualify.mental.health.sectioned.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.4), controller.getMentalHealthSectioned());
    app.get('/steps/qualify/mental-health-sectioned/tp', 'steps.qualify.mental.health.sectioned.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.4), controller.getMentalHealthSectioned());
    app.post('/steps/qualify/mental-health-sectioned', 'steps.qualify.mental.health.sectioned.post', auth.verify, auth.completeCheck, controller.createMentalHealthSectioned(app));

    // MH Capacity
    app.get('/steps/qualify/mental-health-capacity', 'steps.qualify.mental.health.capacity.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.5), controller.getMentalHealthCapacity());
    app.get('/steps/qualify/mental-health-capacity/tp', 'steps.qualify.mental.health.capacity.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.5), controller.getMentalHealthCapacity());
    app.post('/steps/qualify/mental-health-capacity', 'steps.qualify.mental.health.capacity.post', auth.verify, auth.completeCheck, controller.createMentalHealthCapacity(app));


    app.post('/steps/qualify/store', 'steps.qualify.store', auth.verify, auth.completeCheck, controller.store());
  };
})();
