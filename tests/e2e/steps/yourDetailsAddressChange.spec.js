const moment = require('moment');
const YourDetailsAddressChangePage = require('../pageObjects/yourDetailsAddressChange.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.yourDetailsAddressChangePage = new YourDetailsAddressChangePage();
  });

  this.Given(/^I confirm that I am on the Your Details Address Change page$/, () => {
    this.yourDetailsAddressChangePage.isActive();
  });

  /*
  this.When(/^I choose to provide new details for my address$/, () => {
    this.yourDetailsAddressChangePage.changeAddressButton.click();
  });
  */

  this.When(/^I enter "([^"]*)" as the first line of my address$/, (expectedValue) => {
    this.yourDetailsAddressChangePage.addressLineOne = expectedValue;
    expect(this.yourDetailsAddressChangePage.addressLineOne.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as the second line of my address$/, (expectedValue) => {
    this.yourDetailsAddressChangePage.addressLineTwo = expectedValue;
    expect(this.yourDetailsAddressChangePage.addressLineTwo.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as the third line of my address$/, (expectedValue) => {
    this.yourDetailsAddressChangePage.addressLineThree = expectedValue;
    expect(this.yourDetailsAddressChangePage.addressLineThree.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as the town of my address$/, (expectedValue) => {
    this.yourDetailsAddressChangePage.addressTown = expectedValue;
    expect(this.yourDetailsAddressChangePage.addressTown.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as the county of my address$/, (expectedValue) => {
    this.yourDetailsAddressChangePage.addressCounty = expectedValue;
    expect(this.yourDetailsAddressChangePage.addressCounty.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as the postcode of my address$/, (expectedValue) => {
    this.yourDetailsAddressChangePage.addressPostcode = expectedValue;
    expect(this.yourDetailsAddressChangePage.addressPostcode.getValue()).to.equal(expectedValue);
  });

  this.When(/^I submit my address change details$/, () => {
    this.yourDetailsAddressChangePage.submit();
  });


  // Errors
  // ==============
  this.Then(/^there is no error message summary for my address line one$/, () => {
    expect(this.yourDetailsAddressChangePage.addressLineOneSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address line one$/, () => {
    expect(this.yourDetailsAddressChangePage.addressLineOneDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message summary for my address line two$/, () => {
    expect(this.yourDetailsAddressChangePage.addressLineTwoSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address line two$/, () => {
    expect(this.yourDetailsAddressChangePage.addressLineTwoDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message summary for my address line three$/, () => {
    expect(this.yourDetailsAddressChangePage.addressLineThreeSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address line three$/, () => {
    expect(this.yourDetailsAddressChangePage.addressLineThreeDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^the summary error for my address line one is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressChangePage.addressLineOneSummaryError.getText()).to.equal(expectedValue);
  });


  this.Then(/^the summary error for my address is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressChangePage.addressSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for my address is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressChangePage.addressDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the detailed error for my address line one is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressChangePage.addressLineOneDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the summary error for my town is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressChangePage.addressTownSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for my town is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressChangePage.addressTownDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the summary error for my postcode is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressChangePage.addressPostcodeSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for my postcode is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressChangePage.addressPostcodeDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message summary for my address town$/, () => {
    expect(this.yourDetailsAddressChangePage.addressTownSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address town$/, () => {
    expect(this.yourDetailsAddressChangePage.addressTownDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message summary for my address county$/, () => {
    expect(this.yourDetailsAddressChangePage.addressCountySummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address county$/, () => {
    expect(this.yourDetailsAddressChangePage.addressCountyDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message summary for my address postcode$/, () => {
    expect(this.yourDetailsAddressChangePage.addressPostcodeSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address postcode$/, () => {
    expect(this.yourDetailsAddressChangePage.addressPostcodeDetailedError.type).to.equal('NoSuchElement');
  });


};
