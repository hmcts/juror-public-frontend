const ThirdPartyPersonalName = require('../../pageObjects/thirdParty/thirdPartyPersonalName.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.thirdPartyPersonalName = new ThirdPartyPersonalName();
  });

  this.When(/^I submit my 3rd Party Personal Name Details$/, () => {
    this.thirdPartyPersonalName.submit();
  });

  this.When(/^I confirm that the juror's name is correct$/, () => {
    this.thirdPartyPersonalName.confirmYes();
  });

  this.When(/^I confirm that the juror's name is incorrect$/, () => {
    this.thirdPartyPersonalName.confirmNo();
  });

  this.When(/^I confirm that the summoned person's name is correct$/, () => {
    this.thirdPartyPersonalName.confirmYes();
  });

  this.When(/^I confirm that the summoned person's name is incorrect$/, () => {
    this.thirdPartyPersonalName.confirmNo();
  });

  this.When(/^I confirm that I am on the 3rd Party Personal Name page$/, () => {
    this.thirdPartyPersonalName.isActive();
  });

  this.Then(/^I confirm that the summoned person's name is "([^"]*)"$/, (expectedValue) => {
    expect(this.thirdPartyPersonalName.name.getText()).to.equal(expectedValue);
    this.thirdPartyPersonalName.confirmYes();
  });
};
