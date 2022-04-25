const ThirdPartyDetailsContact = require('../../pageObjects/thirdParty/thirdPartyDetailsContact.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.thirdPartyDetailsContact = new ThirdPartyDetailsContact();
  });

  this.Given(/^I confirm that I am on the 3rd Party Details Contact page$/, () => {
    this.thirdPartyDetailsContact.isActive();
  });

  this.When(/^I enter "([^"]*)" as my main phone number$/, (expectedValue) => {
    this.thirdPartyDetailsContact.mainPhone = expectedValue;
    expect(this.thirdPartyDetailsContact.mainPhone.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as my other phone number$/, (expectedValue) => {
    this.thirdPartyDetailsContact.otherPhone = expectedValue;
    expect(this.thirdPartyDetailsContact.otherPhone.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as my email address$/, (expectedValue) => {
    this.thirdPartyDetailsContact.emailAddress = expectedValue;
    expect(this.thirdPartyDetailsContact.emailAddress.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as my confirmed email address$/, (expectedValue) => {
    this.thirdPartyDetailsContact.emailAddressConfirmation = expectedValue;
    expect(this.thirdPartyDetailsContact.emailAddressConfirmation.getValue()).to.equal(expectedValue);
  });

  this.When(/^I toggle my contact preference for phone$/, () => {
    this.thirdPartyDetailsContact.toggleContactPreferencePhone();
  });

  this.When(/^I toggle my contact preference for email$/, () => {
    this.thirdPartyDetailsContact.toggleContactPreferenceEmail();
  });

  this.When(/^I submit my 3rd Party Contact Details$/, () => {
    this.thirdPartyDetailsContact.submit();
  });

  this.Then(/^my main phone number is not "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsContact.mainPhone.getValue()).to.not.equal(expectedValue);
  });

  this.Then(/^my other phone number is not "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsContact.otherPhone.getValue()).to.not.equal(expectedValue);
  });

  this.Then(/^my email address is not "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsContact.emailAddress.getValue()).to.not.equal(expectedValue);
  });

  this.Then(/^my email address confirmation is not "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsContact.emailAddressConfirmation.getValue()).to.not.equal(expectedValue);
  });


  // Errors
  // ==============
  this.Then(/^I confirm that the Personal Details error box contains the main phone number error$/, () => {
    expect(this.thirdPartyDetailsContact.mainPhoneErrors().length).to.equal(1);
  });


  this.Then(/^the error message summary for my third party contact preference is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsContact.thirdPartyContactPhoneSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for my third party contact preference is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsContact.thirdPartyContactPhoneDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message details for my third party contact preference$/, () => {
    expect(this.thirdPartyDetailsContact.thirdPartyContactPhoneDetailedError.type).to.equal('NoSuchElement');
  });


  this.Then(/^the error message summary for my third party contact Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsContact.thirdPartyContactPhoneDetailsSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for my third party contact Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsContact.thirdPartyContactPhoneDetailsDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message details for my third party contact Phone number$/, () => {
    expect(this.thirdPartyDetailsContact.thirdPartyContactPhoneDetailsDetailedError.type).to.equal('NoSuchElement');
  });


  this.Then(/^the error message summary for my other third party contact Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsContact.thirdPartyOtherContactPhoneDetailsSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for my other third party contact Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsContact.thirdPartyOtherContactPhoneDetailsDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message details for my other third party contact Phone number$/, () => {
    expect(this.thirdPartyDetailsContact.thirdPartyOtherContactPhoneDetailsDetailedError.type).to.equal('NoSuchElement');
  });
};
