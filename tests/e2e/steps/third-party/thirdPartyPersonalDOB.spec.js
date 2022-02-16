const moment = require('moment');
const ThirdPartyPersonalDOB = require('../../pageObjects/thirdParty/thirdPartyPersonalDOB.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.thirdPartyPersonalDOB = new ThirdPartyPersonalDOB();
  });

  this.When(/^I submit my 3rd Party Personal DOB Details$/, () => {
    this.thirdPartyPersonalDOB.submit();
  });

  this.When(/^I confirm that I am on the 3rd Party Personal DOB page$/, () => {
    this.thirdPartyPersonalDOB.isActive();
  });

  this.When(/^I enter (\d+)\/(\d+)\/(\d+) as the juror's Date of Birth$/, (dobDay, dobMonth, dobYear) => {
    this.thirdPartyPersonalDOB.enterDob(dobDay, dobMonth, dobYear);
  });

  this.When(/^I enter a date of birth which makes the juror "([^"]*)" years old$/, (years) => {
    const dobMoment = moment().subtract(parseInt(years, 10), 'years');
    this.thirdPartyPersonalDOB.enterDob(dobMoment.format('DD'), dobMoment.format('MM'), dobMoment.format('YYYY'));
  });

  this.Given(/^I enter "([^"]*)" as the day of birth$/, (expectedValue) => {
    this.thirdPartyPersonalDOB.dobDayField = expectedValue;
  });

  this.Given(/^I enter "([^"]*)" as the month of birth$/, (expectedValue) => {
    this.thirdPartyPersonalDOB.dobMonthField = expectedValue;
  });

  this.Given(/^I enter "([^"]*)" as the year of birth$/, (expectedValue) => {
    this.thirdPartyPersonalDOB.dobYearField = expectedValue;
  });
};
