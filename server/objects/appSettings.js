;(function(){
  'use strict';

  var _ = require('lodash')
    , urljoin = require('url-join')
    , config = require('../config/environment')()
    , secretsConfig = require('config')
    , utils = require('../lib/utils')
    , options = {
      uri: config.apiEndpoint,
      headers: {
        'User-Agent': 'Request-Promise',
        'Content-Type': 'application/json'
      },
      json: true,
      transform: utils.basicDataTransform
    }
    , jwt = require('jsonwebtoken')

    , processData = function(body) {
      return body.data;
    }

    , appSettingsObject = {
      resource: 'auth/settings',
      get: function(rp, app) {
        var reqOptions = _.clone(options);

        reqOptions.headers.Authorization = jwt.sign({}, secretsConfig.get('secrets.juror-digital-vault.public-jwtNoAuthKey'), { expiresIn: secretsConfig.get('secrets.juror-digital-vault.public-jwtTTL') });
        reqOptions.transform = processData;
        reqOptions.uri = urljoin(reqOptions.uri, this.resource);

        app.logger.info('Sending request to API: ', {
          uri: reqOptions.uri,
          headers: reqOptions.headers,
          body: reqOptions.body,
        });

        return rp(reqOptions);
      }
    };

  module.exports.object = appSettingsObject;

})();
