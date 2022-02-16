const Page = require('./page');

class YourDetailsNamePage extends Page {
  constructor() {
    super('/02-your-details/name', 'Your details - GOV.UK', 'Personal Details Name');
  }

  get changeNameButton() {
    return browser.element('.inline-edit-toggle[href="#nameGroup"]');
  }


  confirmYes() {
    const selectedElement = browser.element('[name="nameConfirm"][value="Yes"]');
    selectedElement.click();
  }

  confirmNo() {
    const selectedElement = browser.element('[name="nameConfirm"][value="No"]');
    selectedElement.click();
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
