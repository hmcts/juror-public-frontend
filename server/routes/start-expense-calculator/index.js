;(function(){
  'use strict';

  var controller = require('./start-expense-calculator.controller');

  module.exports = function(app) {
    app.get('/expense-calculator', 'start-expense-calculator.get', controller.index());
  };


})();
