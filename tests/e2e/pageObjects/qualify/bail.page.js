const Page = require('../page');

class QualifyBailPage extends Page {
  constructor() {
    super('/03-qualify/mental-health', 'Do you qualify for jury service? - GOV.UK', 'Eligibility Bail');
  }

  bailYes() {
    const selectedElement = browser.element('[name="onBail"][value="Yes"]');
    selectedElement.click();
  }

  bailNo() {
    const selectedElement = browser.element('[name="onBail"][value="No"]');
    selectedElement.click();
  }

  onBail(answer) {
    if (answer === 'Yes') {
      this.bailYes();
    } else if (answer === 'No') {
      this.bailNo();
    }
  }

  get bailDetails() {
    return browser.element('#onBailDetails');
  }

  set bailDetails(value) {
    this.bailDetails.setValue(value);
  }
}

module.exports = QualifyBailPage;
