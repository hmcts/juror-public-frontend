/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  module.exports.index = function() {
    return function(req, res) {

      if (req.session.user){
        // Session exists - keep session data
        // reset change flag
        req.session.change = false;
      } else {
        // Reset all session data
        req.session.user = {};
        req.session.change = false;
      }

      return res.render('start-expense-calculator.njk');
    };
  };

})();
