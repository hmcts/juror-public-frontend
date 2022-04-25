const QualifyBailPage = require('../../pageObjects/qualify/bail.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.qualifyBailPage = new QualifyBailPage();
  });

  this.When(/^I confirm I am currently on bail$/, () => {
    this.qualifyBailPage.onBail('Yes');
  });

  this.When(/^I confirm I am not currently on bail$/, () => {
    this.qualifyBailPage.onBail('No');
  });

  this.Given(/^I submit my Bail details$/, () => {
    this.qualifyBailPage.submit();
  });

  this.Given(/^I confirm that I am on the Qualify Bail page$/, () => {
    this.qualifyBailPage.isActive();
  });

  this.Given(/^I enter "([^"]*)" as my bail details$/, (expectedValue) => {
    this.qualifyBailPage.bailDetails = expectedValue;
  });
};
