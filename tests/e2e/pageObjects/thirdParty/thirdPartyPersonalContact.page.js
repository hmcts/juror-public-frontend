const Page = require('../page');

class ThirdPartyPersonalContactPage extends Page {
  constructor() {
    super('/branches/04-third-party-contact-details', 'More juror details - GOV.UK', '3rd Party Contact Details');
  }


  toggleContactMethodPhoneExisting() {
    this.contactMethodPhoneExisting.click();
  }

  toggleContactMethodPhoneNew() {
    this.contactMethodPhoneNew.click();
  }

  toggleContactMethodEmailExisting() {
    this.contactMethodEmailExisting.click();
  }

  toggleContactMethodEmailNew() {
    this.contactMethodEmailNew.click();
  }

  get contactMethodPhoneExisting() {
    return browser.element('input[id="phoneNumber_existing"]');
  }

  get contactMethodPhoneNew() {
    return browser.element('input[id="phoneNumber_new"]');
  }

  get contactMethodEmailExisting() {
    return browser.element('input[id="emailAddress_existing"]');
  }

  get contactMethodEmailNew() {
    return browser.element('input[id="emailAddress_new"]');
  }

  get mainContactPhoneNumber() {
    return browser.element('#primaryPhone');
  }

  set mainContactPhoneNumber(value) {
    this.mainContactPhoneNumber.setValue(value);
  }

  get otherContactPhoneNumber() {
    return browser.element('#secondaryPhone');
  }

  set otherContactPhoneNumber(value) {
    this.otherContactPhoneNumber.setValue(value);
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

  get useJurorPhoneDetailsSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#phoneNumber_existing"]');
  }

  get useJurorPhoneDetailsDetailedError() {
    return browser.element('[id="useJurorPhoneDetails-error"]');
  }

  get useJurorEmailDetailsSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#emailAddress_existing"]');
  }

  get useJurorEmailDetailsDetailedError() {
    return browser.element('[id="useJurorEmailDetails-error"]');
  }

  get jurorContactPhoneDetailsSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#primaryPhone"]');
  }

  get jurorContactPhoneDetailsDetailedError() {
    return browser.element('[id="primaryPhone-error"]');
  }

  get jurorOtherContactPhoneDetailsSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#secondaryPhone"]');
  }

  get jurorOtherContactPhoneDetailsDetailedError() {
    return browser.element('[id="secondaryPhone-error"]');
  }
}

module.exports = ThirdPartyPersonalContactPage;
