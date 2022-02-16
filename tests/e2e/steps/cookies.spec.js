const CookiesPage = require('../pageObjects/cookies.page.js');


module.exports = function steps() {
  this.Before(() => {
    this.cookiesPage = new CookiesPage();
  });

  this.Then(/^I confirm that I am on the Cookies page$/, () => {
    this.cookiesPage.isActive();
  });

  this.When(/^I click the Manage Cookies links$/, () => {
    this.cookiesPage.manageCookiesLink.click();
  });

  this.Then(/^the page title will equal "([^"]*)"$/, (pageTitle) => {
    expect(browser.getTitle()).to.equal(pageTitle);
  });

  this.When(/^the page url contains "([^"]*)"$/, (expectedValue) => {
    expect(browser.getUrl()).to.contain(expectedValue);
  });

  this.When(/^I click the Opt Out links$/, () => {
    this.cookiesPage.optOutLink.click();
  });

  this.When(/^I click the back button$/, () => {
    browser.back();
  });

  this.When(/^I navigate to the cookie page$/, () => {
    this.cookiesPage.open();
  });
};
