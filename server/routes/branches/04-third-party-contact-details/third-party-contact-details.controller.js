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
        backLinkUrl = 'branches.third.party.personal.details.date-of-birth.get';
      }

      return res.render('branches/04-third-party-contact-details/index.njk', {
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

  module.exports.create = function(app) {
    return function(req, res) {
      var validatorResult;


      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Reset phone fields if not selected
      if (req.body['useJurorPhoneDetails'] === 'No'){
        req.body['primaryPhone'] = '';
        req.body['secondaryPhone'] = '';
      }

      // Reset email fields if not selected
      if (req.body['useJurorEmailDetails'] === 'No'){
        req.body['emailAddress'] = '';
        req.body['emailAddressConfirmation'] = '';
      }

      // Create a copy of phone number values for validation without space characters
      req.body.validate = {
        useJurorPhoneDetails: req.body.useJurorPhoneDetails,
        useJurorEmailDetails: req.body.useJurorEmailDetails,
        primaryPhone: req.body.primaryPhone.replace(/ /g, ''),
        secondaryPhone: req.body.secondaryPhone.replace(/ /g, ''),
        emailAddress: req.body.emailAddress,
        emailAddressConfirmation: req.body.emailAddressConfirmation
      }

      // Validate form submission
      validatorResult = validate(req.body.validate, require('../../../config/validation/third-party-contact-details')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('branches.third.party.contact.details.get'));
      }


      // Input validated, store information in session
      if (typeof req.session.user.thirdPartyDetails === 'undefined') {
        req.session.user.thirdPartyDetails = {};
      }

      req.session.user['useJurorPhoneDetails'] = req.body['useJurorPhoneDetails'];
      req.session.user['useJurorEmailDetails'] = req.body['useJurorEmailDetails'];
      req.session.user['primaryPhone'] = (req.session.user['useJurorPhoneDetails'] === 'No') ? '' : req.body['primaryPhone'];
      req.session.user['secondaryPhone'] = (req.session.user['useJurorPhoneDetails'] === 'No') ? '' : req.body['secondaryPhone'];
      req.session.user['emailAddress'] = (req.session.user['useJurorEmailDetails'] === 'No') ? '' : req.body['emailAddress'];
      req.session.user['emailAddressConfirmation'] = (req.session.user['useJurorEmailDetails'] === 'No') ? '' : req.body['emailAddressConfirmation'];


      if (req.session.change === true) {
        return res.redirect(app.namedRoutes.build('steps.confirm.information.tp.get'));
      }

      return res.redirect(app.namedRoutes.build('steps.qualify.tp.get'));
    };
  };

  module.exports.change = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('branches.third.party.contact.details.get'));
    };
  };

})();
