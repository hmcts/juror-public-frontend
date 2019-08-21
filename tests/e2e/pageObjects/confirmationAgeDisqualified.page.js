const Page = require('./page');

class ConfirmAgeDisqualifiedPage extends Page {
  constructor() {
    super('/08-confirmation/age', 'Your response is complete - GOV.UK', 'Confirmation Age Disqualified');
  }

}

module.exports = ConfirmAgeDisqualifiedPage;
