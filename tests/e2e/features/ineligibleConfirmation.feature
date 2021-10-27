Feature: Ineligible Responses Confirmations

  Userflow related to a third party response where the person summoned is not deceased

  @ThirdParty @JDB-2677 @PhoneNumberFormat
  Scenario: As a third party respondant I give ineligible answers to qualify questions

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
      And I toggle my contact preference for email
      And I enter "john.doe@email.com" as my email address
      And I enter "john.doe@email.com" as my confirmed email address
      And I submit my 3rd Party Contact Details

    # 3rd Party Reason
    Then I confirm that I am on the 3rd Party Reason page
    When I state that my reason for replying on behalf of the person is "Holiday"
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
      And I choose to provide new contact numbers
      And I enter "+123 123 123" as the main contact phone number
      And I enter "+456 456 456" as the other contact phone number
      And I choose to provide new contact email addresses
      And I enter "jose.rivera@email.com" as the email address
      And I enter "jose.rivera@email.com" as the confirmed email address
      And I submit my 3rd Party Personal Contact Details

    # Qualify Page
    Then I confirm that I am on the Qualify Landing page
      And I click the Continue button

    # Qualify - Residency Page
    Then I confirm that I am on the Qualify Residency page
      And I confirm I have not lived in the UK for 5 years
      And I enter "Canada" as my residency details
      And I submit my Residency details

    # Qualify - Mental Health Sectioned Page
    Then I confirm that I am on the mental health sectioned page
      And I confirm I have been sectioned under the mental health act
      And I enter "Psychosis" as my mental health sectioned details
      Then I submit my mental health sectioned details

    # Qualify - Mental Health Capacity Page
    Then I confirm that I am on the mental health capacity page
      And I confirm I do not lack capacity under the mental health act
      And I submit my mental health capacity details

    # Qualify - Bail Page
    Then I confirm that I am on the Qualify Bail page
      And I confirm I am currently on bail
      And I enter "4 weeks" as my bail details
      And I submit my Bail details

    # Qualify - Convictions Page
    Then I confirm that I am on the Qualify Convictions page
      And I confirm I have been convicted of a crime resulting in a prison sentence, community order or suspended prison sentence
      And I enter "Convicted" as my conviction details
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



