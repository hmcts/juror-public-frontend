const ThirdPartyPersonalContact = require('../../pageObjects/thirdParty/thirdPartyPersonalContact.page.js');

module.exports = function thirdPartyDetailsSteps() {
  this.Before(() => {
    this.thirdPartyPersonalContact = new ThirdPartyPersonalContact();
  });

  this.When(/^I navigate to the 3rd Party Personal Contact page$/, () => {
    this.thirdPartyPersonalContact.open();
  });

  this.When(/^I confirm that I am on the 3rd Party Personal Contact page$/, () => {
    this.thirdPartyPersonalContact.isActive();
  });

  this.When(/^I submit my 3rd Party Personal Contact Details$/, () => {
    this.thirdPartyPersonalContact.submit();
  });

  this.When(/^I choose to provide new contact numbers$/, () => {
    this.thirdPartyPersonalContact.toggleContactMethodPhoneNew();
  });

  this.When(/^I choose to use existing contact numbers$/, () => {
    this.thirdPartyPersonalContact.toggleContactMethodPhoneExisting();
  });

  this.When(/^I choose to provide new contact email addresses$/, () => {
    this.thirdPartyPersonalContact.toggleContactMethodEmailNew();
  });

  this.When(/^I choose to use existing contact email addresses$/, () => {
    this.thirdPartyPersonalContact.toggleContactMethodEmailExisting();
  });

  this.When(/^I enter "([^"]*)" as the main contact phone number$/, (expectedValue) => {
    this.thirdPartyPersonalContact.mainContactPhoneNumber = expectedValue;
  });

  this.When(/^I enter "([^"]*)" as the other contact phone number$/, (expectedValue) => {
    this.thirdPartyPersonalContact.otherContactPhoneNumber = expectedValue;
  });

  this.When(/^I enter "([^"]*)" as the email address$/, (expectedValue) => {
    this.thirdPartyPersonalContact.emailAddress = expectedValue;
  });

  this.When(/^I enter "([^"]*)" as the confirmed email address$/, (expectedValue) => {
    this.thirdPartyPersonalContact.emailAddressConfirmation = expectedValue;
  });

  this.Then(/^the main contact phone number is empty$/, () => {
    expect(this.thirdPartyPersonalContact.mainContactPhoneNumber.getValue()).to.equal('');
  });

  this.Then(/^the other contact phone number$/, () => {
    expect(this.thirdPartyPersonalContact.otherContactPhoneNumber.getValue()).to.equal('');
  });

  this.Then(/^the contact email address is empty$/, () => {
    expect(this.thirdPartyPersonalContact.emailAddress.getValue()).to.equal('');
  });

  this.Then(/^the contact email address confirmation is empty$/, () => {
    expect(this.thirdPartyPersonalContact.emailAddressConfirmation.getValue()).to.equal('');
  });


  // Errors
  // ====================
  this.Then(/^the error message summary for the contact Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.useJurorPhoneDetailsSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for the contact Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.useJurorPhoneDetailsDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the error message summary for the contact Email address is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.useJurorEmailDetailsSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for the contact Email address is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.useJurorEmailDetailsDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the error message summary for the jurors contact Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.jurorContactPhoneDetailsSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for the jurors contact Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.jurorContactPhoneDetailsDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message details for the jurors contact Phone number$/, () => {
    expect(this.thirdPartyPersonalContact.jurorContactPhoneDetailsDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^the error message summary for the jurors other contact Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.jurorOtherContactPhoneDetailsSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for the jurors other contact Phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.jurorOtherContactPhoneDetailsDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message details for the jurors other contact Phone number$/, () => {
    expect(this.thirdPartyPersonalContact.jurorOtherContactPhoneDetailsDetailedError.type).to.contain('NoSuchElement');
  });


  this.Then(/^the error message summary for using third party respondants contact Phone is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.useJurorPhoneDetailsSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for using third party respondants contact Phone is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.useJurorPhoneDetailsDetailedError.getText()).to.contain(expectedValue);
  });


  this.Then(/^the error message summary for using third party respondants contact Email Address is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.useJurorEmailDetailsSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for using third party respondants contact Email Address is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalContact.useJurorEmailDetailsDetailedError.getText()).to.contain(expectedValue);
  });
};
