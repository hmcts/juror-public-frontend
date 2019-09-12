const QualifyLandingPage = require('../../pageObjects/qualify/qualify-landing.page.js');
const QualifyResidencyPage = require('../../pageObjects/qualify/residency.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.qualifyLandingPage = new QualifyLandingPage();
    this.qualifyResidencyPage = new QualifyResidencyPage();
  });

  this.Given(/^I confirm that I am on the Qualify Landing page$/, () => {
    this.qualifyLandingPage.isActive();
  });

  this.Then(/^I click the Continue button$/, () => {
    this.qualifyLandingPage.continueButton();
  });

  // New Pages

};

