const ResponderTypePage = require('../pageObjects/responderType.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.responderTypePage = new ResponderTypePage();
  });

  this.Then(/^I state that I am replying on behalf of myself$/, () => {
    this.responderTypePage.firstPersonSelect();
  });

  this.Then(/^I state that I am replying on behalf of someone else$/, () => {
    this.responderTypePage.thirdPartySelect();
  });

  this.Then(/^I submit my Responder Type$/, () => {
    this.responderTypePage.submit();
  });

  this.Given(/^I confirm that I am on the Responder Type page$/, () => {
    this.responderTypePage.isActive();
  });

  this.Then(/^the responder type error is "([^"]*)"$/, (expectedValue) => {
    expect(this.responderTypePage.responderTypeError.getText()).to.equal(expectedValue);
  });

  this.Then(/^the error summary list is empty on the Responder Type screen$/, () => {
    expect(this.responderTypePage.pageErrors()).to.equal(false);
  });
};
