const moment = require('moment');
const YourDetailsNamePage = require('../pageObjects/yourDetailsName.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.yourDetailsNamePage = new YourDetailsNamePage();
  });

  this.Given(/^I confirm that I am on the Your Details Name page$/, () => {
    this.yourDetailsNamePage.isActive();
  });

  this.When(/^I choose to provide new details for my name$/, () => {
    this.yourDetailsNamePage.changeNameButton.click();
  });

  this.When(/^I confirm that my name is correct$/, () => {
    this.yourDetailsNamePage.confirmYes();
  });

  this.When(/^I confirm that my name is incorrect$/, () => {
    this.yourDetailsNamePage.confirmNo();
  });

  this.When(/^I submit my name details$/, () => {
    this.yourDetailsNamePage.submit();
  });


  // Errors
  // ==============
};
