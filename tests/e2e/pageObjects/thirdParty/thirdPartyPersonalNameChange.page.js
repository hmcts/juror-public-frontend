const Page = require('../page');

class ThirdPartyPersonalNameChangePage extends Page {
  constructor() {
    super('/branches/03-third-party-personal-details/name-change', 'More juror details - GOV.UK', '3rd Party Personal Details Name Change');
  }

  get name() {
    return browser.element('//div[@id="fullName"]');
  }
}

module.exports = ThirdPartyPersonalNameChangePage;
