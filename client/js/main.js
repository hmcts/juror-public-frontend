;(function(){
  'use strict';

  // Turn off jQuery animation
  jQuery.fx.off = true;

  // Fallback for new browser features
  // TEST EXCLUDE require('./polyfills/details.polyfill.js');
  // TEST EXCLUDE require('./polyfills/bind.polyfill.js');

  // jQuery plugins
  require('./jquery/jquery.tabs');
  require('./jquery/jquery.edit');

  // JS to enable plugins
  require('./components/selectButtons');
  // TEST EXCLUDE require('./components/showhide.js');
  require('./components/shims.js');
  require('./components/inlineEdit');
  require('./components/tabs');
  require('./components/saveQualifyAnswers');

  // For the configure prototype screen
  require('./components/populate');

  // Generic functionality to improve forms
  require('./components/forms');

})();
