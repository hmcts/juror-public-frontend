const Page = require('./page');

class LoginPage extends Page {
  constructor() {
    super('/01-login', 'Reply to a jury summons - GOV.UK', 'Login');
  }

  get jurorNoField() {
    return browser.element('#jurorNumber');
  }

  get surnameField() {
    return browser.element('#jurorLastName');
  }

  get postCodeField() {
    return browser.element('#jurorPostcode');
  }

  login(jurorNo, surname, postCode) {
    this.jurorNoField.setValue(jurorNo);
    this.surnameField.setValue(surname);
    this.postCodeField.setValue(postCode);
    this.submit();
  }


  // Errors
  // ===========
  //
  get authenticationSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#authentication"]');
  }

  get jurorNumberSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#jurorNumber"]');
  }
  get jurorNumberDetailedError() {
    return browser.element('#jurorNumber-error');
  }

  get jurorLastNameSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#jurorLastName"]');
  }
  get jurorLastNameDetailedError() {
    return browser.element('#jurorLastName-error');
  }

  get jurorPostcodeSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#jurorPostcode"]');
  }
  get jurorPostcodeDetailedError() {
    return browser.element('#jurorPostcode-error');
  }
}

module.exports = LoginPage;
