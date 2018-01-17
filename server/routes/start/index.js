;(function(){
  'use strict';

  var controller = require('./start.controller');

  module.exports = function(app) {
    app.get('/', 'start.get', controller.index());
  };


})();
