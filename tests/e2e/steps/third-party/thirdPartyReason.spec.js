const ThirdPartyReasonPage = require('../../pageObjects/thirdParty/thirdPartyReason.page.js');

module.exports = function thirdPartyDetailsSteps() {
  this.Before(() => {
    this.thirdPartyReasonPage = new ThirdPartyReasonPage();
  });

  this.When(/^I confirm that I am on the 3rd Party Reason page$/, () => {
    this.thirdPartyReasonPage.isActive();
  });

  this.When(/^I submit my 3rd Party Reason$/, () => {
    this.thirdPartyReasonPage.submit();
  });

  this.When(/^I state that the person is not here$/, () => {
    this.thirdPartyReasonPage.toggleReasonNotHere();
  });

  this.When(/^I state that the person is unable to reply by themself$/, () => {
    this.thirdPartyReasonPage.toggleReasonAssistance();
  });

  this.When(/^I state that the person is deceased$/, () => {
    this.thirdPartyReasonPage.toggleReasonDeceased();
  });

  this.When(/^I state that the person has another reason for not replying$/, () => {
    this.thirdPartyReasonPage.toggleReasonOther();
  });

  this.When(/^I state that my reason for replying on behalf of the person is "([^"]*)"$/, (reason) => {
    if (reason === 'the juror is unable to reply by themself') {
      this.thirdPartyReasonPage.toggleReasonAssistance();
    } else if (reason === 'the juror is not here') {
      this.thirdPartyReasonPage.toggleReasonNotHere();
    } else {
      this.thirdPartyReasonPage.toggleReasonOther();
      this.thirdPartyReasonPage.reasonOtherDetails = reason;
    }
  });

  this.Then(/^the box to provide other details about why I am responding is visible$/, () => {
    expect(this.thirdPartyReasonPage.reasonOtherDetails.isVisible()).to.equal(true);
  });
};
