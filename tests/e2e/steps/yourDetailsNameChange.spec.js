const moment = require('moment');
const YourDetailsNameChangePage = require('../pageObjects/yourDetailsNameChange.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.yourDetailsNameChangePage = new YourDetailsNameChangePage();
  });

  this.Given(/^I confirm that I am on the Your Details Name Change page$/, () => {
    this.yourDetailsNameChangePage.isActive();
  });


  this.When(/^I submit my name change details$/, () => {
    this.yourDetailsNameChangePage.submit();
  });


  // Errors
  // ==============

  this.Then(/^the summary error for my last name is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsNameChangePage.lastNameSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for my last name is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsNameChangePage.lastNameDetailedError.getText()).to.contains(expectedValue);
  });

};
