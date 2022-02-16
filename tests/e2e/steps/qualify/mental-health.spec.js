const QualifyMentalHealthPage = require('../../pageObjects/qualify/mental-health.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.qualifyMentalHealthPage = new QualifyMentalHealthPage();
  });

  this.When(/^I confirm I have been detained under the mental health act$/, () => {
    this.qualifyMentalHealthPage.mentalHealth('Yes');
  });

  this.When(/^I confirm I have not been detained under the mental health act$/, () => {
    this.qualifyMentalHealthPage.mentalHealth('No');
  });

  this.Given(/^I submit my Mental Health details$/, () => {
    this.qualifyMentalHealthPage.submit();
  });

  this.Given(/^I confirm that I am on the Qualify Mental Health page$/, () => {
    this.qualifyMentalHealthPage.isActive();
  });

  this.Given(/^I enter "([^"]*)" as my mental health details$/, (expectedValue) => {
    this.qualifyMentalHealthPage.mentalHealthDetails = expectedValue;
  });
};
