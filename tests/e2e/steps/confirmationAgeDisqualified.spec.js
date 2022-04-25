const ConfirmationAgeDisqualifiedPage = require('../pageObjects/confirmationAgeDisqualified.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.confirmationAgeDisqualifiedPage = new ConfirmationAgeDisqualifiedPage();
  });

  this.Given(/^I confirm that I am on the Confirmation Age Disqualified page$/, () => {
    this.confirmationAgeDisqualifiedPage.isActive();
  });
};
