const MentalHealthSectioned = require('../../pageObjects/qualify/mental-health-sectioned.page.js');

module.exports = function steps() {
  this.Before(() => {
    this.mentalHealthSectioned = new MentalHealthSectioned();
  });

  this.When(/^I confirm I have been sectioned under the mental health act$/, () => {
    this.mentalHealthSectioned.sectioned('Yes');
  });

  this.When(/^I confirm I have not been sectioned under the mental health act$/, () => {
    this.mentalHealthSectioned.sectioned('No');
  });

  this.Given(/^I submit my mental health sectioned details$/, () => {
    this.mentalHealthSectioned.submit();
  });

  this.Given(/^I confirm that I am on the mental health sectioned page$/, () => {
    this.mentalHealthSectioned.isActive();
  });

  this.Given(/^I enter "([^"]*)" as my mental health sectioned details$/, (expectedValue) => {
    this.mentalHealthSectioned.mentalHealthSectionedDetails = expectedValue;
  });
};
