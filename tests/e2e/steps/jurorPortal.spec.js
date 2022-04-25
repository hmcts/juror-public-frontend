const urljoin = require('url-join');
const JurorPortalPage = require('../pageObjects/jurorPortal.page.js');

const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';

module.exports = function steps() {
  this.Before(() => {
    this.jurorPortalPage = new JurorPortalPage();
  });

  this.Given(/^I navigate to the Juror Portal$/, () => {
    this.jurorPortalPage.open();
  });

  this.Then(/^I confirm I am on the Juror Portal$/, () => {
    this.jurorPortalPage.isActive();
  });

  this.When(/^I click the Start Now button$/, () => {
    this.jurorPortalPage.startNow();
  });

  this.When(/^I click the back link$/, () => {
    browser.back();
  });

  this.Given(/^I click the Privacy Policy link$/, () => {
    this.jurorPortalPage.privacyPolicy();
  });

  this.When(/^I click the Cookies link$/, () => {
    this.jurorPortalPage.cookies();
  });

  this.When(/^I navigate directly to the url "([^"]*)"$/, (expectedValue) => {
    browser.url(urljoin(serverUrl, expectedValue));
  });


  this.When(/^I check that the breadcrumbs are no longer there$/, () => {
    expect(this.jurorPortalPage.breadcrumbsExist()).to.equal(true);
  });

  this.Then(/^the error should be "([^"]*)"$/, (error) => {
    expect(this.jurorPortalPage.error.getText()).to.contain(error);
  });
};
