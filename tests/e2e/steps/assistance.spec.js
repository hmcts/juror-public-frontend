const AssistancePage = require('../pageObjects/assistance.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.assistancePage = new AssistancePage();
  });
  this.Given(/^I answer "([^"]*)" for my Assistance$/, (answer) => {
    this.assistancePage.selectAssistance(answer);
  });

  this.Given(/^I submit my Assistance$/, () => {
    this.assistancePage.submit();
  });

  this.Given(/^I confirm that I am on the Assistance page$/, () => {
    this.assistancePage.isActive();
  });

  this.When(/^I toggle limited mobility$/, () => {
    this.assistancePage.toggleReasonMobility();
  });

  this.When(/^I toggle hearing impairment$/, () => {
    this.assistancePage.toggleReasonHearingImpaired();
  });

  this.When(/^I toggle diabetes$/, () => {
    this.assistancePage.toggleReasonDiabetes();
  });

  this.When(/^I toggle severe sight impairment$/, () => {
    this.assistancePage.toggleReasonSightImpaired();
  });

  this.When(/^I toggle learning disability$/, () => {
    this.assistancePage.toggleReasonLearningDisabled();
  });

  this.When(/^I toggle other impairment$/, () => {
    this.assistancePage.toggleReasonOther();
  });

  this.When(/^I enter "([^"]*)" as my assistance details$/, (expectedValue) => {
    this.assistancePage.assistanceTypeDetails = expectedValue;
    expect(this.assistancePage.assistanceTypeDetails.getValue()).to.equal(expectedValue);
  });
};
