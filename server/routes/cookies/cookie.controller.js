;(function(){
  'use strict';

  module.exports.index = function() {
    return function(req, res) {
      if (req.session.back === true){
        delete req.session.errors;
        req.session.back = false;
      }
      return res.render('cookies.njk');
    };
  };
})();
