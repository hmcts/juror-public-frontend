;(function() {
  'use strict';

  require('@hmcts/properties-volume').addTo(require('config'));

  // Export the application
  exports = module.exports = require('./app');

})();
