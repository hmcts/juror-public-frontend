Feature: Third Party Details

  Test related to third party details page - first page in 3rd party branch off

  Background:
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

    # Start Scenarios
    # -------------------------------------
    @ThirdParty @JDB-1798 @bug
    Scenario: 3rd party name does not populate the juror's name after an error
      
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
        And I enter "01415555555" as my main phone number
        And I enter "01415555556" as my other phone number
        And I toggle my contact preference for email
        And I enter "john.doe@email.com" as my email address
        And I enter "john.doe@email.com" as my confirmed email address
        And I submit my 3rd Party Contact Details

      # Third Party Reason Page
      Then I confirm that I am on the 3rd Party Reason page
        And I state that the person is not here
        And I submit my 3rd Party Reason

      # 3rd Party Personal Details Name
      Then I confirm that I am on the 3rd Party Personal Name page

      # Go back
      Then I click the back link
        And I confirm that I am on the 3rd Party Reason page

      Then I click the back link
        And I confirm that I am on the 3rd Party Details Contact page

      # Clear a field
      Then I enter "" as my main phone number
        And I submit my 3rd Party Contact Details
        And the error message summary for my third party contact Phone number is "Enter your main phone number"
        And I enter "12345678911" as my main phone number
        And I submit my 3rd Party Contact Details

      # Resubmit
      Then I confirm that I am on the 3rd Party Reason page
        And I state that the person is not here
        And I submit my 3rd Party Reason

      # 3rd Party Personal Details Name
      Then I confirm that I am on the 3rd Party Personal Name page
        And I confirm that the summoned person's name is "Rev Jose Rivera"

    @ThirdParty @JDB-1994 @bug
    Scenario: As a third party respondant I must enter valid phone numbers for myself
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
        And I enter "11111111111111111111111111111111111111111111111111111111111111111111" as my main phone number
        And I enter "11111111111111111111111111111111111111111111111111111111111111111112" as my other phone number
        And I submit my 3rd Party Contact Details

      Then I confirm that I am on the 3rd Party Details Contact page
        And the error message summary for my third party contact Phone number is "Check your main phone number"
        And the error message details for my third party contact Phone number is "Check your main phone number"
        And the error message summary for my other third party contact Phone number is "Check your other phone number"
        And the error message details for my other third party contact Phone number is "Check your other phone number"

      When I enter "999999999a8" as my main phone number
        And I enter "999999999a9" as my other phone number
        And I submit my 3rd Party Contact Details

      Then I confirm that I am on the 3rd Party Details Contact page
        And the error message summary for my third party contact Phone number is "Check your main phone number"
        And the error message details for my third party contact Phone number is "Check your main phone number"
        And the error message summary for my other third party contact Phone number is "Check your other phone number"
        And the error message details for my other third party contact Phone number is "Check your other phone number"

      When I enter "" as my main phone number
        And I enter "" as my other phone number
        And I submit my 3rd Party Contact Details

      Then I confirm that I am on the 3rd Party Details Contact page
        And the error message summary for my third party contact Phone number is "Enter your main phone number"
        And the error message details for my third party contact Phone number is "Enter your main phone number"
        And there is no error message details for my other third party contact Phone number

      When I enter "9999999998" as my main phone number
        And I enter "9999999999" as my other phone number
        And I submit my 3rd Party Contact Details

      Then I confirm that I am on the 3rd Party Reason page

    @JDB-2111 @bug
    Scenario Outline: I am warned if either of my phone numbers <condition>
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
      When I toggle my contact preference for phone
        And I enter "<mainPhone>" as my main phone number
        And I enter "<otherPhone>" as my other phone number
        And I submit my 3rd Party Contact Details

      Then I confirm that I am on the 3rd Party Details Contact page
        And the error message summary for my third party contact Phone number is "Check your main phone number"
        And the error message details for my third party contact Phone number is "Check your main phone number"
        And the error message summary for my other third party contact Phone number is "Check your other phone number"
        And the error message details for my other third party contact Phone number is "Check your other phone number"

      Examples:
      | mainPhone         | otherPhone        | condition                                     |
      | 0759789           | 1458795           | do not contain enough characters              |
      | 07123 123456 789  | 080 888888888888  | contain too many characters                   |
      | 07123 12345x      | 080 8888888x      | contain characters I am not allowed to enter  |

    @JDB-2111 @bug
    Scenario Outline: I can enter a phone number which <condition>

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


      When I toggle my contact preference for phone
        And I enter "<mainPhone>" as my main phone number
        And I enter "<otherPhone>" as my other phone number
        And I submit my 3rd Party Contact Details

      Then there is no error message details for my third party contact Phone number
        And there is no error message details for my other third party contact Phone number

      Examples:
      | mainPhone       | otherPhone      | condition                                 |
      | +447123123456   | +448088888888   | includes numerical characters and plus    |
      | 07123 123456    | 080 88888888    | includes spaces and numerical characters  |
      | 07894567        | 48798426        | contains the minimum number of characters |
      | 148795487354879 | 145875964857267 | contains the maximum number of characters |


    @JDB-1995 @bug
    Scenario: When changing my contact details I cannot deselect phone if person being summoned is using my details to be contacted on
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
        And I enter "01415555555" as my main phone number
        And I enter "01415555556" as my other phone number
        And I toggle my contact preference for email
        And I enter "john.doe@email.com" as my email address
        And I enter "john.doe@email.com" as my confirmed email address
        And I submit my 3rd Party Contact Details
              
      # 3rd Party Reason
      Then I confirm that I am on the 3rd Party Reason page
      When I state that the person is not here
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
      When I choose to use existing contact numbers
        And I choose to use existing contact email addresses
        And I submit my 3rd Party Personal Contact Details

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

      # Change answer
      When I click the link to change my third party main phone number
        Then I confirm that I am on the 3rd Party Details Contact page

      When I enter "" as my main phone number
        And I enter "" as my other phone number
        And I submit my 3rd Party Contact Details

      # 3rd Party Contact Details
      Then I confirm that I am on the 3rd Party Details Contact page

      # Correct answer
        And I enter "01415555557" as my main phone number
        And I enter "01415555558" as my other phone number
        And I submit my 3rd Party Contact Details

      # Confirm Information Page
      Then I confirm that I am on the Confirm Information page

    @JDB-1995 @bug
    Scenario: When changing my contact details I cannot deselect email if person being summoned is using my details to be contacted on
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
        And I enter "01415555555" as my main phone number
        And I enter "01415555556" as my other phone number
        And I toggle my contact preference for email
        And I enter "john.doe@email.com" as my email address
        And I enter "john.doe@email.com" as my confirmed email address
        And I submit my 3rd Party Contact Details

      # 3rd Party Reason
      Then I confirm that I am on the 3rd Party Reason page
      When I state that the person is not here
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
      When I choose to use existing contact numbers
        And I choose to use existing contact email addresses
        And I submit my 3rd Party Personal Contact Details

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

      # Change answer
      When I click the link to change my third party main phone number
        Then I confirm that I am on the 3rd Party Details Contact page


      When I enter "" as my email address
        And I enter "" as my confirmed email address
        And I submit my 3rd Party Contact Details

      # 3rd Party Contact Details
      Then I confirm that I am on the 3rd Party Details Contact page

      # Correct answer
        And I enter "jose.rivera@email.com" as the email address
        And I enter "jose.rivera@email.com" as the confirmed email address
        And I submit my 3rd Party Contact Details

      # Confirm Information Page
      Then I confirm that I am on the Confirm Information page

    @JDB-2340 @bug
    Scenario: Not entering contact preference triggers an error message
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
        And I submit my 3rd Party Contact Details

      Then the error message summary for my third party contact preference is "Choose a way for us to contact you"
        And the error message details for my third party contact preference is "Choose a way for us to contact you"

    @JDB-1995 @bug
    Scenario: First line of address is required
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
        And I enter "01415555555" as my main phone number
        And I enter "01415555556" as my other phone number
        And I toggle my contact preference for email
        And I enter "john.doe@email.com" as my email address
        And I enter "john.doe@email.com" as my confirmed email address
        And I submit my 3rd Party Contact Details

      # 3rd Party Reason
      Then I confirm that I am on the 3rd Party Reason page
      When I state that the person is not here
        And I submit my 3rd Party Reason

      # 3rd Party Personal Details Name
      Then I confirm that I am on the 3rd Party Personal Name page
      And I confirm that the summoned person's name is "Rev Jose Rivera"
      And I submit my 3rd Party Personal Name Details

      # 3rd Party Personal Details Address
      Then I confirm that I am on the 3rd Party Personal Address page
      Then I confirm that the summoned person's address is incorrect
      Then I submit my 3rd Party Personal Address Details
      Then I confirm that I am on the 3rd Party Personal Address Change page
      And I enter "" as the first line of the address
      And I submit my 3rd Party Personal Address Change details
      And the summary error for address line one is "Provide the first line of the address"
      And the detailed error for address line one is "Provide the first line of the address"
      When I enter "14 Sugar Street" as the first line of the address
      And I submit my 3rd Party Personal Address Details

      Then there is no error message summary for address line one
        And there is no error message details for address line one

      @JDB-1995 @bug
      Scenario: Town is now required
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
        And I enter "01415555555" as my main phone number
        And I enter "01415555556" as my other phone number
        And I toggle my contact preference for email
        And I enter "john.doe@email.com" as my email address
        And I enter "john.doe@email.com" as my confirmed email address
        And I submit my 3rd Party Contact Details

        # 3rd Party Reason
        Then I confirm that I am on the 3rd Party Reason page
        When I state that the person is not here
          And I submit my 3rd Party Reason

        # 3rd Party Personal Details Name
        Then I confirm that I am on the 3rd Party Personal Name page
        And I confirm that the summoned person's name is "Rev Jose Rivera"
        And I submit my 3rd Party Personal Name Details

        # 3rd Party Personal Details Address
        Then I confirm that I am on the 3rd Party Personal Address page
        Then I confirm that the summoned person's address is incorrect
        Then I submit my 3rd Party Personal Address Details
        Then I confirm that I am on the 3rd Party Personal Address Change page
        And I enter "" as the town
        And I submit my 3rd Party Personal Address Change details
        Then the summary error for the town is "Provide the town or city"
        And the detailed error for the town is "Provide the town or city"
        When I enter "Town" as the town
        And I submit my 3rd Party Personal Address Details

        Then there is no error message summary for the town
          And there is no error message details for the town

    @JDB-2836 @bug
    Scenario: Details screen displayed correctly when changing mind for deceased
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
        And I enter "01415555555" as my main phone number
        And I enter "01415555556" as my other phone number
        And I toggle my contact preference for email
        And I enter "john.doe@email.com" as my email address
        And I enter "john.doe@email.com" as my confirmed email address
        And I submit my 3rd Party Contact Details

      # 3rd Party Reason
      Then I confirm that I am on the 3rd Party Reason page
      When I state that the person is deceased
      And I submit my 3rd Party Reason

      # 3rd Party Personal Details
      Then I confirm that I am on the Confirm Information page
      When I click the link to change the reason for replying
      Then I confirm that I am on the 3rd Party Reason page
      And I state that the person is not here
      # And I click the Continue button
      And I submit my 3rd Party Reason
      And I confirm that I am on the 3rd Party Personal Name page
