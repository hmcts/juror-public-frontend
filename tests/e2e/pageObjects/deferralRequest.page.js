const Page = require('./page');

class DeferralRequestPage extends Page {
  constructor() {
    super('/04-confirm-date/defer-reason', 'Ask for another date for your jury service - GOV.UK', 'Deferral');
  }

  get deferralReason() {
    return browser.element('#deferralReason');
  }

  set deferralReason(value) {
    this.deferralReason.setValue(value);
  }

}

module.exports = DeferralRequestPage;
