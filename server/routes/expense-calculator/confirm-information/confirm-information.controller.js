/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';
  var _ = require('lodash')
    , jwt = require('jsonwebtoken')
    , secretsConfig = require('config')
    , expenseCalculatorObj = require('../../../objects/expenseCalculator').object
    , validate = require('validate.js')
    , filters = require('../../../components/filters')
    , texts_en = require('../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../client/js/i18n/cy.json')
    , utils = require('../../../lib/utils');

  module.exports.index = function(app) {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , changeLinks;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      changeLinks = {};
      changeLinks.earnings = app.namedRoutes.build('expense.calculator.earnings.change.get');
      changeLinks.earningsThreshold = app.namedRoutes.build('expense.calculator.earnings.threshold.change.get');
      changeLinks.earningsAmount = app.namedRoutes.build('expense.calculator.earnings.amount.change.get');

      changeLinks.extraCosts = app.namedRoutes.build('expense.calculator.extra.costs.change.get');
      changeLinks.extraCostsAmount = app.namedRoutes.build('expense.calculator.extra.costs.amount.change.get');

      changeLinks.travel = app.namedRoutes.build('expense.calculator.travel.change.get');
      changeLinks.travelBicycle = app.namedRoutes.build('expense.calculator.travel.bicycle.change.get');
      changeLinks.travelCar = app.namedRoutes.build('expense.calculator.travel.car.change.get');
      changeLinks.travelMotorcycle = app.namedRoutes.build('expense.calculator.travel.motorcycle.change.get');
      changeLinks.travelParking = app.namedRoutes.build('expense.calculator.travel.parking.get');
      changeLinks.travelPublicTransport = app.namedRoutes.build('expense.calculator.travel.public.transport.change.get');

      return res.render('expense-calculator/confirm-information/index.njk', {
        user: mergedUser,
        changeLinks: changeLinks,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        }
      });
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {
      var validatorResult
        , expenseData
        , travelData
        , jwtToken
        , apiUserObj
        , index
        , createExpenseCalculatorSuccess = function(response) {
          app.logger.info('Expense calculator submission succeeded', {
            jwt: req.session.authToken,
            response: response
          });

          // Convert rates from pounds to pence for display
          for (index=0; index < response.travellingModes.length; index++){
            response.travellingModes[index].ratePerMile = response.travellingModes[index].ratePerMile * 100;
            response.travellingModes[index].dailyCost = response.travellingModes[index].dailyCost.toFixed(2);
          }

          // Format currency values for display
          response['dailyTotal'] = response['dailyTotal'].toFixed(2);
          response['dailyTravelTotal'] = response['dailyTravelTotal'].toFixed(2);
          response['dailyLossOfEarningsTotal'] = response['dailyLossOfEarningsTotal'].toFixed(2);
          response['dailyLossOfEarningsClaim'] = response['dailyLossOfEarningsClaim'].toFixed(2);

          req.session.user['calculatedEstimate'] = response;

          return res.redirect(app.namedRoutes.build('expense.calculator.total.get'));
        }

        , createExpenseCalculatorFailure = function(err) {
          if (err.statusCode === 409 || err.statusCode === 304) {
            app.logger.info('Expense Calculation submission detected a conflict', {
              jwt: jwtToken,
              error: (typeof err.error !== 'undefined') ? err.error : err,
            });

            return res.redirect(app.namedRoutes.build('expense.calculator.confirm.information.get'));
          }

          // Catch error
          app.logger.crit('Expense Calculation submission failed with error ' + err.statusCode, {
            jwt: jwtToken,
            error: (typeof err.error !== 'undefined') ? err.error : err,
          });

          return res.redirect(app.namedRoutes.build('expense.calculator.confirm.information.get'));
        };

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      /*
      validatorResult = validate(req.body, require('../../../config/validation/confirm-information')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('expense.calculator.confirm.information.get'));
      }
      */

      travelData = [];
      if (req.session.user['travelBicycle'] === true){
        travelData.push({
          modeOfTravel: 'bicycle',
          dailyMiles: req.session.user['bicycleMiles']
        });
      }
      if (req.session.user['travelCar'] === true){
        travelData.push({
          modeOfTravel: 'car',
          dailyMiles: req.session.user['carMiles']
        });
      }
      if (req.session.user['travelMotorcycle'] === true){
        travelData.push({
          modeOfTravel: 'motorcycle',
          dailyMiles: req.session.user['motorcycleMiles']
        });
      }
      if (req.session.user['travelPublicTransport'] === true){
        travelData.push({
          modeOfTravel: 'public',
          dailyCost: req.session.user['publicTransportAmount']
        });
      }
      if (req.session.user['travelWalking'] === true){
        travelData.push({
          modeOfTravel: 'walking',
        });
      }

      expenseData =
      {
        looseIncome: convertBooleanString(req.session.user['incomeAffected']),
        incomeExceedsThreshold: convertBooleanString(req.session.user['earningsThreshold']),
        dailyEarnings : req.session.user['earningsAmount'],
        extraCosts: convertBooleanString(req.session.user['extraCosts']),
        extraCostsAmount: req.session.user['extraCostsAmount'],
        travellingModes: travelData
      }

      // Create user object for JWT
      apiUserObj = {
        login: 'AUTO',
        userLevel: '1',
        daysToExpire: 6,
        passwordWarning: true,
        staff: {
          name: 'AUTO',
          rank: -1,
          active: 1,
          courts: []
        }
      }

      // Create JWT
      jwtToken = jwt.sign(apiUserObj, secretsConfig.get('secrets.juror-digital-vault.public-jwtKeyBureau'), { expiresIn: secretsConfig.get('secrets.juror-digital-vault.public-jwtTTL') });

      // Send the calculation request to the api
      expenseCalculatorObj.create(require('request-promise'), app, jwtToken, expenseData)
        .then(createExpenseCalculatorSuccess, createExpenseCalculatorFailure)
        .catch(createExpenseCalculatorFailure);
    };
  };

  module.exports.createOLD = function(app) {
    return function(req, res) {
      // Validate form submission
      var validatorResult
        , redirectUrl = '';

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;


      return res.redirect(app.namedRoutes.build('expense.calculator.total.get'));

    };
  };

  function convertBooleanString(ynValue){
    var boolString = '';

    if (typeof ynValue === 'undefined'){
      boolString = 'false';
    } else if (ynValue.toLowerCase() === 'yes'){
      boolString = 'true';
    } else if (ynValue.toLowerCase() === 'no'){
      boolString = 'false';
    }

    return boolString;
  };


})();
