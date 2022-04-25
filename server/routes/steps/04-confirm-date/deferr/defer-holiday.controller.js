;(function(){
  'use strict';

  var utils = require('../../../../lib/utils');

  module.exports.index = function() {
    return function(req, res) {

      var backLinkUrl
        , continueUrl;

      // Set back-link URL
      backLinkUrl = utils.getRedirectUrl('steps.confirm.date.deferral-check', req.session.user.thirdParty);

      // Set continue button URL
      if (req.session.change === true){
        continueUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        continueUrl = utils.getRedirectUrl('steps.assistance', req.session.user.thirdParty);
      }

      return res.render('steps/04-confirm-date/defer-holiday.njk', {
        user: req.session.user,
        backLinkUrl: backLinkUrl,
        continueUrl: continueUrl
      });
    };
  };

})();
