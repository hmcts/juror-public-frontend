;(function(){
  'use strict';

  var _ = require('lodash')
    , urljoin = require('url-join')
    , config = require('../config/environment')()
    , options = {
      uri: config.apiEndpoint,
      headers: {
        'User-Agent': 'Request-Promise',
        'Content-Type': 'application/json'
      },
      resolveWithFullResponse: true,
    }

  , responseObject = {
    resource: '/actuator/health',
    get: function(rp, app) {
      var reqOptions = _.clone(options);

      reqOptions.uri = urljoin(reqOptions.uri.replace('api/v1', ''), this.resource);

      app.logger.debug('Sending request to API: ', {
        uri: reqOptions.uri,
        headers: reqOptions.headers,
        body: reqOptions.body,
      });

      return rp(reqOptions);
    }
  };

  module.exports.object = responseObject;
})();
