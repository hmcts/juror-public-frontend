const moment = require('moment');
const YourDetailsNamePage = require('../pageObjects/yourDetailsName.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.yourDetailsNamePage = new YourDetailsNamePage();
  });

  this.Given(/^I confirm that I am on the Your Details Name page$/, () => {
    this.yourDetailsNamePage.isActive();
  });

  this.When(/^I choose to provide new details for my name$/, () => {
    this.yourDetailsNamePage.changeNameButton.click();
  });

  this.When(/^I submit my name details$/, () => {
    this.yourDetailsNamePage.submit();
  });


  // Errors
  // ==============

  this.Then(/^the summary error for my last name is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsNamePage.lastNameSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for my last name is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsNamePage.lastNameDetailedError.getText()).to.contains(expectedValue);
  });

};
