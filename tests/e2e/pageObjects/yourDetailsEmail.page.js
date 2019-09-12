const Page = require('./page');

class YourDetailsEmailPage extends Page {
  constructor() {
    super('/02-your-details/email', 'Reply to a jury summons - GOV.UK', 'Personal Details Email');
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


  enterEmail(emailAddress) {
    this.emailAddressField.setValue(emailAddress);
    this.emailAddressConfirmationField.setValue(emailAddress);
  }


  // Errors
  // ===========
  //

}

module.exports = YourDetailsEmailPage;
