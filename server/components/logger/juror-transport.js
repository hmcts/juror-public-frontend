;(function(){
  'use strict';

  var os = require('os')
    , ip = require('ip')
    , _ = require('lodash')
    , request = require('request')
    , urljoin = require('url-join')
    , util = require('util')
    , winston = require('winston')
    , moment = require('moment')
    , jwt = require('jsonwebtoken')
    , config = require('../../config/environment')()
    , secretsConfig = require('config')

    , JurorLogger = winston.transports.CustomLogger = function(options) {
      //
      // Name this logger
      //
      this.name = 'jurorLogger';

      //
      // Set the level from your options
      //
      this.level = options.level || 'info';
    };


  //
  // Inherit from `winston.Transport` so you can take advantage
  // of the base functionality and `.handleExceptions()`.
  //
  util.inherits(JurorLogger, winston.Transport);

  JurorLogger.prototype.log = function(level, msg, meta, callback) {
    //
    // Store this message and metadata, maybe use some custom logic
    // then callback indicating success.
    //
    var logstashOutput = {}
      , fields = meta
      , options;

    // Trace and Debug should not be sent to API
    if (level === 'trace' || level === 'debug') {
      return callback(null, true);
    }

    // inject to data
    fields = _.merge(fields, {
      'ip': ip.address(),
    });

    // use logstash format
    logstashOutput = {
      'message': msg,
      '@timestamp': moment().valueOf(),
      '@level': level,
      '@fields': fields,
      'host': os.hostname(),
    };

    this.latestLog = logstashOutput;

    this.jwtToken = jwt.sign({}, secretsConfig.get('secrets.juror-digital-vault.public-jwtNoAuthKey'), { expiresIn: secretsConfig.get('secrets.juror-digital-vault.public-jwtTTL') });

    options = {
      url: urljoin(config.apiEndpoint, 'auth/public/log'),
      method: 'POST',
      headers: {
        'User-Agent': 'request',
        'Content-Type': 'application/json',
        Authorization: this.jwtToken,
      },
      body: {
        message: this.latestLog,
      },
      json: true,
    };

    request.post(options, function(error, response, body) {
      if (error) {
        return callback(error);
      }

      return callback(null, true);
    });
  };


  // Export for use
  module.exports = JurorLogger;

})();
