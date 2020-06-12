;(function(){
  'use strict';

  var controller = require('./travel.controller');

  module.exports = function(app) {
    app.get('/expense-calculator/travel', 'expense.calculator.travel.get', controller.index(app));
    app.post('/expense-calculator/travel', 'expense.calculator.travel.post', controller.create(app));
    app.get('/expense-calculator/travel/change', 'expense.calculator.travel.change.get', controller.change(app));

    app.get('/expense-calculator/travel/bicycle', 'expense.calculator.travel.bicycle.get', controller.getBicycle(app));
    app.post('/expense-calculator/travel/bicycle', 'expense.calculator.travel.bicycle.post', controller.createBicycle(app));
    app.get('/expense-calculator/travel/bicycle/change', 'expense.calculator.travel.bicycle.change.get', controller.changeBicycle(app));

    app.get('/expense-calculator/travel/car', 'expense.calculator.travel.car.get', controller.getCar(app));
    app.post('/expense-calculator/travel/car', 'expense.calculator.travel.car.post', controller.createCar(app));
    app.get('/expense-calculator/travel/car/change', 'expense.calculator.travel.car.change.get', controller.changeCar(app));

    app.get('/expense-calculator/travel/motorcycle', 'expense.calculator.travel.motorcycle.get', controller.getMotorcycle(app));
    app.post('/expense-calculator/travel/motorcycle', 'expense.calculator.travel.motorcycle.post', controller.createMotorcycle(app));
    app.get('/expense-calculator/travel/motorcycle/change', 'expense.calculator.travel.motorcycle.change.get', controller.changeMotorcycle(app));

    app.get('/expense-calculator/travel/public-transport', 'expense.calculator.travel.public.transport.get', controller.getPublicTransport(app));
    app.post('/expense-calculator/travel/public-transport', 'expense.calculator.travel.public.transport.post', controller.createPublicTransport(app));
    app.get('/expense-calculator/travel/public-transport/change', 'expense.calculator.travel.public.transport.change.get', controller.changePublicTransport(app));

    app.get('/expense-calculator/travel/parking', 'expense.calculator.travel.parking.get', controller.getParking(app));
    app.post('/expense-calculator/travel/parking', 'expense.calculator.travel.parking.post', controller.createParking(app));

    app.get('/expense-calculator/travel/parking/info', 'expense.calculator.travel.parking.info.get', controller.getParkingInfo(app));
    app.post('/expense-calculator/travel/parking/info', 'expense.calculator.travel.parking.info.post', controller.createParkingInfo(app));
  };

})();
