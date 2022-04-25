Feature: Responder Type Page

  @JDB-ResponderType
  Scenario: Responder Type error is cleared once user navigates away from the page

    # DB Steps
    Given I truncate the database tables
      And I add the "data" data
      And I add the "basic_valid_login" data

    # Responder Type Error Rendered
    When I navigate to the Juror Portal
      # And I click the Start Now button
      And I confirm that I am on the Responder Type page
      And I submit my Responder Type
    Then I confirm that I am on the Responder Type page
      And the responder type error is "Select if you are replying for yourself or for someone else"

    # Responder Type Error Rendered
    When I navigate to the Juror Portal
      # And I click the Start Now button
    Then I confirm that I am on the Responder Type page
      And the error summary list is empty on the Responder Type screen
