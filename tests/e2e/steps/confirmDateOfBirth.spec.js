const ConfirmDateOfBirthPage = require('../pageObjects/confirmDateOfBirth.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.confirmDateOfBirthPage = new ConfirmDateOfBirthPage();
  });

  this.When(/^I confirm that I am on the Confirm Date of Birth page$/, () => {
    this.confirmDateOfBirthPage.isActive();
  });

  this.When(/^I confirm the date of birth$/, () => {
    this.confirmDateOfBirthPage.submit();
  });

  this.When(/^I choose to change the confirmed date of birth$/, () => {
    this.confirmDateOfBirthPage.changeDobLink.click();
  });

  this.When(/^I enter (\d+)\/(\d+)\/(\d+) as the confirmed Date of Birth$/, (dobDay, dobMonth, dobYear) => {
    this.confirmDateOfBirthPage.enterDob(dobDay, dobMonth, dobYear);
  });

  this.When(/^I enter "([^"]*)" as the confirmed day of birth$/, (expectedValue) => {
    this.confirmDateOfBirthPage.dobDayField = expectedValue;
  });

  this.When(/^I enter "([^"]*)" as the confirmed month of birth$/, (expectedValue) => {
    this.confirmDateOfBirthPage.dobMonthField = expectedValue;
  });

  this.When(/^I enter "([^"]*)" as the confirmed year of birth$/, (expectedValue) => {
    this.confirmDateOfBirthPage.dobYearField = expectedValue;
  });


  // Errors
  // ==============
  this.Then(/^the error message summary for the confirmed Date of birth is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmDateOfBirthPage.dateOfBirthSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for the confirmed Date of birth is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmDateOfBirthPage.dateOfBirthDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message details for the confirmed Date of birth$/, () => {
    expect(this.confirmDateOfBirthPage.dateOfBirthDetailedError.type).to.equal('NoSuchElement');
  });


  this.Then(/^the error message details for the day of birth is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmDateOfBirthPage.dayOfBirthDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the error message details for the month of birth is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmDateOfBirthPage.monthOfBirthDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the error message details for the year of birth is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmDateOfBirthPage.yearOfBirthDetailedError.getText()).to.contain(expectedValue);
  });
};
