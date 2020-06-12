;(function(){
  'use strict';

  var controller = require('./total.controller');

  module.exports = function(app) {
    app.get('/expense-calculator/total', 'expense.calculator.total.get', controller.index(app));
    app.post('/expense-calculator/total', 'expense.calculator.total.post', controller.create(app));

  };

})();
