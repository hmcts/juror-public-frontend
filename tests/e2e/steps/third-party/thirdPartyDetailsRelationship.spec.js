const ThirdPartyDetailsRelationship = require('../../pageObjects/thirdParty/thirdPartyDetailsRelationship.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.thirdPartyDetailsRelationship = new ThirdPartyDetailsRelationship();
  });

  this.Given(/^I confirm that I am on the 3rd Party Details Relationship page$/, () => {
    this.thirdPartyDetailsRelationship.isActive();
  });

  this.When(/^I enter "([^"]*)" as my relationship to the summoned Juror$/, (expectedValue) => {
    this.thirdPartyDetailsRelationship.relationship = expectedValue;
    expect(this.thirdPartyDetailsRelationship.relationship.getValue()).to.equal(expectedValue);
  });

  this.When(/^I submit my 3rd Party Relationship Details$/, () => {
    this.thirdPartyDetailsRelationship.submit();
  });

  this.Then(/^my relationship is not "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyDetailsRelationship.relationship.getValue()).to.not.equal(expectedValue);
  });
};
