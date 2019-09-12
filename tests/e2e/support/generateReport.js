/* eslint-disable no-console */
const path = require('path');
const CucumberHtmlReporter = require('cucumber-html-reporter');
const CucumberHtmlReport = require('cucumber-html-report');
const pkg = require('../../../package.json');

const cucumberReportInputFile = path.resolve(__dirname, '../../../', 'reports/tests/e2e', 'cucumber.json');
const cucumberReportOutputDir = path.resolve(__dirname, '../../../', 'reports/tests/e2e');


// Report style 1
// ============================================
CucumberHtmlReport.create({
  source: cucumberReportInputFile,
  dest: cucumberReportOutputDir,
  name: 'report.html',
  title: 'Juror Report',
  component: 'Public',
})
.then((resp) => {
  console.log(resp);
  process.exit(0);
})
.catch((err) => {
  console.error(err);
  process.exit(1);
});


// Report style 2
// ============================================
CucumberHtmlReporter.generate({
  theme: 'bootstrap',
  jsonFile: cucumberReportInputFile,
  output: path.resolve(cucumberReportOutputDir, 'cucumber.html'),
  reportSuiteAsScenarios: true,
  launchReport: false,
  storeScreenShots: false,
  metadata: {
    'App Version': pkg.version,
    'Test Environment': 'STAGING',
    Parallel: 'Scenarios',
    Executed: 'Remote',
  },
});

