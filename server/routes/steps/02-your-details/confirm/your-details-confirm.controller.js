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
      if (typeof req.session.user === 'undefined' || typeof req.session.user.dateOfBirth === 'undefined') {
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
        formattedDob: moment(getUser.dateOfBirth).format('DD MMMM YYYY'),
        currentAge: moment().diff(moment(getUser.dateOfBirth), 'years'),
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {

      var validatorResult;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Check if we have DOB values
      if (req.session.user['dateOfBirth'] && req.session.user['dobDay'] && req.session.user['dobMonth'] && req.session.user['dobYear']) {
        req.body['ageTimeOfHearing'] = utils.calculateAgeAtHearing(
          req.body['dateOfBirth'],
          req.session.user['hearingDateTimestamp']
        );
      } else {
        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.your.details.date-of-birth.get', req.session.user.thirdParty)));
      }

      // Perform validation
      validatorResult = validate(req.body, require('../../../../config/validation/your-details-confirm')(req));
      if (typeof validatorResult !== 'undefined') {

        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.your.details.confirm', req.session.user.thirdParty)));
      }

      // Reset ineligibleAge
      req.session.user['ineligibleAge'] = false;

      if (req.body['dobConfirm'] === 'Yes'){

        // Juror confirmed age correct - determine where to redirect

        // Check if age ineligible - under lower age limit or above higher age limit
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

      }

      // Juror confirmed age incorrect - redirect back to DOB page
      if (req.session.user['thirdParty'] === 'Yes') {
        return res.redirect(app.namedRoutes.build('branches.third.party.personal.details.date-of-birth.get'));
      }

      return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.your.details.date-of-birth', req.session.user.thirdParty)));


    };
  };

})();
