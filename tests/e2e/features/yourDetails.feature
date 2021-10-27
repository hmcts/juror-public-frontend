Feature: First person your details

  Entering personal details about yourself on a first person user flow

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

    

    # Start Scenarios
    # -------------------------------------
    @JDB-1945 @JDB-836 @AC1 @bug
    Scenario: Address line one is now no longer optional

      # Your Details Address Page
      Then I confirm that I am on the Your Details Address page
      Then I confirm that my address is incorrect
      Then I submit my address details

      Then I confirm that I am on the Your Details Address Change page
        And I enter "" as the first line of my address
        And I enter "London" as the second line of my address
        And I enter "England" as the third line of my address
        And I submit my address change details

      Then the summary error for my address line one is "Provide the first line of your address"
        And the detailed error for my address line one is "Provide the first line of your address"
        And there is no error message summary for my address line two
        And there is no error message details for my address line two
        And there is no error message summary for my address line three
        And there is no error message details for my address line three

      When I enter "14 Sugar Street" as the first line of my address
        And I enter "London" as the second line of my address
        And I enter "England" as the third line of my address
        And I submit my address change details

      Then there is no error message summary for my address line two
        And there is no error message details for my address line one
        And there is no error message summary for my address line two
        And there is no error message details for my address line two
        And there is no error message summary for my address line three
        And there is no error message details for my address line three

    @JDB-1945 @JDB-836 @AC1 @bug
    Scenario: At least one of the address lines must be provided

      # Your Details Address Page
      Then I confirm that I am on the Your Details Address page
      Then I confirm that my address is incorrect
      Then I submit my address details

      Then I confirm that I am on the Your Details Address Change page
        And I enter "" as the first line of my address
        And I enter "" as the second line of my address
        And I enter "" as the third line of my address
        And I submit my address change details

      Then the summary error for my address line one is "Provide the first line of your address"

    @JDB-1945 @JDB-836 @AC2
    Scenario: Address town is no longer optional

      # Your Details Address Page
      Then I confirm that I am on the Your Details Address page
      Then I confirm that my address is incorrect
      Then I submit my address details

      Then I confirm that I am on the Your Details Address Change page
        And I enter "" as the town of my address
        And I submit my address change details

      Then the summary error for my town is "Provide the town or city you live in"
        And the detailed error for my town is "Provide the town or city you live in"

      When I enter "Town" as the town of my address
        And I submit my address change details

      Then there is no error message summary for my address town
        And there is no error message details for my address town

    @JDB-1945 @JDB-836 @AC3
    Scenario: Address county is optional

      # Your Details Address Page
      Then I confirm that I am on the Your Details Address page
      Then I confirm that my address is incorrect
      Then I submit my address details

      Then I confirm that I am on the Your Details Address Change page
        And I enter "" as the county of my address
        And I submit my address change details

        Then there is no error message summary for my address county
          And there is no error message details for my address county
          
      Then I click the back link

      Then I confirm that I am on the Your Details Address Change page
        And I enter "County" as the county of my address
        And I submit my address change details

        Then there is no error message summary for my address county
          And there is no error message details for my address county

    @JDB-1945 @JDB-836 @AC4
    Scenario: Address postcode is mandatory

    # Your Details Address Page
    Then I confirm that I am on the Your Details Address page
    Then I confirm that my address is incorrect
    Then I submit my address details

    Then I click the back link
    Then I confirm that I am on the Your Details Address page
    Then I confirm that my address is incorrect
    Then I submit my address details

      Then I confirm that I am on the Your Details Address Change page
        And I enter "" as the postcode of my address
        And I submit my address change details

      Then the summary error for my postcode is "Enter your postcode"
        And the detailed error for my postcode is "Enter your postcode"
        And I enter "AB21 3RY" as the postcode of my address
        And I submit my address change details

        Then there is no error message summary for my address postcode
          And there is no error message details for my address postcode

    @JDB-1801 @bug
    Scenario: As a respondant I cannot enter quotes or pipes for my name
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
      When I state that I can do jury service for my availablity
        And I submit my Availablity

      # CJS Page
      Then I confirm that I am on the CJS page
      When I answer "No" for my CJS
        And I submit my CJS

      # Assistance Page
      Then I confirm that I am on the Assistance page
      When I answer "No" for my Assistance
        And I submit my Assistance

      # Confirm Information Page
      Then I confirm that I am on the Confirm Information page
        And I click the link to change my name
        And I confirm that I am on the Your Details Name Change page

      # Change First Name
        And I enter "Jose|" as my first name
        Then I submit my name change details

      Then I click the back link
        And I click the back link
        And I confirm that I am on the Confirm Information page
        And my name is displayed as "Rev Jose Rivera"

    @JDB-1714 @bug
    Scenario: As a respondant I should be warned when I have not entered a date of birth
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
      When I enter "" as my day of birth
      And I enter "" as my month of birth
      And I enter "" as my year of birth
      Then I submit my DOB details

      Then the error message summary for the confirmed Date of birth is "Enter the day you were born"
        And the error message details for my day of birth is "Enter the day you were born"
        #And the error message details for my month of birth is "Please enter the month you were born"
        #And the error message details for my year of birth is "Please enter the year you were born"

    @JDB-1714 @bug
    Scenario Outline: As a respondant I should be warned when my date of birth is incorrect
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
        And I enter "<day>" as my day of birth
        And I enter "<month>" as my month of birth
        And I enter "<year>" as my year of birth
      Then I submit my DOB details

      Then the error message summary for my Date of birth is "<error>"
        And the error message details for my Date of birth is "<error>"

      Examples:
        | day | month | year  | error                                                                                 |
        | 18  | 09    |       | Enter the year you were born                                                   |
        | 18  | 09    | 89    | Enter the year you were born as a 4 digit number. For example, 1982         |
        | 18  | 09    | 0     | Enter the year you were born as a 4 digit number. For example, 1982         |

        | 18  |       | 1989  | Enter the month you were born                                                  |
        | 18  | 21    | 1989  | Enter the month you were born as a number. For example, for December, enter 12 |
        | 18  | 0     | 1989  | Enter the month you were born as a number. For example, for December, enter 12 |

        |     | 09    | 1989  | Enter the day you were born                                                    |
        | 34  | 09    | 1989  | Enter the day you were born as a date. For example, 06                         |
        | 0   | 09    | 1989  | Enter the day you were born as a date. For example, 06                         |

    @JDB-1994 @bug
    Scenario: As a respondant I must enter valid phone numbers for myself
      # Your Details Address Page
      Then I confirm that I am on the Your Details Address page
      Then I confirm that my address is correct
      Then I submit my address details

      # Your Details Phone Page
      
       Then I confirm that I am on the Your Details Phone page
      # And I enter "11111111111111111111111111111111111111111111111111111111111111111111" as my Main Phone Number
      # And I enter "11111111111111111111111111111111111111111111111111111111111111111111" as My Secondary Phone Number
      # Then I submit my phone details

      #  And the error message summary for my Phone number is "Please check your main phone"
      #  And the error message details for my Phone number is "Please check your main phone"
      #  And the error message summary for my other Phone number is "Please check your other phone number"
      #  And the error message details for my other Phone number is "Please check your other phone number"

      #  When I enter "999999999a8" as my Main Phone Number
      #  And I enter "999999999a9" as My Secondary Phone Number
      #  Then I submit my phone details

      #  And the error message summary for my Phone number is "Please check your main phone"
      #  And the error message details for my Phone number is "Please check your main phone"
      #  And the error message summary for my other Phone number is "Please check your other phone number"
      #  And the error message details for my other Phone number is "Please check your other phone number"

      #  When I enter "" as my Main Phone Number
      #  And I enter "" as My Secondary Phone Number
      #  Then I submit my phone details

      #  And the error message summary for my Phone number is "Please check your main phone"
      #  And the error message details for my Phone number is "Please give us the phone number you use the most."
      #  And there is no error message details for my other Phone number


        When I enter "9999999998" as my Main Phone Number
        And I enter "9999999999" as My Secondary Phone Number
        Then I submit my phone details
  
      # Your Details Email Page
      Then I confirm that I am on the Your Details Email page

    @JDB-2111 @bug
    Scenario Outline: I am warned if either of my phone numbers <condition>
      # Your Details Address Page
      Then I confirm that I am on the Your Details Address page
      Then I confirm that my address is correct
      Then I submit my address details

      # Your Details Phone Page
      Then I confirm that I am on the Your Details Phone page
      When I enter "<mainPhone>" as my Main Phone Number
      And I enter "<otherPhone>" as My Secondary Phone Number
      Then I submit my phone details

      Then the error message summary for my Phone number is "Check your main phone number"
        And the error message summary for my other Phone number is "Check your other phone number"
        And the error message details for my Phone number is "Check your main phone number"
        And the error message details for my other Phone number is "Check your other phone number"

      Examples:
      | mainPhone         | otherPhone        | condition                                     |
      | 0759789           | 1458795           | do not contain enough characters              |
      | 07123 123456 789  | 080 888888888888  | contain too many characters                   |
      | 07123 12345x      | 080 8888888x      | contain characters I am not allowed to enter  |

    @JDB-2111 @bug
    Scenario Outline: I can enter a phone number which <condition>

      # Your Details Address Page
      Then I confirm that I am on the Your Details Address page
      Then I confirm that my address is correct
      Then I submit my address details

      # Your Details Phone Page
      Then I confirm that I am on the Your Details Phone page
      When I enter "<mainPhone>" as my Main Phone Number
      And I enter "<otherPhone>" as My Secondary Phone Number
      Then I submit my phone details

      Then there is no error message details for my Phone number
        And there is no error message details for my other Phone number

      Examples:
      | mainPhone       | otherPhone      | condition                                 |
      | +447123123456   | +448088888888   | includes numerical characters and plus    |
      | 07123 123456    | 080 88888888    | includes spaces and numerical characters  |
      | 07894567        | 48798426        | contains the minimum number of characters |
      | 148795487354879 | 145875964857267 | contains the maximum number of characters |

    @JDB-2575 @bug
    Scenario: As a respondant I cannot enter quotes or pipes for my name

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
    When I enter 01/01/2001 as my Date of Birth
    Then I submit my DOB details


    @JDB-1490 @bug
    Scenario: Last name presence check is correct
    Then I confirm that I am on the Your Details Address page
    Then I click the back button
    Then I confirm that my name is incorrect
    Then I submit my name details
    Then I confirm that I am on the Your Details Name Change page
        And I enter "" as my last name
        Then I submit my name change details

      Then the summary error for my last name is "Enter your last name"
        And the detailed error for my last name is "Enter your last name"
