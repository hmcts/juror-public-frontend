const QualifyConvictionsPage = require('../../pageObjects/qualify/convictions.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.qualifyConvictionsPage = new QualifyConvictionsPage();
  });

  this.When(/^I confirm I have been convicted of a crime resulting in a prison sentence, community order or suspended prison sentence$/, () => {
    this.qualifyConvictionsPage.conviction('Yes');
  });

  this.When(/^I confirm I have not been convicted of a crime resulting in a prison sentence, community order or suspended prison sentence$/, () => {
    this.qualifyConvictionsPage.conviction('No');
  });

  this.Given(/^I submit my Convictions details$/, () => {
    this.qualifyConvictionsPage.submit();
  });

  this.Given(/^I confirm that I am on the Qualify Convictions page$/, () => {
    this.qualifyConvictionsPage.isActive();
  });

  this.Given(/^I enter "([^"]*)" as my conviction details$/, (expectedValue) => {
    this.qualifyConvictionsPage.convictionsDetails = expectedValue;
  });
};
