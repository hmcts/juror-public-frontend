const Page = require('../page');

class ThirdPartyDetailsRelationshipPage extends Page {
  constructor() {
    super('/branches/01-third-party-details/relationship', 'Your details - GOV.UK', '3rd Party Details');
  }

  get relationship() {
    return browser.element('#relationship');
  }

  set relationship(value) {
    this.relationship.setValue(value);
  }
}

module.exports = ThirdPartyDetailsRelationshipPage;
