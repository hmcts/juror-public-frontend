Feature: Log In

  Background:
    Given I truncate the database tables
      And I add the "data" data
      And I add the "basic_valid_login" data

    # Juror Portal Page
    When I navigate to the Juror Portal

    Then I confirm that I am on the Responder Type page


    # Start Scenarios
    # -------------------------------------
    @authentication
    Scenario: Log In
      When I state that I am replying on behalf of myself
        And I submit my Responder Type

      # Login Page
      Then I confirm that I am on the Login page
      When I submit "352004504", "Rivera" and "EC3M 2NY" as my login credentials

      # Your Details Page
      Then I confirm that I am on the Your Details Name page


    @authentication @bug @JDB-2171
    Scenario: Submitting personal details and then logging in again does not retain any previous information
      When I state that I am replying on behalf of myself
        And I submit my Responder Type

      # Login Page
      Then I confirm that I am on the Login page
      When I submit "352004504", "Rivera" and "EC3M 2NY" as my login credentials

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
      And I click the back link
      And I click the back link
      And I click the back link
      And I click the back link
      And I click the back link

      # Login Page
      Then I confirm that I am on the Login page
      When I submit "209092530", "Castillo" and "AB39RY" as my login credentials

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
      And my main phone number is "" on Your Details Phone page
      And my Secondary Phone Number is "" on Your Details Phone page
      And I enter "11111111111" as my Main Phone Number
      And I enter "00000000000" as My Secondary Phone Number
      Then I submit my phone details

      # Your Details Email Page
      Then I confirm that I am on the Your Details Email page
      And my Email Address is "" on Your Details Email page
      And my Confirmation Email Address is "" on Your Details Email page
      And I enter "email@email.com" as my Email Address
      And I enter "email@email.com" as my Confirmation Email Address
      Then I submit my email details

      # Your Details DOB Page
      Then I confirm that I am on the Your Details DOB page
      Then my Date of Birth is empty on Your Details DOB page
      When I enter 08/08/1995 as my Date of Birth
      Then I submit my DOB details


    @authentication @ThirdParty @JDB-1772 @bug
    Scenario: Logged in as third party, details from previous login are not retained
      When I state that I am replying on behalf of someone else
        And I submit my Responder Type

      # Login Page
      Then I confirm that I am on the Login page
      When I submit "352004504", "Rivera" and "EC3M 2NY" as my login credentials

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
      When I state that the person is unable to reply by themself
        And I submit my 3rd Party Reason

      # 3rd Party Personal Details Name
      Then I confirm that I am on the 3rd Party Personal Name page

      # First back click
      When I click the back link
        Then I confirm that I am on the 3rd Party Reason page

      # Second back click
      When I click the back link
        Then I confirm that I am on the 3rd Party Details Contact page

      # Third back click
      When I click the back link
        Then I confirm that I am on the 3rd Party Details Relationship page

      # Fourth back click
      When I click the back link
        Then I confirm that I am on the 3rd Party Details Name page

      # Fifth back click
      When I click the back link
        Then I confirm that I am on the Login page

      # Second login
      When I submit "352004504", "Rivera" and "EC3M 2NY" as my login credentials

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

    @authentication @FirstPerson @JDB-1701 @bug
    Scenario: Provides information on how to contact JCSB when account barred (first person)
      When I state that I am replying on behalf of myself
        And I submit my Responder Type

      Then I confirm that I am on the Login page
      When I submit "352004504", "Steve" and "EC3M 2NY" as my login credentials
        Then the authentication summary error is "Your combination of name, postcode and Juror number are not recognised."
      When I submit "352004504", "Steve" and "EC3M 2NY" as my login credentials
        Then the authentication summary error is "Your combination of name, postcode and Juror number are not recognised."
      When I submit "352004504", "Steve" and "EC3M 2NY" as my login credentials
        Then the authentication summary error is "Your combination of name, postcode and Juror number are not recognised."
      When I submit "352004504", "Steve" and "EC3M 2NY" as my login credentials
        Then the authentication summary error is "For security reasons, your account has been locked due to multiple failed login attempts and you can no longer reply online. Please contact the Jury Central Summoning Bureau for more information - our details are below in the 'I don't have a juror number' section."

    @authentication @ThirdParty @JDB-1701 @bug
    Scenario: Provides information on how to contact JCSB when account barred (third party)
      When I state that I am replying on behalf of someone else
      And I submit my Responder Type

      Then I confirm that I am on the Login page
      When I submit "352004504", "Steve" and "EC3M 2NY" as my login credentials
        Then the authentication summary error is "The combination of name, postcode and Juror number are not recognised."
      When I submit "352004504", "Steve" and "EC3M 2NY" as my login credentials
        Then the authentication summary error is "The combination of name, postcode and Juror number are not recognised."
      When I submit "352004504", "Steve" and "EC3M 2NY" as my login credentials
        Then the authentication summary error is "The combination of name, postcode and Juror number are not recognised."
      When I submit "352004504", "Steve" and "EC3M 2NY" as my login credentials
        Then the authentication summary error is "For security reasons, this account has been locked due to multiple failed login attempts and you can no longer reply online. Please contact the Jury Central Summoning Bureau for more information - our details are below in the 'I don't have a juror number' section."

    @authentication @JDB-1575 @bug
    Scenario: Error messages on the login page do not persist when restarting the process
      When I state that I am replying on behalf of myself
        And I submit my Responder Type

      Then I confirm that I am on the Login page
      When I submit "", "" and "" as my login credentials

      Then the error message summary for Juror number is "Enter your 9-digit juror number. You can find it at the top of your jury summons letter"
        And the error message details for Juror number is "Enter your 9-digit juror number. You can find it at the top of your jury summons letter"

        And the error message summary for Juror last name is "Enter your last name"
        And the error message details for Juror last name is "Enter your last name"

        And the error message summary for Juror postcode is "Enter your postcode"
        And the error message details for Juror postcode is "Enter your postcode"

      # Attempt two
      When I click the back link
        And I click the back link
      Then I confirm that I am on the Responder Type page

      When I state that I am replying on behalf of myself
        And I submit my Responder Type

      Then I confirm that I am on the Login page
        And there is no error message details for Juror number
        And there is no error message details for Juror last name
        And there is no error message details for Juror postcode

      # Attempt three
      When I navigate directly to the url "/steps/00-responder-type"
        Then I confirm that I am on the Responder Type page

      When I state that I am replying on behalf of myself
        And I submit my Responder Type

      Then I confirm that I am on the Login page
        And there is no error message details for Juror number
        And there is no error message details for Juror last name
        And there is no error message details for Juror postcode

    @authentication @JDB-1745 @bug
    Scenario: "You have no summons to complete." message displays correctly
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
      When I tick the Confirm My Information checkbox
        And I submit my information

      # Confirmation Page
      Then I confirm that I am on the Confirmation Straight Through page


      # Round #2
      # -------------
      When I navigate to the Juror Portal

      # Responder Type Page
      Then I confirm that I am on the Responder Type page
        And I state that I am replying on behalf of myself
        And I submit my Responder Type

      # Login Page
      Then I confirm that I am on the Login page

      When I submit "352004504", "Rivera" and "EC3M 2NY" as my login credentials
        Then the authentication summary error is "You have no summons to complete."
