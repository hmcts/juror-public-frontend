Feature: Cookies

  @JDB-2406
  Scenario: The cookie page exists
    When I navigate to the cookie page
    Then I confirm that I am on the Cookies page
