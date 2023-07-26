;(function(){
  'use strict';

  module.exports.index = function() {
    return function(req, res) {
      return res.render('contact.njk');
    }
  };
})();
