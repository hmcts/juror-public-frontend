const Page = require('./page');

class ConfirmStraightThroughPage extends Page {
  constructor() {
    super('/08-confirmation', 'Your response is complete - GOV.UK', 'Confirmation Straight Through');
  }

  get displayName() {
    return browser.element('#name');
  }

}

module.exports = ConfirmStraightThroughPage;
