const Page = require('../page');

class ThirdPartyPersonalDOBPage extends Page {
  constructor() {
    super('/branches/03-third-party-personal-details/date-of-birth', 'More juror details - GOV.UK', '3rd Party Personal Details Date Of Birth');
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

module.exports = ThirdPartyPersonalDOBPage;
