const ThirdPartyPersonalAddress = require('../../pageObjects/thirdParty/thirdPartyPersonalAddress.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.thirdPartyPersonalAddress = new ThirdPartyPersonalAddress();
  });

  this.When(/^I submit my 3rd Party Personal Address Details$/, () => {
    this.thirdPartyPersonalAddress.submit();
  });

  this.When(/^I confirm that I am on the 3rd Party Personal Address page$/, () => {
    this.thirdPartyPersonalAddress.isActive();
  });

  this.Then(/^I click the link to change the summoned person's address$/, () => {
    this.thirdPartyPersonalAddress.changeAddressLink.click();
  });

  this.When(/^I enter "([^"]*)" as the first line of the address$/, (expectedValue) => {
    this.thirdPartyPersonalAddress.addressLineOne = expectedValue;
    expect(this.thirdPartyPersonalAddress.addressLineOne.getValue()).to.equal(expectedValue);
  });

  this.Then(/^there is no error message summary for my address line one$/, () => {
    expect(this.thirdPartyPersonalAddress.addressLineOneSummaryError.type).to.equal('NoSuchElement');
  });


  this.Then(/^the summary error for address line one is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalAddress.addressLineOneSummaryError.getText()).to.equal(expectedValue);
  });


  this.Then(/^the detailed error for address line one is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalAddress.addressLineOneDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message summary for address line one$/, () => {
    expect(this.thirdPartyPersonalAddress.addressLineOneSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for address line one$/, () => {
    expect(this.thirdPartyPersonalAddress.addressLineOneDetailedError.type).to.contain('NoSuchElement');
  });

  this.When(/^I enter "([^"]*)" as the town$/, (expectedValue) => {
    this.thirdPartyPersonalAddress.addressTown = expectedValue;
    expect(this.thirdPartyPersonalAddress.addressTown.getValue()).to.equal(expectedValue);
  });

  this.Then(/^the summary error for the town is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalAddress.addressTownSummaryError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the detailed error for the town is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalAddress.addressTownDetailedError.getText()).to.contain(expectedValue);
  });

  this.Then(/^there is no error message summary for the town$/, () => {
    expect(this.thirdPartyPersonalAddress.addressTownSummaryError.type).to.equal('NoSuchElement');
  });

  this.Then(/^there is no error message details for the town$/, () => {
    expect(this.thirdPartyPersonalAddress.addressTownDetailedError.type).to.equal('NoSuchElement');
  });
};
