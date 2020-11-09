;(function(){
  'use strict';

  module.exports.index = function() {
    return function(req, res) {
      if (req.session.back === true){
        delete req.session.errors;
        req.session.back = false;
      }
      return res.render('cookies.njk');
    };
  };

  module.exports.submitCookieBanner = function(app) {
    return function(req, res) {
      if (req.session.back === true){
        delete req.session.errors;
        req.session.back = false;
      }
      req.session.cookieReturnPage = req.body.cookieReturnPage;
      res.redirect(app.namedRoutes.build('cookie-settings.get'));
    };
  };

  module.exports.getCookeSettings = function() {
    return function(req, res) {
      var analyticsCookie = 'no'
        , objCookie = null;

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

      return res.render('cookie-settings.njk', {
        analyticsCookie: analyticsCookie
      });
    };
  };

  module.exports.submitCookieSettings = function(app) {
    return function(req, res) {

      var returnPage;

      if (req.session.back === true){
        delete req.session.errors;
        req.session.back = false;
      }

      // default return to the cookie information page (cookie settings was displayed via footer link)
      returnPage = app.namedRoutes.build('cookie.get');

      // set the return page (cookie settings was displayed via the cookie banner link)
      if (typeof(req.session.cookieReturnPage) != 'undefined'){
        if (req.session.cookieReturnPage !== ''){
          returnPage = req.session.cookieReturnPage;
          delete req.session.cookieReturnPage;
        }
      }

      res.redirect(returnPage);

    };
  };

})();
