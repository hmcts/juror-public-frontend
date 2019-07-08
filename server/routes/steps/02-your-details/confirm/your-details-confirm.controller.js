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
    , texts_en = require('../../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../../client/js/i18n/cy.json')
    , utils = require('../../../../lib/utils');

  module.exports.index = function(app) {
    return function(req, res) {
      var getUser
        , backLinkUrl;

      // This page should not be accessed if we have not passed through the regular your details page and provided
      // a date of birth and a hearing date.
      if (typeof req.session.user === 'undefined' || req.session.user.dateOfBirth === 'undefined') {
        return res.redirect(app.namedRoutes.build('steps.your.details.get'));
      }

      // Merge session data with stored post data to calculate values
      getUser = _.merge(req.session.user, req.session.formFields);

      // Set back link URL
      if (req.session.user.thirdParty === 'Yes'){
        backLinkUrl = 'branches.third.party.personal.details.date-of-birth.get';
      } else {
        backLinkUrl = 'steps.your.details.date-of-birth.get';
      }

      return res.render('steps/02-your-details/confirm.njk', {
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof req.session.errors !== 'undefined' ? Object.keys(req.session.errors).length : 0,
          items: req.session.errors,
        },
        user: getUser,
        formattedDob: moment(getUser.dateOfBirth).format('DD/MM/YYYY'),
        currentAge: moment().diff(moment(getUser.dateOfBirth), 'years'),
        backLinkUrl: backLinkUrl
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
          req.session.user['hearingDateTimestamp']
        );
      }

      // Perform validation
      validatorResult = validate(req.body, require('../../../../config/validation/your-details-confirm')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.your.details.confirm', req.session.user.thirdParty)));
      }

      // Update date
      req.session.user['dateOfBirth'] = dobValue;
      req.session.user['dobDay'] = req.body['dobDay'];
      req.session.user['dobMonth'] = req.body['dobMonth'];
      req.session.user['dobYear'] = req.body['dobYear'];

      // reset ineligibleAge
      req.session.user['ineligibleAge'] = false;

      // redirect to check your answers if if under lower age limit or above higher age limit
      // this would mean the person is ineligible
      if (req.body['ageTimeOfHearing'] < app.ageSettings.lowerAgeLimit || req.body['ageTimeOfHearing'] >= app.ageSettings.upperAgeLimit) {
        req.session.user['ineligibleAge'] = true;
        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty)));
      }

      if (req.session.change === true){
        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty)));
      }

      // If third party, redirect back onto third party route
      if (req.session.user['thirdParty'] === 'Yes') {
        return res.redirect(app.namedRoutes.build('branches.third.party.contact.details.get'));
      }

      return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify', req.session.user.thirdParty)));
    };
  };

})();
