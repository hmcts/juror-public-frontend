const Page = require('./page');

class ConfirmDatePage extends Page {
  constructor() {
    super('/04-confirm-date', 'Confirm the date of your jury service - GOV.UK', 'Service Confirmation');
  }

  iCanDoJuryService() {
    const selectedElement = browser.element('#confirmedDate');
    selectedElement.click();
  }

  iRequireADeferral() {
    const selectedElement = browser.element('#changeDates');
    selectedElement.click();
  }

  iRequireAnExcusal() {
    const selectedElement = browser.element('#declineDates');
    selectedElement.click();
  }

  get hearingDate() {
    return browser.element('#hearingDateTimestamp');
  }

  get hearingTime() {
    return browser.element('#hearingTime');
  }
}

module.exports = ConfirmDatePage;
