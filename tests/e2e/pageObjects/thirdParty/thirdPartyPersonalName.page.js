const Page = require('../page');

class ThirdPartyPersonalNamePage extends Page {
  constructor() {
    super('/branches/03-third-party-personal-details/name', 'More juror details - GOV.UK', '3rd Party Personal Details Name');
  }

  get name() {
    return browser.element('//div[@id="fullName"]');
  }

  confirmYes() {
    const selectedElement = browser.element('[name="nameConfirm"][value="Yes"]');
    selectedElement.click();
  }

  confirmNo() {
    const selectedElement = browser.element('[name="nameConfirm"][value="No"]');
    selectedElement.click();
  }

}

module.exports = ThirdPartyPersonalNamePage;
