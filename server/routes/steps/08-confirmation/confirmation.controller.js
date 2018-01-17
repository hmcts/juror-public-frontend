var _ = require('lodash');

;(function(){
  'use strict';

  function popSessionData(req) {
    var finalData = _.cloneDeep(req.session);

    // Make sure the user session exists
    if (typeof finalData.user === 'undefined') {
      finalData.user = {};
    }

    return new Promise(function(resolve, reject) {
      req.session.destroy(function(err) {
        if (err) {
          reject(err);
        }

        resolve(finalData);
      });
    });

  }

  module.exports.index = function(app) {
    return function(req, res) {
      var template = 'index.njk';

      popSessionData(req)
        .then(function(sessionData) {
          return res.render('steps/08-confirmation/' + template, {
            user: sessionData.user
          });
        })
        .catch(function() {
          return res.render('steps/08-confirmation/' + template);
        });
    };
  };

  module.exports.excusal = function(app) {
    return function(req, res) {
      var template = 'excusal.njk';

      popSessionData(req)
        .then(function(sessionData) {
          return res.render('steps/08-confirmation/' + template, {
            user: sessionData.user
          });
        })
        .catch(function() {
          return res.render('steps/08-confirmation/' + template);
        });
    };
  };

  module.exports.deferral = function(app) {
    return function(req, res) {
      var template = 'deferral.njk';

      popSessionData(req)
        .then(function(sessionData) {
          return res.render('steps/08-confirmation/' + template, {
            user: sessionData.user
          });
        })
        .catch(function() {
          return res.render('steps/08-confirmation/' + template);
        });
    };
  };

  module.exports.age = function(app) {
    return function(req, res) {
      var template = 'age.njk';

      popSessionData(req)
        .then(function(sessionData) {
          return res.render('steps/08-confirmation/' + template, {
            user: sessionData.user
          });
        })
        .catch(function() {
          return res.render('steps/08-confirmation/' + template);
        });
    };
  };

  module.exports.deceased = function(app) {
    return function(req, res) {
      var template = 'deceased.njk';

      popSessionData(req)
        .then(function(sessionData) {
          return res.render('steps/08-confirmation/' + template, {
            user: sessionData.user
          });
        })
        .catch(function() {
          return res.render('steps/08-confirmation/' + template);
        });
    };
  };

})();
