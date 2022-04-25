const ExcusalPage = require('../pageObjects/excusal.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.excusalPage = new ExcusalPage();
  });

  this.Then(/^I confirm that I am on the Excusal page$/, () => {
    this.excusalPage.isActive();
  });

  this.When(/^I enter a reason of "([^"]*)" for requiring excusal and submit$/, (reason) => {
    this.excusalPage.excusalReason = reason;
    this.excusalPage.submit();
  });
};
