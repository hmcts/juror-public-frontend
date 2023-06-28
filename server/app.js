/**
 * Main application file
 */

;(function(){
  'use strict';

  var express = require('express')
    , path = require('path')
    , _ = require('lodash')
    , config = require('./config/environment')()
    , logger = require('./components/logger')(config)
    , http = require('http')
    , ageSettingsObj = require('./objects/ageSettings').object
    , app = express()
    , server = http.createServer(app)

    , appTitle = require(path.resolve(__dirname, '../', 'package.json')).name
    , releaseVersion = require(path.resolve(__dirname, '../', 'package.json')).version
    , versionStr = appTitle + ' v' + releaseVersion
    , upperAgeLimit
    , lowerAgeLimit
    , pcqServiceEnabled = null
    , pcqServiceUrl = ''
    , pcqServiceReturnUrl = ''

  // Attach logger to app
  app.logger = logger;

  // Configure express
  require('./config/express')(app);
  require('./routes')(app);


  // A bit of shiny
  if (config.logConsole !== false) {
    console.info('\n\n');
    console.info(_.pad('###########', versionStr.length + 12, '#'));
    console.info('##    '+versionStr+'    ##');
    console.info(_.pad('###########', versionStr.length + 12, '#'));
    console.info('\n\n');
  }


  // Control server
  function startServer() {
    ageSettingsObj.get(require('request-promise'))
      .then(function(response) {

        // upperAgeLimit = 76;
        // lowerAgeLimit = 18;
        response.forEach(function(res) {

          switch (res.setting){
          case '100':
            upperAgeLimit = res.value
            break;
          case '101':
            lowerAgeLimit = res.value;
            break;
          }
        });
        app.ageSettings = {
          upperAgeLimit: upperAgeLimit,
          lowerAgeLimit: lowerAgeLimit
        };
      })
      .catch(function() {
        app.ageSettings = {
          upperAgeLimit: 76,
          lowerAgeLimit: 18
        };
      });

    app.pcqSettings = {
      serviceEnabled: null,
      serviceUrl: null,
      serviceReturnUrl: null
    };


    app.server = server.listen(config.port, config.ip, function() {
      if (config.logConsole !== false) {
        console.info('Express server listening on http://%s:%s', config.ip, config.port);
      }
    });
  }

  function stopServer() {
    if (config.logConsole !== false) {
      console.info('\nExpress server shutdown signal received');
    }

    if (typeof app.server !== 'undefined') {
      app.server.close(function() {
        process.exit(0);
        return;
      });
    }

    process.exit(0);
    return;
  }


  // Handle shutdown
  process.on('SIGINT', function() {
    stopServer();
  });

  //console.log('process.env:');
  //console.log(JSON.stringify(process.env));

  // Start the app immediately
  setImmediate(startServer);

  // Expose app
  exports = module.exports = app;

})();
