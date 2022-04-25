const MentalHealthCapacity = require('../../pageObjects/qualify/mental-health-capacity.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.mentalHealthCapacity = new MentalHealthCapacity();
  });

  this.When(/^I confirm I lack capacity under the mental capacity act$/, () => {
    this.mentalHealthCapacity.capacity('Yes');
  });

  this.When(/^I confirm I do not lack capacity under the mental health act$/, () => {
    this.mentalHealthCapacity.capacity('No');
  });

  this.Given(/^I submit my mental health capacity details$/, () => {
    this.mentalHealthCapacity.submit();
  });

  this.Given(/^I confirm that I am on the mental health capacity page$/, () => {
    this.mentalHealthCapacity.isActive();
  });

  this.Given(/^I enter "([^"]*)" as my mental health capacity details$/, (expectedValue) => {
    this.mentalHealthCapacity.mentalHealthCapacityDetails = expectedValue;
  });
};
