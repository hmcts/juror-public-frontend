const ConfirmationDeceasedPage = require('../pageObjects/confirmationDeceased.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.confirmationDeceasedPage = new ConfirmationDeceasedPage();
  });

  this.Given(/^I confirm that I am on the Confirmation Deceased page$/, () => {
    this.confirmationDeceasedPage.isActive();
  });
};
