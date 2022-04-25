;(function(){
  'use strict';

  var path = require('path')
    , _ = require('lodash')
    , winston = require('winston')
    , fs = require('fs')
    , merged = []
    , environmentFileName = (process.env.NODE_ENV || 'development')

    , environmentConfiguration = function() {
      // All configurations will extend these options
      // ============================================
      var all = {
        env: (process.env.NODE_ENV || 'development'),

        // Root path of server
        root: path.normalize(__dirname + '/../../..'),

        // Server port
        port: process.env.PORT || 3000,

        // Server IP
        ip: process.env.IP || '0.0.0.0',

        // Remote Url for Backend API
        apiEndpoint: process.env.API_ENDPOINT || 'http://localhost:8080/api/v1/',

        // Authentication, must be string
        // If true will use http Basic Auth to protect the Alpha/Beta
        useAuth: 'false',

        // SSL, must be string
        // If true then any non https requests will be redirected to the https equivalent
        useHttps: 'false',

        // Google analytics tracking code
        trackingCode: process.env.TRACKING_CODE || '',

        // If anything other than false, logs will be output in terminal using the provided log level as minimum level
        logConsole: false,
      };

      // Export the config object based on the NODE_ENV
      // ==============================================
      merged = _.merge(
        all,
        require('./shared'));


      // Try to access configuration file for current NODE_ENV
      try {
        fs.accessSync(__dirname + '/' + environmentFileName + '.js', fs.F_OK);
        merged = _.merge(merged, require('./' + environmentFileName + '.js'));
      } catch (e) {
        // It isn't accessible
        winston.error(e);
      }


      /*
      // Try to access configuration file for secret values
      try {
        fs.accessSync(__dirname + '/secret.js', fs.F_OK);
        merged = _.merge(merged, require('./secret.js'));
      } catch (e) {
        // It isn't accessible
        winston.error(e);
      }
      */


      return merged;

    };

  module.exports = environmentConfiguration;

})();
