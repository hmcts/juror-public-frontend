;(function(){
  'use strict';

  require('./custom-validation');

  module.exports = function(req) {
    return {
      dobDay: {
        dateOfBirthDay: req
      },
      dobMonth: {
        dateOfBirthMonth: req
      },
      dobYear: {
        dateOfBirthYear: req
      },
      dateOfBirth: {
        dateOfBirthLimits: req,
      },
    };
  };
})();
