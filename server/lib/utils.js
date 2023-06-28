;(function() {
  'use strict';

  var fse = require('fs-extra')
    , _ = require('lodash')
    , moment = require('moment')
    , texts_en = require('../../client/js/i18n/en.json')
    , texts_cy = require('../../client/js/i18n/cy.json')
    , specialNeedsMappings = {
      'SEVERE SIGHT IMPAIRMENT': 'V',
      'NAM DIFRIFOL AR EICH GOLWG': 'V',
      'NAM DIFRIFOL AR EI OLWG': 'V',
      'WHEEL CHAIR ACCESS': 'W',
      'HEARING IMPAIRMENT': 'H',
      'NAM AR Y CLYW': 'H',
      'OTHER': 'O',
      'DIABETES': 'I',
      'CLEFYD SIWGR': 'I',
      'DIET': 'D',
      'PREGNANCY': 'P',
      'LEARNING DISABILITY': 'R',
      'ANABLEDD DYSGU': 'R',
      'LIMITED MOBILITY': 'L',
      'SYMUDEDD CYFYNGEDIG': 'L'
    };

  /// Will require HTTP basic auth username and password
  module.exports.basicAuth = function(logger, username, password, basicAuthObj) {
    return function(req, res, next) {
      var user;

      if (!username || !password) {
        logger.fatal('Username or password is not set for basic auth.');
        return res.status(401).render('_errors/noauth.njk');
      }

      user = basicAuthObj(req);
      if (!user || user.name !== username || user.pass !== password) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
      }

      return next();
    };
  };


  /// If non HTTPS request is made this will redirect to HTTPS at the same URL
  module.exports.forceHttps = function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      // 302 temporary - this is a feature that can be disabled
      return res.redirect(302, 'https://' + req.get('Host') + req.url);
    }
    return next();
  };


  /// Function to check for existence of a directory and wilHEARING IMPAIRMENTl
  /// create it if not present.
  ///
  /// @param {string}   dir   The directory path to be checked
  module.exports.checkDirectoryCreate = function(dir) {
    try {
      fse.ensureDirSync(dir);
      return true;
    } catch (exception) {
      return false;
    }
  };


  module.exports.basicDataTransform = function(object, key) {
    var activeKey = key;

    // Ensure key has a default value
    if (typeof activeKey === 'undefined') {
      activeKey = 'data';
    }

    // If object has key then return the given key
    if (object.hasOwnProperty(activeKey)) {
      return object[activeKey];
    }

    // Otherwise return the object as-is.
    return object;
  };


  module.exports.transformSubmission = function(responseObject, lang) {
    var fetchValue = function(data, field) {
        var fieldParts = field.split('.')
          , checkObj = data
          , hasMatch = true;

        fieldParts.forEach(function(part) {
          if (typeof checkObj[part] === 'undefined') {
            hasMatch = false;
            return;
          }
          checkObj = checkObj[part];
        });

        if (hasMatch) {
          return checkObj;
        }

        return null;
      }

      , checkValue = function(data, field, providedValue) {
        var checkedValue = fetchValue(data, field);

        return checkedValue === providedValue;
      }

      , postObj = _.cloneDeep(responseObject)
      , isThirdParty = false;

    postObj['welsh'] = (lang === 'cy');

    // Qualify
    // -----------------------
    if (typeof responseObject.qualify !== 'undefined') {
      postObj.qualify = {
        'livedConsecutive': {
          'answer': checkValue(responseObject, 'qualify.livedConsecutive.answer', (lang === 'cy' ? texts_cy.QUALIFY_PAGE.YES : texts_en.QUALIFY_PAGE.YES)),
          'details': fetchValue(responseObject, 'qualify.livedConsecutive.details'),
        },
        'mentalHealthAct': {
          'answer': checkValue(responseObject, 'qualify.mentalHealthAct.answer', (lang === 'cy' ? texts_cy.QUALIFY_PAGE.YES : texts_en.QUALIFY_PAGE.YES)),
          'details': fetchValue(responseObject, 'qualify.mentalHealthAct.details'),
        },
        'onBail': {
          'answer': checkValue(responseObject, 'qualify.onBail.answer', (lang === 'cy' ? texts_cy.QUALIFY_PAGE.YES : texts_en.QUALIFY_PAGE.YES)),
          'details': fetchValue(responseObject, 'qualify.onBail.details'),
        },
        'convicted': {
          'answer': checkValue(responseObject, 'qualify.convicted.answer', (lang === 'cy' ? texts_cy.QUALIFY_PAGE.YES : texts_en.QUALIFY_PAGE.YES)),
          'details': fetchValue(responseObject, 'qualify.convicted.details'),
        }
      };
    }


    // Third party details
    // -----------------------
    if (postObj.thirdParty === 'Yes') {
      isThirdParty = true;
    }

    postObj.thirdParty = {
      thirdPartyFName: fetchValue(responseObject, 'thirdPartyDetails.firstName'),
      thirdPartyLName: fetchValue(responseObject, 'thirdPartyDetails.lastName'),
      relationship: fetchValue(responseObject, 'thirdPartyDetails.relationship'),
      mainPhone: fetchValue(responseObject, 'thirdPartyDetails.mainPhone'),
      otherPhone: fetchValue(responseObject, 'thirdPartyDetails.otherPhone'),
      emailAddress: fetchValue(responseObject, 'thirdPartyDetails.emailAddress'),
      thirdPartyReason: fetchValue(responseObject, 'thirdPartyDetails.thirdPartyReason'),
      thirdPartyOtherReason: fetchValue(responseObject, 'thirdPartyDetails.thirdPartyOtherReason'),
      useJurorPhoneDetails: fetchValue(responseObject, 'useJurorPhoneDetails')==='No' ? false : true,
      useJurorEmailDetails: fetchValue(responseObject, 'useJurorEmailDetails')==='No' ? false : true,
    };

    // useJurorEmailDetails/useJurorPhoneDetails are not set if response is a deceased response, but should be false
    if (fetchValue(responseObject, 'ineligibleDeceased')) {
      postObj.thirdParty.useJurorEmailDetails = false;
      postObj.thirdParty.useJurorPhoneDetails = false;
    }


    // Copies third party contact details over juror details if 'Use Juror Details' flag is false
    if (isThirdParty === true) {
      if (postObj.thirdParty.useJurorPhoneDetails === false) {
        postObj.primaryPhone = postObj.thirdParty.mainPhone;
        postObj.secondaryPhone = postObj.thirdParty.otherPhone;
      }

      if (postObj.thirdParty.useJurorEmailDetails === false) {
        postObj.emailAddress = postObj.thirdParty.emailAddress;
      }
    }
    
    
    // CJS employer
    // -----------------------
    if (typeof responseObject.cjsEmployer !== 'undefined') {
      postObj.cjsEmployment = [];

      // If only one result, ensure it is an array
      if (typeof responseObject.cjsEmployer !== 'object') {
        responseObject.cjsEmployer = [responseObject.cjsEmployer];
      }

      responseObject.cjsEmployer.forEach(function(employer){
        var employerName = employer
          , details = fetchValue(responseObject, 'cjsEmployerDetails');

        if (employer === 'Police Force') {
          details = fetchValue(responseObject, 'cjsPoliceDetails');
        }

        if (employer === 'HM Prison Service') {
          details = fetchValue(responseObject, 'cjsPrisonDetails');
        }

        if (employer === 'National Crime Agency') {
          details = 'National Crime Agency';
        }

        if (employer === 'Judiciary') {
          details = 'Judiciary';
        }

        if (employer === 'HMCTS') {
          details = 'HMCTS';
        }

        if (details === '') {
          details = ' ';
        }

        postObj.cjsEmployment.push({
          cjsEmployer: employerName,
          cjsEmployerDetails: details,
        })
      });
    }

    // Special Needs
    // -----------------------
    if (typeof responseObject.assistanceType !== 'undefined' && responseObject.assistanceType.length > 0) {
      postObj.specialNeeds = [];

      // If only one result, ensure it is an array
      if (typeof responseObject.assistanceType !== 'object') {
        responseObject.assistanceType = [responseObject.assistanceType];
      }

      responseObject.assistanceType.forEach(function(specialNeed) {
        if (specialNeed === 'Other') {
          postObj.specialNeeds.push({
            assistanceType: specialNeedsMappings['OTHER'],
            assistanceTypeDetails: responseObject.assistanceTypeDetails,
          });
        } else {
          postObj.specialNeeds.push({
            assistanceType: specialNeedsMappings[specialNeed.toUpperCase()],
            assistanceTypeDetails: specialNeedsMappings[specialNeed.toUpperCase()],
          });
        }
      });
    }


    // Date of Birth
    // -----------------------
    if (typeof postObj.dobYear !== 'undefined' && postObj.dobYear.length > 0) {
      postObj.dateOfBirth = moment(postObj.dobYear + '-' + postObj.dobMonth + '-' + postObj.dobDay)
      .format('YYYY-MM-DD[T]HH:mm:ss');
    }


    // Delete unusable fields
    // -----------------------
    delete(postObj.nameRender);
    delete(postObj.jurorLastName);
    delete(postObj.jurorPostcode);
    delete(postObj.emailAddressConfirmation);
    delete(postObj.addressRender);
    delete(postObj.confirmedDate);
    delete(postObj.cjsEmployed);
    delete(postObj.cjsEmployer);
    delete(postObj.cjsEmployerDetails);
    delete(postObj.cjsPrisonDetails);
    delete(postObj.cjsPoliceDetails);
    delete(postObj.assistanceNeeded);
    delete(postObj.assistanceType);
    delete(postObj.assistanceTypeDetails);
    delete(postObj.thirdPartyDetails);
    delete(postObj.ineligibleDeceased);
    delete(postObj.ineligibleAge);
    delete(postObj.courtName);
    delete(postObj.courtAddress);
    delete(postObj.hearingDate);
    delete(postObj.dobDay);
    delete(postObj.dobMonth);
    delete(postObj.dobYear);
    delete(postObj.assistanceTypeOutput);
    delete(postObj.cjsEmployerOutput);
    delete(postObj['_csrf']);
    delete(postObj.hearingTime);
    delete(postObj.hearingDateTimestamp);
    delete(postObj.dobGroup);
    delete(postObj.useJurorPhoneDetails);
    delete(postObj.useJurorEmailDetails);

    if (postObj.deferral) {
      delete postObj.deferral.date1;
      delete postObj.deferral.date2;
      delete postObj.deferral.date3;
    }

    // If age ineligible, ensure we don't send unneccessary data
    if (responseObject.ineligibleAge === true) {
      delete postObj.qualify;
      delete postObj.deferral;
      delete postObj.excusal;
      delete postObj.cjsEmployment;
      delete postObj.specialNeeds;
      delete postObj.assistanceSpecialArrangements;
    }

    // If deceased, ensure we don't send unneccessary data
    if (postObj.thirdParty.thirdPartyReason === 'deceased') {
      delete postObj.title;
      delete postObj.firstName;
      delete postObj.lastName;
      delete postObj.addressLineOne;
      delete postObj.addressLineTwo;
      delete postObj.addressLineThree;
      delete postObj.addressTown;
      delete postObj.addressCounty;
      delete postObj.addressPostcode;
      delete postObj.dateOfBirth;
      delete postObj.primaryPhone;
      delete postObj.secondaryPhone;
      delete postObj.emailAddress;

      delete postObj.qualify;

      delete postObj.deferral;
      delete postObj.excusal;

      delete postObj.cjsEmployment;

      delete postObj.specialNeeds;
      delete postObj.assistanceSpecialArrangements;
    }

    return postObj;
  }


  function checkQualifyCompletedResidency(userData) {
    if (typeof userData.qualify === 'undefined') {
      return false;
    }

    // Check that question has been answered
    if (typeof userData.qualify.livedConsecutive === 'undefined') {
      return false;
    }

    // If question has been answered check if it needs details
    if (
      userData.qualify.livedConsecutive.answer === 'No' && (
        typeof userData.qualify.livedConsecutive.details === 'undefined' ||
        userData.qualify.livedConsecutive.details.length === 0
    )) {
      return false;
    }

    // Else all is good.
    return true;
  }

  function checkQualifyCompletedMentalHealth(userData) {
    if (typeof userData.qualify === 'undefined') {
      return false;
    }

    // Check that question has been answered

    if (typeof userData.qualify.mentalHealthAct === 'undefined') {
      return false;
    }

    // If question has been answered check if it needs details

    if (
      userData.qualify.mentalHealthAct.answer === 'Yes' && (
        typeof userData.qualify.mentalHealthAct.details === 'undefined' ||
        userData.qualify.mentalHealthAct.details.length === 0
    )) {
      return false;
    }

    // Else all is good.
    return true;
  }

  function checkQualifyCompletedMentalHealthSectioned(userData) {
    if (typeof userData.qualify === 'undefined') {
      return false;
    }

    // Check that question has been answered

    if (typeof userData.qualify.mentalHealthSectioned === 'undefined') {
      return false;
    }

    // If question has been answered check if it needs details

    if (
      userData.qualify.mentalHealthSectioned.answer === 'Yes' && (
        typeof userData.qualify.mentalHealthSectioned.details === 'undefined' ||
        userData.qualify.mentalHealthSectioned.details.length === 0
    )) {
      return false;
    }

    // Else all is good.
    return true;
  }

  function checkQualifyCompletedMentalHealthCapacity(userData) {
    if (typeof userData.qualify === 'undefined') {
      return false;
    }

    // Check that question has been answered

    if (typeof userData.qualify.mentalHealthCapacity === 'undefined') {
      return false;
    }

    // If question has been answered check if it needs details

    if (
      userData.qualify.mentalHealthCapacity.answer === 'Yes' && (
        typeof userData.qualify.mentalHealthCapacity.details === 'undefined' ||
        userData.qualify.mentalHealthCapacity.details.length === 0
    )) {
      return false;
    }

    // Else all is good.
    return true;
  }

  function checkQualifyCompletedBail(userData) {
    if (typeof userData.qualify === 'undefined') {
      return false;
    }

    // Check that question has been answered

    if (typeof userData.qualify.onBail === 'undefined') {
      return false;
    }

    // If question has been answered check if it needs details

    if (
      userData.qualify.onBail.answer === 'Yes' && (
        typeof userData.qualify.onBail.details === 'undefined' ||
        userData.qualify.onBail.details.length === 0
    )) {
      return false;
    }

    // Else all is good.
    return true;
  }


  function checkQualifyCompletedConvictions(userData) {
    if (typeof userData.qualify === 'undefined') {
      return false;
    }
    // Check that question has been answered

    if (typeof userData.qualify.convicted === 'undefined') {
      return false;
    }

    // If question has been answered check if it needs details

    if (
      userData.qualify.convicted.answer === 'Yes' && (
      typeof userData.qualify.convicted.details === 'undefined' ||
      userData.qualify.convicted.details.length === 0
      )) {
      return false;
    }

  // Else all is good.
    return true;
  }

  function checkDeferral(userData) {
    if (typeof userData.confirmedDate === 'undefined') {
      return false;
    }

    if (userData.confirmedDate === 'Yes' || userData.confirmedDate === 'No') {
      return true;
    }

    return userData.confirmedDate === 'Change';
  }

  function checkDeferralReason(userData) {
    if (typeof userData.confirmedDate !== 'undefined' && (userData.confirmedDate === 'Yes' || userData.confirmedDate === 'No')) {
      return true;
    }

    if (typeof userData.deferral === 'undefined') {
      return false;
    }

    if (typeof userData.deferral.reason === 'undefined') {
      return false;
    }

    return true;
  }

  function checkExcusal(userData) {
    if (typeof userData.confirmedDate === 'undefined') {
      return false;
    }

    if (userData.confirmedDate === 'Yes' || userData.confirmedDate === 'Change') {
      return true;
    }

    return userData.confirmedDate === 'No';
  }

  // Checks which information has been filled in to provide a link back
  // to the first non completed page.
  module.exports.checkPageAccess = function(app, activeStep) {
    return function(req, res, next) {
      // If there is no user session data
      // OR
      // If active step is 2, then we are on login and need to ensure we have been to
      // the responder type page
      if (
        typeof req.session.user === 'undefined' ||
        (typeof req.session.user.thirdParty === 'undefined' && activeStep === 2)
      ) {
        return res.redirect(app.namedRoutes.build('steps.responder.type.get'));
      }

      // If active step is less than 3 but not 2, then the authentication check will handle
      // access.
      if (activeStep < 3) {
        return next();
      }

      // If juror is deceased, we will be skipping most steps
      if (typeof req.session.user.ineligibleDeceased === 'undefined' || req.session.user.ineligibleDeceased === false) {
        if (typeof req.session.user.dateOfBirth === 'undefined' && activeStep >= 3) {
          return res.redirect(app.namedRoutes.build('steps.your.details.get'));
        }

        if (typeof req.session.user.ineligibleAge === 'undefined' || req.session.user.ineligibleAge === false) {

          if (checkQualifyCompletedResidency(req.session.user) === false && activeStep >= 3.1) {
            return res.redirect(app.namedRoutes.build('steps.qualify.residency.get'));
          }

          if (typeof req.session.user.cjsEmployed === 'undefined' && activeStep >= 3.2) {
            return res.redirect(app.namedRoutes.build('steps.qualify.cjs.employed.get'));
          }

          if (checkQualifyCompletedBail(req.session.user) === false && activeStep >= 3.3) {
            return res.redirect(app.namedRoutes.build('steps.qualify.bail.get'));
          }

          if (checkQualifyCompletedConvictions(req.session.user) === false && activeStep >= 3.4) {
            return res.redirect(app.namedRoutes.build('steps.qualify.convictions.get'));
          }

          if (checkQualifyCompletedMentalHealthSectioned(req.session.user) === false && activeStep >= 3.5) {
            return res.redirect(app.namedRoutes.build('steps.qualify.mental.health.sectioned.get'));
          }

          if (checkQualifyCompletedMentalHealthCapacity(req.session.user) === false && activeStep >= 3.6) {
            return res.redirect(app.namedRoutes.build('steps.qualify.mental.health.capacity.get'));
          }

          if (checkDeferral(req.session.user) === false && activeStep >= 4.11) {
            return res.redirect(app.namedRoutes.build('steps.confirm.date.get'));
          }

          if (checkDeferralReason(req.session.user) === false && activeStep >= 4.12) {
            return res.redirect(app.namedRoutes.build('steps.confirm.date.deferral.get'));
          }

          if (checkExcusal(req.session.user) === false && activeStep >= 4.2) {
            return res.redirect(app.namedRoutes.build('steps.confirm.date.get'));
          }

          if (typeof req.session.user.confirmedDate === 'undefined' && activeStep >= 5) {
            return res.redirect(app.namedRoutes.build('steps.confirm.date.get'));
          }

          if (typeof req.session.user.assistanceNeeded === 'undefined' && activeStep >= 7) {
            return res.redirect(app.namedRoutes.build('steps.assistance.get'));
          }
        }
      }
      if (typeof req.session.informationConfirmed === 'undefined' && activeStep >= 8) {
        return res.redirect(app.namedRoutes.build('steps.confirm.information.get'));
      }

      return next();
    }
  }

  module.exports.checkBranchAccess = function(app, activeStep) {
    return function(req, res, next) {
      // Active step 1 implies we are on the first page of the third party branch
      // which we cannot reach without passing through authentication
      if (activeStep < 2) {
        return next();
      }

      // Cannot get passed branch 01 without completing
      if (typeof req.session.user.thirdPartyDetails === 'undefined' && activeStep >= 2) {
        return res.redirect(app.namedRoutes.build('branches.third.party.details.get'));
      }

      // Cannot get passed branch 02 without completing
      if (typeof req.session.user.thirdPartyDetails.thirdPartyReason === 'undefined' && activeStep >= 3) {
        return res.redirect(app.namedRoutes.build('branches.third.party.reason.get'));
      }

      // Cannot get passed branch 03 without completing
      if (typeof req.session.user.dateOfBirth === 'undefined' && activeStep >= 4) {
        return res.redirect(app.namedRoutes.build('branches.third.party.personal.details.get'));
      }

      // Cannot get passed branch 04 without completing
      if (typeof req.session.user.dateOfBirth === 'undefined' && activeStep >= 5) {
        return res.redirect(app.namedRoutes.build('branches.third.party.personal.details.get'));
      }

      return next();
    }
  }


  /**
   * Parse response from API for your details and attach
   * this information to session.
   *
   * @param {object} app Web application object
   * @param {object} req Express Request object
   * @param {object} apiResponse JSON response from API
   */
  module.exports.setRespondantDetails = function setRespondantDetails(app, req, apiResponse) {
    // Small helper to retrieve from either the session data or api response.
    // Session data should always take priority
    var updateUserDetails = function updateUserDetails(sessionField, responseField) {
      if (typeof req.session.user[sessionField] === 'undefined') {
        return apiResponse[responseField];
      }
      return req.session.user[sessionField];
    }

    // Make sure the user session exists
    if (typeof req.session.user === 'undefined') {
      req.session.user = {};
    }

    // Update with data from request, only on first request
    req.session.user['title'] = updateUserDetails('title', 'title');
    req.session.user['firstName'] = updateUserDetails('firstName', 'firstName')
    req.session.user['lastName'] = updateUserDetails('lastName', 'lastName');
    req.session.user['addressLineOne'] = updateUserDetails('addressLineOne', 'address');
    req.session.user['addressLineTwo'] = updateUserDetails('addressLineTwo', 'address2');
    req.session.user['addressLineThree'] = updateUserDetails('addressLineThree', 'address3');
    req.session.user['addressTown'] = updateUserDetails('addressTown', 'address4');
    req.session.user['addressCounty'] = updateUserDetails('addressCounty', 'address5');
    req.session.user['addressPostcode'] = updateUserDetails('addressPostcode', 'postcode');

    // Court info
    req.session.user['courtName'] = apiResponse['locCourtName'];
    req.session.user['hearingTime'] = apiResponse['courtAttendTime'];

    
    // Extract the time value when the hearing datetime is coming from the UNIQUE_POOL table
    if (moment(req.session.user['hearingTime'], 'YYYY-MM-DD HH:mm:ss').isValid()) {
      req.session.user['hearingTime'] = moment(req.session.user['hearingTime'], 'YYYY-MM-DD HH:mm:ss').format('H:mma');
    } else if (moment(req.session.user['hearingTime'], 'HH:mm').isValid()) {
    // Extract the time value when the hearing datetime is coming from the COURT_LOCATION table
      req.session.user['hearingTime'] = moment(req.session.user['hearingTime'], 'HH:mm').format('H:mma');
    }
    
    
    // Join parts of address
    req.session.user['courtAddress'] = [
      apiResponse['locCourtName'],
      apiResponse['courtAddress1'],
      apiResponse['courtAddress2'],
      apiResponse['courtAddress3'],
      apiResponse['courtAddress4'],
      apiResponse['courtAddress5'],
      apiResponse['courtAddress6'],
      apiResponse['courtPostcode']
    ].filter(function(val) {
      return val;
    }).join('<br>');

    req.session.user['hearingDateTimestamp'] = apiResponse['hearingDate'];

    // Try and parse date for hearing
    try {
      if (!moment(apiResponse['hearingDate']).isValid()) {
        throw 'Invalid hearing date format. MomentJS could not parse: "' + apiResponse['hearingDate'] + '"';
      }
      req.session.user['hearingDate'] = moment(apiResponse['hearingDate']).format('dddd D MMMM YYYY');
      req.session.user['hearingDateMedium'] = moment(apiResponse['hearingDate']).format('D MMMM YYYY');
      req.session.user['hearingDateShort'] = moment(apiResponse['hearingDate']).format('DD/MM/YYYY');
    } catch (err) {
      app.logger.debug('Hearing date could not be parsed by momentjs', err);
      req.session.user['hearingDate'] = '';
    }

    // Formatted name and address for display
    req.session.user.nameRender = [
      req.session.user['title'],
      req.session.user['firstName'],
      req.session.user['lastName']
    ].filter(function(val) {
      return val;
    }).join(' ');

    // Join parts of address
    req.session.user.addressRender = [
      req.session.user['addressLineOne'],
      req.session.user['addressLineTwo'],
      req.session.user['addressLineThree'],
      req.session.user['addressTown'],
      req.session.user['addressCounty'],
      req.session.user['addressPostcode']
    ].filter(function(val) {
      return val;
    }).join('<br>');

  };

  module.exports.calculateAgeAtHearing = function calculateAgeAtHearing(dateOfBirth, hearingDateTimestamp) {
    //JDB-3418: Modified to use hearingDateTimestamp
    var hearingDateMoment = moment(hearingDateTimestamp, 'x')
      , ageTimeOfHearing = hearingDateMoment.diff(dateOfBirth, 'years');

    return ageTimeOfHearing;
  };

  module.exports.getRedirectUrl = function(url, isThirdParty, isChange=false, requestMethod='get') {
    var redirectUrl = url;

    if (isChange === true){
      redirectUrl = redirectUrl + '.change';
    }
    if (isThirdParty === 'Yes'){
      redirectUrl = redirectUrl + '.tp';
    }

    redirectUrl = redirectUrl + '.' + requestMethod; // 'get' or 'post'

    return redirectUrl;
  };

  module.exports.getCurrencyValue = function(inputValue){
    var newValue = inputValue

    // Strip out currency symbol and commas
    newValue = newValue.replace(/£/g, '');
    newValue = newValue.replace(/,/g, '');

    return newValue;

  }

  module.exports.formatCurrencyValue = function(inputValue){
    var newNumber
      , result;

    newNumber = parseFloat(inputValue);

    if (isNaN(newNumber)){
      result = newNumber;
    } else {
      result = newNumber.toFixed(2);
    }

    return result;

  }

  module.exports.getDeferralDateRange = function(summonsDateTimestamp){

    var dates={}
      , firstMoment
      , lastMoment;

    firstMoment = moment(summonsDateTimestamp).add(1, 'weeks');
    lastMoment = moment(summonsDateTimestamp).add(52, 'weeks');

    dates={
      "earliestMoment": firstMoment,
      "latestMoment": lastMoment,
      "earliestDateShort": firstMoment.format('DD/MM/YYYY'),
      "latestDateShort": lastMoment.format('DD/MM/YYYY'),
      "earliestDateMed": firstMoment.format('D MMMM YYYY'),
      "latestDateMed": lastMoment.format('D MMMM YYYY'),
    }

    return dates;

  }

})();
