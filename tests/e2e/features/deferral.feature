Feature: Check for the correct date of jury service

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
      And I submit "352004504", "Rivera" and "EC3M 2NY" as my login credentials


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
    And I enter "11111111111" as my Main Phone Number
    And I enter "00000000000" as My Secondary Phone Number
    Then I submit my phone details
 
    # Your Details Email Page
    Then I confirm that I am on the Your Details Email page
    And I enter "email@email.com" as my Email Address
    And I enter "email@email.com" as my Confirmation Email Address
    Then I submit my email details

    # Your Details DOB Page
    Then I confirm that I am on the Your Details DOB page
    When I enter 08/08/1995 as my Date of Birth
    Then I submit my DOB details


    # Qualify Page
    Then I confirm that I am on the Qualify Landing page
      And I click the Continue button

    # Qualify - Residency Page
    Then I confirm that I am on the Qualify Residency page
      And I confirm I have lived in the UK for 5 years
      And I submit my Residency details

    # Qualify - Mental Health Sectioned Page
    Then I confirm that I am on the mental health sectioned page
      And I confirm I have not been sectioned under the mental health act
      Then I submit my mental health sectioned details

    # Qualify - Mental Health Capacity Page
    Then I confirm that I am on the mental health capacity page
      And I confirm I do not lack capacity under the mental health act
      And I submit my mental health capacity details

    # Qualify - Bail Page
    Then I confirm that I am on the Qualify Bail page
      And I confirm I am not currently on bail
      And I submit my Bail details

    # Qualify - Convictions Page
    Then I confirm that I am on the Qualify Convictions page
      And I confirm I have not been convicted of a crime resulting in a prison sentence, community order or suspended prison sentence
      And I submit my Convictions details

    # Confirm Dates Page
    Then I confirm that I am on the Confirm Date page
      And I confirm that the hearing date is valid
      And I confirm that the hearing time is "09:15 am"
      And I state that I require a deferral
      And I submit my Availablity

  @JDB-2479 @ALWAYS
  Scenario: Alternate dates for jury service can be entered

    # Deferral Page
    Then I confirm that I am on the Deferral page
    When I enter a reason of "I'm on holiday that week" for requiring deferral and submit

    # Deferral Dates
    Then I confirm that I am on the Deferral Dates page
    When I enter my valid alternate Dates
      And I submit my Dates

    Then I confirm that I am on the CJS page

  @JDB-2479 @ALWAYS
  Scenario: Not entering dates for deferral results in an error

    # Deferral Page
    Then I confirm that I am on the Deferral page
      When I enter a reason of "I'm on holiday that week" for requiring deferral and submit

    # Deferral Dates
    Then I confirm that I am on the Deferral Dates page
      When I submit my Dates

    Then I confirm that the date1 error message reads "Provide the first date you are available for your jury service"
    Then I confirm that the date2 error message reads "Provide a second date you are available for your jury service"
    Then I confirm that the date3 error message reads "Provide a third date you are available for your jury service"

  @JDB-2479 @ALWAYS
  Scenario: Entering a duplicate date should result in an error

    # Deferral Page
    Then I confirm that I am on the Deferral page
      When I enter a reason of "I'm on holiday that week" for requiring deferral and submit

    # Deferral Dates
    Then I confirm that I am on the Deferral Dates page
      When I enter a duplicate date
      And I submit my Dates

    Then I confirm that the datesGroup error message reads "Provide 3 different dates"

  @JDB-2671 @ALWAYS @bug
  Scenario Outline: Entering a date more than one year from the summons date into input <inputErr> should show an error

    # Deferral Page
    Then I confirm that I am on the Deferral page
      When I enter a reason of "I'm on holiday that week" for requiring deferral and submit

    # Deferral Dates
    Then I confirm that I am on the Deferral Dates page
      When I enter the date 1 years, 0 months, and 1 days from today into Date <input1>
      When I enter the date 1 years, 0 months, and 0 days from summons into Date <input2>
      When I enter the date 1 years, 0 months, and 1 days from summons into Date <inputErr>
      And I submit my Dates

    Then I confirm that the "date<inputErr>" error message reads "Provide a <msgText> date that is within 12 months of the original summons date"


    Examples:
    | input1 | input2 | inputErr | msgText |
    | 1      | 2      | 3        | third   |
    | 1      | 3      | 2        | second  |
    | 3      | 2      | 1        | first   |


  @JDB-2671 @ALWAYS @bug
  Scenario Outline: Entering a date before the summons date into input <inputErr> should show an error

    # Deferral Page
    Then I confirm that I am on the Deferral page
      When I enter a reason of "I'm on holiday that week" for requiring deferral and submit

    # Deferral Dates
    Then I confirm that I am on the Deferral Dates page
      When I enter the date 0 years, 0 months, and 1 days from summons into Date <input1>
      When I enter the date 0 years, 1 months, and 0 days from summons into Date <input2>
      When I enter the date 0 years, 0 months, and -1 days from summons into Date <inputErr>
      And I submit my Dates

    Then I confirm that the "date<inputErr>" error message reads "Provide a <msgText> date that is within 12 months of the original summons date"

    Examples:
    | input1 | input2 | inputErr | msgText |
    | 1      | 2      | 3        | third   |
    | 1      | 3      | 2        | second  |
    | 3      | 2      | 1        | first   |


  @JDB-2675 @ALWAYS @bug
  Scenario Outline: Entering non-numeric characters in date should result in an error

    # Deferral Page
    Then I confirm that I am on the Deferral page
      When I enter a reason of "I'm on holiday that week" for requiring deferral and submit

      When I enter "<day>", "<month>", and "<year>" into Date 1
        And I enter "<day>", "<month>", and "<year>" into Date 2
        And I enter "<day>", "<month>", and "<year>" into Date 3
        And I submit my Dates

    Then I confirm that the date1 error message reads "Provide the first date you are available for your jury service"
    Then I confirm that the date2 error message reads "Provide a second date you are available for your jury service"
    Then I confirm that the date3 error message reads "Provide a third date you are available for your jury service"

    Examples:
      | day | month | year |
      | 2$  | 01    | 2017 |
      | 20  | 1=    | 2017 |
      | 20  | 02    | 0:02 |
      | 1f  | 03    | 2017 |
      | 01  | 02    | 1e13 |
      | 03  | -5    | 2017 |
