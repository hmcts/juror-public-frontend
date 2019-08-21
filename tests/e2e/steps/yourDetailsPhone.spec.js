const moment = require('moment');
const YourDetailsPhonePage = require('../pageObjects/yourDetailsPhone.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.yourDetailsPhonePage = new YourDetailsPhonePage();
  });

  this.Given(/^I confirm that I am on the Your Details Phone page$/, () => {
    this.yourDetailsPhonePage.isActive();
  });

  this.When(/^I enter "([^"]*)" as my Main Phone Number$/, (mainPhone) => {
    this.yourDetailsPhonePage.enterMainPhone(mainPhone);
  });

  this.When(/^I enter "([^"]*)" as My Secondary Phone Number$/, (secondaryPhone) => {
    this.yourDetailsPhonePage.enterSecondaryPhone(secondaryPhone);
  });

  this.When(/^I submit my phone details$/, () => {
    this.yourDetailsPhonePage.submit();
  });

  this.Then(/^my main phone number is "([^"]*)" on Your Details Phone page$/, (expectedValue) => {
    expect(this.yourDetailsPhonePage.mainPhoneField.getValue()).to.equal(expectedValue);
  });

  this.Then(/^my Secondary Phone Number is "([^"]*)" on Your Details Phone page$/, (expectedValue) => {
    expect(this.yourDetailsPhonePage.secondaryPhoneField.getValue()).to.equal(expectedValue);
  });


  // Errors
  // ==============


  this.Then(/^the error message summary for my Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsPhonePage.mainPhoneSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for my Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsPhonePage.mainPhoneDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message details for my Phone number$/, () => {
    expect(this.yourDetailsPhonePage.mainPhoneDetailedError.type).to.equal('NoSuchElement');
  });


  this.Then(/^the error message summary for my other Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsPhonePage.otherPhoneSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for my other Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsPhonePage.otherPhoneDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message details for my other Phone number$/, () => {
    expect(this.yourDetailsPhonePage.otherPhoneDetailedError.type).to.equal('NoSuchElement');
  });

};
