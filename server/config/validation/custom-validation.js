;(function(){
  'use strict';

  var moment = require('moment')
    , validate = require('validate.js')
    , filters = require('../../components/filters')
    , texts_en = require('../../../client/js/i18n/en.json')
    , texts_cy = require('../../../client/js/i18n/cy.json');

  // Overrides to existing rules
  // ===================================
  validate.extend(validate.validators.datetime, {
    parse: function(value) {
      return +moment.utc(value);
    },
    format: function(value, options) {
      var format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';

      return moment.utc(value).format(format);
    }
  });

  validate.extend(validate.validators.length, {
    // tooLong: 'must be no more than %{count} characters',
    tooLong: function(value, attribute, options) {
      return filters.translate('VALIDATION.LENGTH_LONG', (req.session.ulang === 'cy' ? texts_cy : texts_en), {
        field: filters.prettify(attribute),
        count: options.maximum,
      });
    },
    tooShort: function(value, attribute, options) {
      return filters.translate('VALIDATION.LENGTH_SHORT', (req.session.ulang === 'cy' ? texts_cy : texts_en), {
        field: filters.prettify(attribute),
        count: options.maximum,
      });
    },
    wrongLength: function(value, attribute, options) {
      return filters.translate('VALIDATION.LENGTH_WRONG_LENGTH', (req.session.ulang === 'cy' ? texts_cy : texts_en), {
        field: filters.prettify(attribute),
        count: options.maximum,
      });
    },
    notValid: function(value, attribute, options) {
      return filters.translate('VALIDATION.LENGTH_INVALID', (req.session.ulang === 'cy' ? texts_cy : texts_en), {
        field: filters.prettify(attribute),
        count: options.maximum,
      });
    },
  });

  validate.extend(validate.validators.presence, {
    message: function(value, attribute) {
      return filters.translate('VALIDATION.PRESENCE', (req.session.ulang === 'cy' ? texts_cy : texts_en), {
        field: filters.prettify(attribute)
      });
    }
  });




  // Creation of new rules
  // ===================================

  // Will validate that at least one of the 'group'
  // items has a value
  validate.validators.addressGroup = function(value, options, key, attributes) {
    var falseCount = 0
      , message;

    // Without a grouping, this validator doesn't have much purpose in life.
    if (typeof options.group === 'undefined') {
      return null;
    }

    if (typeof options.message === 'string' || typeof options.message === 'object') {
      message = options.message;
    } else if (typeof options.message === 'function') {
      message = options.message(value, key);
    } else {
      message = filters.translate('VALIDATION.ADDRESSGROUP', options.texts);
    }

    options.group.forEach(function(addressField) {
      if (typeof attributes[addressField] !== 'string' || attributes[addressField].length === 0) {
        falseCount++;
      }
    });

    return (options.group.length === falseCount) ? message : null;
  };

  // Validates that a phone number is fully numeric,
  // will later perform validation to ensure it can
  // be used to receive text messages.
  validate.validators.phone = function(value, options, key) {
    // Only validate if option is true and
    // a value has actually been provided
    if (options === false || value.length === 0) {
      return null;
    }

    if (validate.isNumber(parseInt(value, 10)) === false) {
      return filters.translate('VALIDATION.PHONE', (req.session.ulang === 'cy' ? texts_cy : texts_en), {
        field: filters.prettify(key)
      });
    }

    return null;
  };


  // Validates that a field has a value only if the linked
  // field has a pre-specified value.
  validate.validators.presenceIf = function(value, options, key, attributes) {
    var message;

    // We can't do much if we don't have a linked field
    if (options === false || typeof options.field === 'undefined') {
      return null;
    }

    // Return A-Ok if our linked field does not have the value
    // that triggers this field to be required.
    if (Array.isArray(attributes[options.field])) {
      if (attributes[options.field].indexOf(options.value) === -1) {
        return null;
      }
    } else if (typeof options.value !== 'undefined' && attributes[options.field] !== options.value) {
      return null;
    }

    // If our validated field has a value, everything is A-Ok
    if (typeof value !== 'undefined' && value.length > 0) {
      return null;
    }

    // Check what our return message should be
    if (typeof options.message === 'undefined') {
      message = filters.translate('VALIDATION.PRESENCEIF', (req.session.ulang === 'cy' ? texts_cy : texts_en), {
        field: filters.prettify(key)
      });
    } else if (typeof options.message === 'function') {
      message = options.message(value, key);
    } else {
      message = options.message;
    }

    // If we have reached this point then we have failed validation
    return message;
  };

  // Validates that a field has a value only if the linked field has a value set
  validate.validators.presenceIfSet = function(value, options, key, attributes) {
    var message;

    // If our validated field has a value, everything is A-Ok
    if (typeof value !== 'undefined' && value.length > 0) {
      return null;
    }

    // if linked field isn't undefined, everything is A-Ok
    if (typeof attributes[options.field] !== 'undefined') {
      return null;
    }

    // Check what our return message should be
    if (typeof options.message === 'undefined') {
      message = filters.translate('VALIDATION.PRESENCEIF', (req.session.ulang === 'cy' ? texts_cy : texts_en), {
        field: filters.prettify(key)
      });
    } else if (typeof options.message === 'function') {
      message = options.message(value, key);
    } else {
      message = options.message;
    }

    // If we have reached this point then we have failed validation
    return message;
  };


  validate.validators.ifValueMatch = function(value, options, key, attributes) {
    var message;

    // We can't do much without the right options
    if (options === false || typeof options.ifValue === 'undefined') {
      return null;
    }

    // If we aren't on the required value, then can just return out
    if (options.ifValue !== value) {
      return null;
    }

    // Check what our return message should be
    if (typeof options.message === 'undefined') {
      message = filters.translate('VALIDATION.IFVALUEMATCH', (req.session.ulang === 'cy' ? texts_cy : texts_en), {
        field: filters.prettify(key)
      });
    } else if (typeof options.message === 'function') {
      message = options.message(value, key);
    } else {
      message = options.message;
    }

    if (options.actualValue !== options.expectedValue) {
      return message;
    }

    return null;
  }


  // Validates that a field has a valid email only if the linked
  // field has a pre-specified value.
  validate.validators.emailIf = function(value, options, key, attributes) {
    var message
      , emailRegex;

    // We can't do much if we don't have a linked field
    if (options === false || typeof options.field === 'undefined') {
      return null;
    }

    // Return A-Ok if our linked field does not have the value
    // that triggers this field to be required.
    if (Array.isArray(attributes[options.field])) {
      if (attributes[options.field].indexOf(options.value) === -1) {
        return null;
      }
    } else if (typeof options.value !== 'undefined' && attributes[options.field] !== options.value) {
      return null;
    }

    // If our validated field has a value, validate it is a valid email
    if (typeof value !== 'undefined' && value.length > 0) {
      // Valid email
      // eslint-disable-next-line max-len
      emailRegex = /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;
      if (emailRegex.test(value)) {
        return null;
      }
    }

    // Check what our return message should be
    if (typeof options.message === 'undefined') {
      message = filters.translate('VALIDATION.PRESENCEIF', (req.session.ulang === 'cy' ? texts_cy : texts_en), {
        field: filters.prettify(key)
      });
    } else if (typeof options.message === 'function') {
      message = options.message(value, key);
    } else {
      message = options.message;
    }

    // If we have reached this point then we have failed validation
    return message;
  };

  // Validates that a field has a valid email only if the linked
  // field has a pre-specified value.
  validate.validators.formatIf = function(value, options, key, attributes) {
    var message
      , pattern = new RegExp(options.pattern, options.flags)
      , match = pattern.test(value);

    // We can't do much if we don't have a linked field
    // Also don't care for empty strings
    if (options === false || typeof options.field === 'undefined' || typeof value === 'undefined' || value.length === 0) {
      return null;
    }

    // Return A-Ok if our linked field does not have the value
    // that triggers this field to be required.
    if (Array.isArray(attributes[options.field])) {
      if (attributes[options.field].indexOf(options.value) === -1) {
        return null;
      }
    } else if (typeof options.value !== 'undefined' && attributes[options.field] !== options.value) {
      return null;
    }

    // Check what our return message should be
    if (typeof options.message === 'undefined') {
      message = filters.translate('VALIDATION.PRESENCEIF', (req.session.ulang === 'cy' ? texts_cy : texts_en), {
        field: filters.prettify(key)
      });
    } else if (typeof options.message === 'function') {
      message = options.message(value, key);
    } else {
      message = options.message;
    }

    if (match) {
      return null;
    }

    return message;
  };

  validate.validators.checkboxGroup = function(value, options) {
    var missingCount = 0;

    options.fields.forEach(function(field) {
      if (!options.req.body.hasOwnProperty(field) || options.req.body[field].length === 0) {
        missingCount += 1;
      }
    });

    if (missingCount >= options.fields.length) {
      return options.message;
    }

    return null;
  };

  validate.validators.dateOfBirth = function(value, req, key, attributes) {
    var message = {
        summary: filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.CHECK_DOB'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en)),
        summaryLink: 'dobDay',
        fields: [],
        details: []
      }
      , formattedDob
      , dayMonthRegex = /^[0-9]{1,2}$/
      , yearRegex = /^[0-9]{4}$/
      , summaryLinkSet = false
      , dateError = false;

    if (attributes.dobDay.length === 0) {
      message.fields.push('dobDay');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.DAY_MISSING'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
      );
      dateError = true;
    } else if ((attributes.dobDay > 31 || attributes.dobDay < 1) || !dayMonthRegex.test(attributes.dobDay)) {
      message.fields.push('dobDay');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.DAY_INVALID'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
      );
      dateError = true;
    }
    if (dateError === true && summaryLinkSet === false){
      message.summaryLink = 'dobDay';
      summaryLinkSet = true;
      dateError = false;
    }

    if (attributes.dobMonth.length === 0) {
      message.fields.push('dobMonth');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.MONTH_MISSING'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
      );
      dateError = true;
    } else if ((attributes.dobMonth > 12 || attributes.dobMonth < 1) || !dayMonthRegex.test(attributes.dobMonth)) {
      message.fields.push('dobMonth');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.MONTH_INVALID'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
      );
      dateError = true;
    }
    if (dateError === true && summaryLinkSet === false){
      message.summaryLink = 'dobMonth';
      summaryLinkSet = true;
      dateError = false;
    }

    if (attributes.dobYear.length === 0) {
      message.fields.push('dobYear');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.YEAR_MISSING'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
      );
      dateError = true;
    } else if (attributes.dobYear.length !== 4 || !yearRegex.test(attributes.dobYear)) {
      message.fields.push('dobYear');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.YEAR_INVALID'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
      );
      dateError = true;
    }
    if (dateError === true && summaryLinkSet === false){
      message.summaryLink = 'dobYear';
      summaryLinkSet = true;
      dateError = false;
    }


    // Check for limits
    formattedDob = moment([attributes.dobYear, attributes.dobMonth, attributes.dobDay].filter(function(val) {
      return val;
    }).join('-'), 'YYYY-MM-DD');

    if (message.fields.length > 0 && moment().diff(formattedDob, 'days') <= 0) {
      message.fields.push('dateOfBirth');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.INVALID_DATE'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en))
      );
    }

    // Feedback
    if (message.details.length > 0) {
      return message;
    }

    return null;
  };

  validate.validators.dateOfBirthDay = function(value, req, key, attributes) {
    var message = {
        summary: '',
        summaryLink: 'dobDay',
        fields: 'dobDay',
        details: [],
      }
      , dayMonthRegex = /^[0-9]{1,2}$/
      , errMessage = '';

    if (attributes.dobDay.length === 0) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.DAY_MISSING'
        + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    } else if ((attributes.dobDay > 31 || attributes.dobDay < 1) || !dayMonthRegex.test(attributes.dobDay)) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.DAY_INVALID'
        + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    }
    if (errMessage){
      message.details.push(errMessage);
      message.summary = errMessage;
      return message;
    }

    return null;
  };

  validate.validators.dateOfBirthMonth = function(value, req, key, attributes) {
    var message = {
        summary: '',
        summaryLink: 'dobMonth',
        fields: 'dobMonth',
        details: []
      }
      , dayMonthRegex = /^[0-9]{1,2}$/
      , errMessage = '';

    if (attributes.dobMonth.length === 0) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.MONTH_MISSING'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    } else if ((attributes.dobMonth > 12 || attributes.dobMonth < 1) || !dayMonthRegex.test(attributes.dobMonth)) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.MONTH_INVALID'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    }
    if (errMessage){
      message.details.push(errMessage);
      message.summary = errMessage;
      return message;
    }

    return null;
  };

  validate.validators.dateOfBirthYear = function(value, req, key, attributes) {
    var message = {
        summary: '',
        summaryLink: 'dobYear',
        fields: 'dobYear',
        details: []
      }
      , formattedDob
      , yearRegex = /^[0-9]{4}$/
      , errMessage = '';

    if (attributes.dobYear.length === 0) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.YEAR_MISSING'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    } else if (attributes.dobYear.length !== 4 || !yearRegex.test(attributes.dobYear)) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.YEAR_INVALID'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    }
    if (errMessage){
      message.details.push(errMessage);
      message.summary = errMessage;
      return message;
    }

    return null;
  };

  validate.validators.dateOfBirthLimits = function(value, req, key, attributes) {
    var message = {
        summary: '',
        summaryLink: 'dobDay',
        fields: 'dateOfBirth',
        details: []
      }
      , formattedDob
      , errMessage = '';


    // Check for limits
    formattedDob = moment([attributes.dobYear, attributes.dobMonth, attributes.dobDay].filter(function(val) {
      return val;
    }).join('-'), 'YYYY-MM-DD');

    if (!formattedDob.isValid()) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.INVALID_DATE'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    } else if (message.fields.length > 0 && moment().diff(formattedDob, 'days') <= 0) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.INVALID_DATE'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    }
    if (errMessage){
      message.details.push(errMessage);
      message.summary = errMessage;
      return message;
    }

    return null;
  };

  // Deferral date checks

  validate.validators.deferralDate = function(value, req, key, attributes, options) {
    var message = {
        summary: '',
        summaryLink: 'dobDay',
        fields: 'dobDay',
        details: [],
      }
      , dayMonthRegex = /^[0-9]{1,2}$/
      , errMessage = '';

    if (attributes.date1Day.length === 0) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.DAY_MISSING'
        + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    } else if ((attributes.date1Day > 31 || attributes.date1Day < 1) || !dayMonthRegex.test(attributes.date1Day)) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.DAY_INVALID'
        + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    }
    if (errMessage){
      message.details.push(errMessage);
      message.summary = errMessage;
      return message;
    }

    return null;
  };

  validate.validators.deferralDateDay = function(value, req, key, attributes) {
    var message = {
        summary: '',
        summaryLink: 'dobDay',
        fields: 'dobDay',
        details: [],
      }
      , dayMonthRegex = /^[0-9]{1,2}$/
      , errMessage = '';

    if (attributes.date1Day.length === 0) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.DAY_MISSING'
        + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    } else if ((attributes.date1Day > 31 || attributes.date1Day < 1) || !dayMonthRegex.test(attributes.date1Day)) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.DAY_INVALID'
        + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    }
    if (errMessage){
      message.details.push(errMessage);
      message.summary = errMessage;
      return message;
    }

    return null;
  };

  validate.validators.deferralDateMonth = function(value, req, key, attributes) {
    var message = {
        summary: '',
        summaryLink: 'dobMonth',
        fields: 'dobMonth',
        details: []
      }
      , dayMonthRegex = /^[0-9]{1,2}$/
      , errMessage = '';

    if (attributes.dobMonth.length === 0) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.MONTH_MISSING'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    } else if ((attributes.dobMonth > 12 || attributes.dobMonth < 1) || !dayMonthRegex.test(attributes.dobMonth)) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.MONTH_INVALID'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    }
    if (errMessage){
      message.details.push(errMessage);
      message.summary = errMessage;
      return message;
    }

    return null;
  };

  validate.validators.deferralDateYear = function(value, req, key, attributes) {
    var message = {
        summary: '',
        summaryLink: 'dobYear',
        fields: 'dobYear',
        details: []
      }
      , formattedDob
      , yearRegex = /^[0-9]{4}$/
      , errMessage = '';

    if (attributes.dobYear.length === 0) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.YEAR_MISSING'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    } else if (attributes.dobYear.length !== 4 || !yearRegex.test(attributes.dobYear)) {
      errMessage = filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.YEAR_INVALID'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), (req.session.ulang === 'cy' ? texts_cy : texts_en));
    }
    if (errMessage){
      message.details.push(errMessage);
      message.summary = errMessage;
      return message;
    }

    return null;
  };

  validate.validators.datesDistinct = function(value, options, key, attributes) {
    var message = {
      summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_UNIQUE', options.texts),
      fields: [],
      details: []
    };

    if (typeof options.group === 'undefined') {
      return null;
    }

    options.group.map(function(groupName) {
      return attributes[groupName];
    }).forEach(function(dateValue, index, array) {
      if (dateValue.trim() === '') {
        // skip this validator on invalid date
        return null;
      }

      if (!(array.indexOf(dateValue) === index)) {
        message.fields.push('date' + (index + 1));
        message.details = filters.translate('VALIDATION.DEFERRAL.CHECK_DATES_UNIQUE_ERROR', options.texts);
      }
    });

    return message.fields.length ? message : null;

  };

  validate.validators.deferralDateValid = function(value, options, key, attributes) {
    var dateRegex = /^[0-9]{1,2}\/[0-9]{1,2}(\/[0-9]{2}|\/[0-9]{4})$/
      , dayMonthRegex = /^[0-9]{1,2}$/
      , yearRegex = /^[0-9]{4}$/
      , deferMoment = moment(value, 'DD/MM/YYYY')
      , jurorDOB
      , ageUnit = 'years'
      , ageLimit = attributes['ageLimit']
      , ageDateLimit
      , fieldId = attributes[key + 'FieldId']
      , compDate1
      , compDate2
      , compDate3
      , errMessage = ''

      , message = {
        summary: '',
        summaryLink: '',
        fields: '',
        details: [],
      }

    // Check DATE value
    if (!(dateRegex.test(value) && deferMoment.isValid())){
      errMessage = options.message['invalidDate'];
      message.details.push(errMessage);
      message.summary = errMessage;
      message.summaryLink = fieldId;
      return message;
    }

    // Check DATE lower limit
    if (dateRegex.test(value) && deferMoment.isValid()){
      if (deferMoment.isBefore(attributes['earliestDate'])){
        errMessage = options.message['dateLowerLimit'];
        message.details.push(errMessage);
        message.summary = errMessage;
        message.summaryLink = fieldId;
        return message;
      }
    }

    // Check DATE upper limit
    if (dateRegex.test(value) && deferMoment.isValid()){
      if (deferMoment.isAfter(attributes['latestDate'])){
        errMessage = options.message['dateUpperLimit'];
        message.details.push(errMessage);
        message.summary = errMessage;
        message.summaryLink = fieldId;
        return message;
      }
    }

    // Check DATE is a MONDAY
    if (dateRegex.test(value) && deferMoment.isValid()){
      if (deferMoment.isoWeekday() !== 1){
        errMessage = options.message['invalidDate'];
        message.details.push(errMessage);
        message.summary = errMessage;
        message.summaryLink = fieldId;
        return message;
      }
    }

    // Check age at deferred date
    jurorDOB = moment(options.jurorDOB)
    ageDateLimit = jurorDOB.clone().add(ageLimit, ageUnit)

    if ((deferMoment === ageDateLimit) || (deferMoment.isSameOrAfter(ageDateLimit))){
      errMessage = options.message['dateAgeLimit'];
      message.details.push(errMessage);
      message.summary = errMessage;
      message.summaryLink = fieldId;
      return message;
    }

    // Check dates are unique
    compDate1 = moment(attributes['date1'], 'DD/MM/YYYY');
    compDate2 = moment(attributes['date2'], 'DD/MM/YYYY');
    compDate3 = moment(attributes['date3'], 'DD/MM/YYYY');

    if (key === 'date2' && compDate1.isValid() && compDate2.isValid()){
      if (compDate2.isSame(compDate1)){
        errMessage = options.message['dateUnique'];
        message.details.push(errMessage);
        message.summary = errMessage;
        message.summaryLink = fieldId;
        return message;
      }
    }

    if (key === 'date3' && compDate1.isValid() && compDate2.isValid() && compDate3.isValid()){
      if (compDate3.isSame(compDate1) || compDate3.isSame(compDate2)){
        errMessage = options.message['dateUnique'];
        message.details.push(errMessage);
        message.summary = errMessage;
        message.summaryLink = fieldId;
        return message;
      }
    }

    return null;
  };

  validate.validators.deferralDateFuture = function(value, options) {
    var latestDate = moment(options.checkDate)
      , checkValue = moment(value, 'DD/MM/YYYY');

    if (checkValue.isAfter(latestDate)){
      return options.message
    }
    return null;
  };


  validate.validators.ageDeferredDate = function(value, options) {
    var jurorDOB = moment(options.jurorDOB)
      , dateLimit = jurorDOB.clone().add(options.limit.multiplier, options.limit.unit)
      , checkValue = moment(value, 'DD/MM/YYYY');

    if ((checkValue === dateLimit) || (checkValue.isSameOrAfter(dateLimit))){
      return options.message
    }
    return null;
  };

  validate.validators.presenceMainPhone = function(value, options, key, attributes) {
    var message
      , useJurorPhoneDetails = attributes['useJurorPhoneDetails']
      , useJurorEmailDetails = attributes['useJurorEmailDetails']
      , thirdPartyMainPhone = options.thirdPartyMainPhone
      , thirdPartyEmail = options.thirdPartyEmail;

    // If our validated field has a value, everything is A-Ok
    if (typeof value !== 'undefined' && value.length > 0) {
      return null;
    }

    // Check what our return message should be
    if (typeof options.message === 'undefined') {
      message = 'Please check your' + filters.prettify(key);
    } else if (typeof options.message === 'function') {
      message = options.message(value, key);
    } else {
      message = options.message;
    }

    // if there's no setting for useJurorEmailDetails, and useJurorPhoneDetails is true, we need a main phone
    if (typeof useJurorEmailDetails === 'undefined' && useJurorPhoneDetails === 'Yes') {
      return message;
    }

    // if 3rd party mainPhone and 3rdPartyEmail are empty/undefined, we need a main phone
    if (thirdPartyMainPhone === '' || typeof thirdPartyMainPhone === 'undefined') {
      if (thirdPartyEmail === '' || typeof thirdPartyEmail === 'undefined') {
        return message;
      }
    }

    // If we have reached this point then we have passed validation
    return null;
  };

  validate.validators.mustBeTrue = function(value, options) {
    return value !== 'true' ? options.message : null;
  };

})();
