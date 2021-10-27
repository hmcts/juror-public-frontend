;(function(){
  'use strict';

  var controller = require('./cookie.controller');

  module.exports = function(app) {
    app.get('/help/cookies', 'cookie.get', controller.index());
    app.get('/cookie-settings', 'cookie-settings.get', controller.getCookieSettings(app));

    app.post('/cookie-banner', 'cookie-banner.post', controller.submitCookieBanner(app));
    app.post('/cookie-settings', 'cookie-settings.post', controller.submitCookieSettings(app));
  };

})();
