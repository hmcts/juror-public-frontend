const ThirdPartyPersonalAddressChange = require('../../pageObjects/thirdParty/thirdPartyPersonalAddressChange.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.ThirdPartyPersonalAddressChange = new ThirdPartyPersonalAddressChange();
  });

  this.When(/^I submit my 3rd Party Personal Address Change details$/, () => {
    this.ThirdPartyPersonalAddressChange.submit();
  });

  this.When(/^I confirm that I am on the 3rd Party Personal Address Change page$/, () => {
    this.ThirdPartyPersonalAddressChange.isActive();
  });

  this.When(/^I enter "([^"]*)" as the first line of the address$/, (expectedValue) => {
    this.ThirdPartyPersonalAddressChange.addressLineOne = expectedValue;
    expect(this.ThirdPartyPersonalAddressChange.addressLineOne.getValue()).to.equal(expectedValue);
  });

  this.Then(/^there is no error message summary for my address line one$/, () => {
    expect(this.ThirdPartyPersonalAddressChange.addressLineOneSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^the summary error for address line one is "([^"]*)"$/, (expectedValue) => {
    expect(this.ThirdPartyPersonalAddressChange.addressLineOneSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for address line one is "([^"]*)"$/, (expectedValue) => {
    expect(this.ThirdPartyPersonalAddressChange.addressLineOneDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message summary for address line one$/, () => {
    expect(this.ThirdPartyPersonalAddressChange.addressLineOneSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for address line one$/, () => {
    expect(this.ThirdPartyPersonalAddressChange.addressLineOneDetailedError.type).to.contain('NoSuchElement');
  });

  this.When(/^I enter "([^"]*)" as the town$/, (expectedValue) => {
    this.ThirdPartyPersonalAddressChange.addressTown = expectedValue;
    expect(this.ThirdPartyPersonalAddressChange.addressTown.getValue()).to.equal(expectedValue);
  });

  this.Then(/^the summary error for the town is "([^"]*)"$/, (expectedValue) => {
    expect(this.ThirdPartyPersonalAddressChange.addressTownSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for the town is "([^"]*)"$/, (expectedValue) => {
    expect(this.ThirdPartyPersonalAddressChange.addressTownDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message summary for the town$/, () => {
    expect(this.ThirdPartyPersonalAddressChange.addressTownSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for the town$/, () => {
    expect(this.ThirdPartyPersonalAddressChange.addressTownDetailedError.type).to.equal('NoSuchElement');
  });
};
