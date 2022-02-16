const Page = require('../page');

class ThirdPartyReasonPage extends Page {
  constructor() {
    super('/branches/02-third-party-reason', 'Why are you replying? - GOV.UK', '3rd Party Reason');
  }

  get reasonNotHere() {
    return browser.element('label[for="thirdPartyReasonNotHere"]');
  }

  get reasonAssistance() {
    return browser.element('label[for="thirdPartyReasonAssistance"]');
  }

  get reasonDeceased() {
    return browser.element('label[for="thirdPartyReasonDeceased"]');
  }

  get reasonOther() {
    return browser.element('label[for="thirdPartyReasonOther"]');
  }

  get reasonOtherDetails() {
    return browser.element('#thirdPartyOtherReason');
  }

  get continueLink() {
    return browser.element('//ax[text()[normalize-space(.)="Continue"]]');
  }

  continueButton() {
    this.continueLink.click();
  }

  set reasonOtherDetails(value) {
    this.reasonOtherDetails.setValue(value);
  }

  toggleReasonNotHere() {
    this.reasonNotHere.click();
  }

  toggleReasonAssistance() {
    this.reasonAssistance.click();
  }

  toggleReasonDeceased() {
    this.reasonDeceased.click();
  }

  toggleReasonOther() {
    this.reasonOther.click();
  }
}

module.exports = ThirdPartyReasonPage;
