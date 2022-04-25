;(function(){
  'use strict';

  var controller = require('./extra-costs.controller');

  module.exports = function(app) {
    app.get('/expense-calculator/extra-costs', 'expense.calculator.extra.costs.get', controller.index(app));
    app.post('/expense-calculator/extra-costs', 'expense.calculator.extra.costs.post', controller.create(app));
    app.get('/expense-calculator/extra-cost/change', 'expense.calculator.extra.costs.change.get', controller.change(app));

    app.get('/expense-calculator/extra-costs/amount', 'expense.calculator.extra.costs.amount.get', controller.getExtraCostsAmount(app));
    app.post('/expense-calculator/extra-costs/amount', 'expense.calculator.extra.costs.amount.post', controller.createExtraCostsAmount(app));
    app.get('/expense-calculator/extra-costs/amount/change', 'expense.calculator.extra.costs.amount.change.get', controller.changeExtraCostsAmount(app));

    app.get('/expense-calculator/extra-costs/info', 'expense.calculator.extra.costs.info', controller.getExtraCostsInfo(app));
  };

})();
