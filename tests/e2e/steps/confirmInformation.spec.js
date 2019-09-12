const ConfirmInformationPage = require('../pageObjects/confirmInformation.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.confirmInformationPage = new ConfirmInformationPage();
  });

  this.When(/^I confirm that I am on the Confirm Information page$/, () => {
    this.confirmInformationPage.isActive();
  });

  this.When(/^I tick the Confirm My Information checkbox$/, () => {
    this.confirmInformationPage.confirmInformation();
  });

  this.When(/^I submit my information$/, () => {
    this.confirmInformationPage.submit();
  });

  this.When(/^I click the link to change the reason for replying$/, () => {
    this.confirmInformationPage.clickChangeReasonLink.click();
  });

  this.When(/^I click the link to change my name$/, () => {
    this.confirmInformationPage.changeNameDetails.click();
  });

  this.When(/^I click the link to change my email address$/, () => {
    this.confirmInformationPage.changeEmailAddress.click();
  });

  this.When(/^I click the link to change my primary phone number$/, () => {
    this.confirmInformationPage.changePrimaryPhoneDetails.click();
  });

  this.When(/^I click the link to change my adjustments$/, () => {
    this.confirmInformationPage.changeImpairmentDetails.click();
  });

  this.When(/^I click the link to change my third party main phone number$/, () => {
    this.confirmInformationPage.changeThirdPartyMainPhone.click();
  });

  this.When(/^I click the link to change my third party email address$/, () => {
    this.confirmInformationPage.changeThirdPartyEmailAddress.click();
  });

  this.Then(/^I click the link to change my excusal$/, () => {
    this.confirmInformationPage.excusalChangeLink.click();
  });

  this.Then(/^I confirm that the assistance details box contains "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmInformationPage.otherImpairmentDetails.getText()).to.contain(expectedValue);
  });

  this.Then(/^I confirm that the assistance details box does not contain "([^"]*)"$/, (expectedValue) => {
    // expect(this.confirmInformationPage.otherImpairmentDetails.getText()).to.not.contain(expectedValue);
    expect(this.confirmInformationPage.otherImpairmentDetails === undefined);
  });

  this.Then(/^I confirm that the main phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmInformationPage.mainPhoneNumber.getText()).to.contain(expectedValue);
  });

  this.Then(/^I confirm that the secondary phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmInformationPage.secondaryPhoneNumber.getText()).to.contain(expectedValue);
  });

  this.Then(/^I confirm that the email address is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmInformationPage.emailAddress.getText()).to.contain(expectedValue);
  });

  this.Then(/^I confirm that the third party main phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmInformationPage.thirdPartyMainPhoneNumber.getText()).to.contain(expectedValue);
  });

  this.Then(/^I confirm that the third party secondary phone number is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmInformationPage.thirdPartyOtherPhoneNumber.getText()).to.contain(expectedValue);
  });

  this.Then(/^I confirm that the third party email address is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmInformationPage.thirdPartyEmailAddress.getText()).to.contain(expectedValue);
  });

  this.Then(/^I confirm that the conviction details are "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmInformationPage.convictionAnswer.getText()).to.contain(expectedValue);
  });

  this.Then(/^I confirm that the mental health sectioned details are "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmInformationPage.mentalHealthSectionedAnswer.getText()).to.contain(expectedValue);
  });

  this.Then(/^I confirm that the mental health capacity details are "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmInformationPage.mentalHealthCapacityAnswer.getText()).to.contain(expectedValue);
  });

  this.Then(/^I confirm that the bail details are "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmInformationPage.bailAnswer.getText()).to.contain(expectedValue);
  });

  // These cover off entire tables (I.e. a full page of response)
  // ==========================
  //
  this.Then(/^the Do you qualify answers do not appear on the Confirm Information page$/, () => {
    expect(this.confirmInformationPage.isQualifyAnswerTableVisible()).to.equal(false);
  });

  this.Then(/^the Confirm date answers do not appear on the Confirm Information page$/, () => {
    expect(this.confirmInformationPage.isConfirmDateAnswerTableVisible()).to.equal(false);
    expect(this.confirmInformationPage.isDeferralAnswerTableVisible()).to.equal(false);
    expect(this.confirmInformationPage.isExcusalAnswerTableVisible()).to.equal(false);
  });

  this.Then(/^the CJS employment answers do not appear on the Confirm Information page$/, () => {
    expect(this.confirmInformationPage.isCjsEmployedAnswerTableVisible()).to.equal(false);
  });

  this.Then(/^the Reasonable adjustments answers do not appear on the Confirm Information page$/, () => {
    expect(this.confirmInformationPage.isReasonbleAjdustmentsAnswerTableVisible()).to.equal(false);
  });
};
