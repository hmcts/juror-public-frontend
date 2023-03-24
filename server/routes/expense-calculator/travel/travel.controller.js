/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';
  var _ = require('lodash')
    , validate = require('validate.js')
    , filters = require('../../../components/filters')
    , texts_en = require('../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../client/js/i18n/cy.json')
    , utils = require('../../../lib/utils');

  module.exports.index = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , travelTypes
        , backLinkUrl
        , showParkingPage = false;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      //delete req.session.errors;
      //delete req.session.formFields;

      if (typeof req.session.formFields !== 'undefined' && typeof req.session.formFields.travelType === 'undefined') {
        delete mergedUser.travelType;
      }

      // Check what is active based on merger between user stored values and form submitted values
      if (typeof mergedUser !== 'undefined' && typeof mergedUser.travelType !== 'undefined') {
        travelTypes = {
          bicycle: mergedUser.travelBicycle,
          car: mergedUser.travelCar,
          motorcycle: mergedUser.travelMotorcycle,
          publicTransport: mergedUser.travelPublicTransport,
          walking: mergedUser.travelWalking
        };
      }

      if (((req.session.user['travelCar'] === true) && (typeof req.session.user['carMiles'] !== 'undefined'))
      || ((req.session.user['travelMotorcycle'] === true) && (typeof req.session.user['motorcycleMiles'] !== 'undefined'))){
        if (typeof req.session.user['parking'] === 'undefined'){
          showParkingPage = true;
        }
      }

      // Set back link URL
      if ((req.session.change === true) && (req.session.user['travelBicycle'] === true) && (typeof req.session.user['bicycleMiles'] === 'undefined')) {
        backLinkUrl = 'expense.calculator.travel.bicycle.get';
      } else if ((req.session.change === true) && (req.session.user['travelCar'] === true) && (typeof req.session.user['carMiles'] === 'undefined')) {
        backLinkUrl = 'expense.calculator.travel.car.get';
      } else if ((req.session.change === true) && (req.session.user['travelMotorcycle'] === true) && (typeof req.session.user['motorcycleMiles'] === 'undefined')) {
        backLinkUrl = 'expense.calculator.travel.motorcycle.get';
      } else if (showParkingPage === true) {
        backLinkUrl = 'expense.calculator.travel.parking.get';
      } else if ((req.session.change === true) && (req.session.user['travelPublicTransport'] === true) && (typeof req.session.user['publicTransportAmount'] === 'undefined')) {
        backLinkUrl = 'expense.calculator.travel.public.transport.get';
      } else if (req.session.change === true){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else {
        backLinkUrl = 'expense.calculator.extra.costs.get';
      }

      return res.render('expense-calculator/travel/index.njk', {
        user: mergedUser,
        travelTypes: travelTypes,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {
      // Validate form submission
      var validatorResult
        , travelTypes
        , travelArr
        , redirectUrl = '';

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/travel')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build('expense.calculator.travel.post'));
      }

      // Convert selection to array
      travelTypes = req.body['travelType'];

      if (Array.isArray(travelTypes)){
        travelArr = travelTypes;
      } else {
        travelArr = travelTypes.split();
      }

      // Update session data

      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }

      req.session.user['travelType'] = req.body['travelType'];
      req.session.user['travelTypes'] = travelArr;

      if (travelArr.includes('Bicycle') || travelArr.includes('Beic')){
        req.session.user['travelBicycle'] = true;
      } else {
        req.session.user['travelBicycle'] = false;
        delete req.session.user['bicycleMiles'];
      }

      if (travelArr.includes('Car')){
        req.session.user['travelCar'] = true;
      } else {
        req.session.user['travelCar'] = false;
        delete req.session.user['carMiles'];
      }

      if (travelArr.includes('Motorcycle') || travelArr.includes('Beic modur')){
        req.session.user['travelMotorcycle'] = true;
      } else {
        req.session.user['travelMotorcycle'] = false;
        delete req.session.user['motorcycleMiles'];
      }

      if ((req.session.user['travelCar'] === false) && (req.session.user['travelMotorcycle'] === false)){
        delete req.session.user['parking'];
      }

      if (travelArr.includes('Public transport') || travelArr.includes('Trafnidiaeth gyhoeddus')){
        req.session.user['travelPublicTransport'] = true;
      } else {
        req.session.user['travelPublicTransport'] = false;
        delete req.session.user['publicTransportAmount'];
      }

      if (travelArr.includes('Walking') || travelArr.includes('Cerdded')){
        req.session.user['travelWalking'] = true;
      } else {
        req.session.user['travelWalking'] = false;
      }

      redirectUrl = GetTravelPageRedirect(req.session.user);

      /*
      if (req.session.change === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else {
        redirectUrl = GetTravelPageRedirect(req.session.user);
      }
      */

      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.change = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('expense.calculator.travel.get'));
    };
  };

  module.exports.getBicycle = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL

      if ((req.session.change === true) && (typeof req.session.user['bicycleMiles'] === 'undefined')){
        backLinkUrl = 'expense.calculator.travel.get';
      } else if (req.session.change === true){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else {
        backLinkUrl = 'expense.calculator.travel.get';
      }

      return res.render('expense-calculator/travel/bicycle.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createBicycle = function(app) {
    return function(req, res) {
      // Validate form submission
      var validatorResult
        , redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Store new info
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }
      req.session.user['bicycleMiles'] = req.body['bicycleMiles'];

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/travel-bicycle')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;

        return res.redirect(app.namedRoutes.build('expense.calculator.travel.bicycle.post'));
      }

      /*
      if (req.session.change === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else if ((req.session.user['travelCar'] === true) && (typeof req.session.user['carMiles'] === 'undefined')){
        redirectUrl = 'expense.calculator.travel.car.get';
      } else if ((req.session.user['travelMotorcycle'] === true) && (typeof req.session.user['motorcycleMiles'] === 'undefined')){
        redirectUrl = 'expense.calculator.travel.motorcycle.get';
      } else if ((req.session.user['travelPublicTransport'] === true) && (typeof req.session.user['publicTransportAmount'] === 'undefined')){
        redirectUrl = 'expense.calculator.travel.public.transport.get';
      } else if (req.session.change === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else {
        redirectUrl = 'expense.calculator.confirm.information.get';
      }
      */

      redirectUrl = GetTravelPageRedirect(req.session.user);
      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.changeBicycle = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('expense.calculator.travel.bicycle.get'));
    };
  };

  module.exports.getCar = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if ((req.session.change === true) && (typeof req.session.user['carMiles'] === 'undefined')){
        backLinkUrl = 'expense.calculator.travel.get';
      } else if (req.session.change === true){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else {
        backLinkUrl = 'expense.calculator.travel.get';
      }

      return res.render('expense-calculator/travel/car.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createCar = function(app) {
    return function(req, res) {
      // Validate form submission
      var validatorResult
        , redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Store new info
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }
      req.session.user['carMiles'] = req.body['carMiles'];

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/travel-car')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;

        return res.redirect(app.namedRoutes.build('expense.calculator.travel.car.post'));
      }

      /*
      if (req.session.change === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else if (req.session.user['travelMotorcycle'] === true){
        redirectUrl = 'expense.calculator.travel.motorcycle.get';
      } else {
        redirectUrl = 'expense.calculator.travel.parking.get';
      }
      */

      redirectUrl = GetTravelPageRedirect(req.session.user);
      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.changeCar = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('expense.calculator.travel.car.get'));
    };
  };

  module.exports.getMotorcycle = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if ((req.session.change === true) && (typeof req.session.user['motorcycleMiles'] === 'undefined')){
        backLinkUrl = 'expense.calculator.travel.get';
      } else if (req.session.change === true){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else {
        backLinkUrl = 'expense.calculator.travel.get';
      }

      return res.render('expense-calculator/travel/motorcycle.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createMotorcycle = function(app) {
    return function(req, res) {
      // Validate form submission
      var validatorResult
        , redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Store new info
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }
      req.session.user['motorcycleMiles'] = req.body['motorcycleMiles'];

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/travel-motorcycle')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;

        return res.redirect(app.namedRoutes.build('expense.calculator.travel.motorcycle.post'));
      }

      /*
      if (req.session.change === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else {
        redirectUrl = 'expense.calculator.travel.parking.get';
      }
      */
      
      redirectUrl = GetTravelPageRedirect(req.session.user);
      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.changeMotorcycle = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('expense.calculator.travel.motorcycle.get'));
    };
  };

  module.exports.getPublicTransport = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if ((req.session.change === true) && (typeof req.session.user['publicTransportAmount'] === 'undefined')){
        backLinkUrl = 'expense.calculator.travel.get';
      } else if (req.session.change === true){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else {
        backLinkUrl = 'expense.calculator.travel.get';
      }

      return res.render('expense-calculator/travel/public-transport.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createPublicTransport = function(app) {
    return function(req, res) {
      // Validate form submission
      var validatorResult
        , redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Format input value
      if (typeof req.body['publicTransportAmount'] !== 'undefined'){
        req.body['publicTransportAmount'] = utils.getCurrencyValue(req.body['publicTransportAmount']);
      }

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/travel-public-transport')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;

        return res.redirect(app.namedRoutes.build('expense.calculator.travel.public.transport.post'));
      }

      // Store new info
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }
      req.session.user['publicTransportAmount'] = utils.formatCurrencyValue(req.body['publicTransportAmount']);

      /*
      if (req.session.change === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else if (req.session.user['travelWalking'] === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else {
        redirectUrl = 'expense.calculator.confirm.information.get';
      }
      */
      redirectUrl = GetTravelPageRedirect(req.session.user);
      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.changePublicTransport = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('expense.calculator.travel.public.transport.get'));
    };
  };

  module.exports.getParking = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else if (req.session.user.travelMotorcycle === true) {
        backLinkUrl = 'expense.calculator.travel.motorcycle.get';
      } else if (req.session.user.travelCar === true) {
        backLinkUrl = 'expense.calculator.travel.car.get';
      } else {
        backLinkUrl = 'expense.calculator.travel.get';
      }

      if ((req.session.change === true) && (typeof req.session.user['motorcycleMiles'] === 'undefined')){
        backLinkUrl = 'expense.calculator.travel.get';
      } else if (req.session.change === true){
        backLinkUrl = 'expense.calculator.confirm.information.get';
      } else {
        backLinkUrl = 'expense.calculator.travel.get';
      }

      return res.render('expense-calculator/travel/parking.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createParking = function(app) {
    return function(req, res) {
      // Validate form submission
      var validatorResult
        , redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/travel-parking')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;

        return res.redirect(app.namedRoutes.build('expense.calculator.travel.parking.post'));
      }

      // Store new info
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }
      req.session.user['parking'] = req.body['parking'];

      
      if (req.session.user['parking'] === 'Yes'){
        redirectUrl = 'expense.calculator.travel.parking.info.get';
      } else if (req.session.user['travelPublicTransport'] === true){
        redirectUrl = 'expense.calculator.travel.public.transport.get';
      } else if (req.session.user['travelWalking'] === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else {
        redirectUrl = 'expense.calculator.confirm.information.get';
      }
      
      
      //redirectUrl = GetTravelPageRedirect(req.session.user);
      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.getParkingAmount = function() {
    return function(req, res) {

      var backLinkUrl;

      // Set back link URL - not dependent on req.session.change
      backLinkUrl = 'expense.calculator.travel.parking.get';

      return res.render('expense-calculator/travel/parking-amount.njk', {
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof req.session.errors !== 'undefined' ? Object.keys(req.session.errors).length : 0,
          items: req.session.errors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createParkingAmount = function(app) {
    return function(req, res) {
      // Validate form submission
      var validatorResult;

      // Reset error and saved field sessions
      delete req.session.errors;

      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/expense-calculator-validation/travel-parking-amount')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;

        return res.redirect(app.namedRoutes.build('expense.calculator.travel.parking.amount.post'));
      }

      return res.redirect(app.namedRoutes.build('expense.calculator.blah.get'));

    };
  };

  module.exports.getParkingInfo = function() {
    return function(req, res) {

      var backLinkUrl;

      // Set back link URL - not dependent on req.session.change
      backLinkUrl = 'expense.calculator.travel.parking.get';

      return res.render('expense-calculator/travel/parking-info.njk', {
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createParkingInfo = function(app) {
    return function(req, res) {
      // Validate form submission
      var redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;

      /*
      if (req.session.user['travelPublicTransport'] === true){
        redirectUrl = 'expense.calculator.travel.public.transport.get';
      } else if (req.session.user['travelWalking'] === true){
        redirectUrl = 'expense.calculator.confirm.information.get';
      } else {
        redirectUrl = 'expense.calculator.confirm.information.get';
      }
      */

      redirectUrl = GetTravelPageRedirect(req.session.user);
      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  function GetTravelPageRedirect(sessionData){
    var redirectUrl
      , showParkingPage = false;

    // Check if the parking info page is required
    if (((sessionData['travelCar'] === true) && (typeof sessionData['carMiles'] !== 'undefined'))
    || ((sessionData['travelMotorcycle'] === true) && (typeof sessionData['motorcycleMiles'] !== 'undefined'))){
      if (typeof sessionData['parking'] === 'undefined'){
        showParkingPage = true;
      }
    }

    if ((sessionData['travelBicycle'] === true) && (typeof sessionData['bicycleMiles'] === 'undefined')){
      redirectUrl = 'expense.calculator.travel.bicycle.get';
    } else if ((sessionData['travelCar'] === true) && (typeof sessionData['carMiles'] === 'undefined')){
      redirectUrl = 'expense.calculator.travel.car.get';
    } else if ((sessionData['travelMotorcycle'] === true) && (typeof sessionData['motorcycleMiles'] === 'undefined')){
      redirectUrl = 'expense.calculator.travel.motorcycle.get';
    } else if (showParkingPage === true){
      redirectUrl = 'expense.calculator.travel.parking.get';
    } else if ((sessionData['travelPublicTransport'] === true) && (typeof sessionData['publicTransportAmount'] === 'undefined')){
      redirectUrl = 'expense.calculator.travel.public.transport.get';
    } else if (sessionData['travelWalking'] === true){
      redirectUrl = 'expense.calculator.confirm.information.get';
    } else {
      redirectUrl = 'expense.calculator.confirm.information.get';
    }

    return redirectUrl;
  };


})();
