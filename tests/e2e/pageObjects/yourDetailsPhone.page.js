const Page = require('./page');

class YourDetailsPhonePage extends Page {
  constructor() {
    super('/02-your-details/phone', 'Your details - GOV.UK', 'Personal Details Phone');
  }

  get mainPhoneField() {
    return browser.element('#primaryPhone');
  }

  get secondaryPhoneField() {
    return browser.element('#secondaryPhone');
  }

  enterMainPhone(mainPhone) {
    this.mainPhoneField.setValue(mainPhone);
  }

  enterSecondaryPhone(secondaryPhone) {
    this.secondaryPhoneField.setValue(secondaryPhone);
  }


  // Errors
  // ===========
  //
  
  get mainPhoneSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#primaryPhone"]');
  }

  get mainPhoneDetailedError() {
    return browser.element('#primaryPhone-error');
  }


  get otherPhoneSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#secondaryPhone"]');
  }

  get otherPhoneDetailedError() {
    return browser.element('#secondaryPhone-error');
  }

}

module.exports = YourDetailsPhonePage;
