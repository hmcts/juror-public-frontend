const moment = require('moment');
const YourDetailsAddressPage = require('../pageObjects/yourDetailsAddress.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.yourDetailsAddressPage = new YourDetailsAddressPage();
  });

  this.Given(/^I confirm that I am on the Your Details Address page$/, () => {
    this.yourDetailsAddressPage.isActive();
  });

  this.When(/^I confirm that my address is correct$/, () => {
    this.yourDetailsAddressPage.confirmYes();
  });
  this.When(/^I confirm that my address is incorrect$/, () => {
    this.yourDetailsAddressPage.confirmNo();
  });

  this.When(/^I submit my address details$/, () => {
    this.yourDetailsAddressPage.submit();
  });


  // Errors
  // ==============

  this.Then(/^the summary error for my address confirmation is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressPage.addressSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for my address confirmation is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressPage.addressDetailedError.getText()).to.contain(expectedValue);
  });


};
