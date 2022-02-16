const PrivacyPolicyPage = require('../pageObjects/privacyPolicy.page');

module.exports = function thirdPartyDetailsSteps() {
  this.Before(() => {
    this.privacyPolicyPage = new PrivacyPolicyPage();
  });

  this.When(/^I confirm that I am on the Privacy Policy page$/, () => {
    this.privacyPolicyPage.isActive();
  });

  this.When(/^I navigate to the privacy page$/, () => {
    this.privacyPolicyPage.open();
  });
};
