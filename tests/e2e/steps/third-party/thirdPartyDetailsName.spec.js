const ThirdPartyDetailsName = require('../../pageObjects/thirdParty/thirdPartyDetailsName.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.thirdPartyDetailsName = new ThirdPartyDetailsName();
  });

  this.Given(/^I confirm that I am on the 3rd Party Details Name page$/, () => {
    this.thirdPartyDetailsName.isActive();
  });

  this.When(/^I enter "([^"]*)" as my first name$/, (expectedValue) => {
    this.thirdPartyDetailsName.firstName = expectedValue;
    expect(this.thirdPartyDetailsName.firstName.getValue()).to.equal(expectedValue);
  });

  this.When(/^I enter "([^"]*)" as my last name$/, (expectedValue) => {
    this.thirdPartyDetailsName.lastName = expectedValue;
    expect(this.thirdPartyDetailsName.lastName.getValue()).to.equal(expectedValue);
  });


  this.When(/^I submit my 3rd Party Name Details$/, () => {
    this.thirdPartyDetailsName.submit();
  });

  this.Then(/^my first name is not "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsName.firstName.getValue()).to.not.equal(expectedValue);
  });

  this.Then(/^my last name is not "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsName.lastName.getValue()).to.not.equal(expectedValue);
  });
};
