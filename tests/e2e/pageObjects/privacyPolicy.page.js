const Page = require('./page');

class PrivacyPolicyPage extends Page {
  constructor() {
    super('/help/privacy-policy', 'Terms and conditions and privacy policy - GOV.UK', 'Privacy Policy');
  }
}

module.exports = PrivacyPolicyPage;
