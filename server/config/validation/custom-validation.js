;(function(){
  'use strict';

  var moment = require('moment')
    , validate = require('validate.js')
    , filters = require('../../components/filters')
    , texts = require('../../../client/js/i18n/en.json')

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
      return filters.translate('VALIDATION.LENGTH_LONG', texts, {
        field: filters.prettify(attribute),
        count: options.maximum,
      });
    },
    tooShort: function(value, attribute, options) {
      return filters.translate('VALIDATION.LENGTH_SHORT', texts, {
        field: filters.prettify(attribute),
        count: options.maximum,
      });
    },
    wrongLength: function(value, attribute, options) {
      return filters.translate('VALIDATION.LENGTH_WRONG_LENGTH', texts, {
        field: filters.prettify(attribute),
        count: options.maximum,
      });
    },
    notValid: function(value, attribute, options) {
      return filters.translate('VALIDATION.LENGTH_INVALID', texts, {
        field: filters.prettify(attribute),
        count: options.maximum,
      });
    },
  });

  validate.extend(validate.validators.presence, {
    message: function(value, attribute) {
      return filters.translate('VALIDATION.PRESENCE', texts, {
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
      message = filters.translate('VALIDATION.ADDRESSGROUP', texts);
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
      return filters.translate('VALIDATION.PHONE', texts, {
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
      message = filters.translate('VALIDATION.PRESENCEIF', texts, {
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
      message = filters.translate('VALIDATION.IFVALUEMATCH', texts, {
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
      emailRegex = /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;
      if (emailRegex.test(value)) {
        return null;
      }
    }

    // Check what our return message should be
    if (typeof options.message === 'undefined') {
      message = filters.translate('VALIDATION.PRESENCEIF', texts, {
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
      message = filters.translate('VALIDATION.PRESENCEIF', texts, {
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
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts),
        fields: [],
        details: []
      }
      , formattedDob;

    if (attributes.dobDay.length === 0) {
      message.fields.push('dobDay');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.DAY_MISSING'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
      );
    } else if ((attributes.dobDay > 31 || attributes.dobDay < 1) || isNaN(parseInt(attributes.dobDay, 10))) {
      message.fields.push('dobDay');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.DAY_INVALID'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
      );
    }

    if (attributes.dobMonth.length === 0) {
      message.fields.push('dobMonth');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.MONTH_MISSING'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
      );
    } else if ((attributes.dobMonth > 12 || attributes.dobMonth < 1) || isNaN(parseInt(attributes.dobMonth, 10))) {
      message.fields.push('dobMonth');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.MONTH_INVALID'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
      );
    }

    if (attributes.dobYear.length === 0) {
      message.fields.push('dobYear');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.YEAR_MISSING'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
      );
    } else if (attributes.dobYear.length !== 4 || isNaN(parseInt(attributes.dobYear, 10))) {
      message.fields.push('dobYear');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.YEAR_INVALID'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
      );
    }


    // Check for limits
    formattedDob = moment([attributes.dobYear, attributes.dobMonth, attributes.dobDay].filter(function(val) {
      return val;
    }).join('-'), 'YYYY-MM-DD');

    if (message.fields.length > 0 && moment().diff(formattedDob, 'days') <= 0) {
      message.fields.push('dateOfBirth');
      message.details.push(
        filters.translate('VALIDATION.YOUR_DETAILS_CONFIRM.INVALID_DATE'
          + (req.session.user.thirdParty === 'Yes' ? '_OB' : ''), texts)
      );
    }

    // Feedback
    if (message.details.length > 0) {
      return message;
    }

    return null;
  };

  validate.validators.datesDistinct = function(value, options, key, attributes) {
    var message = {
      summary: filters.translate('VALIDATION.DEFERRAL.CHECK_UNIQUE', texts),
      fields: [],
      details: []
    };

    if (typeof options.group === 'undefined') {
      return null;
    }

    options.group.map(function(groupName) {
      return attributes[groupName].format();
    }).forEach(function(value, index, array) {
      if (value === 'Invalid date') {
        // skip this validator on invalid date
        return null;
      }

      if (!(array.indexOf(value) === index)) {
        message.fields.push('date' + (index + 1));
        message.details.push(
          filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts)
        );
      }
    });

    return message.fields.length ? message : null;

  };

  validate.validators.deferralDateValid = function(value, req, key, attributes) {
    var message = {
      summary: filters.translate('VALIDATION.DEFERRAL.CHECK_DATES', texts),
      fields: [],
      details: []
    };

    if (attributes[key + 'Day'].length === 0) {
      message.fields.push(key + 'Day');
      message.details.push(
        filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts)
      );
    } else if ((attributes[key + 'Day'] > 31 || attributes[key + 'Day'] < 1) || !/^[0-9]{1,2}$/.test(attributes[key + 'Day'])) {
      message.fields.push(key + 'Day');
      message.details.push(
        filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts)
      );
    }

    if (attributes[key + 'Month'].length === 0) {
      message.fields.push(key + 'Month');
      message.details.push(
        filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts)
      );
    } else if ((attributes[key + 'Month'] > 12 || attributes[key + 'Month'] < 1) || !/^[0-9]{1,2}$/.test(attributes[key + 'Month'])) {
      message.fields.push(key + 'Month');
      message.details.push(
        filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts)
      );
    }

    if (attributes[key + 'Year'].length === 0) {
      message.fields.push(key + 'Year');
      message.details.push(
        filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts)
      );
    } else if (!/^[0-9]{4}$/.test(attributes[key + 'Year'])) {
      message.fields.push(key + 'Year');
      message.details.push(
        filters.translate('VALIDATION.DEFERRAL.CHECK_DATE', texts)
      );
    }

    // Feedback
    if (message.details.length > 0) {
      return message;
    }

    return null;
  };

  validate.validators.dateFuture = function(value, req) {
    var summonsDate = moment(req.checkDate)
      , dateLimit = summonsDate.clone().add(req.limit.multiplier, req.limit.unit);
    return value.isAfter(summonsDate) && value.isBefore(dateLimit) ? null : req.message;
  };

})();
