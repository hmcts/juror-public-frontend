;(function(){
  'use strict';

  require('./custom-validation');

  module.exports.login = require('./login');
  module.exports.responderTYpe = require('./responder-type');
  module.exports.yourDetails = require('./your-details');
  module.exports.yourDetailsConfirm = require('././your-details-confirm');
  module.exports.qualify = require('./residency');
  module.exports.qualify = require('./mental-health');
  module.exports.qualify = require('./bail');
  module.exports.qualify = require('./convictions');
  module.exports.confirmDate = require('./confirm-date');
  module.exports.deferral = require('./deferral');
  module.exports.excusal = require('./excusal');
  module.exports.cjsEmployed = require('./cjs-employed');
  module.exports.reasonableAdjustment = require('./reasonable-adjustment');
  module.exports.confirmInformation = require('./confirm-information');
})();
