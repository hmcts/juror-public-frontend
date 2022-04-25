const moment = require('moment');
const YourDetailsDOBPage = require('../pageObjects/yourDetailsDOB.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.yourDetailsDOBPage = new YourDetailsDOBPage();
  });

  this.Given(/^I confirm that I am on the Your Details DOB page$/, () => {
    this.yourDetailsDOBPage.isActive();
  });

  this.Given(/^I enter (\d+)\/(\d+)\/(\d+) as my Date of Birth$/, (dobDay, dobMonth, dobYear) => {
    this.yourDetailsDOBPage.enterDob(dobDay, dobMonth, dobYear);
  });

  this.Given(/^I enter "([^"]*)" as my day of birth$/, (expectedValue) => {
    this.yourDetailsDOBPage.dobDayField = expectedValue;
  });

  this.Given(/^I enter "([^"]*)" as my month of birth$/, (expectedValue) => {
    this.yourDetailsDOBPage.dobMonthField = expectedValue;
  });

  this.Given(/^I enter "([^"]*)" as my year of birth$/, (expectedValue) => {
    this.yourDetailsDOBPage.dobYearField = expectedValue;
  });

  this.When(/^I enter a date of birth which makes me "([^"]*)" years old$/, (years) => {
    const dobMoment = moment().subtract(parseInt(years, 10), 'years');
    this.yourDetailsDOBPage.enterDob(dobMoment.format('DD'), dobMoment.format('MM'), dobMoment.format('YYYY'));
  });

  this.When(/^I submit my DOB details$/, () => {
    this.yourDetailsDOBPage.submit();
  });


  this.Then(/^my Date of Birth is empty on Your Details DOB page$/, () => {
    expect(this.yourDetailsDOBPage.dobDayField.getValue()).to.equal('');
    expect(this.yourDetailsDOBPage.dobMonthField.getValue()).to.equal('');
    expect(this.yourDetailsDOBPage.dobYearField.getValue()).to.equal('');
  });


  // Errors
  // ==============


  this.Then(/^the error message summary for my Date of birth is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsDOBPage.dateOfBirthSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message details for my Date of birth is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsDOBPage.dateOfBirthDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message details for my Date of birth$/, () => {
    expect(this.yourDetailsDOBPage.dateOfBirthDetailedError.type).to.equal('NoSuchElement');
  });


  this.Then(/^the error message details for my day of birth is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsDOBPage.dayOfBirthDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the error message details for my month of birth is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsDOBPage.monthOfBirthDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the error message details for my year of birth is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsDOBPage.yearOfBirthDetailedError.getText()).to.contain(expectedValue);
  });

  this.When(/^I confirm my age$/, () => {
    this.yourDetailsDOBPage.submit();
  });

};
