const moment = require('moment');
const ConfirmDatePage = require('../pageObjects/confirmDate.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.confirmDatePage = new ConfirmDatePage();
  });

  this.Given(/^I submit my Availablity$/, () => {
    this.confirmDatePage.submit();
  });


  this.Given(/^I state that I can do jury service for my availablity$/, () => {
    this.confirmDatePage.iCanDoJuryService();
  });


  this.Given(/^I confirm that I am on the Confirm Date page$/, () => {
    this.confirmDatePage.isActive();
  });

  this.Then(/^I confirm that the hearing date is valid$/, () => {
    expect(moment(parseInt(this.confirmDatePage.hearingDate.getValue(), 10)).isValid()).to.equal(true);
  });

  this.Then(/^I confirm that the hearing time is "([^"]*)"$/, (expectedValue) => {
    expect(this.confirmDatePage.hearingTime.getText()).to.equal(expectedValue);
  });

  this.Then(/^I state that I require a deferral$/, () => {
    this.confirmDatePage.iRequireADeferral();
  });

  this.Then(/^I state that I require a excusal$/, () => {
    this.confirmDatePage.iRequireAnExcusal();
  });
};
