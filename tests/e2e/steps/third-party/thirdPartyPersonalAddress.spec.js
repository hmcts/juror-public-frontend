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

  this.When(/^I confirm that the juror's address is correct$/, () => {
    this.thirdPartyPersonalAddress.confirmYes();
  });

  this.When(/^I confirm that the juror's address is incorrect$/, () => {
    this.thirdPartyPersonalAddress.confirmNo();
  });

  this.When(/^I confirm that the summoned person's address is correct$/, () => {
    this.thirdPartyPersonalAddress.confirmYes();
  });

  this.When(/^I confirm that the summoned person's address is incorrect$/, () => {
    this.thirdPartyPersonalAddress.confirmNo();
  });
};
