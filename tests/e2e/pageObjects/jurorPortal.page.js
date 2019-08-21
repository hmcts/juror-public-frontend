const Page = require('./page');

class JurorPortal extends Page {
  constructor() {
    super('/', 'Reply to a jury summons - GOV.UK', 'Landing');
    this.breadcrumbSelector = '.breadcrumbs';
  }

  get startNowButton() {
    return browser.element('.button-start');
  }

  get privacyPolicyLink() {
    return browser.element('#privacyPolicyLink');
  }

  get cookiesLink() {
    return browser.element('#cookiesLink');
  }

  get backLink() {
    return browser.element('.link-back');
  }

  get breadcrumbs() {
    return browser.element(this.breadcrumbSelector);
  }

  get error() {
    return browser.element('.govuk-error-summary__list');
  }

  startNow() {
    this.startNowButton.click();
  }

  privacyPolicy() {
    this.privacyPolicyLink.click();
  }

  cookies() {
    this.cookiesLink.click();
  }

  breadcrumbsExist() {
    return browser.waitForExist(this.breadcrumbSelector, null, true);
  }
}

module.exports = JurorPortal;
