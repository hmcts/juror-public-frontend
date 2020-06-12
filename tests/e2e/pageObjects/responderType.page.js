const Page = require('./page');

class ResponderTypePage extends Page {
  constructor() {
    super('/00-responder-type', 'Reply to a jury summons - GOV.UK', 'Responder Type');
  }

  get firstPersonRadio() {
    return browser.element('[id="thirdParty_No"]');
  }

  get thirdPartyRadio() {
    return browser.element('[id="thirdParty_Yes"]');
  }

  firstPersonSelect() {
    this.firstPersonRadio.click();
  }

  thirdPartySelect() {
    this.thirdPartyRadio.click();
  }

  // Errors
  // ===========
  //
  get responderTypeError() {
    // return browser.element('.error-summary-list [href="#thirdParty"]');
    return browser.element('.govuk-error-summary__list [href="#thirdParty_No"]');
  }

  pageErrors() {
    return browser.isExisting('.govuk-error-summary__list');
  }

}

module.exports = ResponderTypePage;
