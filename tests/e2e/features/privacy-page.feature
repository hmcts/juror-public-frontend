Feature: Privacy policy page

  @JDB-2406
  Scenario: The privacy page exists
    When I navigate to the privacy page
    Then I confirm that I am on the Privacy Policy page
