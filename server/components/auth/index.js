;(function(){
  'use strict';

  var jwt = require('jsonwebtoken')

    , secretsConfig = require('config')
    , errors = require('../errors')
    , authObj = require('../../objects/auth').object
    , msgMappingsEn = require('../errors/message-mapping_en')
    , msgMappingsCy = require('../errors/message-mapping_cy')

    , createJWTToken = function(req, body, key) {
      // if user is found create a token
      var token = jwt.sign(body, key, { expiresIn: secretsConfig.get('secrets.juror-digital-vault.public-jwtTTL') });

      // Store in session
      req.session.authToken = token;
      req.session.authKey = key;

      return token;
    }

    , getToken = function(req) {
      var decoded = jwt.decode(req.session.authToken);

      if (decoded !== null && decoded.hasOwnProperty('data')) {
        return decoded.data;
      }
      return decoded;
    }

    , authenticate = function(req, app, successCB, errorCB) {
      var userObj = {
          jurorNumber: req.body.jurorNumber,
          lastName: req.body.jurorLastName,
          postcode: req.body.jurorPostcode,
        }
        , authSuccess = function(resp) {
          var tokenBody = {
            data: {
              jurorNumber: resp.jurorNumber + '',
              roles: resp.roles,
            }
          };

          createJWTToken(req, tokenBody, secretsConfig.get('secrets.juror-digital-vault.public-jwtKey'));
          return successCB(resp);
        }
        , authFailure = function(err) {
          var errJson = { statusCode: err.statusCode, error: 'USER_NOT_FOUND', originalError: err }
            , identifiedErr
            , logonMsgs = (req.session.ulang === 'cy' ? msgMappingsCy : msgMappingsEn).logon;

          // Map the provided error message to our identifiers
          Object.keys(logonMsgs).forEach(function(key) {
            if (typeof err.error !== 'undefined' && key === err.error.message) {
              identifiedErr = key + (req.session.user.thirdParty === 'Yes' ? '_thirdParty' : '');
            }
          });

          // Set the returned error message to this identifier
          if (typeof identifiedErr !== 'undefined') {
            errJson.error = identifiedErr;
          }

          // Return the error as an identifier
          return errorCB(errJson);
        };

      // Send request using auth request object
      return authObj.post(require('request-promise'), app, req.session.authToken, userObj)
        .then(authSuccess)
        .catch(authFailure);
    }

    , verify = function(req, res, next) {
      // check header or url parameters or post parameters for token
      var token = req.session.authToken;

      // decode token
      if (token) {
        // verifies secret and checks expiry
        jwt.verify(token, req.session.authKey, function(err, decoded) {
          if (err) {
            return errors(req, res, 403, '/steps/00-responder-type');
          }

          // if no errors, then decode and verify the token body
          req.decoded = decoded;

          // if we do not have a userLevel property then we should assume this
          // token is not for a logged in user.
          if (!decoded.hasOwnProperty('data') || !decoded.data.hasOwnProperty('jurorNumber')) {
            return errors(req, res, 403, '/steps/00-responder-type');
          }

          // If all is well then we check for a data tag in the response
          // and strip it out.
          if (decoded.hasOwnProperty('data')) {
            req.session.authentication = decoded.data;
          } else {
            req.session.authentication = decoded;
          }

          // Send login status to templates
          res.locals.authentication = req.session.authentication;

          return next();
        });

      } else {
        // Without a authentication token, we show an error page
        return errors(req, res, 403, '/steps/00-responder-type');
      }
    }

    , completeCheck = function(req, res, next) {
      if (req.session.user.completed) {
        return res.redirect(req.app.namedRoutes.build(req.session.user.completed));
      }

      return next();
    };


  // Export public functions
  module.exports.createJWTToken = createJWTToken;
  module.exports.authenticate = authenticate;
  module.exports.verify = verify;
  module.exports.getToken = getToken;
  module.exports.completeCheck = completeCheck;

})();
