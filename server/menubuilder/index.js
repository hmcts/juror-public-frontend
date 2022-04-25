;(function() {
  'use strict';

  var buildMenus = function(req, app) {

    return {
      'header': [
        {
          title: 'Home',
          path: app.namedRoutes.build('start.get'),
          active: (req.originalUrl === app.namedRoutes.build('start.get'))
        }
      ],

    };
  };

  module.exports = function(req, app, active) {

    var menus = buildMenus(req, app);

    if (menus.hasOwnProperty(active)) {
      return menus[active];
    }

    return [];
  };
})();
