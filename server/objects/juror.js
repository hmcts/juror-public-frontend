;(function(){
  'use strict';

  var _ = require('lodash')
    , urljoin = require('url-join')
    , config = require('../config/environment')()
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

  , getSingleTransform = function(body) {
    var tmpBody = body;

    if (tmpBody.hasOwnProperty('data') && _.isArray(tmpBody.data)) {
      tmpBody = tmpBody.data[0];
    } else if (_.isArray(tmpBody)) {
      tmpBody = tmpBody[0];
    }

    return tmpBody;
  }

  , responseObject = {
    resource: 'public/juror',
    get: function(rp, app, id, jwt) {
      var reqOptions = _.clone(options);

      reqOptions.headers.Authorization = jwt;
      reqOptions.transform = getSingleTransform;
      reqOptions.uri = urljoin(reqOptions.uri, this.resource, id);

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
