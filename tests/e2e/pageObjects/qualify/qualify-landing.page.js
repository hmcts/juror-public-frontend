const Page = require('../page');

class QualifyPage extends Page {
  constructor() {
    super('/03-qualify', 'Do you qualify for jury service? - GOV.UK', 'Eligibility');
  }

  get continueLink() {
    return browser.element('//a[text()[normalize-space(.)="Continue"]]');
  }

  continueButton() {
    this.continueLink.click();
  }
}
module.exports = QualifyPage;
