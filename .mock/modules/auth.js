;(function(){
  'use strict';

  var _ = require('lodash')

    , createPostResponse = function(originalResource, newObject) {
      return {
        data: newObject
      };
    }

    , checkPostFields = function(originalResource, newObject) {
      return true;
    };


  module.exports = {
    createPostResponse: createPostResponse,
    checkPostFields: checkPostFields,
  };
})();
