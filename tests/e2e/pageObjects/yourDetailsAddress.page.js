const Page = require('./page');

class YourDetailsAddressPage extends Page {
  constructor() {
    super('/02-your-details/address', 'Reply to a jury summons - GOV.UK', 'Personal Details Address');
  }

  get changeAddressButton() {
    return browser.element('.inline-edit-toggle[href="#addressGroup"]');
  }

  get addressLineOne() {
    return browser.element('#addressLineOne');
  }

  set addressLineOne(value) {
    this.addressLineOne.setValue(value);
  }

  get addressLineTwo() {
    return browser.element('#addressLineTwo');
  }

  set addressLineTwo(value) {
    this.addressLineTwo.setValue(value);
  }

  get addressLineThree() {
    return browser.element('#addressLineThree');
  }

  set addressLineThree(value) {
    this.addressLineThree.setValue(value);
  }

  get addressTown() {
    return browser.element('#addressTown');
  }

  set addressTown(value) {
    this.addressTown.setValue(value);
  }

  get addressCounty() {
    return browser.element('#addressCounty');
  }

  set addressCounty(value) {
    this.addressCounty.setValue(value);
  }

  get addressPostcode() {
    return browser.element('#addressPostcode');
  }

  set addressPostcode(value) {
    this.addressPostcode.setValue(value);
  }

  confirmYes() {
    const selectedElement = browser.element('[name="addressConfirm"][value="Yes"]');
    selectedElement.click();
  }

  confirmNo() {
    const selectedElement = browser.element('[name="addressConfirm"][value="No"]');
    selectedElement.click();
  }

  // Errors
  // ===========
  //

  get addressSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#addressGroup"]');
  }

  get addressDetailedError() {
    return browser.element('#addressGroupError');
  }

  /*
  get addressLineOneSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#addressLineOne"]');
  }

  get addressLineOneDetailedError() {
    return browser.element('#addressLineOne-error');
  }

  get addressLineTwoSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#addressLineTwo"]');
  }

  get addressLineTwoDetailedError() {
    return browser.element('#addressLineTwo-errort');
  }

  get addressLineThreeSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#addressLineThree"]');
  }

  get addressLineThreeDetailedError() {
    return browser.element('#addressLineThree-error');
  }

  get addressTownSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#addressTown"]');
  }

  get addressTownDetailedError() {
    return browser.element('#addressTown-error');
  }

  get addressCountySummaryError() {
    return browser.element('.govuk-error-summary__list [href="#addressCounty"]');
  }

  get addressCountyDetailedError() {
    return browser.element('#addressCounty-error');
  }

  get addressPostcodeSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#addressPostcode"]');
  }

  get addressPostcodeDetailedError() {
    return browser.element('#addressPostcode-error');
  }
  */
}

module.exports = YourDetailsAddressPage;
