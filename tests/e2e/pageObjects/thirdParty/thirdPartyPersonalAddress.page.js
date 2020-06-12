const Page = require('../page');

class ThirdPartyPersonalAddressPage extends Page {
  constructor() {
    super('/branches/03-third-party-personal-details/address', 'More juror details - GOV.UK', '3rd Party Personal Details Address');
  }

  get changeAddressLink() {
    return browser.element('#changeAddress');
  }

  get addressLineOne() {
    return browser.element('#addressLineOne');
  }

  set addressLineOne(value) {
    this.addressLineOne.setValue(value);
  }

  get addressTown() {
    return browser.element('#addressTown');
  }

  set addressTown(value) {
    this.addressTown.setValue(value);
  }

  get addressLineOneSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#addressLineOne"]');
  }

  get addressLineOneDetailedError() {
    return browser.element('#addressLineOne-error');
  }

  get addressTownSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#addressTown"]');
  }

  get addressTownDetailedError() {
    return browser.element('#addressTown-error');
  }

  confirmYes() {
    const selectedElement = browser.element('[name="addressConfirm"][value="Yes"]');
    selectedElement.click();
  }

  confirmNo() {
    const selectedElement = browser.element('[name="addressConfirm"][value="No"]');
    selectedElement.click();
  }
}

module.exports = ThirdPartyPersonalAddressPage;
