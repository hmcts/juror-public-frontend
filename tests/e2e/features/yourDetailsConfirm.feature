Feature: Confirm date of birth

  If summoned juror is too old or two young, date of birth will be confirmed

  Background:
    # DB Steps
    Given I truncate the database tables
      And I add the "data" data
      And I add the "basic_valid_login" data

    # Juror Portal Page
    When I navigate to the Juror Portal

    # Responder Type Page
    Then I confirm that I am on the Responder Type page
      And I state that I am replying on behalf of myself
      And I submit my Responder Type

    # Login Page
    Then I confirm that I am on the Login page
      And I submit "152004504", "Reynolds" and "BC3M 2NY" as my login credentials

    # Your Details Name Page
    Then I confirm that I am on the Your Details Name page
    Then I confirm that my name is correct
    Then I submit my name details
    
    # Your Details Address Page
    Then I confirm that I am on the Your Details Address page
    Then I confirm that my address is correct
    Then I submit my address details

    # Your Details Phone Page
    Then I confirm that I am on the Your Details Phone page
    And I enter "123456789" as my Main Phone Number
    And I enter "987654321" as My Secondary Phone Number
    Then I submit my phone details
 
    # Your Details Email Page
    Then I confirm that I am on the Your Details Email page
    And I enter "email@email.com" as my Email Address
    And I enter "email@email.com" as my Confirmation Email Address
    Then I submit my email details

    # Your Details DOB Page
    Then I confirm that I am on the Your Details DOB page
    When I enter a date of birth which makes me "80" years old
    Then I submit my DOB details

    # Confirm date of birth
    Then I confirm that I am on the Confirm Date of Birth page

    # Start Scenarios
    # -------------------------------------
    @JDB-91
    Scenario: As a system I want to handle a response as a straight-through disqualification if the Juror's date of birth indicates that they are over or under age so that it does not require human resource to process these.
      When I confirm my age
      Then I confirm that I am on the Confirm Information page

      When I tick the Confirm My Information checkbox
        And I submit my information

      Then I confirm that I am on the Confirmation Age Disqualified page
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "123456789" within the "PHONE_NUMBER" field for "JUROR_NUMBER" "152004504"
        And I check the "JUROR.POOL" table for "A" within the "DISQ_CODE" field for "PART_NO" "152004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "CLOSED" within the "PROCESSING_STATUS" field for "JUROR_NUMBER" "152004504"


    @JDB-1714 @bug
    Scenario: As a respondant I should be warned when I have not entered a date of birth
      When I choose to change the confirmed date of birth
        And I enter "" as the confirmed day of birth
        And I enter "" as the confirmed month of birth
        And I enter "" as the confirmed year of birth
        And I confirm the date of birth

      Then the error message summary for the confirmed Date of birth is "Enter the day you were born"
        And the error message details for the day of birth is "Enter the day you were born"
        #And the error message details for the month of birth is "Please enter the month you were born"
        #And the error message details for the year of birth is "Please enter the year you were born"

    @JDB-1714 @bug
    Scenario Outline: As a respondant I should be warned when my date of birth is incorrect on confirmation screen
      When I choose to change the confirmed date of birth
        And I enter "<day>" as the confirmed day of birth
        And I enter "<month>" as the confirmed month of birth
        And I enter "<year>" as the confirmed year of birth
        And I confirm the date of birth

      Then the error message summary for the confirmed Date of birth is "<error>"
        And the error message details for the confirmed Date of birth is "<error>"

      Examples:
        | day | month | year  | error                                                                                 |
        | 18  | 09    |       | Enter the year you were born                                                   |
        | 18  | 09    | 89    | Enter the year you were born as a 4 digit number. For example, 1982         |
        | 18  | 09    | 0     | Enter the year you were born as a 4 digit number. For example, 1982                                                    |

        | 18  |       | 1989  | Enter the month you were born                                                  |
        | 18  | 21    | 1989  | Enter the month you were born as a number. For example, for December, enter 12 |
        | 18  | 00    | 1989  | Enter the month you were born as a number. For example, for December, enter 12 |

        |     | 09    | 1989  | Enter the day you were born                                                    |
        | 34  | 09    | 1989  | Enter the day you were born as a date. For example, 06                         |
        | 00  | 09    | 1989  | Enter the day you were born as a date. For example, 06                         |
