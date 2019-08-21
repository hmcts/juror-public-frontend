const Page = require('./page');

class ConfirmDeceasedPage extends Page {
  constructor() {
    super('/08-confirmation-deceased', 'Your response is complete - GOV.UK', 'Confirmation Deceased');
  }

}

module.exports = ConfirmDeceasedPage;
