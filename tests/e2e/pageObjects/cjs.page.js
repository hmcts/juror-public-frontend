const Page = require('./page');

class CJSPage extends Page {
  constructor() {
    super('/05-cjs-employed', 'Have you ever worked for the Criminal Justice System - GOV.UK', 'Employment');
  }

  cjsYes() {
    const selectedElement = browser.element('[value="Yes"]');
    selectedElement.click();
  }

  cjsNo() {
    const selectedElement = browser.element('[value="No"]');
    selectedElement.click();
  }

  selectCJS(answer) {
    if (answer === 'Yes') {
      this.cjsYes(answer);
    } else if (answer === 'No') {
      this.cjsNo(answer);
    }
  }

}

module.exports = CJSPage;
