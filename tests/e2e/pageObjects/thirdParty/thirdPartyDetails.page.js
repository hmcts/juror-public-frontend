const Page = require('../page');

class ThirdPartyDetailsPage extends Page {
  constructor() {
    super('/branches/01-third-party-details', 'Your details - GOV.UK', '3rd Party Details');
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

  get relationship() {
    return browser.element('#relationship');
  }

  set relationship(value) {
    this.relationship.setValue(value);
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
    return browser.element('.block-label[for="contactPhone"]');
  }

  get contactPreferenceEmail() {
    return browser.element('.block-label[for="contactEmail"]');
  }

  mainPhoneErrors() {
    return browser.elements('.error-summary-list > li > a[href="#mainPhoneGroup"]').value;
  }

  toggleContactPreferencePhone() {
    this.contactPreferencePhone.click();
  }

  toggleContactPreferenceEmail() {
    this.contactPreferenceEmail.click();
  }


  // Errors
  // ============
  get thirdPartyContactPhoneSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#contactPhone"]');
  }

  get thirdPartyContactPhoneDetailedError() {
    return browser.element('#contactPhoneErrorMessage');
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

module.exports = ThirdPartyDetailsPage;
