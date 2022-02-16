const Page = require('./page');

class YourDetailsNameChangePage extends Page {
  constructor() {
    super('/02-your-details/name-change', 'Your details - GOV.UK', 'Personal Details Name Change');
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

module.exports = YourDetailsNameChangePage;
