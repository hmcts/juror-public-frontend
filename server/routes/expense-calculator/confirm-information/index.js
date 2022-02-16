;(function(){
  'use strict';

  var controller = require('./confirm-information.controller');

  module.exports = function(app) {
    app.get('/expense-calculator/confirm-information', 'expense.calculator.confirm.information.get', controller.index(app));
    app.post('/expense-calculator/confirm-information', 'expense.calculator.confirm.information.post', controller.create(app));

  };

})();
