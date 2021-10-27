Feature: Third Party Personal Details

  Page to enter details about person who has been summoned

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


    # Start Scenarios
    # -------------------------------------
    @JDB-1714 @bug @dob-test
    Scenario: As a third party respondant I should be warned when I have not entered a date of birth for the person who has been summoned
      When I enter "" as the day of birth
        And I enter "" as the month of birth
        And I enter "" as the year of birth
        And I submit my 3rd Party Personal DOB Details

      Then the error message summary for the confirmed Date of birth is "Enter the day the person was born"
        And the error message details for the day of birth is "Enter the day the person was born"
        #And the error message details for the month of birth is "Please enter the month the person was born"
        #And the error message details for the year of birth is "Please enter the year the person was born"

    @JDB-1714 @bug @dob-test
    Scenario: As a third party respondant I should be warned when I have not entered a date of birth for the person who has been summoned
      When I enter "1" as the day of birth
        And I enter "" as the month of birth
        And I enter "" as the year of birth
        And I submit my 3rd Party Personal DOB Details

      Then the error message summary for the confirmed Date of birth is "Enter the month the person was born"
        And the error message details for the month of birth is "Enter the month the person was born"

    @JDB-1714 @bug @dob-test
    Scenario: As a third party respondant I should be warned when I have not entered a date of birth for the person who has been summoned
      When I enter "1" as the day of birth
        And I enter "8" as the month of birth
        And I enter "" as the year of birth
        And I submit my 3rd Party Personal DOB Details

      Then the error message summary for the confirmed Date of birth is "Enter the year the person was born"
        And the error message details for the year of birth is "Enter the year the person was born"


    @JDB-1714 @bug
    Scenario Outline: As a respondant I should be warned when the date of birth is incorrect
      When I enter "<day>" as the day of birth
        And I enter "<month>" as the month of birth
        And I enter "<year>" as the year of birth
        And I submit my 3rd Party Personal DOB Details

      #Then the error message summary for the confirmed Date of birth is "Please check the person's date of birth"
      Then the error message summary for the confirmed Date of birth is "<error>"
        And the error message details for my Date of birth is "<error>"

      Examples:
        | day | month | year  | error                                                                                       |
        | 18  | 09    |       | Enter the year the person was born                                                   |
        | 18  | 09    | 89    | Enter the year the person was born as a 4 digit number. For example, 1982         |
        | 18  | 09    | 0     | Enter the year the person was born as a 4 digit number. For example, 1982         |

        | 18  |       | 1989  | Enter the month the person was born                                                  |
        | 18  | 21    | 1989  | Enter the month the person was born as a number. For example, for December, enter 12 |
        | 18  | 00    | 1989  | Enter the month the person was born as a number. For example, for December, enter 12 |

        |     | 09    | 1989  | Enter the day the person was born                                                    |
        | 34  | 09    | 1989  | Enter the day the person was born as a date. For example, 06                         |
        | 00  | 09    | 1989  | Enter the day the person was born as a date. For example, 06                         |

    @JDB-2575 @bug
    Scenario: As a third party respondant I should be warned when I have not entered a date of birth for the person who has been summoned
      When I enter "02" as the day of birth
        And I enter "02" as the month of birth
        And I enter "1910" as the year of birth
        And I submit my 3rd Party Personal DOB Details
      Then I confirm that I am on the Confirm Date of Birth page
        And I click the back button
        And I submit my 3rd Party Personal DOB Details
      Then I confirm that I am on the Confirm Date of Birth page
