const DeferralDatesPage = require('../pageObjects/deferralDates.page.js');
const moment = require('moment');

module.exports = function steps() {
  this.Before(() => {
    this.deferralDatesPage = new DeferralDatesPage();
  });

  this.Then(/^I confirm that I am on the Deferral Dates page$/, () => {
    this.deferralDatesPage.isActive();
  });

  this.When(/^I enter my valid alternate Dates$/, () => {
    [1, 2, 3].map((value) => {
      return moment().add(value, 'months').format('DD/MM/YYYY');
    }).forEach((val, idx) => {
      this.deferralDatesPage[`date${(idx + 1)}`] = val;
    });
  });

  this.When(/^I submit my Dates$/, () => {
    this.deferralDatesPage.submit();
  });

  this.Then(/^I confirm that the error message reads "([^"]*)"$/, (error) => {
    expect(this.deferralDatesPage.date1SummaryError.getText()).to.equal(error);
    expect(this.deferralDatesPage.date2SummaryError.getText()).to.equal(error);
    expect(this.deferralDatesPage.date3SummaryError.getText()).to.equal(error);
  });

  this.When(/^I enter a duplicate date$/, () => {
    [1, 2, 2].map((value) => {
      return moment().add(value, 'months').format('DD/MM/YYYY');
    }).forEach((val, idx) => {
      this.deferralDatesPage[`date${(idx + 1)}`] = val;
    });
  });

  this.Then(/^I confirm that the datesGroup error message reads "([^"]*)"$/, (error) => {
    expect(this.deferralDatesPage.datesGroupSummaryError.getText()).to.equal(error);
  });

  this.When(/^I enter the date (\-?\d+) years, (\-?\d+) months, and (\-?\d+) days from (today|summons) into Date (\d+)$/, (years, months, days, fromDate, dateField) => {
    const startDate = fromDate === 'today' ? moment() : moment().add(21, 'days');
    const endDate = startDate.add(years, 'years').add(months, 'months').add(days, 'days');
    const newDate = endDate.format('DD/MM/YYYY');

    this.deferralDatesPage[`date${dateField}`] = newDate;
  });

  this.Then(/^I confirm that the "([^"]*)" error message reads "([^"]*)"$/, (errorField, errorMsg) => {
    expect(this.deferralDatesPage[`${errorField}SummaryError`].getText()).to.equal(errorMsg);
  });

  this.Then(/^I confirm that the date(\d+) error message reads "([^"]*)"$/, (errorField, errorMsg) => {
    expect(this.deferralDatesPage[`date${errorField}SummaryError`].getText()).to.equal(errorMsg);
  });

  this.When(/^I enter "([^"]*)", "([^"]*)", and "([^"]*)" into Date (\d+)$/, (day, month, year, dateField) => {
    this.deferralDatesPage[`date${dateField}`] = `${day}/${month}/${year}`;
  });
};
