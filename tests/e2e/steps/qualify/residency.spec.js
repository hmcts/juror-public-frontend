const QualifyResidencyPage = require('../../pageObjects/qualify/residency.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.qualifyResidencyPage = new QualifyResidencyPage();
  });

  this.When(/^I confirm I have lived in the UK for 5 years$/, () => {
    this.qualifyResidencyPage.residency('Yes');
  });

  this.When(/^I confirm I have not lived in the UK for 5 years$/, () => {
    this.qualifyResidencyPage.residency('No');
  });



  this.Given(/^I confirm that I am on the Qualify Residency page$/, () => {
    this.qualifyResidencyPage.isActive();
  });

  this.Given(/^I submit my Residency details$/, () => {
    this.qualifyResidencyPage.submit();
  });

  this.Given(/^I enter "([^"]*)" as my residency details$/, (expectedValue) => {
    this.qualifyResidencyPage.residencyDetails = expectedValue;
  });
};
