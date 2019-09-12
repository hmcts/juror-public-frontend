const moment = require('moment');
const YourDetailsAddressPage = require('../pageObjects/yourDetailsAddress.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.yourDetailsAddressPage = new YourDetailsAddressPage();
  });

  this.Given(/^I confirm that I am on the Your Details Address page$/, () => {
    this.yourDetailsAddressPage.isActive();
  });

  this.When(/^I choose to provide new details for my address$/, () => {
    this.yourDetailsAddressPage.changeAddressButton.click();
  });

  this.When(/^I enter "([^"]*)" as the first line of my address$/, (expectedValue) => {
    this.yourDetailsAddressPage.addressLineOne = expectedValue;
    expect(this.yourDetailsAddressPage.addressLineOne.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as the second line of my address$/, (expectedValue) => {
    this.yourDetailsAddressPage.addressLineTwo = expectedValue;
    expect(this.yourDetailsAddressPage.addressLineTwo.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as the third line of my address$/, (expectedValue) => {
    this.yourDetailsAddressPage.addressLineThree = expectedValue;
    expect(this.yourDetailsAddressPage.addressLineThree.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as the town of my address$/, (expectedValue) => {
    this.yourDetailsAddressPage.addressTown = expectedValue;
    expect(this.yourDetailsAddressPage.addressTown.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as the county of my address$/, (expectedValue) => {
    this.yourDetailsAddressPage.addressCounty = expectedValue;
    expect(this.yourDetailsAddressPage.addressCounty.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as the postcode of my address$/, (expectedValue) => {
    this.yourDetailsAddressPage.addressPostcode = expectedValue;
    expect(this.yourDetailsAddressPage.addressPostcode.getValue()).to.equal(expectedValue);
  });

  this.When(/^I submit my address details$/, () => {
    this.yourDetailsAddressPage.submit();
  });


  // Errors
  // ==============
  this.Then(/^there is no error message summary for my address line one$/, () => {
    expect(this.yourDetailsAddressPage.addressLineOneSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address line one$/, () => {
    expect(this.yourDetailsAddressPage.addressLineOneDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message summary for my address line two$/, () => {
    expect(this.yourDetailsAddressPage.addressLineTwoSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address line two$/, () => {
    expect(this.yourDetailsAddressPage.addressLineTwoDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message summary for my address line three$/, () => {
    expect(this.yourDetailsAddressPage.addressLineThreeSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address line three$/, () => {
    expect(this.yourDetailsAddressPage.addressLineThreeDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^the summary error for my address line one is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressPage.addressLineOneSummaryError.getText()).to.equal(expectedValue);
  });


  this.Then(/^the summary error for my address is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressPage.addressSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for my address is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressPage.addressDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the detailed error for my address line one is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressPage.addressLineOneDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the summary error for my town is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressPage.addressTownSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for my town is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressPage.addressTownDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^the summary error for my postcode is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressPage.addressPostcodeSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for my postcode is "([^"]*)"$/, (expectedValue) => {
    expect(this.yourDetailsAddressPage.addressPostcodeDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message summary for my address town$/, () => {
    expect(this.yourDetailsAddressPage.addressTownSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address town$/, () => {
    expect(this.yourDetailsAddressPage.addressTownDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message summary for my address county$/, () => {
    expect(this.yourDetailsAddressPage.addressCountySummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address county$/, () => {
    expect(this.yourDetailsAddressPage.addressCountyDetailedError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message summary for my address postcode$/, () => {
    expect(this.yourDetailsAddressPage.addressPostcodeSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for my address postcode$/, () => {
    expect(this.yourDetailsAddressPage.addressPostcodeDetailedError.type).to.equal('NoSuchElement');
  });


};
