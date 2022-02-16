const LoginPage = require('../pageObjects/login.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.loginPage = new LoginPage();
  });

  this.Given(/^I submit "([^"]*)", "([^"]*)" and "([^"]*)" as my login credentials$/, (jurorNo, surname, postCode) => {
    this.loginPage.login(jurorNo, surname, postCode);
  });

  this.Given(/^I confirm that I am on the Login page$/, () => {
    this.loginPage.isActive();
  });


  // Errors
  // ==============
  //
  this.Then(/^the authentication summary error is "([^"]*)"$/, (expectedValue) => {
    expect(this.loginPage.authenticationSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error message summary for Juror number is "([^"]*)"$/, (expectedValue) => {
    expect(this.loginPage.jurorNumberSummaryError.getText()).to.equal(expectedValue);
  });
  this.Then(/^the error message details for Juror number is "([^"]*)"$/, (expectedValue) => {
    expect(this.loginPage.jurorNumberDetailedError.getText()).to.contains(expectedValue);
  });
  this.Then(/^there is no error message details for Juror number$/, () => {
    expect(this.loginPage.jurorNumberDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^the error message summary for Juror last name is "([^"]*)"$/, (expectedValue) => {
    expect(this.loginPage.jurorLastNameSummaryError.getText()).to.equal(expectedValue);
  });
  this.Then(/^the error message details for Juror last name is "([^"]*)"$/, (expectedValue) => {
    expect(this.loginPage.jurorLastNameDetailedError.getText()).to.contains(expectedValue);
  });
  this.Then(/^there is no error message details for Juror last name$/, () => {
    expect(this.loginPage.jurorLastNameDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^the error message summary for Juror postcode is "([^"]*)"$/, (expectedValue) => {
    expect(this.loginPage.jurorPostcodeSummaryError.getText()).to.equal(expectedValue);
  });
  this.Then(/^the error message details for Juror postcode is "([^"]*)"$/, (expectedValue) => {
    expect(this.loginPage.jurorPostcodeDetailedError.getText()).to.contains(expectedValue);
  });
  this.Then(/^there is no error message details for Juror postcode$/, () => {
    expect(this.loginPage.jurorPostcodeDetailedError.type).to.equal('NoSuchElement');
  });
};
