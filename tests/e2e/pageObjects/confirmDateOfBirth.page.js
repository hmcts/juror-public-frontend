const Page = require('./page');

class ConfirmDateOfBirthPage extends Page {
  constructor() {
    super('/04-confirm-date', 'Confirm your date of birth - GOV.UK', 'Confirm your date of birth');
  }

  get changeDobLink() {
    return browser.element('#changeDob');
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
    return this.dobYearField.setValue(value);
  }


  // Errors
  // ===========
  //
  get dateOfBirthSummaryError() {
    // return browser.element('.govuk-error-summary__list [href="#dateOfBirth"]');
    return browser.element('.govuk-error-summary__list li a');
  }

  get dateOfBirthDetailedError() {
    return browser.element('.dateOfBirthErrorMessage');
  }

  get dayOfBirthDetailedError() {
    return browser.element('#dobDayErrorMessage');
  }

  get monthOfBirthDetailedError() {
    return browser.element('#dobMonthErrorMessage');
  }

  get yearOfBirthDetailedError() {
    return browser.element('#dobYearErrorMessage');
  }
}

module.exports = ConfirmDateOfBirthPage;
