const Page = require('../page');

class ThirdPartyPersonalDetailsPage extends Page {
  constructor() {
    super('/branches/03-third-party-personal-details', 'More juror details - GOV.UK', '3rd Party Personal Details');
  }

  get name() {
    return browser.element('#name');
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
    return browser.element('.error-summary-list [href="#addressLineOneGroup"]');
  }

  get addressLineOneDetailedError() {
    return browser.element('#addressLineOne-error');
  }

  get addressTownSummaryError() {
    return browser.element('.error-summary-list [href="#addressTownGroup"]');
  }

  get addressTownDetailedError() {
    return browser.element('#addressTown-error');
  }

  get dobDayField() {
    return browser.element('#dobDay');
  }

  set dobDayField(value) {
    this.dobDayField.setValue(value);
  }

  get dobMonthField() {
    return browser.element('#dobMonth');
  }

  set dobMonthField(value) {
    this.dobMonthField.setValue(value);
  }

  get dobYearField() {
    return browser.element('#dobYear');
  }

  set dobYearField(value) {
    this.dobYearField.setValue(value);
  }

  enterDob(dobDay, dobMonth, dobYear) {
    this.dobDayField = dobDay;
    this.dobMonthField = dobMonth;
    this.dobYearField = dobYear;
  }
}

module.exports = ThirdPartyPersonalDetailsPage;
