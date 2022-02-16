const moment = require('moment');
const loadSql = require('../support/helpers').loadSql;
const checkDatabase = require('../support/helpers').checkDatabase;
const checkDatabaseDate = require('../support/helpers').checkDatabaseDate;
const countDatabaseHelper = require('../support/helpers').countDatabase;
const checkLastUsed = require('../support/helpers').checkLastUsed;

module.exports = function steps() {
  this.Given(/^I truncate the database tables$/, { timeout: 30 * 1000 }, (callback) => {
    loadSql('truncate')
      .then((result) => {
        expect(result).to.equal('success');
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });

  this.Given(/^I setup the db with the file named "([^"]*)"$/, (file, callback) => {
    loadSql(file)
      .then((result) => {
        expect(result).to.equal('success');
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });

  this.Given(/^I add the "([^"]*)" data$/, (file, callback) => {
    loadSql(file, callback)
      .then((result) => {
        expect(result).to.equal('success');
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });


  this.Then(/^the column last_used in the password table should contain the current date$/, (callback) => {
    checkLastUsed(expect, callback)
      .then((result) => {
        expect(result.lastUpdatedDate).to.equal(result.currentDate);
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });

  // eslint-disable-callback-line max-len
  this.Then(/^I check the "([^"]*)" table for "([^"]*)" within the "([^"]*)" field for "([^"]*)" "([^"]*)"$/, (table, checkValue, checkField, whereField, whereValue, callback) => {
    checkDatabase(table, checkField, checkValue, whereField, whereValue)
      .then((result) => {
        expect(result).to.equal((checkValue === '' || checkValue === 'NULL') ? null : checkValue);
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });

  // eslint-disable-callback-line max-len
  this.Then(/^I check the "([^"]*)" table does not have "([^"]*)" within the "([^"]*)" field for "([^"]*)" "([^"]*)"$/, (table, checkValue, checkField, whereField, whereValue, callback) => {
    checkDatabase(table, checkField, checkValue, whereField, whereValue)
      .then((result) => {
        expect(result).to.not.equal((checkValue === '' || checkValue === 'NULL') ? null : checkValue);
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });

  this.Then(/^I check that "([^"]*)" table has a result for "([^"]*)" "([^"]*)" AND "([^"]*)" "([^"]*)"$/, (table, checkFieldOne, checkValueOne, checkFieldTwo, checkValueTwo, callback) => {
    const checks = [{
      field: checkFieldOne,
      value: checkValueOne,
    }, {
      field: checkFieldTwo,
      value: checkValueTwo,
    }];

    countDatabaseHelper(table, checks)
      .then((result) => {
        expect(result).to.be.above(0);
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });

  this.Then(/^I check the "([^"]*)" table for "([^"]*)" within the "([^"]*)" date field with format "([^"]*)" for "([^"]*)" "([^"]*)"$/, (table, checkValue, checkField, format, whereField, whereValue, callback) => {
    checkDatabaseDate(table, checkField, whereField, whereValue, format)
      .then((result) => {
        expect(result).to.equal(checkValue);
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });

  // eslint-disable-callback-line max-len
  this.Then(/^I check the "([^"]*)" table for a date "([^"]*)" months in the future within the "([^"]*)" date field for "([^"]*)" "([^"]*)"$/, (table, countValue, checkField, whereField, whereValue, callback) => {
    const checkValue = moment().add(countValue, 'months').format('YYYY-MM-DD');

    checkDatabaseDate(table, checkField, whereField, whereValue, 'YYYY-MM-DD')
      .then((result) => {
        expect(result.substr(0, 7)).to.equal((checkValue === '' || checkValue === 'NULL') ? null : checkValue.substr(0, 7));
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });

  // eslint-disable-callback-line max-len
  this.Then(/^I check the "([^"]*)" table for todays date within the "([^"]*)" date field for "([^"]*)" "([^"]*)"$/, (table, checkField, whereField, whereValue, callback) => {
    const checkValue = moment().format('YYYY-MM-DD');

    checkDatabaseDate(table, checkField, whereField, whereValue, 'YYYY-MM-DD')
      .then((result) => {
        expect(result).to.equal((checkValue === '' || checkValue === 'NULL') ? null : checkValue);
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });

  this.Then(/^I check that the "([^"]*)" table has a result for "([^"]*)" "([^"]*)" AND "([^"]*)" "([^"]*)"$/, (table, checkFieldOne, checkValueOne, checkFieldTwo, checkValueTwo, callback) => {
    const checks = [{
      field: checkFieldOne,
      value: checkValueOne,
    }, {
      field: checkFieldTwo,
      value: checkValueTwo,
    }];

    countDatabaseHelper(table, checks)
      .then((result) => {
        expect(result).to.be.above(0);
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });

  this.Then(/^I check that the "([^"]*)" table has no result for "([^"]*)" "([^"]*)" AND "([^"]*)" "([^"]*)"$/, (table, checkFieldOne, checkValueOne, checkFieldTwo, checkValueTwo, callback) => {
    const checks = [{
      field: checkFieldOne,
      value: checkValueOne,
    }, {
      field: checkFieldTwo,
      value: checkValueTwo,
    }];

    countDatabaseHelper(table, checks)
      .then((result) => {
        expect(result).to.equal(0);
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  });
};
