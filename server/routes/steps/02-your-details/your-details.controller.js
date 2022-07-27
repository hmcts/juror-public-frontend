;(function(){
  'use strict';

  var _ = require('lodash')
    , moment = require('moment')
    , validate = require('validate.js')
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

          return res.redirect(app.namedRoutes.build('steps.your.details.name.get'));

        }

        , getDetailsError = function(err) {
          app.logger.crit('Failed to fetch and parse summoned juror details on first person route: ' + err.statusCode, {
            jurorNumber: req.session.user.jurorNumber,
            jwt: req.session.authToken,
            error: (typeof err.error !== 'undefined') ? err.error : err
          });

          res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.login', req.session.user.thirdParty)));
        };

      jurorObj.get(require('request-promise'), app, req.session.user.jurorNumber, req.session.authToken)
        .then(getDetailsSuccess, getDetailsError)
        .catch(getDetailsError);
    };
  };

  //
  // Name Functions
  //

  module.exports.changeName = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.your.details.name-change.get'));
    };
  };

  // Name confirm/change pages
  module.exports.getNameConfirm = function(app){
    return function(req, res) {
      var nameError
        , tmpErrors
        , mergedUser
        , backLinkUrl;


      if (typeof req.session.errors !== 'undefined') {
        nameError = (
          typeof req.session.errors['title'] !== 'undefined' ||
          typeof req.session.errors['firstName'] !== 'undefined' ||
          typeof req.session.errors['lastName'] !== 'undefined'
        );
      }

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        backLinkUrl = utils.getRedirectUrl('steps.login', req.session.user.thirdParty);
      }

      return res.render('steps/02-your-details/name.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
          nameError: nameError
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createNameConfirm = function(app) {
    return function(req, res) {
      var validatorResult
        , redirectPage;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/your-details-name-confirm')(req));

      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.your.details.name.get'));
      }

      // Update name confirm
      //req.session.user['nameConfirm'] = req.body['nameConfirm'];

      if (req.session.change === true) {
        //check if further questions still to be completed
        if (typeof(req.session.user.qualify) !== 'undefined' || req.session.user['ineligibleAge'] === true){
          return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
        }

        // reset change
        req.session.change = false;
        return res.redirect(app.namedRoutes.build('steps.your.details.address.get'));
      }

      if (req.body['nameConfirm'] === 'Yes'){
        redirectPage = 'steps.your.details.address.get';
      } else {
        redirectPage = 'steps.your.details.name-change.get';
      }

      // Redirect
      return res.redirect(app.namedRoutes.build(redirectPage));

    };
  };

  module.exports.getNameChange = function(app){
    return function(req, res) {
      var nameError
        , tmpErrors
        , mergedUser
        , backLinkUrl;


      if (typeof req.session.errors !== 'undefined') {
        nameError = (
          typeof req.session.errors['title'] !== 'undefined' ||
          typeof req.session.errors['firstName'] !== 'undefined' ||
          typeof req.session.errors['lastName'] !== 'undefined'
        );
      }

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = 'steps.confirm.information.get';
      } else {
        backLinkUrl = 'steps.your.details.name.get';
      }

      return res.render('steps/02-your-details/name-change.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
          nameError: nameError
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createNameChange = function(app) {
    return function(req, res) {
      var nameRender = [
          req.body['title'],
          req.body['firstName'],
          req.body['lastName']
        ].filter(function(val) {
          return val;
        }).join(' ')
        , validatorResult;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/your-details-name.js')(req));

      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        req.session.formFields.nameRender = nameRender;

        return res.redirect(app.namedRoutes.build('steps.your.details.name-change.get'));
      }

      // Update name
      req.session.user['nameRender'] = nameRender;
      req.session.user['title'] = req.body['title'];
      req.session.user['firstName'] = req.body['firstName'];
      req.session.user['lastName'] = req.body['lastName'];

      if (req.session.change === true) {
        //check if further questions still to be completed
        if (typeof(req.session.user.qualify) !== 'undefined' || req.session.user['ineligibleAge'] === true){
          return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
        }

        // reset change
        req.session.change = false;
        return res.redirect(app.namedRoutes.build('steps.your.details.address.get'));
      }

      // Redirect
      return res.redirect(app.namedRoutes.build('steps.your.details.address.get'));

    };
  };

  //
  // Address Functions
  //

  module.exports.changeAddress = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.your.details.address-change.get'));
    };
  };

  // Address confirm/change pages
  module.exports.getAddressConfirm = function(app){
    return function(req, res) {
      var addressError
        , tmpErrors
        , mergedUser
        , backLinkUrl;


      if (typeof req.session.errors !== 'undefined') {
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

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = 'steps.confirm.information.get';
      } else {
        backLinkUrl = 'steps.your.details.name.get';
      }

      return res.render('steps/02-your-details/address.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
          addressError: addressError
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createAddressConfirm = function(app) {
    return function(req, res) {
      var validatorResult
        , redirectPage;


      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/your-details-address-confirm.js')(req));

      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.your.details.address.get'));
      }

      // Update address confirm
      //req.session.user['addressConfirm'] = req.body['addressConfirm']


      if (req.session.change === true) {
        //check if further questions still to be completed
        if (typeof(req.session.user.qualify) !== 'undefined' || req.session.user['ineligibleAge'] === true){
          return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
        }

        // reset change
        req.session.change = false;
        return res.redirect(app.namedRoutes.build('steps.your.details.phone.get'));
      }

      // Redirect
      if (req.body['addressConfirm'] === 'No'){
        redirectPage = 'steps.your.details.address-change.get';
      } else {
        redirectPage = 'steps.your.details.phone.get';
      }
      return res.redirect(app.namedRoutes.build(redirectPage));
      
    };
  };

  module.exports.getAddressChange = function(app){
    return function(req, res) {
      var addressError
        , tmpErrors
        , mergedUser
        , backLinkUrl;


      if (typeof req.session.errors !== 'undefined') {
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

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = 'steps.confirm.information.get';
      } else {
        backLinkUrl = 'steps.your.details.address.get';
      }

      return res.render('steps/02-your-details/address-change.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
          addressError: addressError
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createAddressChange = function(app) {
    return function(req, res) {
      var addressRender = [
          req.body['addressLineOne'],
          req.body['addressLineTwo'],
          req.body['addressLineThree'],
          req.body['addressTown'],
          req.body['addressCounty'],
          req.body['addressPostcode']
        ].filter(function(val) {
          return val;
        }).join('<br>')
        , validatorResult;


      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;


      // Validate form submission
      req.body.addressPostcode = req.body.addressPostcode.replace(/\s*$/, '');
      validatorResult = validate(req.body, require('../../../config/validation/your-details-address.js')(req));

      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        req.session.formFields.addressRender = addressRender;

        return res.redirect(app.namedRoutes.build('steps.your.details.address-change.get'));
      }


      // Update address
      req.session.user['addressLineOne'] = req.body['addressLineOne'];
      req.session.user['addressLineTwo'] = req.body['addressLineTwo'];
      req.session.user['addressLineThree'] = req.body['addressLineThree'];
      req.session.user['addressTown'] = req.body['addressTown'];
      req.session.user['addressCounty'] = req.body['addressCounty'];
      req.session.user['addressPostcode'] = req.body['addressPostcode'];

      req.session.user['addressRender'] = addressRender;


      if (req.session.change === true) {
        //check if further questions still to be completed
        if (typeof(req.session.user.qualify) !== 'undefined' || req.session.user['ineligibleAge'] === true){
          return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
        }

        // reset change
        req.session.change = false;
        return res.redirect(app.namedRoutes.build('steps.your.details.phone.get'));
      }

      // Redirect
      return res.redirect(app.namedRoutes.build('steps.your.details.phone.get'));
    };
  };

  //
  // DOB Functions
  //
  module.exports.getDateOfBirth = function(app){
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = 'steps.confirm.information.get';
      } else {
        backLinkUrl = 'steps.your.details.email.get';
      }

      return res.render('steps/02-your-details/date-of-birth.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };


  module.exports.createDateOfBirth = function(app) {
    return function(req, res) {
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

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/your-details-date-of-birth.js')(req));

      if (typeof validatorResult !== 'undefined') {

        // Only show 1 error at a time for the DOB
        // Report the first error item if multiple errors were raised

        if (validatorResult.dobDay){
          delete validatorResult.dobMonth;
          delete validatorResult.dobYear;
          delete validatorResult.dateOfBirth;
        }
        if (validatorResult.dobMonth){
          delete validatorResult.dobYear;
          delete validatorResult.dateOfBirth;
        }
        if (validatorResult.dobYear){
          delete validatorResult.dateOfBirth;
        }

        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.your.details.date-of-birth.get'));
      }

      // Store new info
      req.session.user['dateOfBirth'] = dobValue;
      req.session.user['dobDay'] = req.body['dobDay'];
      req.session.user['dobMonth'] = req.body['dobMonth'];
      req.session.user['dobYear'] = req.body['dobYear'];

      // redirect to dob confirmation if under lower age limit or above higher age limit
      if (req.body['ageTimeOfHearing'] < app.ageSettings.lowerAgeLimit || req.body['ageTimeOfHearing'] >= app.ageSettings.upperAgeLimit) {
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

  module.exports.changeDateOfBirth = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.your.details.date-of-birth.get'));
    };
  };

  //
  // Phone Functions
  //
  module.exports.getPhone = function(app){
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = 'steps.confirm.information.get';
      } else {
        backLinkUrl = 'steps.your.details.address.get';
      }

      return res.render('steps/02-your-details/phone.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createPhone = function(app) {
    return function(req, res) {
      var validatorResult;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Create a copy of phone number values for validation without space characters
      req.body.validate =  {
        primaryPhone: req.body.primaryPhone.replace(/ /g, ''),
        secondaryPhone: req.body.secondaryPhone.replace(/ /g, '')
      }

      // Validate form submission
      validatorResult = validate(req.body.validate, require('../../../config/validation/your-details-phone.js')(req));

      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.your.details.phone.get'));
      }

      // Store new info
      req.session.user['primaryPhone'] = req.body['primaryPhone'];
      req.session.user['secondaryPhone'] = req.body['secondaryPhone'];


      if (req.session.change === true) {
        //check if further questions still to be completed
        if (typeof(req.session.user.qualify) !== 'undefined' || req.session.user['ineligibleAge'] === true){
          return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
        }
        // reset change
        req.session.change = false;
        return res.redirect(app.namedRoutes.build('steps.your.details.email.get'));
      }

      return res.redirect(app.namedRoutes.build('steps.your.details.email.get'));
    };
  };

  module.exports.changePhone = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.your.details.phone.get'));
    };
  };

  //
  // Email Functions
  //
  module.exports.getEmail = function(app){
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = 'steps.confirm.information.get';
      } else {
        backLinkUrl = 'steps.your.details.phone.get';
      }

      return res.render('steps/02-your-details/email.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createEmail = function(app) {
    return function(req, res) {
      var validatorResult;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/your-details-email.js')(req));

      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.your.details.email.get'));
      }

      // Store new info
      req.session.user['emailAddress'] = req.body['emailAddress'];
      req.session.user['emailAddressConfirmation'] = req.body['emailAddressConfirmation'];

      if (req.session.change === true) {
        //check if further questions still to be completed
        if (typeof(req.session.user.qualify) !== 'undefined' || req.session.user['ineligibleAge'] === true){
          return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
        }

        // reset change
        req.session.change = false;
        return res.redirect(app.namedRoutes.build('steps.your.details.date-of-birth.get'));
      }

      return res.redirect(app.namedRoutes.build('steps.your.details.date-of-birth.get'));
    };
  };

  module.exports.changeEmail = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.your.details.email.get'));
    };
  };


})();
