const Page = require('./page');

class YourDetailsPage extends Page {
  constructor() {
    super('/02-your-details', 'Reply to a jury summons - GOV.UK', 'Personal Details');
  }

  get changeNameButton() {
    return browser.element('.inline-edit-toggle[href="#nameGroup"]');
  }

  get changeAddressButton() {
    return browser.element('.inline-edit-toggle[href="#addressGroup"]');
  }

  get addressLineOne() {
    return browser.element('#addressLineOne');
  }

  set addressLineOne(value) {
    this.addressLineOne.setValue(value);
  }

  get addressLineTwo() {
    return browser.element('#addressLineTwo');
  }

  set addressLineTwo(value) {
    this.addressLineTwo.setValue(value);
  }

  get addressLineThree() {
    return browser.element('#addressLineThree');
  }

  set addressLineThree(value) {
    this.addressLineThree.setValue(value);
  }

  get addressTown() {
    return browser.element('#addressTown');
  }

  set addressTown(value) {
    this.addressTown.setValue(value);
  }

  get addressCounty() {
    return browser.element('#addressCounty');
  }

  set addressCounty(value) {
    this.addressCounty.setValue(value);
  }

  get addressPostcode() {
    return browser.element('#addressPostcode');
  }

  set addressPostcode(value) {
    this.addressPostcode.setValue(value);
  }

  get dobDayField() {
    return browser.element('#dobDay');
  }

  set dobDayField(value) {
    this.dobDayField.setValue(value);
  }

  get dobMonthField() {
    return browser.element('#dobMonth');
  }

  set dobMonthField(value) {
    this.dobMonthField.setValue(value);
  }

  get dobYearField() {
    return browser.element('#dobYear');
  }

  set dobYearField(value) {
    return this.dobYearField.setValue(value);
  }

  get mainPhoneField() {
    return browser.element('#primaryPhone');
  }

  get secondaryPhoneField() {
    return browser.element('#secondaryPhone');
  }

  get emailAddressField() {
    return browser.element('#emailAddress');
  }

  set emailAddressField(value) {
    this.emailAddressField.setValue(value);
  }

  get emailAddressConfirmationField() {
    return browser.element('#emailAddressConfirmation');
  }

  set emailAddressConfirmationField(value) {
    this.emailAddressConfirmationField.setValue(value);
  }

  enterDob(dobDay, dobMonth, dobYear) {
    this.dobDayField = dobDay;
    this.dobMonthField = dobMonth;
    this.dobYearField = dobYear;
  }

  enterMainPhone(mainPhone) {
    this.mainPhoneField.setValue(mainPhone);
  }

  enterSecondaryPhone(secondaryPhone) {
    this.secondaryPhoneField.setValue(secondaryPhone);
  }

  enterEmail(emailAddress) {
    this.emailAddressField.setValue(emailAddress);
    this.emailAddressConfirmationField.setValue(emailAddress);
  }


  // Errors
  // ===========
  //

  get lastNameSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#lastNameGroup"]');
  }

  get lastNameDetailedError() {
    return browser.element('#lastNameGroupError');
  }

  get addressSummaryError() {
    return browser.element('.error-summary-list [href="#addressGroup"]');
  }

  get addressDetailedError() {
    return browser.element('#addressGroupError');
  }

  get addressLineOneSummaryError() {
    return browser.element('.error-summary-list [href="#addressLineOneGroup"]');
  }

  get addressLineOneDetailedError() {
    return browser.element('#addressLineOneGroupError');
  }

  get addressLineTwoSummaryError() {
    return browser.element('.error-summary-list [href="#addressLineTwoGroup"]');
  }

  get addressLineTwoDetailedError() {
    return browser.element('#addressLineTwoGroupError');
  }

  get addressLineThreeSummaryError() {
    return browser.element('.error-summary-list [href="#addressLineThreeGroup"]');
  }

  get addressLineThreeDetailedError() {
    return browser.element('#addressLineThreeGroupError');
  }

  get addressTownSummaryError() {
    return browser.element('.error-summary-list [href="#addressTownGroup"]');
  }

  get addressTownDetailedError() {
    return browser.element('#addressTownGroupError');
  }

  get addressCountySummaryError() {
    return browser.element('.error-summary-list [href="#addressCountyGroup"]');
  }

  get addressCountyDetailedError() {
    return browser.element('#addressCountyGroupError');
  }

  get addressPostcodeSummaryError() {
    return browser.element('.error-summary-list [href="#addressPostcodeGroup"]');
  }

  get addressPostcodeDetailedError() {
    return browser.element('#addressPostcodeGroupError');
  }


  get mainPhoneSummaryError() {
    return browser.element('.error-summary-list [href="#primaryPhoneGroup"]');
  }

  get mainPhoneDetailedError() {
    return browser.element('#primaryPhoneErrorMessage');
  }


  get otherPhoneSummaryError() {
    return browser.element('.error-summary-list [href="#secondaryPhoneGroup"]');
  }

  get otherPhoneDetailedError() {
    return browser.element('#secondaryPhoneErrorMessage');
  }


  get dateOfBirthSummaryError() {
    return browser.element('.error-summary-list [href="#dateOfBirthGroup"]');
  }

  get dateOfBirthDetailedError() {
    return browser.element('.dateOfBirthErrorMessage');
  }

  get dayOfBirthDetailedError() {
    return browser.element('#dobDayErrorMessage');
  }

  get monthOfBirthDetailedError() {
    return browser.element('#dobMonthErrorMessage');
  }

  get yearOfBirthDetailedError() {
    return browser.element('#dobYearErrorMessage');
  }
}

module.exports = YourDetailsPage;
