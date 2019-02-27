;(function(){
  'use strict';

  var controller = require('./qualify.controller')
    , auth = require('../../../components/auth')
    , utils = require('../../../lib/utils');

  module.exports = function(app) {
    app.get('/steps/03-qualify/residency/info', 'steps.qualify.residency.info', controller.getResidencyInfo(app));
    app.get('/steps/03-qualify/mental-health-sectioned/info', 'steps.qualify.mental.health.sectioned.info', controller.getMentalHealthSectionedInfo(app));
    app.get('/steps/03-qualify/mental-health-capacity/info', 'steps.qualify.mental.health.capacity.info', controller.getMentalHealthCapacityInfo(app));
    app.get('/steps/03-qualify/bail/info', 'steps.qualify.bail.info', controller.getBailInfo(app));
    app.get('/steps/03-qualify/convictions/info', 'steps.qualify.convictions.info', controller.getConvictionsInfo(app));

    app.get('/steps/03-qualify/residency/change', 'steps.qualify.residency.change.get', auth.verify, auth.completeCheck, controller.changeResidency(app));
    app.get('/steps/03-qualify/residency/change/tp', 'steps.qualify.residency.change.tp.get', auth.verify, auth.completeCheck, controller.changeResidency(app));
    app.get('/steps/03-qualify/mental-health-sectioned/change', 'steps.qualify.mental.health.sectioned.change.get', auth.verify, auth.completeCheck, controller.changeMentalHealthSectioned(app));
    app.get('/steps/03-qualify/mental-health-sectioned/change/tp', 'steps.qualify.mental.health.sectioned.change.tp.get', auth.verify, auth.completeCheck, controller.changeMentalHealthSectioned(app));
    app.get('/steps/03-qualify/mental-health-capacity/change', 'steps.qualify.mental.health.capacity.change.get', auth.verify, auth.completeCheck, controller.changeMentalHealthCapacity(app));
    app.get('/steps/03-qualify/mental-health-capacity/change/tp', 'steps.qualify.mental.health.capacity.change.tp.get', auth.verify, auth.completeCheck, controller.changeMentalHealthCapacity(app));
    app.get('/steps/03-qualify/bail/change', 'steps.qualify.bail.change.get', auth.verify, auth.completeCheck, controller.changeBail(app));
    app.get('/steps/03-qualify/bail/change/tp', 'steps.qualify.bail.change.tp.get', auth.verify, auth.completeCheck, controller.changeBail(app));
    app.get('/steps/03-qualify/convictions/change', 'steps.qualify.convictions.change.get', auth.verify, auth.completeCheck, controller.changeConvictions(app));
    app.get('/steps/03-qualify/convictions/change/tp', 'steps.qualify.convictions.change.tp.get', auth.verify, auth.completeCheck, controller.changeConvictions(app));

    app.get('/steps/03-qualify/residency', 'steps.qualify.residency.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3), controller.getResidency());
    app.get('/steps/03-qualify/residency/tp', 'steps.qualify.residency.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3), controller.getResidency());
    app.post('/steps/03-qualify/residency', 'steps.qualify.residency.post', auth.verify, auth.completeCheck, controller.createResidency(app));

    app.get('/steps/03-qualify/mental-health-sectioned', 'steps.qualify.mental.health.sectioned.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.1), controller.getMentalHealthSectioned());
    app.get('/steps/03-qualify/mental-health-sectioned/tp', 'steps.qualify.mental.health.sectioned.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.1), controller.getMentalHealthSectioned());
    app.post('/steps/03-qualify/mental-health-sectioned', 'steps.qualify.mental.health.sectioned.post', auth.verify, auth.completeCheck, controller.createMentalHealthSectioned(app));

    app.get('/steps/03-qualify/mental-health-capacity', 'steps.qualify.mental.health.capacity.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.2), controller.getMentalHealthCapacity());
    app.get('/steps/03-qualify/mental-health-capacity/tp', 'steps.qualify.mental.health.capacity.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.2), controller.getMentalHealthCapacity());
    app.post('/steps/03-qualify/mental-health-capacity', 'steps.qualify.mental.health.capacity.post', auth.verify, auth.completeCheck, controller.createMentalHealthCapacity(app));

    app.get('/steps/03-qualify/bail', 'steps.qualify.bail.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.3), controller.getBail());
    app.get('/steps/03-qualify/bail/tp', 'steps.qualify.bail.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.3), controller.getBail());
    app.post('/steps/03-qualify/bail', 'steps.qualify.bail.post', auth.verify, auth.completeCheck, controller.createBail(app));

    app.get('/steps/03-qualify/convictions', 'steps.qualify.convictions.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.4), controller.getConvictions());
    app.get('/steps/03-qualify/convictions/tp', 'steps.qualify.convictions.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3.4), controller.getConvictions());
    app.post('/steps/03-qualify/convictions', 'steps.qualify.convictions.post', auth.verify, auth.completeCheck, controller.createConvictions(app));

    app.get('/steps/03-qualify', 'steps.qualify.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3), controller.index());
    app.get('/steps/03-qualify/tp', 'steps.qualify.tp.get', auth.verify, auth.completeCheck, utils.checkPageAccess(app, 3), controller.index());
    
    app.post('/steps/03-qualify/store', 'steps.qualify.store', auth.verify, auth.completeCheck, controller.store());
  };
})();
