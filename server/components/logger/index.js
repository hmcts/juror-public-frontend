/// Based on this gist: https://gist.github.com/rtgibbons/7354879

;(function(){
  'use strict';

  var winston = require('winston')
    , utils = require('../../lib/utils')
    , customColors = {
      trace: 'white',
      debug: 'green',
      info: 'green',
      warn: 'yellow',
      crit: 'red',
      fatal: 'red'
    }
    , levels = {
      fatal: 0,
      crit: 1,
      warn: 2,
      info: 3,
      debug: 4,
      trace: 5
    };

  module.exports = function(config) {

    var origLog
      , args
      , transports
      , loggerInst;

    // Configure our custom logger
    transports = [
      new (require('./juror-transport'))({
        level: 'trace',
      }),
    ];


    if (config.logConsole) {
      transports.push(new(winston.transports.Console)({
        level: config.logConsole,
        colorize: true,
        timestamp: true
      }));
    }


    // Setup the actual logger
    loggerInst = new(winston.Logger)({
      colors: customColors,
      levels: levels,
      transports: transports
    });

    winston.addColors(customColors);

    // Extend logger object to properly log 'Error' types
    origLog = loggerInst.log;

    loggerInst.log = function(level, msg) {
      if (msg instanceof Error) {
        args = Array.prototype.slice.call(arguments);
        args[1] = msg.stack;
        origLog.apply(loggerInst, args);
      } else {
        origLog.apply(loggerInst, arguments);
      }
    };

    // Ensure log directory exists
    utils.checkDirectoryCreate(config.logPath);

    // Return the logger instance to be used with require
    return loggerInst;

  };

})();
