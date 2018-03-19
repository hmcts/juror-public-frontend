/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var _ = require('lodash')
    , responseObj = require('../../../objects/response').object
    , validate = require('validate.js')
    , moment = require('moment')
    , filters = require('../../../components/filters')
    , texts = require('../../../../client/js/i18n/en.json')
    , utils = require('../../../lib/utils');


  function sendToComplete(req, res, app) {
    // If juror does not meet the age requirements, redirect to confirmation page with ineligable
    if (req.session.user.ineligibleAge === true) {
      return res.redirect(app.namedRoutes.build('steps.confirmation.age.get'));
    }

    if (req.session.user.ineligibleDeceased === true) {
      return res.redirect(app.namedRoutes.build('steps.confirmation.deceased.get'));
    }

    // If juror has asked to change date, redirect to confirmation page with excusal variant
    if (req.session.user.confirmedDate === 'No') {
      return res.redirect(app.namedRoutes.build('steps.confirmation.excusal.get'));
    }

    // If juror has asked to change date, redirect to confirmation page with deferral variant
    if (req.session.user.confirmedDate === 'Change') {
      return res.redirect(app.namedRoutes.build('steps.confirmation.deferral.get'));
    }

    return res.redirect(app.namedRoutes.build('steps.confirmation.straight.get'));
  }

  module.exports.index = function(app) {
    return function(req, res) {
      var mergedUser
        , tmpErrors
        , cjsTmpArr
        , tmpArr
        , assistanceTmp
        , personalDetailsChangeLink
        , contactDetailsChangeLink
        , thirdPartyMapping = {
          nothere: filters.translate('ON_BEHALF.THIRD_PARTY_REASON.REASONS.NOT_HERE', texts),
          assistance: filters.translate('ON_BEHALF.THIRD_PARTY_REASON.REASONS.REQUIRE_ASSISTANCE', texts),
          deceased: filters.translate('ON_BEHALF.THIRD_PARTY_REASON.REASONS.DECEASED', texts),
          other: filters.translate('ON_BEHALF.THIRD_PARTY_REASON.REASONS.OTHER', texts),
        },
        deferralDates;

      //reset value for conventional route vs edit route
      if (req.session.change === true){
        req.session.change = false;
      }

      //reset values incase they are unselected upon change
      if (req.session.user.cjsNca){
        delete req.session.user.cjsNca;
      }
      if (req.session.user.cjsPolice){
        delete req.session.user.cjsPolice;
      }
      if (req.session.user.cjsPrison){
        delete req.session.user.cjsPrison;
      }

      // CJS Employee Formatting
      //
      // Check for cjsEmployer and format the array into readable string
      if (typeof req.session.user.cjsEmployer !== 'undefined') {
        cjsTmpArr = _.clone(
          (_.isArray(req.session.user.cjsEmployer)) ?
            req.session.user.cjsEmployer :
            [req.session.user.cjsEmployer]);

        _.remove(cjsTmpArr, function(n) {
          return n === 'Other';
        });

        tmpArr = [];
        cjsTmpArr.forEach(function(cjsEmployer) {
          var tmp = cjsEmployer;

          tmpArr.push(tmp);
        });

        if (tmpArr.indexOf('National Crime Agency') > -1){
          req.session.user.cjsNca = 'National Crime Agency';
        }
        if (tmpArr.indexOf('HM Prison Service') > -1){
          req.session.user.cjsPrison = 'HM Prison Service';
        }
        if (tmpArr.indexOf('Police Force') > -1){
          req.session.user.cjsPolice = 'Police Force';
        }
      }


      // Assistance Needed
      //
      // Check for assistanceType and format the array into readable string
      if (typeof req.session.user.assistanceType !== 'undefined') {
        assistanceTmp = _.clone(_.isArray(req.session.user.assistanceType) ?
          req.session.user.assistanceType :
          [req.session.user.assistanceType]);

        _.remove(assistanceTmp, function(n) {
          return n === 'Other';
        });

        req.session.user.assistanceTypeOutput = assistanceTmp.filter(function(val) {
          return val;
        }).join(', ');
      }

      // Third party reason
      //
      // Format values to readable strings for third party reasons
      if (req.session.user.thirdParty === 'Yes') {
        switch (req.session.user.thirdPartyDetails.thirdPartyReason) {
        // eslint-disable-next-line no-undefined
        case undefined:
          break;
        case 'other':
          req.session.user.thirdPartyDetails.reasonText = req.session.user.thirdPartyDetails.thirdPartyOtherReason;
          break;
        default:
          // eslint-disable-next-line max-len
          req.session.user.thirdPartyDetails.reasonText = thirdPartyMapping[req.session.user.thirdPartyDetails.thirdPartyReason];
        }

        req.session.user.thirdPartyDetails.nameRender = [
          req.session.user.thirdPartyDetails.firstName,
          req.session.user.thirdPartyDetails.lastName
        ].filter(function(val) {
          return val;
        }).join(' ')
      }


      // Get current value for informationConfirmed
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));

      // If informationConfirmed is not present on formFields then ensure it is not merged in,
      // because this probably means that the user unselected the checkbox
      if (
        typeof req.session.formFields !== 'undefined' &&
        typeof req.session.formFields.informationConfirmed === 'undefined'
      ) {
        delete mergedUser.informationConfirmed;
      }

      // Get correct link for changing personal details
      // of summoned juror
      if (req.session.user.thirdParty === 'Yes') {
        personalDetailsChangeLink = app.namedRoutes.build('branches.third.party.personal.details.change.get');
        contactDetailsChangeLink = app.namedRoutes.build('branches.third.party.contact.details.change.get');
      } else {
        personalDetailsChangeLink = app.namedRoutes.build('steps.your.details.change.get');
        contactDetailsChangeLink = app.namedRoutes.build('steps.your.details.change.get');
      }

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      return res.render('steps/07-confirm-information/index.njk', {
        user: mergedUser,
        personalDetailsChangeLink: personalDetailsChangeLink,
        contactDetailsChangeLink: contactDetailsChangeLink,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', texts),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
      });
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {
      var validatorResult
        , createResponseSuccess = function(response) {
          app.logger.info('Response submission succeeded', {
            jurorNumber: req.session.user.jurorNumber,
            jwt: req.session.authToken,
            response: response
          });

          return sendToComplete(req, res, app);
        }

        , createResponseFailure = function(err) {
          if (err.statusCode === 409 || err.statusCode === 304) {
            app.logger.info('Response submission detected a conflict, passing through to complete without saving', {
              jurorNumber: req.session.user.jurorNumber,
              jwt: req.session.authToken,
              error: (typeof err.error !== 'undefined') ? err.error : err,
            });

            return sendToComplete(req, res, app);
          }

          // No conflicts found
          app.logger.crit('Response submission failed with error ' + err.statusCode, {
            jurorNumber: req.session.user.jurorNumber,
            jwt: req.session.authToken,
            error: (typeof err.error !== 'undefined') ? err.error : err,
          });

          return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
        };

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/confirm-information')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }

      req.session.informationConfirmed = req.body['informationConfirmed'];

      // Send the response to the server
      responseObj.create(require('request-promise'), app, req.session.authToken, utils.transformSubmission(req.session.user))
        .then(createResponseSuccess, createResponseFailure)
        .catch(createResponseFailure);
    };
  };

})();
