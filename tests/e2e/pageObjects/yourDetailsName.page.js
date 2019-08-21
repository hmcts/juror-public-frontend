const Page = require('./page');

class YourDetailsNamePage extends Page {
  constructor() {
    super('/02-your-details/name', 'Your details - GOV.UK', 'Personal Details Name');
  }

  get changeNameButton() {
    return browser.element('.inline-edit-toggle[href="#nameGroup"]');
  }

  

  // Errors
  // ===========
  //

  get lastNameSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#lastName"]');
  }

  get lastNameDetailedError() {
    return browser.element('#lastName-error');
  }

  
}

module.exports = YourDetailsNamePage;
