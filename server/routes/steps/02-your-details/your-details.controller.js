;(function(){
  'use strict';

  var _ = require('lodash')
    , moment = require('moment')
    , validate = require('validate.js')
    , filters = require('../../../components/filters')
    , texts = require('../../../../client/js/i18n/en.json')
    , jurorObj = require('../../../objects/juror').object
    , utils = require('../../../lib/utils');

  module.exports.index = function(app) {
    return function(req, res) {
      var getDetailsSuccess = function(response) {
          var nameError
          , addressError
          , tmpErrors
          , mergedUser;

          utils.setRespondantDetails(app, req, response);

          if (typeof req.session.errors !== 'undefined') {
            nameError = (
              typeof req.session.errors['title'] !== 'undefined' ||
              typeof req.session.errors['firstName'] !== 'undefined' ||
              typeof req.session.errors['lastName'] !== 'undefined'
            );
            addressError = (
              typeof req.session.errors['address'] !== 'undefined' ||
              typeof req.session.errors['addressLineOne'] !== 'undefined' ||
              typeof req.session.errors['addressLineTwo'] !== 'undefined' ||
              typeof req.session.errors['addressLineThree'] !== 'undefined' ||
              typeof req.session.errors['addressTown'] !== 'undefined' ||
              typeof req.session.errors['addressCounty'] !== 'undefined' ||
              typeof req.session.errors['addressPostcode'] !== 'undefined'
            );
          }

          // Merge and then delete form fields and errors, prevents retention after pressing back link
          mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
          tmpErrors = _.cloneDeep(req.session.errors);

          delete req.session.errors;
          delete req.session.formFields;


          // Log the response regarding juror details
          app.logger.info('Fetched and parsed summoned juror details on first person route', {
            jurorNumber: req.session.user.jurorNumber,
            jwt: req.session.authToken,
            response: response
          });

          return res.render('steps/02-your-details/index.njk', {
            user: mergedUser,
            errors: {
              title: filters.translate('VALIDATION.ERROR_TITLE', texts),
              message: '',
              count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
              items: tmpErrors,
              nameError: nameError,
              addressError: addressError,
            },
          });
        }

        , getDetailsError = function(err) {
          app.logger.crit('Failed to fetch and parse summoned juror details on first person route: ' + err.statusCode, {
            jurorNumber: req.session.user.jurorNumber,
            jwt: req.session.authToken,
            error: (typeof err.error !== 'undefined') ? err.error : err
          });

          res.redirect(app.namedRoutes.build('steps.login.get'));
        };


      jurorObj.get(require('request-promise'), app, req.session.user.jurorNumber, req.session.authToken)
        .then(getDetailsSuccess, getDetailsError)
        .catch(getDetailsError);
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {
      var nameRender = [
          req.body['title'],
          req.body['firstName'],
          req.body['lastName']
        ].filter(function(val) {
          return val;
        }).join(' ')

        // Join parts of address
        , addressRender = [
          req.body['addressLineOne'],
          req.body['addressLineTwo'],
          req.body['addressLineThree'],
          req.body['addressTown'],
          req.body['addressCounty'],
          req.body['addressPostcode']
        ].filter(function(val) {
          return val;
        }).join('<br>')

        , dobValue
        , validatorResult;


      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;


      // Add dob fields into single dob object
      if (req.body['dobDay'].length > 0 && req.body['dobMonth'].length > 0 && req.body['dobYear'].length > 0) {
        dobValue = moment(
          [
            req.body['dobYear'],
            req.body['dobMonth'],
            req.body['dobDay']
          ].filter(function(val) {
            return val;
          }).join('-')
          , 'YYYY-MM-DD');

        // Add dobValue to req.body for validation
        req.body['dateOfBirth'] = dobValue;

        req.body['ageTimeOfHearing'] = utils.calculateAgeAtHearing(
          req.body['dobYear'],
          req.body['dobMonth'],
          req.body['dobDay'],
          req.session.user['hearingDate']
        );
      }


      // Validate form submission
      req.body.addressPostcode = req.body.addressPostcode.replace(/\s*$/, '');
      validatorResult = validate(req.body, require('../../../config/validation/your-details.js')(req));
      
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        req.session.formFields.nameRender = nameRender;
        req.session.formFields.addressRender = addressRender;

        return res.redirect(app.namedRoutes.build('steps.your.details.get'));
      }


      // Update name
      req.session.user['nameRender'] = nameRender;
      req.session.user['title'] = req.body['title'];
      req.session.user['firstName'] = req.body['firstName'];
      req.session.user['lastName'] = req.body['lastName'];

      // Update address
      req.session.user['addressLineOne'] = req.body['addressLineOne'];
      req.session.user['addressLineTwo'] = req.body['addressLineTwo'];
      req.session.user['addressLineThree'] = req.body['addressLineThree'];
      req.session.user['addressTown'] = req.body['addressTown'];
      req.session.user['addressCounty'] = req.body['addressCounty'];
      req.session.user['addressPostcode'] = req.body['addressPostcode'];

      req.session.user['addressRender'] = addressRender;

      // Store new info
      req.session.user['dateOfBirth'] = dobValue;
      req.session.user['dobDay'] = req.body['dobDay'];
      req.session.user['dobMonth'] = req.body['dobMonth'];
      req.session.user['dobYear'] = req.body['dobYear'];
      req.session.user['primaryPhone'] = req.body['primaryPhone'];
      req.session.user['secondaryPhone'] = req.body['secondaryPhone'];
      req.session.user['emailAddress'] = req.body['emailAddress'];
      req.session.user['emailAddressConfirmation'] = req.body['emailAddressConfirmation'];

      // redirect to dob confirmation if under 18 or over 75 (< 18 && > 76)
      if (req.body['ageTimeOfHearing'] < 18 || req.body['ageTimeOfHearing'] > 75) {
        return res.redirect(app.namedRoutes.build('steps.your.details.confirm.get'));
      }

      // reset ineligibleAge
      req.session.user['ineligibleAge'] = false;

      if (req.session.change === true) {
        //check if further questions still to be completed
        if (typeof(req.session.user.qualify) !== 'undefined'){
          return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
        }

        // reset change
        req.session.change = false;
        return res.redirect(app.namedRoutes.build('steps.qualify.get'));
      }

      return res.redirect(app.namedRoutes.build('steps.qualify.get'));
    };
  };

  module.exports.change = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.your.details.get'));
    };
  };

})();
