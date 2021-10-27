;(function(){
  'use strict';

  module.exports.index = function() {
    return function(req, res) {
      if (req.session.back === true){
        delete req.session.errors;
        req.session.back = false;
      }

      delete req.session.cookieSettingsSaved

      return res.render('cookies.njk');
    };
  };

  module.exports.submitCookieBanner = function(app) {
    return function(req, res) {
      if (req.session.back === true){
        delete req.session.errors;
        req.session.back = false;
      }
      res.redirect(app.namedRoutes.build('cookie-settings.get'));
    };
  };

  module.exports.getCookieSettings = function() {
    return function(req, res) {
      var analyticsCookie = 'no'
        , objCookie = null
        , returnUrl = null;

      if (req.session.back === true){
        delete req.session.errors;
        req.session.back = false;
      }
      if (typeof(req.cookies.cookies_policy) != 'undefined'){
        objCookie = JSON.parse(req.cookies.cookies_policy);
        if (objCookie != null){
          if (objCookie.usage === true){
            analyticsCookie = 'yes';
          }
        }
      }

      if (req.session.cookieSettingsSaved === true){
        returnUrl = req.session.cookieReturnUrl;
        delete req.session.cookieSettingsSaved;
      } else {
        returnUrl = null;
      }

      return res.render('cookie-settings.njk', {
        analyticsCookie: analyticsCookie,
        returnUrl: returnUrl
      });
    };
  };

  module.exports.submitCookieSettings = function(app) {
    return function(req, res) {

      if (req.session.back === true){
        delete req.session.errors;
        req.session.back = false;
      }

      req.session.cookieSettingsSaved = true;

      res.redirect(app.namedRoutes.build('cookie-settings.get'));

    };
  };

})();
