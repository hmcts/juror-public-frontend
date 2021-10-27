/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var _ = require('lodash')
    , validate = require('validate.js')
    , filters = require('../../../../components/filters')
    , texts_en = require('../../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../../client/js/i18n/cy.json')
    , utils = require('../../../../lib/utils')
    , moment = require('moment');


  module.exports.index = function() {
    return function(req, res) {
      var tmpErrors
        , tmpDates = {}
        , tmpDays = {}
        , tmpMonths = {}
        , tmpYears = {}
        , datepickerDefaults = {}
        , mergedUser
        , backLinkUrl
        , deferralDateRange
        , datepickerDefault
        , iLoop;


      // initialise dates
      deferralDateRange = utils.getDeferralDateRange(req.session.user.hearingDateTimestamp);
      req.session.user.deferral['dateRange'] = deferralDateRange;
      datepickerDefault = deferralDateRange.earliestDateMed; // value must be string format e.g. '20 September 2021'

      if (req.session.user.deferral.dates) {
        req.session.user.deferral.dates.split(',')
          .forEach(function(dateStr, index) {
            tmpDates['date' + (index + 1)] = dateStr;

            tmpDays['date' + (index + 1) + 'Day'] = dateStr.split('/')[0];
            tmpMonths['date' + (index + 1) + 'Month'] = dateStr.split('/')[1];
            tmpYears['date' + (index + 1) + 'Year'] = dateStr.split('/')[2];

            datepickerDefaults['date' + (index + 1)] = moment(dateStr, 'DD/MM/YYYY').format('D MMMM YYYY');
          });
      } else {
        for (iLoop = 0; iLoop < 3; iLoop++) {
          datepickerDefaults['date' + (iLoop + 1)] = datepickerDefault;
        }
      }

      mergedUser = _.merge(_.cloneDeep(req.session.user), tmpDates, tmpDays, tmpMonths, tmpYears, _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        if (req.session.user.confirmedDate === req.session.lastValidConfirmedDate.selection){
          backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
        } else {
          backLinkUrl = utils.getRedirectUrl('steps.confirm.date.deferral', req.session.user.thirdParty);
        }
      } else {
        backLinkUrl = utils.getRedirectUrl('steps.confirm.date.deferral', req.session.user.thirdParty);
      }

      return res.render('steps/04-confirm-date/deferr-dates.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl,
        ulang: req.session.ulang,
        deferralDateRange: deferralDateRange,
        datepickerDefaults: datepickerDefaults
      });
    }
  };

  module.exports.create = function(app) {
    return function(req, res) {

      // Validate form submission
      var validatorResult
        , moments
        , deferDate1
        , deferDate2
        , deferDate3
        , validateParams

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      deferDate1 = req.body['date1Day'].trim() + '/' + req.body['date1Month'].trim() + '/' + req.body['date1Year'];
      deferDate2 = req.body['date2Day'].trim() + '/' + req.body['date2Month'].trim() + '/' + req.body['date2Year'];
      deferDate3 = req.body['date3Day'].trim() + '/' + req.body['date3Month'].trim() + '/' + req.body['date3Year'];

      moments = [deferDate1, deferDate2, deferDate3];
      //moments = [req.body['date1'], req.body['date2'], req.body['date3']];

      // Store new info
      req.session.user.deferral['date1Day'] = req.body['date1Day'].trim();
      req.session.user.deferral['date1Month'] = req.body['date1Month'].trim();
      req.session.user.deferral['date1Year'] = req.body['date1Year'].trim();
      
      req.session.user.deferral['date2Day'] = req.body['date2Day'].trim();
      req.session.user.deferral['date2Month'] = req.body['date2Month'].trim();
      req.session.user.deferral['date2Year'] = req.body['date2Year'].trim();

      req.session.user.deferral['date3Day'] = req.body['date3Day'].trim();
      req.session.user.deferral['date3Month'] = req.body['date3Month'].trim();
      req.session.user.deferral['date3Year'] = req.body['date3Year'].trim();

      validateParams = {
        'date1Day': req.body['date1Day'],
        'date1Month': req.body['date1Month'],
        'date1Year': req.body['date1Year'],
        'date1': deferDate1,

        'date2Day': req.body['date2Day'],
        'date2Month': req.body['date2Month'],
        'date2Year': req.body['date2Year'],
        'date2': deferDate2,

        'date3Day': req.body['date3Day'],
        'date3Month': req.body['date3Month'],
        'date3Year': req.body['date3Year'],
        'date3': deferDate3,

        'earliestDate': req.session.user.deferral.dateRange.earliestMoment,
        'latestDate': req.session.user.deferral.dateRange.latestMoment,
        'ageLimit': app.ageSettings.upperAgeLimit
      }

      // Validate form submission
      validatorResult = validate(validateParams, require('../../../../config/validation/deferral-dates')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        if (validatorResult['dates']) {
          validatorResult['dates'].forEach(function(datesError) {
            datesError.fields.forEach(function(field) {
              req.session.errors[field + 'Error'] = true;
            });
          });
        }
        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date.deferral-dates', req.session.user.thirdParty)));
      }

      // If we previously answered an excusal, wipe that information
      if (typeof req.session.user.excusal !== 'undefined') {
        delete req.session.user.excusal;
      }

      req.session.user.deferral.dates = moments.join(', ');

      req.session.lastValidConfirmedDate.selection = 'Change';
      req.session.lastValidConfirmedDate.data = req.session.user.deferral;

      // navigation
      //if (req.session.change === true) {
      //  return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty)));
      //}
      return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date.deferral-check', req.session.user.thirdParty)));
    };
  };

  module.exports.change = function(app) {
    return function(req, res) {
      req.session.change = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.date.deferral-dates', req.session.user.thirdParty)));
    };
  };



})();
