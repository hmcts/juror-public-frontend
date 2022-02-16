Feature: Auto Processing Third Party Deceased Response

  Userflow related to a third party response where the person summoned is deceased

  @ThirdParty @JDB-73
  Scenario: Response provided shows summoned juror is deceased, auto processed accordingly

    # DB Steps
    Given I truncate the database tables
      And I add the "data" data
      And I add the "basic_valid_login" data
      And I add the "enable_straight_through" data

    # Juror Portal Page
    When I navigate to the Juror Portal

    # Responder Type Page
    # Third Party Response Type
    Then I confirm that I am on the Responder Type page
      And I state that I am replying on behalf of someone else
      And I submit my Responder Type

    # Login Page
    Then I confirm that I am on the Login page
      And I submit "122444503", "Wilson" and "BC3M 2ND" as my login credentials

    # (c) sStatus is still 'Summoned'
     # And I check the "JUROR.POOL" table for "1" within the "STATUS" field for "PART_NO" "122444503"

    # 3rd Party Details Name 
    Then I confirm that I am on the 3rd Party Details Name page
    And I enter "John" as my first name
    And I enter "Doe" as my last name
    And I submit my 3rd Party Name Details

    # 3rd Party Details Relationship 
    Then I confirm that I am on the 3rd Party Details Relationship page
    And I enter "Brother" as my relationship to the summoned Juror
    And I submit my 3rd Party Relationship Details

    # 3rd Party Details Contact 
    Then I confirm that I am on the 3rd Party Details Contact page
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

    # 3) Confirmation Page
    Then I confirm that I am on the Confirmation Deceased page

    # Status is 'Excused' and summons is closed
    And I check the "JUROR.POOL" table for "5" within the "STATUS" field for "PART_NO" "122444503"
    And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "CLOSED" within the "PROCESSING_STATUS" field for "JUROR_NUMBER" "122444503"

    # (d) Ensuring response is not considered 'Super Urgent' or 'Urgent'
    And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "N" within the "SUPER_URGENT" field for "JUROR_NUMBER" "122444503"
    And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "N" within the "URGENT" field for "JUROR_NUMBER" "122444503"


    # Check for deceased code
    And I check the "JUROR.PART_HIST" table for "ADD Excuse - D" within the "OTHER_INFORMATION" field for "PART_NO" "122444503"

    # Pool is updated
    And I check the "JUROR.POOL" table for "Y" within the "RESPONDED" field for "PART_NO" "122444503"

    # Check they're dead
    And I check the "JUROR.POOL" table for "D" within the "EXC_CODE" field for "PART_NO" "122444503"

