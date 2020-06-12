const Page = require('./page');

class YourDetailsDOBPage extends Page {
  constructor() {
    super('/02-your-details/date-of-birth', 'Your details - GOV.UK', 'Personal Details Date Of Birth');
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

  /*get mainPhoneField() {
    return browser.element('#primaryPhone');
  } */

  enterDob(dobDay, dobMonth, dobYear) {
    this.dobDayField = dobDay;
    this.dobMonthField = dobMonth;
    this.dobYearField = dobYear;
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

module.exports = YourDetailsDOBPage;
