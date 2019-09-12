const CJSPage = require('../pageObjects/cjs.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.cJSPage = new CJSPage();
  });

  this.Given(/^I answer "([^"]*)" for my CJS$/, (answer) => {
    this.cJSPage.selectCJS(answer);
  });

  this.Given(/^I submit my CJS$/, () => {
    this.cJSPage.submit();
  });

  this.Given(/^I confirm that I am on the CJS page$/, () => {
    this.cJSPage.isActive();
  });
};
