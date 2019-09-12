const Page = require('./page');

class ConfirmInformationPage extends Page {
  constructor() {
    super('/07-confirm-information', 'Check your answers now - GOV.UK', 'Check Your Answers');
  }

  confirmInformation() {
    const selectedElement = browser.element('#informationConfirmed');
    const labelElement = selectedElement.element(('..'));
    labelElement.click();
  }

  get changeNameDetails() {
    return browser.element('#changeName');
  }

  get changePrimaryPhoneDetails() {
    return browser.element('#changePhone');
  }

  get changeEmailAddress() {
    return browser.element('#changeEmailAddress');
  }

  get changeImpairmentDetails() {
    return browser.element('#changeAdjustments');
  }

  get changeThirdPartyMainPhone() {
    return browser.element('#changeThirdPartyMainPhone');
  }

  get changeThirdPartyEmailAddress() {
    return browser.element('#changeThirdPartyEmailAddress');
  }

  get otherImpairmentDetails() {
    return browser.element('#assistanceTypeOther');
  }

  get otherDetails() {
    return browser.element('#otherDetails');
  }

  get mainPhoneNumber() {
    return browser.element('#primaryPhone');
  }

  get secondaryPhoneNumber() {
    return browser.element('#secondaryPhone');
  }

  get emailAddress() {
    return browser.element('#emailAddress');
  }

  get thirdPartyMainPhoneNumber() {
    return browser.element('#thirdPartyMainPhone');
  }

  get thirdPartyOtherPhoneNumber() {
    return browser.element('#thirdPartyOtherPhone');
  }

  get thirdPartyEmailAddress() {
    return browser.element('#thirdPartyEmailAddress');
  }

  get excusalChangeLink() {
    return browser.element('#changeConfirmDate');
  }

  get convictionAnswer() {
    return browser.element('#convictionAnswer');
  }

  get bailAnswer() {
    return browser.element('#onBailAnswer');
  }

  get mentalHealthSectionedAnswer() {
    return browser.element('#mentalHealthSectionedAnswer');
  }

  get mentalHealthCapacityAnswer() {
    return browser.element('#mentalHealthCapacityAnswer');
  }

  get clickChangeReasonLink() {
    return browser.element('#changeReason');
  }

  // These cover off entire tables (I.e. a full page of response)
  // ==========================
  //
  isQualifyAnswerTableVisible() {
    return browser.element('#qualifyAnswersTable').isVisible();
  }

  isConfirmDateAnswerTableVisible() {
    return browser.element('#confirmDateTable').isVisible();
  }

  isDeferralAnswerTableVisible() {
    return browser.element('#deferralTable').isVisible();
  }

  isExcusalAnswerTableVisible() {
    return browser.element('#excusalTable').isVisible();
  }

  isCjsEmployedAnswerTableVisible() {
    return browser.element('#cjsEmployedTable').isVisible();
  }

  isReasonbleAjdustmentsAnswerTableVisible() {
    return browser.element('#reasonableAdjustmentsTable').isVisible();
  }
}

module.exports = ConfirmInformationPage;
