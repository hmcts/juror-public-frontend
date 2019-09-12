const Page = require('./page');

class ExcusalPage extends Page {
  constructor() {
    super('/04-confirm-date/excusal', 'Request to excused from jury service - GOV.UK', 'Excusal');
  }

  get excusalReason() {
    return browser.element('#excusalReason');
  }

  set excusalReason(value) {
    this.excusalReason.setValue(value);
  }

}

module.exports = ExcusalPage;
