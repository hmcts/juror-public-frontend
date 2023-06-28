;(function(){
  'use strict';

  var _ = require('lodash')
    , urljoin = require('url-join')
    , utils = require('../lib/utils')
    , options = {
      uri: '',
      headers: {
        'User-Agent': 'Request-Promise',
        'Content-Type': 'application/json'
      },
      json: true,
      transform: utils.basicDataTransform
    }

    , pcqServiceObject = {
      getHealth: function(rp, app) {
        var reqOptions = _.clone(options);

        reqOptions.uri = urljoin(app.pcqSettings.serviceUrl, 'health');

        app.logger.info('Sending request to API: ', {
          uri: reqOptions.uri,
          headers: reqOptions.headers,
          body: reqOptions.body,
        });

        return rp(reqOptions);
      }
    };

  module.exports.object = pcqServiceObject;
})();
