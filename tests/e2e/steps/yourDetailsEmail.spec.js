const moment = require('moment');
const YourDetailsEmailPage = require('../pageObjects/yourDetailsEmail.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.yourDetailsEmailPage = new YourDetailsEmailPage();
  });

  this.Given(/^I confirm that I am on the Your Details Email page$/, () => {
    this.yourDetailsEmailPage.isActive();
  });

  this.When(/^I enter "([^"]*)" as my Email Address$/, (expectedValue) => {
    this.yourDetailsEmailPage.emailAddressField = expectedValue;
  });

  this.When(/^I enter "([^"]*)" as my Confirmation Email Address$/, (expectedValue) => {
    this.yourDetailsEmailPage.emailAddressConfirmationField = expectedValue;
  });

  this.When(/^I submit my email details$/, () => {
    this.yourDetailsEmailPage.submit();
  });

  this.Then(/^my Email Address is "([^"]*)" on Your Details Email page$/, (expectedValue) => {
    expect(this.yourDetailsEmailPage.emailAddressField.getValue()).to.equal(expectedValue);
  });

  this.Then(/^my Confirmation Email Address is "([^"]*)" on Your Details Email page$/, (expectedValue) => {
    expect(this.yourDetailsEmailPage.emailAddressConfirmationField.getValue()).to.equal(expectedValue);
  });


  // Errors
  // ==============


};
