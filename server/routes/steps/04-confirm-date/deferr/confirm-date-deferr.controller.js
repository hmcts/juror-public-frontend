/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var _ = require('lodash')
    , moment = require('moment')
    , validate = require('validate.js')
    , filters = require('../../../../components/filters')
    , texts = require('../../../../../client/js/i18n/en.json')
    , utils = require('../../../../lib/utils');

  module.exports.index = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      return res.render('steps/04-confirm-date/deferr.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', texts),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
      });
    };
  };

  module.exports.getDates = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , tmpDates = {};


      if (req.session.user.deferral.dates) {
        req.session.user.deferral.dates.split(', ')
          .forEach(function(dateStr, index) {
            var splitDate = dateStr.split('/');

            tmpDates['date' + (index + 1) + 'Day'] = splitDate[0];
            tmpDates['date' + (index + 1) + 'Month'] = splitDate[1];
            tmpDates['date' + (index + 1) + 'Year'] = splitDate[2];
          });
      }

      mergedUser = _.merge(_.cloneDeep(req.session.user), tmpDates, _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      return res.render('steps/04-confirm-date/deferr-dates.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', texts),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
      });
    }
  };

  module.exports.create = function(app) {
    return function(req, res) {

      // Validate form submission
      var validatorResult;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;


      // Store new info
      req.session.user.deferral = {
        reason: req.body['deferralReason'],
      };


      // Validate form submission
      validatorResult = validate(req.body, require('../../../../config/validation/deferral')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.confirm.date.deferral.get'));
      }

      // If we previously answered an excusal, wipe that information
      if (typeof req.session.user.excusal !== 'undefined') {
        delete req.session.user.excusal;
      }

      // Move on
      return res.redirect(app.namedRoutes.build('steps.confirm.date.deferral-dates.get'));
    };
  };

  module.exports.createDates = function(app) {
    return function(req, res) {

      // Validate form submission
      var validatorResult
        , moments;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      moments = [1, 2, 3].map(function(dateNum) {
        return [
          req.body['date' + dateNum + 'Day'],
          req.body['date' + dateNum + 'Month'],
          req.body['date' + dateNum + 'Year'],
        ];
      })
      .map(function(dateParts) {
        return dateParts.join('-');
      })
      .map(function(dateString) {
        return moment(dateString, 'DD-MM-YYYY');
      });

      moments.forEach(function(val, i) {
        req.session.user.deferral['date' + (i + 1)] = val;
        req.body['date' + (i + 1)] = val;
      });


      // Validate form submission
      validatorResult = validate(req.body, require('../../../../config/validation/deferral-dates')(req));
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

        return res.redirect(app.namedRoutes.build('steps.confirm.date.deferral-dates.get'));
      }

      // If we previously answered an excusal, wipe that information
      if (typeof req.session.user.excusal !== 'undefined') {
        delete req.session.user.excusal;
      }

      req.session.user.deferral.dates = moments.map(function(moment) {
        return moment.format('DD/MM/YYYY');
      }).join(', ');

      // Move on
      if (req.session.change === true) {
        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }
      return res.redirect(app.namedRoutes.build('steps.cjs.employed.get'));
    };
  };

  module.exports.change = function(app){
    return function(req, res) {
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.confirm.date.deferral.get'));
    };
  };

  module.exports.changeDates = function(app) {
    return function(req, res) {
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.confirm.date.deferral-dates.get'));
    };
  };
})();
