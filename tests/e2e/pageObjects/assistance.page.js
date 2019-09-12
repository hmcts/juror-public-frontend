const Page = require('./page');

class AssitancePage extends Page {
  constructor() {
    super('/06-assistance', 'Will you need help when you\'re at the court? - GOV.UK', 'Reasonable Adjustments');
  }

  assistanceYes() {
    const selectedElement = browser.element('[value="Yes"]');
    selectedElement.click();
  }

  assistanceNo() {
    const selectedElement = browser.element('[value="No"]');
    selectedElement.click();
  }

  selectAssistance(answer) {
    if (answer === 'Yes') {
      this.assistanceYes();
    } else if (answer === 'No') {
      this.assistanceNo();
    }
  }

  get reasonMobility() {
    return browser.element('label[for="assistanceType-mobility"]');
  }

  get reasonHearingImpaired() {
    return browser.element('label[for="assistanceType-hearing"]');
  }

  get reasonDiabetes() {
    return browser.element('label[for="assistanceType-diabetes"]');
  }

  get reasonSightImpaired() {
    return browser.element('label[for="assistanceType-sight"]');
  }

  get reasonLearningDisability() {
    return browser.element('label[for="assistanceType-learningDisability"]');
  }

  get reasonOther() {
    return browser.element('label[for="assistanceType-other"]');
  }

  get assistanceTypeDetails() {
    return browser.element('#assistanceTypeDetails');
  }

  set assistanceTypeDetails(value) {
    this.assistanceTypeDetails.setValue(value);
  }

  toggleReasonMobility() {
    this.reasonMobility.click();
  }

  toggleReasonHearingImpaired() {
    this.reasonHearingImpaired.click();
  }

  toggleReasonDiabetes() {
    this.reasonDiabetes.click();
  }

  toggleReasonSightImpaired() {
    this.reasonSightImpaired.click();
  }

  toggleReasonLearningDisabled() {
    this.reasonLearningDisability.click();
  }

  toggleReasonOther() {
    this.reasonOther.click();
  }
}

module.exports = AssitancePage;
