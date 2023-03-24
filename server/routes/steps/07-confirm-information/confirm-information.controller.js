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
    , texts_en = require('../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../client/js/i18n/cy.json')
    , utils = require('../../../lib/utils');


  function sendToComplete(req, res, app) {
    // If juror does not meet the age requirements, redirect to confirmation page with ineligable
    if (req.session.user.ineligibleAge === true) {
      return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirmation.age', req.session.user.thirdParty)));
    }

    if (req.session.user.ineligibleDeceased === true) {
      return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirmation.deceased', req.session.user.thirdParty)));
    }

    // If juror has asked to change date, redirect to confirmation page with excusal variant
    if (req.session.user.confirmedDate === 'No') {
      return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirmation.excusal', req.session.user.thirdParty)));
    }

    // If juror has asked to change date, redirect to confirmation page with deferral variant
    if (req.session.user.confirmedDate === 'Change') {
      return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirmation.deferral', req.session.user.thirdParty)));
    }

    return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirmation.straight', req.session.user.thirdParty)));
  }

  function modifyPhoneNumber(phoneNumber){
    var newPhoneNumber;

    // Remove unwanted characters ("+") from phone number strings
    newPhoneNumber = phoneNumber.replace(/\+/g, '');

    return newPhoneNumber;
  };


  module.exports.index = function(app) {
    return function(req, res) {
      var mergedUser
        , tmpErrors
        , cjsTmpArr
        , tmpArr
        , assistanceTmp
        , deferralDisplayDates={}
        // , personalDetailsChangeLink
        , personalDetailsChangeNameLink
        , personalDetailsChangeAddressLink
        , personalDetailsChangeDateOfBirthLink
        // , contactDetailsChangeLink
        , contactDetailsChangePhoneLink
        , contactDetailsChangeEmailLink
        , _ = require('lodash')
        , thirdPartyMapping = {
          nothere: filters.translate('ON_BEHALF.THIRD_PARTY_REASON.REASONS.NOT_HERE', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          , assistance: filters.translate('ON_BEHALF.THIRD_PARTY_REASON.REASONS.REQUIRE_ASSISTANCE', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          , deceased: filters.translate('ON_BEHALF.THIRD_PARTY_REASON.REASONS.DECEASED', (req.session.ulang === 'cy' ? texts_cy : texts_en))
          , other: filters.translate('ON_BEHALF.THIRD_PARTY_REASON.REASONS.OTHER', (req.session.ulang === 'cy' ? texts_cy : texts_en))
        },
        jurorObj = require('../../../objects/juror').object
        , qualifyDetailsExist = function(objQualify){
          var boolDetalsExist = false;

          if (objQualify){
            if (objQualify.details) {
              boolDetalsExist = true;
            }
          }
          return boolDetalsExist;
        }
        , getDetailsError = function(err) {
          app.logger.crit('Failed to fetch and parse details required for pdf download: ' + err.statusCode, {
            jurorNumber: req.session.user.jurorNumber,
            jwt: req.session.authToken,
            error: (typeof err.error !== 'undefined') ? err.error : err
          });
        }
        , getDetailsSuccess = function(response) {
          req.session.user['courtName'] = response['locCourtName'];
          req.session.user['courtAddress'] = [
            response['locCourtName'],
            response['courtAddress1'],
            response['courtAddress2'],
            response['courtAddress3'],
            response['courtAddress4'],
            response['courtAddress5'],
            response['courtAddress6'],
            response['courtPostcode']
          ].filter(function(val) {
            return val;
          }).join('<br>');
          req.session.user['hearingDateTimestamp'] = response['hearingDate'];
  
          if (req.session.user.ineligibleDeceased) {
            req.session.user['nameRender'] = [
              response['title'],
              response['firstName'],
              response['lastName']
            ].filter(function(val){
              return val;
            }).join(' ');
          }
  
          //Try and parse date for hearing
          try {
            if (!moment(response['hearingDate']).isValid()) {
              throw 'Invalid hearing date format. MomentJS could not parse: "' + response['hearingDate'] + '"';
            }
            req.session.user['hearingDate'] = moment(response['hearingDate']).format('dddd Do MMMM YYYY');
          } catch (err) {
            app.logger.debug('Hearing date could not be parsed by momentjs', err);
            req.session.user['hearingDate'] = '';
          }
  
          if (!req.session.user['hearingTime']) {
            if (moment(response['courtAttendTime']).isValid()) {
              req.session.user['hearingTime'] = moment(response['courtAttendTime']).format('HH:mm a');
            } else if (moment(response['courtAttendTime'], 'HH:mm').isValid()) {
              req.session.user['hearingTime'] = moment(response['courtAttendTime'], 'HH:mm').format('HH:mm a');
            }
          }
  
          // merge updated user into session
          mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
  
          app.logger.info('Fetched and parsed summoned details required for pdf download', {
            jurorNumber: req.session.user.jurorNumber,
            jwt: req.session.authToken,
            response: response
          });
  
          return res.render('steps/07-confirm-information/index.njk', {
            user: mergedUser,
            //personalDetailsChangeLink: personalDetailsChangeLink,
            personalDetailsChangeNameLink: personalDetailsChangeNameLink,
            personalDetailsChangeAddressLink: personalDetailsChangeAddressLink,
            personalDetailsChangeDateOfBirthLink: personalDetailsChangeDateOfBirthLink,
            // contactDetailsChangeLink: contactDetailsChangeLink,
            contactDetailsChangePhoneLink: contactDetailsChangePhoneLink,
            contactDetailsChangeEmailLink: contactDetailsChangeEmailLink,
            errors: {
              title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
              message: '',
              count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
              items: tmpErrors,
            },
          });
        }

      //reset value for conventional route vs edit route
      if (req.session.change === true){
        req.session.change = false;
      }

      //reset values in case they are unselected upon change
      if (req.session.user.cjsNca){
        delete req.session.user.cjsNca;
      }
      if (req.session.user.cjsJudiciary){
        delete req.session.user.cjsJudiciary;
      }
      if (req.session.user.cjsHMCTS){
        delete req.session.user.cjsHMCTS;
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
          req.session.user.cjsNca = 'the National Crime Agency';
        }
        if (tmpArr.indexOf('Judiciary') > -1){
          req.session.user.cjsJudiciary = 'the Judiciary';
        }
        if (tmpArr.indexOf('HMCTS') > -1){
          req.session.user.cjsHMCTS = 'HM Courts & Tribunal Service';
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

      /*
      if (req.session.user.ineligibleDeceased || req.session.user.ineligibleAge) {
        //adds court details to session
        jurorObj.get(require('request-promise'), app, req.session.user.jurorNumber, req.session.authToken)
          .then(getDetailsSuccess, getDetailsError)
          .catch(getDetailsError);
      }
      */

      // Get correct link for changing personal details
      // of summoned juror
      if (req.session.user.thirdParty === 'Yes') {
        //personalDetailsChangeLink = app.namedRoutes.build('branches.third.party.personal.details.change.get');
        personalDetailsChangeNameLink = app.namedRoutes.build('branches.third.party.personal.details.name.change.get');
        personalDetailsChangeAddressLink = app.namedRoutes.build('branches.third.party.personal.details.address.change.get');
        personalDetailsChangeDateOfBirthLink = app.namedRoutes.build('branches.third.party.personal.details.date-of-birth.change.get');
        //contactDetailsChangeLink = app.namedRoutes.build('branches.third.party.contact.details.change.get');
        contactDetailsChangePhoneLink = app.namedRoutes.build('branches.third.party.contact.details.change.get');
        contactDetailsChangeEmailLink = app.namedRoutes.build('branches.third.party.contact.details.change.get');
      } else {
        personalDetailsChangeNameLink = app.namedRoutes.build('steps.your.details.name.change.get');
        personalDetailsChangeAddressLink = app.namedRoutes.build('steps.your.details.address.change.get');
        personalDetailsChangeDateOfBirthLink = app.namedRoutes.build('steps.your.details.date-of-birth.change.get');
        contactDetailsChangePhoneLink = app.namedRoutes.build('steps.your.details.phone.change.get');
        contactDetailsChangeEmailLink = app.namedRoutes.build('steps.your.details.email.change.get');
      }


      //Final checks for Excusal
      if (req.session.user.confirmedDate === 'No'){

        if (typeof req.session.errors !== 'undefined'){
          delete req.session.errors.excusalReason;
        }

        if (req.session.lastValidConfirmedDate.selection !== 'No'){

          if (req.session.lastValidConfirmedDate.selection === 'Yes'){
            delete req.session.user.deferral;
            delete req.session.user.excusal;
            req.session.user.confirmedDate = 'Yes';
          }

          if (req.session.lastValidConfirmedDate.selection === 'Change'){
            delete req.session.user.excusal;
            req.session.user.confirmedDate = 'Change';
            req.session.user.deferral = req.session.lastValidConfirmedDate.data;
          }
        }

        req.session.user.excusal = req.session.lastValidConfirmedDate.data;

      }

      //Final checks for Deferral
      if (req.session.user.confirmedDate === 'Change'){

        if (typeof req.session.errors !== 'undefined'){
          delete req.session.errors.deferralReason;
        }

        if (req.session.lastValidConfirmedDate.selection !== 'Change'){

          if (req.session.lastValidConfirmedDate.selection === 'Yes'){
            delete req.session.user.deferral;
            delete req.session.user.excusal;
            req.session.user.confirmedDate = 'Yes';
          }

          if (req.session.lastValidConfirmedDate.selection === 'No'){
            delete req.session.user.deferral;
            req.session.user.confirmedDate = 'No';
            req.session.user.excusal = req.session.lastValidConfirmedDate.data;
          }
        }

        req.session.user.deferral = req.session.lastValidConfirmedDate.data;

      }

      // Retrieve and format the deferral dates
      if (req.session.user.deferral) {
        req.session.user.deferral.dates.split(',')
          .forEach(function(dateStr, index) {
            deferralDisplayDates['date' + (index + 1)] = dateStr;
          });
        req.session.user.deferral['displayDates'] = deferralDisplayDates;
      }

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;
      if (req.session.user.qualify) {
        if (qualifyDetailsExist(req.session.user.qualify.livedConsecutive)|| qualifyDetailsExist(req.session.user.qualify.mentalHealthSectioned) || qualifyDetailsExist(req.session.user.qualify.mentalHealthCapacity) || qualifyDetailsExist(req.session.user.qualify.onBail) || qualifyDetailsExist(req.session.user.qualify.convicted)) {
          req.session.user['ineligible'] = 'Yes';
        }
        else {
          req.session.user['ineligible'] = 'No';
        }
      }
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));

      if (req.session.user.ineligibleDeceased) {
        //adds court details to session
        jurorObj.get(require('request-promise'), app, req.session.user.jurorNumber, req.session.authToken)
          .then(getDetailsSuccess, getDetailsError)
          .catch(getDetailsError);
      } else {
        return res.render('steps/07-confirm-information/index.njk', {
          user: mergedUser,
          //personalDetailsChangeLink: personalDetailsChangeLink,
          personalDetailsChangeNameLink: personalDetailsChangeNameLink,
          personalDetailsChangeAddressLink: personalDetailsChangeAddressLink,
          personalDetailsChangeDateOfBirthLink: personalDetailsChangeDateOfBirthLink,
          // contactDetailsChangeLink: contactDetailsChangeLink,
          contactDetailsChangePhoneLink: contactDetailsChangePhoneLink,
          contactDetailsChangeEmailLink: contactDetailsChangeEmailLink,
          deferralDisplayDates: deferralDisplayDates,
          errors: {
            title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            message: '',
            count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
            items: tmpErrors,
          },
        });
      }
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

      // Remove "+" characters from telephone numbers
      if (req.session.user.primaryPhone){
        req.session.user.primaryPhone = modifyPhoneNumber(req.session.user.primaryPhone);
      }
      if (req.session.user.secondaryPhone) {
        req.session.user.secondaryPhone = modifyPhoneNumber(req.session.user.secondaryPhone);
      }
      if (req.session.user.thirdPartyDetails){
        if (req.session.user.thirdPartyDetails.mainPhone){
          req.session.user.thirdPartyDetails.mainPhone = modifyPhoneNumber(req.session.user.thirdPartyDetails.mainPhone);
        }
        if (req.session.user.thirdPartyDetails.otherPhone) {
          req.session.user.thirdPartyDetails.otherPhone = modifyPhoneNumber(req.session.user.thirdPartyDetails.otherPhone);
        }
      }

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/confirm-information')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }

      req.session.informationConfirmed = req.body['informationConfirmed'];

      // Send the response to the server
      responseObj.create(require('request-promise'), app, req.session.authToken, utils.transformSubmission(req.session.user, req.session.ulang))
        .then(createResponseSuccess, createResponseFailure)
        .catch(createResponseFailure);
    };
  };

})();
