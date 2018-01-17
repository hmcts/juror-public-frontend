;(function(){
  'use strict';

  var _ = require('lodash')
    , validate = require('validate.js')
    , filters = require('../../../components/filters')
    , texts = require('../../../../client/js/i18n/en.json')
    , utils = require('../../../lib/utils');

// Landing page functions
  module.exports.index = function() {
    return function(req, res) {
      return res.render('steps/03-qualify/index.njk', {
        user: req.session.user,
      });
    };
  };

  module.exports.store = function() {
    return function(req, res) {
      if (typeof req.session.user.qualify === 'undefined') {
        req.session.user.qualify = {};
      }

      if (typeof req.session.user.qualify[req.body['name'].replace('Details', '')] === 'undefined') {
        req.session.user.qualify[req.body['name'].replace('Details', '')] = {};
      }

      if (req.body['name'].indexOf('Details') === -1) {
        req.session.user.qualify[req.body['name']].answer = req.body['value'];
      } else {
        req.session.user.qualify[req.body['name'].replace('Details', '')].details = req.body['value'];
      }
      res.status(204).send();
    };
  };

  // Residency functions
  module.exports.getResidency = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      return res.render('steps/03-qualify/residency.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', texts),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
      });
    };
  };

  module.exports.createResidency = function(app) {
    return function(req, res) {
      var validatorResult;

      if (typeof req.session.user.qualify === 'undefined') {
        req.session.user.qualify = {};
      }

      // Store new info
      // Has to be first to properly retain answers if feeding back errors
      req.session.user.qualify.livedConsecutive = {
        answer: req.body['livedConsecutive'],
        details: req.body['livedConsecutiveDetails']
      };

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;


      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/residency')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build('steps.qualify.residency.get'));
      }

      // Redirect
      if (req.session.change === true){
        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }
      return res.redirect(app.namedRoutes.build('steps.qualify.mental.health.get'));
    };
  };

  module.exports.storeResidency = function() {
    return function(req, res) {
      if (typeof req.session.user.qualify === 'undefined') {
        req.session.user.qualify = {};
      }

      if (typeof req.session.user.qualify[req.body['name'].replace('Details', '')] === 'undefined') {
        req.session.user.qualify[req.body['name'].replace('Details', '')] = {};
      }

      if (req.body['name'].indexOf('Details') === -1) {
        req.session.user.qualify[req.body['name']].answer = req.body['value'];
      } else {
        req.session.user.qualify[req.body['name'].replace('Details', '')].details = req.body['value'];
      }
      res.status(204).send();
    };
  };


  module.exports.changeResidency = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('steps.qualify.residency.get'));
    };
  };

  module.exports.getResidencyInfo = function() {
    return function(req, res) {
      return res.render('steps/03-qualify/residency-info.njk', { user: req.session.user });
    };
  };

  // Mental Health functions
  module.exports.getMentalHealth = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      return res.render('steps/03-qualify/mental-health.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', texts),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
      });
    };
  };

  module.exports.createMentalHealth = function(app) {
    return function(req, res) {
      var validatorResult;


      // Store new info
      // Has to be first to properly retain answers if feeding back errors
      req.session.user.qualify.mentalHealthAct = {
        answer: req.body['mentalHealthAct'],
        details: req.body['mentalHealthActDetails']
      };

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/mental-health')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build('steps.qualify.mental.health.get'));
      }

      // Redirect
      if (req.session.change === true){
        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }
      return res.redirect(app.namedRoutes.build('steps.qualify.bail.get'));
    };
  };

  module.exports.changeMentalHealth = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('steps.qualify.mental.health.get'));
    };
  };

  module.exports.getMentalHealthInfo = function() {
    return function(req, res) {
      return res.render('steps/03-qualify/mental-health-info.njk', { user: req.session.user });
    };
  };


  // Bail functions
  module.exports.getBail = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      return res.render('steps/03-qualify/bail.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', texts),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
      });
    };
  };

  module.exports.createBail = function(app) {
    return function(req, res) {
      var validatorResult;


      // Store new info
      // Has to be first to properly retain answers if feeding back errors
      req.session.user.qualify.onBail = {
        answer: req.body['onBail'],
        details: req.body['onBailDetails']
      };

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;


      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/bail')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build('steps.qualify.bail.get'));
      }

      // Redirect
      if (req.session.change === true){
        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }
      return res.redirect(app.namedRoutes.build('steps.qualify.convictions.get'));
    };
  };

  module.exports.changeBail = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('steps.qualify.bail.get'));
    };
  };


  module.exports.getBailInfo = function() {
    return function(req, res) {
      return res.render('steps/03-qualify/bail-info.njk', { user: req.session.user });
    };
  };

  module.exports.getConvictions = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      return res.render('steps/03-qualify/convictions.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', texts),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
      });
    };
  };

  module.exports.createConvictions = function(app) {
    return function(req, res) {
      var validatorResult;


      // Store new info
      // Has to be first to properly retain answers if feeding back errors
      req.session.user.qualify.convicted = {
        answer: req.body['convicted'],
        details: req.body['convictedDetails']
      };

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;


      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/convictions')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build('steps.qualify.convictions.get'));
      }

      // Redirect
      if (req.session.change === true){
        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }
      return res.redirect(app.namedRoutes.build('steps.confirm.date.get'));
    };
  };

  module.exports.changeConvictions = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build('steps.qualify.convictions.get'));
    };
  };

  module.exports.storeConvictions = function() {
    return function(req, res) {
      if (typeof req.session.user.qualify === 'undefined') {
        req.session.user.qualify = {};
      }

      if (typeof req.session.user.qualify[req.body['name'].replace('Details', '')] === 'undefined') {
        req.session.user.qualify[req.body['name'].replace('Details', '')] = {};
      }

      if (req.body['name'].indexOf('Details') === -1) {
        req.session.user.qualify[req.body['name']].answer = req.body['value'];
      } else {
        req.session.user.qualify[req.body['name'].replace('Details', '')].details = req.body['value'];
      }
      res.status(204).send();
    };
  };

  module.exports.getConvictionsInfo = function() {
    return function(req, res) {
      return res.render('steps/03-qualify/convictions-info.njk', { user: req.session.user });
    };
  };




})();
