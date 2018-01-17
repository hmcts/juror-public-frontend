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

      return res.render('start.njk');
    };
  };

})();
