const Page = require('../page');

class ThirdPartyDetailsContactPage extends Page {
  constructor() {
    super('/branches/01-third-party-details/contact', 'Your details - GOV.UK', '3rd Party Details');
  }

  get mainPhone() {
    return browser.element('#mainPhone');
  }

  set mainPhone(value) {
    this.mainPhone.setValue(value);
  }

  get otherPhone() {
    return browser.element('#otherPhone');
  }

  set otherPhone(value) {
    this.otherPhone.setValue(value);
  }

  get emailAddress() {
    return browser.element('#emailAddress');
  }

  set emailAddress(value) {
    this.emailAddress.setValue(value);
  }

  get emailAddressConfirmation() {
    return browser.element('#emailAddressConfirmation');
  }

  set emailAddressConfirmation(value) {
    this.emailAddressConfirmation.setValue(value);
  }

  get contactPreferencePhone() {
    // return browser.element('.block-label[for="contactPhone"]');
    return browser.element('label[for="contactPhone"]');
  }

  get contactPreferenceEmail() {
    // return browser.element('.block-label[for="contactEmail"]');
    return browser.element('label[for="contactEmail"]');
  }

  toggleContactPreferencePhone() {
    this.contactPreferencePhone.click();
  }

  toggleContactPreferenceEmail() {
    this.contactPreferenceEmail.click();
  }


  // Errors
  // ============
  mainPhoneErrors() {
    // return browser.elements('.error-summary-list > li > a[href="#mainPhone"]').value;
    return browser.element('(//div[contains(@class, "govuk-error-summary__body")]/ul/li/a[contains(@href, "#mainPhone")])[1]');
  }

  get thirdPartyContactPhoneSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#contactPhone"]');  // CP
  }

  get thirdPartyContactPhoneDetailedError() {
    return browser.element('#contactPhone-error');
  }

  get thirdPartyContactPhoneDetailsSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#mainPhone"]');
  }

  get thirdPartyContactPhoneDetailsDetailedError() {
    return browser.element('#mainPhone-error');
  }

  get thirdPartyOtherContactPhoneDetailsSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#otherPhone"]');
  }

  get thirdPartyOtherContactPhoneDetailsDetailedError() {
    return browser.element('#otherPhone-error');
  }
}

module.exports = ThirdPartyDetailsContactPage;
