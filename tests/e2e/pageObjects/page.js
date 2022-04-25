const urljoin = require('url-join');

const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';

class Page {
  constructor(url, title, pageIdentifier) {
    this.url = urljoin(serverUrl, url);
    this.title = title;
    this.pageIdentifier = pageIdentifier;
  }

  get submitButton() {
    if (browser.element('button[class="govuk-button"]').isExisting()) {
      return browser.element('button[class="govuk-button"]');
    }
    return browser.element('button[type="submit"]');
  }

  open() {
    browser.url(this.url);
  }

  isActive() {
    const identEle = browser.element('meta[name="pageIdentifier"]');
    expect(identEle.getAttribute('content')).to.equal(this.pageIdentifier);
  }

  submit() {
    this.submitButton.click();
  }
}

module.exports = Page;
