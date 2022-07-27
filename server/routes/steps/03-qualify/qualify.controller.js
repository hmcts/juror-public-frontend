;(function(){
  'use strict';

  var _ = require('lodash')
    , validate = require('validate.js')
    , filters = require('../../../components/filters')
    , texts_en = require('../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../client/js/i18n/cy.json')
    , utils = require('../../../lib/utils');

  // Landing page functions
  module.exports.index = function() {
    return function(req, res) {

      var backLinkUrl;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else if (req.session.user.thirdParty === 'Yes'){
        backLinkUrl = 'branches.third.party.contact.details.get';
      } else {
        backLinkUrl = 'steps.your.details.date-of-birth.get';
      }
      

      return res.render('steps/03-qualify/index.njk', {
        user: req.session.user,
        backLinkUrl: backLinkUrl
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

  //
  // Residency functions
  //
  module.exports.getResidency = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        backLinkUrl = utils.getRedirectUrl('steps.qualify', req.session.user.thirdParty);
      }

      return res.render('steps/03-qualify/residency.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createResidency = function(app) {
    return function(req, res) {
      var validatorResult,
        redirectUrl = '';

      if (typeof req.session.user.qualify === 'undefined') {
        req.session.user.qualify = {};
      }

      // Clear details text if answer Yes
      if (req.body['livedConsecutive'] !== 'No'){
        req.body['livedConsecutiveDetails'] = '';
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
        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.residency', req.session.user.thirdParty)));
      }

      // Redirect
      if (req.session.change === true){
        redirectUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        redirectUrl = utils.getRedirectUrl('steps.qualify.cjs.employed', req.session.user.thirdParty);
      }
      return res.redirect(app.namedRoutes.build(redirectUrl));
    };
  };

  module.exports.changeResidency = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.residency', req.session.user.thirdParty)));
    };
  };

  //
  // CJS Employed functions
  //
  module.exports.getCJSEmployed = function() {
    return function(req, res) {
      var cjsActive
        , mergedUser
        , tmpErrors
        , backLinkUrl;

      // Get current value for cjsEmployer
      mergedUser = _.merge(_.cloneDeep(req.session.user), req.session.formFields);

      // If cjsEmployer is not present on formFields then ensure it is not merged in,
      // because this probably means that the user unselected all and submitted.
      //
      // Without this, when the error feedback comes back to say no employer are selected, the previously stored
      // values will be output from the user session.
      if (typeof req.session.formFields !== 'undefined' && typeof req.session.formFields.cjsEmployer === 'undefined') {
        delete mergedUser.cjsEmployer;
      }

      // Check what is active based on merger between user stored values and form submitted values
      if (typeof mergedUser !== 'undefined' && typeof mergedUser.cjsEmployer !== 'undefined') {
        cjsActive = {
          police: (mergedUser.cjsEmployer.indexOf('Police Force') !== -1),
          prison: (mergedUser.cjsEmployer.indexOf('HM Prison Service') !== -1),
          nca: (mergedUser.cjsEmployer.indexOf('National Crime Agency') !== -1),
          judiciary: (mergedUser.cjsEmployer.indexOf('Judiciary') !== -1),
          hmcts: (mergedUser.cjsEmployer.indexOf('HMCTS') !== -1),
          other: (mergedUser.cjsEmployer.indexOf('Other') !== -1)
        };
      }

      // Merge and then delete form fields and errors, prevents retention after pressing back l
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        backLinkUrl = utils.getRedirectUrl('steps.qualify.residency', req.session.user.thirdParty);
      }

      return res.render('steps/03-qualify/cjs-employed.njk', {
        user: mergedUser,
        cjsActive: cjsActive,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createCJSEmployed = function(app) {
    return function(req, res) {

      // Validate form submission
      var validatorResult
        , validatorResultTmp
        , validatorRules
        , validatorKey
        , cjsTmpArr
        , redirectUrl;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // clear checkboxes if no is selected
      if ((req.body['cjsEmployed'] === 'No') || (req.body['cjsEmployed'] === 'Nac ydw') || (req.body['cjsEmployed'] === 'Naddo')){
        delete req.body['cjsEmployer'];
        delete req.body['cjsEmployerDetails'];
        delete req.body['cjsPoliceDetails'];
        delete req.body['cjsPrisonDetails'];
        req.session.user.cjsEmployerDetails = '';
        req.session.user.cjsPoliceDetails = '';
        req.session.user.cjsPrisonDetails = '';
      } else if (typeof req.body['cjsEmployer'] !== 'undefined'){
        cjsTmpArr = _.clone(
          (_.isArray(req.body['cjsEmployer'])) ?
            req.body['cjsEmployer'] :
            [req.body['cjsEmployer']]);

        // delete down any non-selected item details
        if (cjsTmpArr.indexOf('Police Force') < 0){
          delete req.body['cjsPoliceDetails'];
        }
        if (cjsTmpArr.indexOf('HM Prison Service') < 0){
          delete req.body['cjsPrisonDetails'];
        }
        if (cjsTmpArr.indexOf('Other') < 0){
          delete req.body['cjsEmployerDetails'];
        }
      }

      // Validate form submission
      validatorRules = require('../../../config/validation/cjs-employed')(req);
      validatorResult = validate(req.body, validatorRules);
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.cjs.employed', req.session.user.thirdParty, null)));
      }

      // Store new info
      req.session.user.cjsEmployed = req.body['cjsEmployed'];
      req.session.user.cjsEmployer = req.body['cjsEmployer'];

      
      if (typeof req.session.user.cjsEmployer !== 'undefined') {
        cjsTmpArr = _.clone(
          (_.isArray(req.session.user.cjsEmployer)) ?
            req.session.user.cjsEmployer :
            [req.session.user.cjsEmployer]);

        // Clear down any non-selected item details
        if (cjsTmpArr.indexOf('Police Force') > -1){
          req.session.user.cjsPoliceDetails = req.body['cjsPoliceDetails'];
        } else {
          req.session.user.cjsPoliceDetails = '';
        }
        if (cjsTmpArr.indexOf('HM Prison Service') > -1){
          req.session.user.cjsPrisonDetails = req.body['cjsPrisonDetails'];
        } else {
          req.session.user.cjsPrisonDetails = '';
        }
        if (cjsTmpArr.indexOf('Other') > -1){
          req.session.user.cjsEmployerDetails = req.body['cjsEmployerDetails'];
        } else {
          req.session.user.cjsEmployerDetails = '';
        }
      }
      

      // Redirect as appropriate
      if (req.session.change === true){
        redirectUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        redirectUrl = utils.getRedirectUrl('steps.qualify.bail', req.session.user.thirdParty);
      }
      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.changeCJSEmployed = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.cjs.employed', req.session.user.thirdParty)));
    };
  };

  //
  // Mental Health - Sectioned functions
  //
  module.exports.getMentalHealthSectioned = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        backLinkUrl = utils.getRedirectUrl('steps.qualify.convictions', req.session.user.thirdParty);
      }

      return res.render('steps/03-qualify/mental-health-sectioned.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createMentalHealthSectioned = function(app) {
    return function(req, res) {
      var validatorResult,
        redirectUrl = '';

      // Clear details text if answer No
      if (req.body['mentalHealthSectioned'] !== 'Yes'){
        req.body['mentalHealthSectionedDetails'] = '';
      }

      // Store new info
      // Has to be first to properly retain answers if feeding back errors
      req.session.user.qualify.mentalHealthSectioned = {
        answer: req.body['mentalHealthSectioned'],
        details: req.body['mentalHealthSectionedDetails']
      };

      module.exports.mergeMentalHealthInfo(req);

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/mental-health-sectioned')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.mental.health.sectioned', req.session.user.thirdParty)));
      }

      // Redirect
      if (req.session.change === true){
        redirectUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        redirectUrl = utils.getRedirectUrl('steps.qualify.mental.health.capacity', req.session.user.thirdParty);
      }
      return res.redirect(app.namedRoutes.build(redirectUrl));
    };
  };

  module.exports.changeMentalHealthSectioned = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.mental.health.sectioned', req.session.user.thirdParty)));
    };
  };

  //
  // Mental Health - Capacity functions
  //
  module.exports.getMentalHealthCapacity = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        backLinkUrl = utils.getRedirectUrl('steps.qualify.mental.health.sectioned', req.session.user.thirdParty);
      }

      return res.render('steps/03-qualify/mental-health-capacity.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createMentalHealthCapacity = function(app) {
    return function(req, res) {
      var validatorResult,
        redirectUrl = '';

      // Clear details text if answer No
      if (req.body['mentalHealthCapacity'] !== 'Yes'){
        req.body['mentalHealthCapacityDetails'] = '';
      }

      // Store new info
      // Has to be first to properly retain answers if feeding back errors
      req.session.user.qualify.mentalHealthCapacity = {
        answer: req.body['mentalHealthCapacity'],
        details: req.body['mentalHealthCapacityDetails']
      };

      module.exports.mergeMentalHealthInfo(req);

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/mental-health-capacity')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;
        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.mental.health.capacity', req.session.user.thirdParty)));
      }

      // Redirect
      if (req.session.change === true){
        redirectUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        redirectUrl = utils.getRedirectUrl('steps.confirm.date', req.session.user.thirdParty);
      }
      return res.redirect(app.namedRoutes.build(redirectUrl));
    };
  };

  module.exports.changeMentalHealthCapacity = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.mental.health.capacity', req.session.user.thirdParty)));
    };
  };


  module.exports.mergeMentalHealthInfo = function(req) {

    var tmpSectioned
      , tmpCapacity
      , tmpDetails
      , tmpAnswer

    // Merge MentalHealthSectioned and MentalHealthCapacity details into MetalHealthAct

    if (typeof req.session.user.qualify.mentalHealthSectioned != 'undefined'){
      tmpSectioned = req.session.user.qualify.mentalHealthSectioned.answer;
    }
    if (typeof req.session.user.qualify.mentalHealthCapacity != 'undefined'){
      tmpCapacity = req.session.user.qualify.mentalHealthCapacity.answer;
    }

    tmpAnswer = '';
    tmpDetails = '';

    if (tmpSectioned === 'Yes' || tmpCapacity ==='Yes'){
      tmpAnswer = 'Yes';
    } else {
      tmpAnswer = 'No';
    }

    if (tmpSectioned === 'Yes'){
      tmpDetails = req.session.user.qualify.mentalHealthSectioned.details;
    }

    if (tmpCapacity === 'Yes'){
      if (tmpDetails === ''){
        tmpDetails = req.session.user.qualify.mentalHealthCapacity.details;
      } else {
        tmpDetails = tmpDetails.concat(' [MENTAL HEALTH Q2] ');
        tmpDetails = tmpDetails.concat(req.session.user.qualify.mentalHealthCapacity.details);
      }
    }

    req.session.user.qualify.mentalHealthAct = {
      answer: tmpAnswer,
      details: tmpDetails
    };

  };

  //
  // Bail functions
  //
  module.exports.getBail = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        backLinkUrl = utils.getRedirectUrl('steps.qualify.cjs.employed', req.session.user.thirdParty);
      }

      return res.render('steps/03-qualify/bail.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createBail = function(app) {
    return function(req, res) {
      var validatorResult,
        redirectUrl = '';

      // Clear details text if answer No
      if (req.body['onBail'] !== 'Yes'){
        req.body['onBailDetails'] = '';
      }

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
        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.bail', req.session.user.thirdParty)));
      }

      // Redirect
      if (req.session.change === true){
        redirectUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        redirectUrl = utils.getRedirectUrl('steps.qualify.convictions', req.session.user.thirdParty);
      }
      return res.redirect(app.namedRoutes.build(redirectUrl));

    };
  };

  module.exports.changeBail = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.bail', req.session.user.thirdParty)));
    };
  };

  //
  // Convictions functions
  //
  module.exports.getConvictions = function() {
    return function(req, res) {
      var tmpErrors
        , mergedUser
        , backLinkUrl;

      // Merge and then delete form fields and errors, prevents retention after pressing back link
      mergedUser = _.merge(_.cloneDeep(req.session.user), _.cloneDeep(req.session.formFields));
      tmpErrors = _.cloneDeep(req.session.errors);

      delete req.session.errors;
      delete req.session.formFields;

      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        backLinkUrl = utils.getRedirectUrl('steps.qualify.bail', req.session.user.thirdParty);
      }

      return res.render('steps/03-qualify/convictions.njk', {
        user: mergedUser,
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.createConvictions = function(app) {
    return function(req, res) {
      var validatorResult,
        redirectUrl;

      // Clear details text if answer No
      if (req.body['convicted'] !== 'Yes'){
        req.body['convictedDetails'] = '';
      }

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
        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.convictions', req.session.user.thirdParty)));
      }

      // Redirect
      if (req.session.change === true){
        redirectUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        //redirectUrl = utils.getRedirectUrl('steps.confirm.date', req.session.user.thirdParty);
        redirectUrl = utils.getRedirectUrl('steps.qualify.mental.health.sectioned', req.session.user.thirdParty);
      }
      return res.redirect(app.namedRoutes.build(redirectUrl));
    };
  };

  module.exports.changeConvictions = function(app) {
    return function(req, res) {
      req.session.change = true;
      req.session.back = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.qualify.convictions', req.session.user.thirdParty)));
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

})();
