/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function() {
  'use strict';

  var validate = require('validate.js')
    , _ = require('lodash')
    , config = require('../../../config/environment')()
    , filters = require('../../../components/filters')
    , texts_en = require('../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../client/js/i18n/cy.json')
    , authComponent = require('../../../components/auth')
    , msgMappingsEn = require('../../../components/errors/message-mapping_en')
    , msgMappingsCy = require('../../../components/errors/message-mapping_cy')
    , utils = require('../../../lib/utils');

  module.exports.index = function(app) {
    return function(req, res) {
      var tmpErrors;

      // If already logged in, redirect to inbox
      if (typeof res.locals.authentication !== 'undefined') {
        return res.redirect(app.namedRoutes.build('steps.your.details.get'));
      }

      // On first load of app we want to create a JWT that will be used for all API calls.
      //
      // It will have an empty body to begin with
      authComponent.createJWTToken(req, {}, config.jwtNoAuthKey);


      // On load of page, we should clear any data
      if (typeof req.session.user === 'undefined' || typeof req.session.user.thirdParty === 'undefined') {
        return res.redirect(app.namedRoutes.build('steps.responder.type.get'));
      }

      // Reset user session data
      req.session.user = {
        thirdParty: req.session.user.thirdParty,
      }

      // Merge and then delete errors, prevents retention after pressing back link
      tmpErrors = _.cloneDeep(req.session.errors);
      delete req.session.errors;

      return res.render('steps/01-login.njk', {
        user: req.session.user,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        }
      });
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {
      var validatorResult
        , tmpSession

        , authSuccess = function(resp) {
          tmpSession = req.session;

          app.logger.info('Login attempt for juror number "' + req.body.jurorNumber + '" succeeded.', {
            jurorNumber: req.body.jurorNumber,
            jurorLastName: req.body.jurorLastName,
            jurorPostcode: req.body.jurorPostcode,
            jwt: req.session.authToken,
            response: resp,
          });

          // Regenerate session
          req.session.regenerate(function(err) {
            if (err) {
              throw err;
            }

            // Regenerate the session
            req.session.authToken = tmpSession.authToken;
            req.session.authKey = tmpSession.authKey;
            req.session.ulang = tmpSession.ulang;
            req.session.user = _.merge(tmpSession.user, {
              jurorNumber: req.body['jurorNumber'],
              jurorLastName: req.body['jurorLastName'],
              jurorPostcode: req.body['jurorPostcode'],
            });
            // redirect to confirmation of replying on behalf of someone`
            // if selected, otherwise move on to your details.
            if (req.session.user['thirdParty'] === 'Yes') {
              return res.redirect(app.namedRoutes.build('branches.third.party.details.get'));
            }
            return res.redirect(app.namedRoutes.build('steps.your.details.get'));
          });
        }

        , authFailure = function(err) {
          // eslint-disable-next-line max-len
          app.logger.crit('Login attempt for juror number "' + req.body.jurorNumber + '" responded with ' + err.statusCode, {
            jurorNumber: req.body.jurorNumber,
            jurorLastName: req.body.jurorLastName,
            jurorPostcode: req.body.jurorPostcode,
            jwt: req.session.authToken,
            error: (typeof err.originalError.error !== 'undefined') ? err.originalError.error : err.originalError
          });

          // Add error feedback
          req.session.errors = {
            authentication: [{
              summary: (req.session.ulang === 'cy' ? msgMappingsCy : msgMappingsEn).logon[err.error],
            }],
          };

          if (err.error === 'USER_NOT_FOUND') {
            req.session.errors.jurorNumber = [{
              details: '',
            }];
            req.session.errors.jurorLastName = [{
              details: '',
            }];
            req.session.errors.jurorPostcode = [{
              details: '',
            }];
          }

          return res.redirect(app.namedRoutes.build('steps.login.get'));
        };

      // Reset error and saved field sessions
      delete req.session.errors;


      // Validate form submission
      req.body.jurorPostcode = req.body.jurorPostcode.replace(/\s*$/, '');
      validatorResult = validate(req.body, require('../../../config/validation/login')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        return res.redirect(app.namedRoutes.build('steps.login.get'));
      }

      // Send login to backend, callbacks will return as required
      authComponent.authenticate(req, app, authSuccess, authFailure);

    };
  };

})();
