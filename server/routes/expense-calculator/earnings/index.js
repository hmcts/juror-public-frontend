;(function(){
  'use strict';

  var controller = require('./earnings.controller');

  module.exports = function(app) {
    app.get('/expense-calculator/earnings', 'expense.calculator.earnings.get', controller.index(app));
    app.post('/expense-calculator/earnings', 'expense.calculator.earnings.post', controller.create(app));
    app.get('/expense-calculator/earnings/change', 'expense.calculator.earnings.change.get', controller.change(app));

    app.get('/expense-calculator/earnings/threshold', 'expense.calculator.earnings.threshold.get', controller.getEarningsThreshold(app));
    app.post('/expense-calculator/earnings/threshold', 'expense.calculator.earnings.threshold.post', controller.createEarningsThreshold(app));
    app.get('/expense-calculator/earnings/threshold/change', 'expense.calculator.earnings.threshold.change.get', controller.changeEarningsThreshold(app));

    app.get('/expense-calculator/earnings/amount', 'expense.calculator.earnings.amount.get', controller.getEarningsAmount(app));
    app.post('/expense-calculator/earnings/amount', 'expense.calculator.earnings.amount.post', controller.createEarningsAmount(app));
    app.get('/expense-calculator/earnings/amount/change', 'expense.calculator.earnings.amount.change.get', controller.changeEarningsAmount(app));
  };

})();
