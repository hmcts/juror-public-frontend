const Page = require('./page');

class DeferralDatesPage extends Page {
  constructor() {
    super('/04-confirm-date/defer-dates', 'Ask for another date for your jury service - GOV.UK', 'Deferral Dates');
  }

  get date1() {
    return browser.element('#date1');
  }

  set date1(val) {
    this.date1.setValue(val);
  }

  get date2() {
    return browser.element('#date2');
  }

  set date2(val) {
    this.date2.setValue(val);
  }

  get date3() {
    return browser.element('#date3');
  }

  set date3(val) {
    this.date3.setValue(val);
  }

  get date1SummaryError() {
    return browser.element('.govuk-error-summary__list [href="#date1"]');
  }

  get date2SummaryError() {
    return browser.element('.govuk-error-summary__list [href="#date2"]');
  }

  get date3SummaryError() {
    return browser.element('.govuk-error-summary__list [href="#date3"]');
  }

  get datesGroupSummaryError() {
    return browser.element('.govuk-error-summary__list [href="#dates"]');
  }
}

module.exports = DeferralDatesPage;
