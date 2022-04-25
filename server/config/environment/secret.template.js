;(function(){
  'use strict';

  // Secret values that should not be source controlled
  // ==================================
  module.exports = {
    // Key used to encrypt the session
    sessionSecret: '[super-secret-key]',

    // Key used to encrypt the JWT token
    jwtKey: '[super-secret-key]',

    // Key used prior to gaining authentication, for insecure endpoints
    jwtNoAuthKey: '[super-secret-key-login]',

    // Key used to encrypt the JWT token for Expense Calculator API
    jwtKeyBureau: '[super-secret-key-bureau]',

    // Number of seconds the JWT token will live for.
    jwtTTL: 60*60*8,
  };

})();
