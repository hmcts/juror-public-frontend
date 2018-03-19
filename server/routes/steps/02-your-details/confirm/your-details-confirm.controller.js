/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var moment = require('moment')
    , _ = require('lodash')
    , validate = require('validate.js')
    , filters = require('../../../../components/filters')
    , texts = require('../../../../../client/js/i18n/en.json')
    , utils = require('../../../../lib/utils');

  module.exports.index = function(app) {
    return function(req, res) {
      var getUser;

      // This page should not be accessed if we have not passed through the regular your details page and provided
      // a date of birth and a hearing date.
      if (typeof req.session.user === 'undefined' || req.session.user.dateOfBirth === 'undefined') {
        return res.redirect(app.namedRoutes.build('steps.your.details.get'));
      }

      // Merge session data with stored post data to calculate values
      getUser = _.merge(req.session.user, req.session.formFields);

      return res.render('steps/02-your-details/confirm.njk', {
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', texts),
          message: '',
          count: typeof req.session.errors !== 'undefined' ? Object.keys(req.session.errors).length : 0,
          items: req.session.errors,
        },
        user: getUser,
        formattedDob: moment(getUser.dateOfBirth).format('DD/MM/YYYY'),
        currentAge: moment().diff(moment(getUser.dateOfBirth), 'years')
      });
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {
      // Join parts of date of birth
      var dobValue
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
          req.body['dateOfBirth'],
          req.session.user['hearingDate']
        );
      }

      // Perform validation
      validatorResult = validate(req.body, require('../../../../config/validation/your-details-confirm')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.your.details.confirm.get'));
      }

      // Update date
      req.session.user['dateOfBirth'] = dobValue;
      req.session.user['dobDay'] = req.body['dobDay'];
      req.session.user['dobMonth'] = req.body['dobMonth'];
      req.session.user['dobYear'] = req.body['dobYear'];

      // reset ineligibleAge
      req.session.user['ineligibleAge'] = false;

      // redirect to check your answers if under 18 or over 75 (< 18 && > 76)
      // this would mean the person is ineligible
      if (req.body['ageTimeOfHearing'] < 18 || req.body['ageTimeOfHearing'] > 75) {
        req.session.user['ineligibleAge'] = true;
        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }

      if (req.session.change === true){
        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }

      // If third party, redirect back onto third party route
      if (req.session.user['thirdParty'] === 'Yes') {
        return res.redirect(app.namedRoutes.build('branches.third.party.contact.details.get'));
      }

      return res.redirect(app.namedRoutes.build('steps.qualify.get'));
    };
  };

})();
