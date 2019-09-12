const Page = require('../page');

class MentalHealthSectioned extends Page {
  constructor() {
    super('/03-qualify/mental-health-sectioned', 'Do you qualify for jury service? - GOV.UK', 'Eligibility Mental Health Sectioned');
  }

  mentalHealthSectionedYes() {
    const selectedElement = browser.element('[name="mentalHealthSectioned"][value="Yes"]');
    selectedElement.click();
  }

  mentalHealthSectionedNo() {
    const selectedElement = browser.element('[name="mentalHealthSectioned"][value="No"]');
    selectedElement.click();
  }

  sectioned(answer) {
    if (answer === 'Yes') {
      this.mentalHealthSectionedYes();
    } else if (answer === 'No') {
      this.mentalHealthSectionedNo();
    }
  }

  get mentalHealthSectionedDetails() {
    return browser.element('#mentalHealthSectionedDetails');
  }

  set mentalHealthSectionedDetails(value) {
    this.mentalHealthSectionedDetails.setValue(value);
  }
}

module.exports = MentalHealthSectioned;
