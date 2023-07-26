;(function(){
  'use strict';

  var controller = require('./contact.controller');

  module.exports = function(app) {
    app.get('/contact', 'contact.get', controller.index());
  };

})();
