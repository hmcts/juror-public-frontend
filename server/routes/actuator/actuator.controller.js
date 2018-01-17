;(function(){
  'use strict';

  var path = require('path')
    , _ = require('lodash')
    , pkg = require(path.resolve(__dirname, '../../../', 'package.json'))

    , healthObj = require('../../objects/health').object
    , sendResponse = function(res, status, resp) {
      var fullResponse = _.merge(resp, {
        frontend: {
          status: 'UP',
          hello: 'world',
          name: pkg.name,
          version: pkg.version,
        },
      });

      return res.status(status).json(fullResponse);
    };

  module.exports.health = function(app) {
    return function(req, res) {
      healthObj.get(require('request-promise'), app).then(function(response) {
        return sendResponse(res, response.statusCode, JSON.parse(response.body));
      }).catch(function(error) {
        var parsedJson;

        try {
          parsedJson = JSON.parse(error.error);
        } catch (e) {
          parsedJson = error.error;
        }
        return sendResponse(res, 500, _.merge({status: 'DOWN'}, parsedJson));
      });
    };
  };

})();
