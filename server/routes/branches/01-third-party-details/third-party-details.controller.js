/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var _ = require('lodash')
    , validate = require('validate.js')
    , filters = require('../../../components/filters')
    , texts_en = require('../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../client/js/i18n/cy.json')
    , utils = require('../../../lib/utils');

  module.exports.index = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser;

      // Make sure the user session exists
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      return res.render('branches/01-third-party-details/index.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
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
        , requiresPhone = false
        , requiresEmail = false;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Manipulate body to match user session for feedback
      req.body.thirdPartyDetails = {};
      req.body.thirdPartyDetails.contactPhone = req.body.contactPhone;
      req.body.thirdPartyDetails.contactEmail = req.body.contactEmail;
      req.body.thirdPartyDetails.firstName = req.body.firstName;
      req.body.thirdPartyDetails.lastName = req.body.lastName;
      req.body.thirdPartyDetails.relationship = req.body.relationship;
      req.body.thirdPartyDetails.mainPhone = req.body.mainPhone;
      req.body.thirdPartyDetails.otherPhone = req.body.otherPhone;
      req.body.thirdPartyDetails.emailAddress = req.body.emailAddress;
      req.body.thirdPartyDetails.emailAddressConfirmation = req.body.emailAddressConfirmation;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/third-party-details')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('branches.third.party.details.get'));
      }

      // Input validated, store information in session
      if (req.body.hasOwnProperty('contactPhone') === false || req.body.contactPhone !== 'By phone') {
        req.body.mainPhone = '';
        req.body.otherPhone = '';
      }

      if (req.body.hasOwnProperty('contactEmail') === false || req.body.contactEmail !== 'By email') {
        req.body.emailAddress = '';
        req.body.emailAddressConfirmation = '';
      }

      if (typeof req.session.user.thirdPartyDetails === 'undefined') {
        req.session.user.thirdPartyDetails = {};
      }

      req.session.user.thirdPartyDetails.contactPhone = req.body.contactPhone;
      req.session.user.thirdPartyDetails.contactEmail = req.body.contactEmail;
      req.session.user.thirdPartyDetails.firstName = req.body.firstName;
      req.session.user.thirdPartyDetails.lastName = req.body.lastName;
      req.session.user.thirdPartyDetails.relationship = req.body.relationship;
      req.session.user.thirdPartyDetails.mainPhone = req.body.mainPhone;
      req.session.user.thirdPartyDetails.otherPhone = req.body.otherPhone;
      req.session.user.thirdPartyDetails.emailAddress = req.body.emailAddress;
      req.session.user.thirdPartyDetails.emailAddressConfirmation = req.body.emailAddressConfirmation;


      // If we have changed and set to use third party respondants details as
      // contact details for juror then we need to ensure we did not choose
      // to remove required details here. If we did then we must go back to the
      // third party contact details page instead of summary
      requiresPhone = (
        typeof req.body.thirdPartyDetails.contactPhone === 'undefined' &&
        typeof req.session.user['useJurorPhoneDetails'] !== 'undefined' &&
        req.session.user['useJurorPhoneDetails'] === 'No'
      );

      requiresEmail = (
        typeof req.body.thirdPartyDetails.contactEmail === 'undefined' &&
        typeof req.session.user['useJurorEmailDetails'] !== 'undefined' &&
        req.session.user['useJurorEmailDetails'] === 'No'
      );

      if (req.session.change === true && (requiresPhone || requiresEmail)) {
        if (typeof req.session.errors === 'undefined') {
          req.session.errors = {};
        }

        if (requiresPhone) {
          req.session.errors.useJurorPhoneDetails = [{
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_PHONE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_PHONE_INLINE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }];
        }

        if (requiresEmail) {
          req.session.errors.useJurorEmailDetails = [{
            summary: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_EMAIL', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
            details: filters.translate('VALIDATION.ON_BEHALF.THIRD_PARTY_CONTACT.CANNOT_USE_OWN_EMAIL_INLINE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          }];
        }

        return res.redirect(app.namedRoutes.build('branches.third.party.contact.details.get'));
      }

      // Normal change will forward us to the confirmation page
      if (req.session.change === true) {
        return res.redirect(app.namedRoutes.build('steps.confirm.information.tp.get'));
      }

      // If not a change, just go to next step in flow
      return res.redirect(app.namedRoutes.build('branches.third.party.reason.get'));
    };
  };

  module.exports.change = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('branches.third.party.details.get'));
    };
  };

  //
  // Name functions
  //
  module.exports.getName = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Make sure the user session exists
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = 'steps.confirm.information.tp.get';
      } else {
        backLinkUrl = 'steps.login.tp.get';
      }

      return res.render('branches/01-third-party-details/name.njk', {
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


  module.exports.createName = function(app) {
    return function(req, res) {
      var validatorResult

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Manipulate body to match user session for feedback
      req.body.thirdPartyDetails = {};
      req.body.thirdPartyDetails.firstName = req.body.firstName;
      req.body.thirdPartyDetails.lastName = req.body.lastName;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/third-party-details-name')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('branches.third.party.details.name.get'));
      }

      if (typeof req.session.user.thirdPartyDetails === 'undefined') {
        req.session.user.thirdPartyDetails = {};
      }

      req.session.user.thirdPartyDetails.firstName = req.body.firstName;
      req.session.user.thirdPartyDetails.lastName = req.body.lastName;

      // Normal change will forward us to the confirmation page
      if (req.session.change === true) {
        return res.redirect(app.namedRoutes.build('steps.confirm.information.tp.get'));
      }

      // If not a change, just go to next step in flow
      return res.redirect(app.namedRoutes.build('branches.third.party.details.relationship.get'));
    };
  };

  module.exports.changeName = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('branches.third.party.details.name.get'));
    };
  };


  //
  // Relationship functions
  //
  module.exports.getRelationship = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Make sure the user session exists
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = 'steps.confirm.information.tp.get';
      } else {
        backLinkUrl = 'branches.third.party.details.name.get';
      }

      return res.render('branches/01-third-party-details/relationship.njk', {
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


  module.exports.createRelationship = function(app) {
    return function(req, res) {
      var validatorResult

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Manipulate body to match user session for feedback
      req.body.thirdPartyDetails = {};
      req.body.thirdPartyDetails.relationship = req.body.relationship;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/third-party-details-relationship')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('branches.third.party.details.relationship.get'));
      }

      if (typeof req.session.user.thirdPartyDetails === 'undefined') {
        req.session.user.thirdPartyDetails = {};
      }

      req.session.user.thirdPartyDetails.relationship = req.body.relationship;

      // Normal change will forward us to the confirmation page
      if (req.session.change === true) {
        return res.redirect(app.namedRoutes.build('steps.confirm.information.tp.get'));
      }

      // If not a change, just go to next step in flow
      return res.redirect(app.namedRoutes.build('branches.third.party.details.contact.get'));
    };
  };

  module.exports.changeRelationship = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('branches.third.party.details.relationship.get'));
    };
  };


  //
  // Contact functions
  //
  module.exports.getContact = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Make sure the user session exists
      if (typeof req.session.user === 'undefined') {
        req.session.user = {};
      }

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = 'steps.confirm.information.tp.get';
      } else {
        backLinkUrl = 'branches.third.party.details.relationship.get';
      }

      return res.render('branches/01-third-party-details/contact.njk', {
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


  module.exports.createContact = function(app) {
    return function(req, res) {
      var validatorResult

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Manipulate body to match user session for feedback
      req.body.thirdPartyDetails = {};
      req.body.thirdPartyDetails.contactPhone = req.body.contactPhone;
      req.body.thirdPartyDetails.contactEmail = req.body.contactEmail;
      req.body.thirdPartyDetails.mainPhone = req.body.mainPhone;
      req.body.thirdPartyDetails.otherPhone = req.body.otherPhone;
      req.body.thirdPartyDetails.emailAddress = req.body.emailAddress;
      req.body.thirdPartyDetails.emailAddressConfirmation = req.body.emailAddressConfirmation;

      // Create a copy of phone number values for validation without space characters
      req.body.validate= {
        contactPhone:  req.body.contactPhone,
        contactEmail: req.body.contactEmail,
        mainPhone: req.body.mainPhone.replace(/ /g, ''),
        otherPhone: req.body.otherPhone.replace(/ /g, ''),
        emailAddress: req.body.emailAddress,
        emailAddressConfirmation: req.body.emailAddressConfirmation
      }


      // Validate form submission
      validatorResult = validate(req.body.validate, require('../../../config/validation/third-party-details-contact')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('branches.third.party.details.contact.get'));
      }

      // Input validated, store information in session
      if (req.body.hasOwnProperty('contactPhone') === false || req.body.contactPhone !== 'By phone') {
        req.body.mainPhone = '';
        req.body.otherPhone = '';
      }

      if (req.body.hasOwnProperty('contactEmail') === false || req.body.contactEmail !== 'By email') {
        req.body.emailAddress = '';
        req.body.emailAddressConfirmation = '';
      }

      if (typeof req.session.user.thirdPartyDetails === 'undefined') {
        req.session.user.thirdPartyDetails = {};
      }

      req.session.user.thirdPartyDetails.contactPhone = req.body.contactPhone;
      req.session.user.thirdPartyDetails.contactEmail = req.body.contactEmail;
      req.session.user.thirdPartyDetails.mainPhone = req.body.mainPhone;
      req.session.user.thirdPartyDetails.otherPhone = req.body.otherPhone;
      req.session.user.thirdPartyDetails.emailAddress = req.body.emailAddress;
      req.session.user.thirdPartyDetails.emailAddressConfirmation = req.body.emailAddressConfirmation;

      // Normal change will forward us to the confirmation page
      if (req.session.change === true) {
        return res.redirect(app.namedRoutes.build('steps.confirm.information.tp.get'));
      }

      // If not a change, just go to next step in flow
      return res.redirect(app.namedRoutes.build('branches.third.party.reason.get'));
    };
  };

  module.exports.changeContact = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('branches.third.party.details.contact.get'));
    };
  };






})();
