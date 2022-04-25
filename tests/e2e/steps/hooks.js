module.exports = function hooks() {
  this.Before(() => {
    browser.deleteCookie();
  });

  this.After((scenario, callback) => {
    if (scenario.isFailed()) {
      const buffer = browser.saveScreenshot();
      scenario.attach(new Buffer(buffer, 'base64'), 'image/png');
      callback();
    } else {
      callback();
    }
  });
};
