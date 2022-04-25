const Page = require('./page');

class CookiesPage extends Page {
  constructor() {
    super('/help/cookies', 'Cookies - GOV.UK', 'Cookies');
  }

  get manageCookiesLink() {
    return browser.element('#moreInfoLink');
  }

  get optOutLink() {
    return browser.element('#optOutLink');
  }
}

module.exports = CookiesPage;
