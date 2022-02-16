const Page = require('../page');

class QualifyResidencyPage extends Page {
  constructor() {
    super('/03-qualify/residency', 'Do you qualify for jury service? - GOV.UK', 'Eligibility Residency');
  }

  residencyYes() {
    const selectedElement = browser.element('[name="livedConsecutive"][value="Yes"]');
    selectedElement.click();
  }

  residencyNo() {
    const selectedElement = browser.element('[name="livedConsecutive"][value="No"]');
    selectedElement.click();
  }

  residency(answer) {
    if (answer === 'Yes') {
      this.residencyYes();
    } else if (answer === 'No') {
      this.residencyNo();
    }
  }

  get residencyDetails() {
    return browser.element('#livedConsecutiveDetails');
  }

  set residencyDetails(value) {
    this.residencyDetails.setValue(value);
  }
}

module.exports = QualifyResidencyPage;
