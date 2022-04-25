const DeferralRequestPage = require('../pageObjects/deferralRequest.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.deferralRequestPage = new DeferralRequestPage();
  });

  this.Then(/^I confirm that I am on the Deferral page$/, () => {
    this.deferralRequestPage.isActive();
  });

  this.When(/^I enter a reason of "([^"]*)" for requiring deferral and submit$/, (reason) => {
    this.deferralRequestPage.deferralReason = reason;
    this.deferralRequestPage.submit();
  });
};
