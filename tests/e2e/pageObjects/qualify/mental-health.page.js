const Page = require('../page');

class QualifyMentalHealthPage extends Page {
  constructor() {
    super('/03-qualify/mental-health', 'Do you qualify for jury service? - GOV.UK', 'Eligibility Mental Health');
  }

  mentalHealthYes() {
    const selectedElement = browser.element('[name="mentalHealthAct"][value="Yes"]');
    const labelElement = selectedElement.element(('..'));
    labelElement.click();
  }

  mentalHealthNo() {
    const selectedElement = browser.element('[name="mentalHealthAct"][value="No"]');
    const labelElement = selectedElement.element(('..'));
    labelElement.click();
  }

  mentalHealth(answer) {
    if (answer === 'Yes') {
      this.mentalHealthYes();
    } else if (answer === 'No') {
      this.mentalHealthNo();
    }
  }

  get mentalHealthDetails() {
    return browser.element('#mentalHealthActDetails');
  }

  set mentalHealthDetails(value) {
    this.mentalHealthDetails.setValue(value);
  }
}

module.exports = QualifyMentalHealthPage;
