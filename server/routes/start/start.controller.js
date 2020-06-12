/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  module.exports.index = function() {
    return function(req, res) {
      // Reset errors
      delete req.session.errors;

      // JDB-4383 - change start page to 00-responder-type
      return res.render('steps/00-responder-type/index.njk');
    };
  };

})();
