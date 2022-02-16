Feature: Third Party Deceased

  Userflow related to a third party response where the person summoned is deceased

  @ALWAYS @ThirdParty @JDB-1898 @bug @PhoneNumberFormat
  Scenario: As a third party respondant I can state that the summoned juror is deceased

    # DB Steps
    Given I truncate the database tables
      And I add the "data" data
      And I add the "basic_valid_login" data

    # Juror Portal Page
    When I navigate to the Juror Portal
      # And I click the Start Now button

    # Responder Type Page
    Then I confirm that I am on the Responder Type page
      And I state that I am replying on behalf of someone else
      And I submit my Responder Type

    # Login Page
    Then I confirm that I am on the Login page
      And I submit "352004504", "Rivera" and "EC3M 2NY" as my login credentials

    # 3rd Party Details Name 
      And I enter "John" as my first name
      And I enter "Doe" as my last name
      And I submit my 3rd Party Name Details

   # 3rd Party Details Relationship 
      Then I confirm that I am on the 3rd Party Details Relationship page
      And I enter "Brother" as my relationship to the summoned Juror
      And I submit my 3rd Party Relationship Details

    # 3rd Party Details Contact 
      Then I confirm that I am on the 3rd Party Details Contact page
        And I toggle my contact preference for phone
        And I enter "+123 123 123" as my main phone number
        And I enter "+321 321 321" as my other phone number
        And I toggle my contact preference for email
        And I enter "john.doe@email.com" as my email address
        And I enter "john.doe@email.com" as my confirmed email address
        And I submit my 3rd Party Contact Details

    # Reason
    Then I confirm that I am on the 3rd Party Reason page
    When I state that the person is deceased
      And I submit my 3rd Party Reason

    # Confirm Information Page
    Then I confirm that I am on the Confirm Information page
    When I tick the Confirm My Information checkbox
      And I submit my information

    # Confirmation Page
    Then I confirm that I am on the Confirmation Deceased page
