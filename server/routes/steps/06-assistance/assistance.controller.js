/**
 * Using Rails-like standard naming convention for endpoints.
 * GET    /    ->    index
 */

;(function(){
  'use strict';

  var _ = require('lodash')
    , validate = require('validate.js')
    , filters = require('../../../components/filters')
    , texts_en = require('../../../../client/js/i18n/en.json')
    , texts_cy = require('../../../../client/js/i18n/cy.json')
    , utils = require('../../../lib/utils')
    , pcqService = require('../../../components/pcqService');

  module.exports.index = function() {
    return function(req, res) {
      var assistanceActive
        , merged
        , tmpErrors
        , backLinkUrl;

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
      
      // Set back link URL
      if (req.session.change === true){
        backLinkUrl = utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty);
      } else {
        switch (req.session.user.confirmedDate){
        case 'Change':
          //Deferral
          if (req.session.user.deferral['deferralDatesPublicHoliday'] === true){
            backLinkUrl = utils.getRedirectUrl('steps.confirm.date.deferral-holiday', req.session.user.thirdParty);
          } else {
            backLinkUrl = utils.getRedirectUrl('steps.confirm.date.deferral-check', req.session.user.thirdParty);
          }
          break;
        case 'No':
          //Excusal
          backLinkUrl = utils.getRedirectUrl('steps.confirm.date.excusal', req.session.user.thirdParty);
          break;
        default:
          backLinkUrl = utils.getRedirectUrl('steps.confirm.date', req.session.user.thirdParty);
        }
      }

      // Check what is active based on merger between user stored values and form submitted values
      if (typeof merged !== 'undefined' && typeof merged.assistanceType !== 'undefined') {
        assistanceActive = {
          mobility: (merged.assistanceType.indexOf('Limited mobility') !== -1) || (merged.assistanceType.indexOf('Symudedd cyfyngedig') !== -1),
          hearing: (merged.assistanceType.indexOf('Hearing impairment') !== -1) || (merged.assistanceType.indexOf('Nam ar y clyw') !== -1),
          diabetes: (merged.assistanceType.indexOf('Diabetes') !== -1) || (merged.assistanceType.indexOf('Clefyd siwgr') !== -1),
          sight: (merged.assistanceType.indexOf('Severe sight impairment') !== -1) || (merged.assistanceType.indexOf('Nam difrifol ar eich golwg') !== -1) || (merged.assistanceType.indexOf('Nam difrifol ar ei olwg') !== -1),
          learningDisability: (merged.assistanceType.indexOf('Learning disability') !== -1) || (merged.assistanceType.indexOf('Anabledd dysgu') !== -1),
          other: (merged.assistanceType.indexOf('Other') !== -1)
        };
      }

      // Merge and then delete errors, prevents retention after pressing back
      tmpErrors = _.cloneDeep(req.session.errors);
      delete req.session.errors;

      if (req.session.change === true){
        delete req.session.errors;
        req.session.change = false;
      }

      return res.render('steps/06-assistance/index.njk', {
        user: _.merge(req.session.user, merged),
        errors: {
          title: filters.translate('VALIDATION.ERROR_TITLE', (req.session.ulang === 'cy' ? texts_cy : texts_en)),
          message: '',
          count: typeof tmpErrors !== 'undefined' ? Object.keys(tmpErrors).length : 0,
          items: tmpErrors,
        },
        assistanceActive: assistanceActive,
        backLinkUrl: backLinkUrl
      });
    };
  };

  module.exports.create = function(app) {
    return function(req, res) {

      // Validate form submission
      var validatorResult

        , checkPCQSuccess = function(proceedWithPCQ) {

          if (proceedWithPCQ){
            return pcqService.invokePCQ(req, app, res);
          }

          app.logger.info('Skip PCQ');
          return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty)));
        }

        , checkPCQFailure = function(resp) {
          app.logger.info('Skip PCQ');
          return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.confirm.information', req.session.user.thirdParty)));
        };

      // Reset error and saved field sessions
      delete req.session.errors;
      delete req.session.formFields;

      // clear checkboxes / text boxes if no is selected
      if (req.body['assistanceNeeded'] === 'No'){
        delete req.body['assistanceType'];
        delete req.body['assistanceSpecialArrangements'];
        req.body['assistanceTypeDetails'] = '';
      } else if (req.body.hasOwnProperty('assistanceType')){
        if (req.body['assistanceType'].indexOf('Other') < 0){
          req.body['assistanceTypeDetails'] = '';
        }
      }

      // Validate form submission
      validatorResult = validate(req.body, require('../../../config/validation/reasonable-adjustment')(req));
      if (typeof validatorResult !== 'undefined') {
        req.session.errors = validatorResult;
        req.session.formFields = req.body;

        return res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.assistance', req.session.user.thirdParty)));
      }


      // Store new info
      req.session.user.assistanceNeeded = req.body['assistanceNeeded'];

      // Clear other values if they answered no to assistance required
      req.session.user.assistanceType = (req.session.user.assistanceNeeded === 'Yes' || req.session.user.assistanceNeeded === texts_cy.REASONABLE_ADJUSTMENT_PAGE.YES) ? req.body['assistanceType'] : '';

      req.session.user.assistanceTypeDetails = (req.session.user.assistanceNeeded === 'Yes' || req.session.user.assistanceNeeded === texts_cy.REASONABLE_ADJUSTMENT_PAGE.YES) ? req.body['assistanceTypeDetails'] : '';

      req.session.user.assistanceSpecialArrangements = (req.session.user.assistanceNeeded === 'Yes' || req.session.user.assistanceNeeded === texts_cy.REASONABLE_ADJUSTMENT_PAGE.YES) ? req.body['assistanceSpecialArrangements'] : '';

      // Verify if valid to proceed with PCQ step
      pcqService.checkPCQ(req, app, checkPCQSuccess, checkPCQFailure);

    };
  };

  module.exports.change = function(app){
    return function(req, res){
      req.session.change = true;
      res.redirect(app.namedRoutes.build(utils.getRedirectUrl('steps.assistance', req.session.user.thirdParty)));
    }
  }
})();
