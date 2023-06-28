;(function(){
  'use strict';

  var secretsConfig = require('config')
    , errors = require('../errors')
    , appSettingsObj = require('../../objects/appSettings').object
    , pcqServiceObj = require('../../objects/pcqService').object
    , { v4: uuidv4 } = require('uuid')
    , crypto = require('crypto')
    , urlJoin = require('url-join')
    , utils = require('../../lib/utils')

    , createToken = function(req, app, params) {
  
      var encryptedToken
      , tokenKey
      , algorithm = 'aes-256-gcm'
      , cipher
      , keyLen = 32
      , key
      , bufferSize = 16
      , iv = Buffer.alloc(bufferSize, 0)
      , paramString
      , authTag

      try {
        //tokenKey ='SERVICE_TOKEN_KEY'
        tokenKey = secretsConfig.get('secrets.juror-digital-vault.public-pcqTokenKey')  
      } catch(e) {
        app.logger.info('No PCQ Key found in key vault:  secrets.juror-digital-vault.public-pcqTokenKey');
      }

      if (tokenKey){
        Object.keys(params).map(function(o) {
          params[o] = String(params[o])
        });
        paramString = JSON.stringify(params)

        app.logger.info('PCQ Create token');
        app.logger.info('PCQ Token key:',tokenKey);

        key = crypto.scryptSync(tokenKey, 'salt', keyLen);
        cipher = crypto.createCipheriv(algorithm, key, iv);
        encryptedToken = cipher.update(paramString, 'utf8', 'hex');
        encryptedToken += cipher.final('hex');

        authTag = cipher.getAuthTag().toString('base64');

        app.logger.info('PCQ authTag:', authTag);

      }

      return encryptedToken;

    }

    , checkPCQ = function(req, app, successCB, errorCB) {
      // Check if PCQ is valid for the current environment / user session
      // PCQ Service can be invoked if: PCQ enabled (APP_SETTINGS), not already called, not 3rd Party response
      var proceedWithPCQ = false
        , pcqServiceEnabled = false
        , isThirdParty = req.session.user.thirdParty === 'Yes'

        , pcqAppSettingsResponse = function(response) {

          app.pcqSettings = {
            serviceEnabled: null,
            serviceUrl: null,
            serviceReturnUrl: null
          };

          response.forEach(function(res) {
            switch (res.setting){
            case 'PCQ_SERVICE_ENABLED':
              pcqServiceEnabled = (res.value === 'TRUE');
              app.pcqSettings.serviceEnabled = pcqServiceEnabled;
              break;
            case 'PCQ_SERVICE_URL':
              app.pcqSettings.serviceUrl = res.value;
              break;
            case 'PCQ_SERVICE_RETURN_URL':
              app.pcqSettings.serviceReturnUrl = res.value;
              break;
            }
          });

          app.logger.info('PCQ APP_SETTINGS:', 'PCQ_SERVICE_ENABLED:', app.pcqSettings.serviceEnabled, 
                          ', PCQ_SERVICE_URL:', app.pcqSettings.serviceUrl, 
                          ', PCQ_SERVICE_RETURN_URL:', app.pcqSettings.serviceReturnUrl);

          if ((!req.session['pcqId']) && (pcqServiceEnabled === true) && (isThirdParty === false) && (app.pcqSettings.serviceUrl)){
            proceedWithPCQ = true;
          }
    
          if (!proceedWithPCQ){
            app.logger.info('PCQ enabled:', pcqServiceEnabled, ', PCQ already invoked:', (req.session['pcqSettings'] ? 'true':'false'), ', Third party:', isThirdParty, ', PCQ_SERVICE_URL:',  app.pcqSettings.serviceUrl);
          }
          app.logger.info('Proceed with PCQ:', proceedWithPCQ);
    
          return successCB(proceedWithPCQ);

        }
        , pcqAppSettingsFailed = function(response) {
          app.logger.info('Get PCQ APP_SETTINGS failed: ', response);
          return errorCB(false);
        }

      if ((!req.session['pcqId']) && (isThirdParty === false)){
      // Send request
        app.logger.info('Get PCQ APP_SETTINGS');
        appSettingsObj.get(require('request-promise'), app)
          .then(pcqAppSettingsResponse)
          .catch(pcqAppSettingsFailed);
      } else {
        app.logger.info('PCQ already invoked:', (req.session['pcqSettings'] ? 'true':'false'), ', Third party:', isThirdParty);
        return successCB(false);
      }
    }

    , invokePCQ = function(req, app, res) {

      var pcqServiceUp = false
        , pcqId = uuidv4()
        , params = {}
        , token
        , queryString
        , pcqUrl

        , pcqHealthResponse = function(response) {
          app.logger.info('PCQ Health check response: ', response);

          pcqServiceUp = response.status === 'UP';
          app.logger.info('PCQ Service:', app.pcqSettings.serviceUrl, 'status is:',  pcqServiceUp ? 'UP' : 'DOWN');

          if (pcqServiceUp){

            try {
              params = {
                serviceId: 'JurorDigital',
                actor: 'CITIZEN',
                ccdCaseId: null,
                pcqId,
                partyId: 'anonymous',
                returnUrl: null,
                language: req.i18n_lang
              };

              //JDB-5363 pass JurorNumber as ccdCaseId
              if (req.session.user['jurorNumber']){
                params.ccdCaseId = req.session.user['jurorNumber'];
              }

              if (app.pcqSettings.serviceReturnUrl){
                params.returnUrl = app.pcqSettings.serviceReturnUrl;
              } else {
                params.returnUrl = urlJoin(req.headers.host, app.namedRoutes.build('steps.confirm.information.get'));
              }

              token = createToken(req, app, params);
              params.token = token;

              queryString = Object.keys(params).map(function(o) {
                return encodeURIComponent(o) + '=' + encodeURIComponent(params[o])
              }).join('&')

              pcqUrl = urlJoin(app.pcqSettings.serviceUrl, ('service-endpoint?' + queryString));

              // Store PCQ Id in session
              req.session['pcqId'] = params.pcqId;

              app.logger.info('PCQ Redirect Url:', pcqUrl);
              return res.redirect(pcqUrl);

            } catch(e){
              app.logger.info('Error setting PCQ params:', e);
              return skipPCQ(req, app, res);
            }

          }

          return skipPCQ(req, app, res);

        }
        , pcqHealthError = function(response) {
          app.logger.info('PCQ Health check attempt failed: ', response);

          return skipPCQ(req, app, res);
        };

      req.session.pcqSettings = {};
      req.session.pcqSettings.pcqId = pcqId;

      // Send request
      return pcqServiceObj.getHealth(require('request-promise'), app)
        .then(pcqHealthResponse)
        .catch(pcqHealthError);

    }

    , skipPCQ = function(req, app, res) {
      // Do not invoke PCQ, redirect to next page
      app.logger.info('Skipping PCQ');

      return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty)));
      
    }

  // Export public functions
  module.exports.invokePCQ = invokePCQ;
  module.exports.checkPCQ = checkPCQ;

})();
