const Page = require('../page');

class ThirdPartyDetailsNamePage extends Page {
  constructor() {
    super('/branches/01-third-party-details/name', 'Your details - GOV.UK', '3rd Party Details Name');
  }

  get firstName() {
    return browser.element('#firstName');
  }

  set firstName(value) {
    this.firstName.setValue(value);
  }

  get lastName() {
    return browser.element('#lastName');
  }

  set lastName(value) {
    this.lastName.setValue(value);
  }


  // Errors
  // ============
}

module.exports = ThirdPartyDetailsNamePage;
