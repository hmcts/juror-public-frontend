/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var _ = require('lodash')
    , validate = require('validate.js')
    , moment = require('moment')
    , filters = require('../../../components/filters')
    , texts_en = require('../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../client/js/i18n/cy.json')
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

          app.logger.info('Fetched and parsed summoned juror details on third party route', {
            jurorNumber: req.session.user.jurorNumber,
            jwt: req.session.authToken,
            response: response
          });

          // Merge and then delete form fields and errors, prevents retention after pressing back link
          mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
          tmpErrors = _.cloneDeep(req.session.errors);

          // Reset error and saved field sessions
          delete req.session.errors;
          delete req.session.formFields;

          return res.render('branches/03-third-party-personal-details/index.njk', {
            user: mergedUser,
            errors: {
              title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
              message: '',
              count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
              items: tmpErrors,
              nameError: nameError,
              addressError: addressError,
            }
          });
        }

        , getDetailsError = function(err) {
          app.logger.crit('Failed to fetch and parse summoned juror details on third party route: ' + err.statusCode, {
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
      var validatorResult
      // Join parts of name
        , nameRender = [
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
        , dobValue;


      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;


      // Add dob fields into single dob object & calculate if age will be valid
      if (req.body['dobDay'].length > 0 && req.body['dobMonth'].length > 0 && req.body['dobYear'].length > 0) {
        dobValue = moment([req.body['dobYear'], req.body['dobMonth'], req.body['dobDay']].filter(function(val) {
          return val;
        }).join('-'), 'YYYY-MM-DD');

        // Add dobValue to req.body for validation
        req.body['dateOfBirth'] = dobValue;
        req.body['ageTimeOfHearing'] = utils.calculateAgeAtHearing(
          req.body['dateOfBirth'],
          req.session.user['hearingDate']
        );
      }


      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/third-party-personal-details')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        req.session.formFields.nameRender = nameRender;
        req.session.formFields.addressRender = addressRender;

        return res.redirect(app.namedRoutes.build('branches.third.party.personal.details.get'));
      }


      // Input validated, store information in session
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

      // reset ineligibleAge
      req.session.user['ineligibleAge'] = false;

      // redirect to dob confirmation if under lower age limit or above higher age limit
      if (req.body['ageTimeOfHearing'] < app.ageSettings.lowerAgeLimit || req.body['ageTimeOfHearing'] >= app.ageSettings.upperAgeLimit) {
        return res.redirect(app.namedRoutes.build('steps.your.details.confirm.get'));
      }

      // JDB-2961 - only redirect to confirm information page if thirdPartyContactDetails page has been completed
      if (req.session.change === true && (typeof req.session.user.useJurorPhoneDetails !== 'undefined' || typeof req.session.user.useJurorEmailDetails !== 'undefined')) {
        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }

      return res.redirect(app.namedRoutes.build('branches.third.party.contact.details.get'));
    };
  };

  module.exports.change = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('branches.third.party.personal.details.get'));
    };
  };
})();
