Feature: Check for the correct date of jury service

  @JDB-2377 @JDB-2438 @bug
  Scenario Outline: Correct date of jury service is displayed

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
      And I submit "<jurorNumber>", "<surname>" and "<postcode>" as my login credentials

    # Your Details Name Page
    Then I confirm that I am on the Your Details Name page
    Then I confirm that my name is correct
    Then I submit my name details
    
    # Your Details Address Page
    Then I confirm that I am on the Your Details Address page
    Then I confirm that my address is correct
    Then I submit my address details

    # Your Details Phone Page - Validation Error
    Then I confirm that I am on the Your Details Phone page
    When I enter "1" as my Main Phone Number
    And I enter "00000000000" as My Secondary Phone Number
    Then I submit my phone details

    # Your Details Phone Page - Error Correction
    Then I confirm that I am on the Your Details Phone page
      And the error message summary for my Phone number is "Check your main phone number"
      And I enter "11111111111" as my Main Phone Number
      Then I submit my phone details
 
    # Your Details Email Page
    Then I confirm that I am on the Your Details Email page
    When I enter "email@email.com" as my Email Address
    When I enter "email@email.com" as my Confirmation Email Address
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
      Then I submit my Residency details

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
      And I confirm that the hearing time is "<time>"

    Examples:
    | jurorNumber | surname | postcode | time     |
    | 352004504   | Rivera  | EC3M 2NY | 09:15 am |
    | 352005444   | Bold    | EC4M 4NY | 09:44 am |


  @JDB-2674 @bug
  Scenario: Date picker screen not shown on change
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
      And I enter "1" as my Main Phone Number
      And I enter "00000000000" as My Secondary Phone Number
      Then I submit my phone details

     # Your Details Phone Page - Error Correction
    Then I confirm that I am on the Your Details Phone page
      And the error message summary for my Phone number is "Check your main phone number"
      And I enter "11111111111" as my Main Phone Number
      And I submit my phone details
 
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
      And I state that I require a excusal
      And I submit my Availablity

    # Excusal Page
    Then I confirm that I am on the Excusal page
    When I enter a reason of "I'm on holiday that week" for requiring excusal and submit

    # CJS Page
    Then I confirm that I am on the CJS page
    When I answer "No" for my CJS
      And I submit my CJS

    # Assistance Page
    Then I confirm that I am on the Assistance page
    When I answer "Yes" for my Assistance
      And I toggle limited mobility
      And I toggle hearing impairment
      And I toggle diabetes
      And I toggle severe sight impairment
      And I toggle other impairment
      And I enter "I have a broken arm and can't speak" as my assistance details
      And I submit my Assistance

    # Confirm Information Page
    Then I confirm that I am on the Confirm Information page
      And I click the link to change my excusal

    # Confirm Dates Page
    Then I confirm that I am on the Confirm Date page
    And I state that I require a deferral
    And I submit my Availablity

    Then I confirm that I am on the Deferral page
      When I enter a reason of "I'm on holiday that week" for requiring deferral and submit

    # Deferral Dates
    Then I confirm that I am on the Deferral Dates page
      When I enter my valid alternate Dates
      And I submit my Dates

    # Confirm Information Page
    Then I confirm that I am on the Confirm Information page
