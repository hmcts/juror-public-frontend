const Page = require('../page');

class MentalHealthCapacity extends Page {
  constructor() {
    super('/03-qualify/mental-health-capacity', 'Do you qualify for jury service? - GOV.UK', 'Eligibility Mental Health Capacity');
  }

  mentalHealthCapacityYes() {
    const selectedElement = browser.element('[name="mentalHealthCapacity"][value="Yes"]');
    selectedElement.click();
  }

  mentalHealthCapacityNo() {
    const selectedElement = browser.element('[name="mentalHealthCapacity"][value="No"]');
    selectedElement.click();
  }

  capacity(answer) {
    if (answer === 'Yes') {
      this.mentalHealthCapacityYes();
    } else if (answer === 'No') {
      this.mentalHealthCapacityNo();
    }
  }

  get mentalHealthCapacityDetails() {
    return browser.element('#mentalHealthCapacityDetails');
  }

  set mentalHealthCapacityDetails(value) {
    this.mentalHealthCapacityDetails.setValue(value);
  }
}

module.exports = MentalHealthCapacity;
