const url = require('url');

const chimpConf = {
  // - - - - CHIMP - - - -
  e2eSteps: './tests/e2e/steps',

  // - - - - CUCUMBER - - - -
  path: './tests/e2e/features/',
  format: 'pretty',
  jsonOutput: './reports/tests/e2e/cucumber.json',
  chai: true,
};

// If we choose a single feature to run
if (typeof process.env.SPECS !== 'undefined') {
  chimpConf.path = `./tests/e2e/features/${process.env.SPECS}`;
}

// Any tags for further refining cucumber
if (typeof process.env.TAGS !== 'undefined') {
  chimpConf.tags = `${process.env.TAGS}`;
}

if (typeof process.env.SELENIUM_ADDRESS !== 'undefined') {
  const parsedUrl = url.parse(process.env.SELENIUM_ADDRESS);

  chimpConf.browser = 'chrome';
  chimpConf.port = parsedUrl.port;
  chimpConf.host = parsedUrl.hostname;
  chimpConf.deviceName = null;

  chimpConf.webdriverio = {
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
  };
}

module.exports = chimpConf;
