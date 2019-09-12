const Page = require('../page');

class QualifyConvictionsPage extends Page {
  constructor() {
    super('/03-qualify/mental-health', 'Do you qualify for jury service? - GOV.UK', 'Eligibility Convictions');
  }


  convictionYes() {
    const selectedElement = browser.element('[name="convicted"][value="Yes"]');
    selectedElement.click();
  }

  convictionNo() {
    const selectedElement = browser.element('[name="convicted"][value="No"]');
    selectedElement.click();
  }

  conviction(answer) {
    if (answer === 'Yes') {
      this.convictionYes();
    } else if (answer === 'No') {
      this.convictionNo();
    }
  }

  get convictionsDetails() {
    return browser.element('#convictedDetails');
  }

  set convictionsDetails(value) {
    this.convictionsDetails.setValue(value);
  }
}

module.exports = QualifyConvictionsPage;
