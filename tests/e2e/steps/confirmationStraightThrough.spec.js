const ConfirmationStraightThroughPage = require('../pageObjects/confirmationStraightThrough.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.confirmationStraightThroughPage = new ConfirmationStraightThroughPage();
  });

  this.Given(/^I confirm that I am on the Confirmation Straight Through page$/, () => {
    this.confirmationStraightThroughPage.isActive();
  });

  this.Then(/^my name is displayed as "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmationStraightThroughPage.displayName.getText()).to.equal(expectedValue);
  });
};
