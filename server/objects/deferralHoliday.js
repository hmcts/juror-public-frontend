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

    , deferralHoidayObject = {
      resource: 'public/deferral-dates',
      post: function(rp, app, deferralDates, jwt) {
        var reqOptions = _.clone(options);

        reqOptions.headers.Authorization = jwt;
        reqOptions.uri = urljoin(reqOptions.uri, this.resource);
        reqOptions.body = deferralDates;
        reqOptions.method = 'POST';

        app.logger.debug('Sending request to API: ', {
          uri: reqOptions.uri,
          headers: reqOptions.headers,
          body: reqOptions.body,
        });

        return rp(reqOptions);
      }
    };


  module.exports.object = deferralHoidayObject;

})();
