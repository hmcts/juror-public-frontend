const ThirdPartyPersonalNameChange = require('../../pageObjects/thirdParty/thirdPartyPersonalNameChange.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.thirdPartyPersonalNameChange = new ThirdPartyPersonalNameChange();
  });

  this.When(/^I submit my 3rd Party Personal Name Change Details$/, () => {
    this.thirdPartyPersonalNameChange.submit();
  });
};
