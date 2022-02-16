Feature: Third party reason

  Test the page where respondant provides reason they are replying

  Background:
    # DB Steps
    Given I truncate the database tables
      And I add the "data" data
      And I add the "basic_valid_login" data

    # Juror Portal Page
    When I navigate to the Juror Portal

    # Responder Type Page
    Then I confirm that I am on the Responder Type page
      And I state that I am replying on behalf of someone else
      And I submit my Responder Type

    # Login Page
    Then I confirm that I am on the Login page
      And I submit "352004504", "Rivera" and "EC3M 2NY" as my login credentials

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
        And I toggle my contact preference for phone
        And I enter "01415555555" as my main phone number
        And I enter "01415555556" as my other phone number
        And I toggle my contact preference for email
        And I enter "john.doe@email.com" as my email address
        And I enter "john.doe@email.com" as my confirmed email address
        And I submit my 3rd Party Contact Details

    # 3rd Party Reason
    Then I confirm that I am on the 3rd Party Reason page


    # Start Scenarios
    # -------------------------------------
    @JDB-1793 @bug
    Scenario: 'Other' checkbox remains open when no reason is provided and the error is shown
      When I state that the person has another reason for not replying
      Then the box to provide other details about why I am responding is visible

      When I submit my 3rd Party Reason

    @JDB-1952 @bug
    Scenario: When changing from standard reason to deceased, no additional fields are shown on summary
      When I state that my reason for replying on behalf of the person is "<reason>"
        And I submit my 3rd Party Reason

    # 3rd Party Personal Details Name
    Then I confirm that I am on the 3rd Party Personal Name page
    And I confirm that the summoned person's name is "Rev Jose Rivera"
    And I submit my 3rd Party Personal Name Details

    # 3rd Party Personal Details Address
    Then I confirm that I am on the 3rd Party Personal Address page
    Then I confirm that the summoned person's address is correct
    And I submit my 3rd Party Personal Address Details

    # 3rd Party Personal Details DOB
    Then I confirm that I am on the 3rd Party Personal DOB page
    When I enter 08/08/1995 as the juror's Date of Birth
      And I submit my 3rd Party Personal DOB Details

    # 3rd Party Personal Contact Details
    Then I confirm that I am on the 3rd Party Personal Contact page

      # First back
      When I click the back link
        Then I confirm that I am on the 3rd Party Personal DOB page

      # Second back
      When I click the back link
        Then I confirm that I am on the 3rd Party Personal Address page

      # Third back
      When I click the back link
        Then I confirm that I am on the 3rd Party Personal Name page

      # Fourth back
      When I click the back link
        Then I confirm that I am on the 3rd Party Reason page

      # Deceased
      When I state that the person is deceased
        And I submit my 3rd Party Reason


      # Begin checks
      Then I confirm that I am on the Confirm Information page
        And the Do you qualify answers do not appear on the Confirm Information page
        And the Confirm date answers do not appear on the Confirm Information page
        And the CJS employment answers do not appear on the Confirm Information page
        And the Reasonable adjustments answers do not appear on the Confirm Information page

      # Submit response
      When I tick the Confirm My Information checkbox
        And I submit my information

      # Verify database
      Then I confirm that I am on the Confirmation Deceased page

        And I check that the "JUROR_DIGITAL.JUROR_RESPONSE_SPECIAL_NEEDS" table has no result for "JUROR_NUMBER" "352004504" AND "SPEC_NEED" "L"
        And I check that the "JUROR_DIGITAL.JUROR_RESPONSE_SPECIAL_NEEDS" table has no result for "JUROR_NUMBER" "352004504" AND "SPEC_NEED" "H"
        And I check that the "JUROR_DIGITAL.JUROR_RESPONSE_SPECIAL_NEEDS" table has no result for "JUROR_NUMBER" "352004504" AND "SPEC_NEED" "I"
        And I check that the "JUROR_DIGITAL.JUROR_RESPONSE_SPECIAL_NEEDS" table has no result for "JUROR_NUMBER" "352004504" AND "SPEC_NEED" "V"
        And I check that the "JUROR_DIGITAL.JUROR_RESPONSE_SPECIAL_NEEDS" table has no result for "JUROR_NUMBER" "352004504" AND "SPEC_NEED" "O"

        And I check that the "JUROR_DIGITAL.JUROR_RESPONSE_CJS_EMPLOYMENT" table has no result for "JUROR_NUMBER" "352004504" AND "CJS_EMPLOYER" "Police Force"
        And I check that the "JUROR_DIGITAL.JUROR_RESPONSE_CJS_EMPLOYMENT" table has no result for "JUROR_NUMBER" "352004504" AND "CJS_EMPLOYER" "HM Prison Service"
        And I check that the "JUROR_DIGITAL.JUROR_RESPONSE_CJS_EMPLOYMENT" table has no result for "JUROR_NUMBER" "352004504" AND "CJS_EMPLOYER" "National Crime Agency"
        And I check that the "JUROR_DIGITAL.JUROR_RESPONSE_CJS_EMPLOYMENT" table has no result for "JUROR_NUMBER" "352004504" AND "CJS_EMPLOYER" "Other"

    @ThirdParty @JDB-2352 @bug
    Scenario: As a third party respondant I can state that the summoned juror is deceased
      Then I state that the person is not here
        And I submit my 3rd Party Reason

      # Personal Details
      Then I confirm that I am on the 3rd Party Personal Name page
        And I click the back button

      # Back to Reason
      Then I confirm that I am on the 3rd Party Reason page
      When I state that the person is deceased
        And I submit my 3rd Party Reason

      # Confirm Information Page
      Then I confirm that I am on the Confirm Information page
      When I tick the Confirm My Information checkbox
        And I submit my information

      # Confirmation Page
      Then I confirm that I am on the Confirmation Deceased page
