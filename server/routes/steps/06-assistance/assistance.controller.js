/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var _ = require('lodash')
    , validate = require('validate.js')
    , filters = require('../../../components/filters')
    , texts = require('../../../../client/js/i18n/en.json')

  module.exports.index = function() {
    return function(req, res) {
      var assistanceActive
        , merged;

      // Get current value for assistanceType
      merged = _.merge(_.cloneDeep(req.session.user), req.session.formFields);

      // If assistanceType is not present on formFields then ensure it is not merged in,
      // because this probably means that the user unselected all and submitted.
      //
      // Without this, when the error feedback comes back to say no employer are selected, the previously stored
      // values will be output from the user session.
      if (
        typeof req.session.formFields !== 'undefined' &&
        typeof req.session.formFields.assistanceType === 'undefined'
      ) {
        delete merged.assistanceType;
      }

      // Check what is active based on merger between user stored values and form submitted values
      if (typeof merged !== 'undefined' && typeof merged.assistanceType !== 'undefined') {
        assistanceActive = {
          mobility: (merged.assistanceType.indexOf('Limited mobility') !== -1),
          hearing: (merged.assistanceType.indexOf('Hearing impairment') !== -1),
          diabetes: (merged.assistanceType.indexOf('Diabetes') !== -1),
          sight: (merged.assistanceType.indexOf('Severe sight impairment') !== -1),
          learningDisability: (merged.assistanceType.indexOf('Learning disability') !== -1),
          other: (merged.assistanceType.indexOf('Other') !== -1)
        };
      }

      if (req.session.change === true){
        delete req.session.errors;
        req.session.change = false;
      }

      return res.render('steps/06-assistance/index.njk', {
        user: _.merge(req.session.user, merged),
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', texts),
          message: '',
          count: typeof req.session.errors !== 'undefined' ? Object.keys(req.session.errors).length : 0,
          items: req.session.errors,
        },
        assistanceActive: assistanceActive
      });
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {

      // Validate form submission
      var validatorResult;

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // clear checkboxes if no is selected
      if (req.body['assistanceNeeded'] === 'No'){
        delete req.body['assistanceType'];
      }

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/reasonable-adjustment')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build('steps.assistance.get'));
      }


      // Store new info
      req.session.user.assistanceNeeded = req.body['assistanceNeeded'];

      // Clear other values if they answered no to assistance required
      req.session.user.assistanceType = (req.session.user.assistanceNeeded === 'Yes') ?
        req.body['assistanceType'] :
        '';

      req.session.user.assistanceTypeDetails = (req.session.user.assistanceNeeded === 'Yes') ?
        req.body['assistanceTypeDetails'] :
        '';

      req.session.user.assistanceSpecialArrangements = (req.session.user.assistanceNeeded === 'Yes') ?
        req.body['assistanceSpecialArrangements'] :
        '';

      // Redirect as appropriate
      return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));

    };
  };

  module.exports.change = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build('steps.assistance.get'));
    }
  }
})();
