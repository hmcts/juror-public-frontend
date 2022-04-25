/// This file is a template for environment specific configuration. You can copy this file
/// and modify the values to match the given environment.
///
/// Using the NODE_ENV={value} startup option, a file with the name that matches {value}.js
/// will be loaded into the configuration object.
;(function(){
  'use strict';

  // Production specific configuration
  // =================================
  module.exports = {
    // IP Address to serve the front-end application on
    ip: process.env.IP || '127.0.0.1',

    // Port to serve the front-end application on
    port: process.env.PORT || 8080,
  };

})();
