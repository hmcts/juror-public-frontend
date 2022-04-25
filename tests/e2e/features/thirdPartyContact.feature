Feature: Third party contact details

  Tests related to the contact information page of the third party userflow

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


    # Start Scenarios
    # -------------------------------------
    @ThirdParty @BackLink
    Scenario: As a third party respondant, when I click the back link on the contact details page I return to the personal details screen
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
      When I click the back link
        Then I confirm that I am on the 3rd Party Personal DOB page

    @ThirdParty @SubmitButton
    Scenario: As a third party respondant, when I click complete the contact details page and click continue I am taken to the qualify page
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
        And I choose to provide new contact numbers
        And I enter "01415555557" as the main contact phone number
        And I enter "01415555558" as the other contact phone number
        And I choose to provide new contact email addresses
        And I enter "jose.rivera@email.com" as the email address
        And I enter "jose.rivera@email.com" as the confirmed email address
        And I submit my 3rd Party Personal Contact Details

      # Qualify Page
      Then I confirm that I am on the Qualify Landing page

    @ThirdParty @JDB-1947 @bug
    Scenario: As a third party respondant I wish to use the existing phone number and new email address details to be contacted with
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
        And I choose to use existing contact numbers
        And I choose to provide new contact email addresses
        And I enter "jose.rivera@email.com" as the email address
        And I enter "jose.rivera@email.com" as the confirmed email address
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
      When I tick the Confirm My Information checkbox
        And I submit my information

      # Confirmation Page
      Then I confirm that I am on the Confirmation Straight Through page
        # Check DB
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "01415555555" within the "PHONE_NUMBER" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "01415555556" within the "ALT_PHONE_NUMBER" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "jose.rivera@email.com" within the "EMAIL" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "N" within the "JUROR_PHONE_DETAILS" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "Y" within the "JUROR_EMAIL_DETAILS" field for "JUROR_NUMBER" "352004504"

    @ThirdParty @JDB-1947 @bug
    Scenario: As a third party respondant I wish to use new phone number and existing email address details to be contacted with
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
        When I choose to provide new contact numbers
        And I enter "01415555557" as the main contact phone number
        And I enter "01415555558" as the other contact phone number
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
      When I tick the Confirm My Information checkbox
        And I submit my information

      # Confirmation Page
      Then I confirm that I am on the Confirmation Straight Through page
        # Check DB
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "01415555557" within the "PHONE_NUMBER" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "01415555558" within the "ALT_PHONE_NUMBER" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "john.doe@email.com" within the "EMAIL" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "Y" within the "JUROR_PHONE_DETAILS" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "N" within the "JUROR_EMAIL_DETAILS" field for "JUROR_NUMBER" "352004504"

    @ThirdParty @JDB-1947 @bug
    Scenario: As a third party respondant I wish to use existing phone number and email address details to be contacted with
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
        And I choose to use existing contact numbers
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
      When I tick the Confirm My Information checkbox
        And I submit my information

      # Confirmation Page
      Then I confirm that I am on the Confirmation Straight Through page
        # Check DB
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "01415555555" within the "PHONE_NUMBER" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "01415555556" within the "ALT_PHONE_NUMBER" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "john.doe@email.com" within the "EMAIL" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "N" within the "JUROR_PHONE_DETAILS" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "N" within the "JUROR_EMAIL_DETAILS" field for "JUROR_NUMBER" "352004504"

    @ThirdParty @JDB-1947 @bug
    Scenario: As a third party respondant I wish to provide phone number and email address details to be contacted with
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
        When I choose to provide new contact numbers
        And I enter "01415555557" as the main contact phone number
        And I enter "01415555558" as the other contact phone number
        And I choose to provide new contact email addresses
        And I enter "jose.rivera@email.com" as the email address
        And I enter "jose.rivera@email.com" as the confirmed email address
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
      When I tick the Confirm My Information checkbox
        And I submit my information

      # Confirmation Page
      Then I confirm that I am on the Confirmation Straight Through page
        # Check DB
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "01415555557" within the "PHONE_NUMBER" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "01415555558" within the "ALT_PHONE_NUMBER" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "jose.rivera@email.com" within the "EMAIL" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "Y" within the "JUROR_PHONE_DETAILS" field for "JUROR_NUMBER" "352004504"
        And I check the "JUROR_DIGITAL.JUROR_RESPONSE" table for "Y" within the "JUROR_EMAIL_DETAILS" field for "JUROR_NUMBER" "352004504"

    @ThirdParty @JDB-1963 @bug
    Scenario: As a third party respondant who has not provided phone numbers for myself on the detail screen I cannot ask to be contacted on my own phone number details
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
        And I toggle my contact preference for email
        And I enter "jose.rivera@email.com" as the email address
        And I enter "jose.rivera@email.com" as the confirmed email address
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

      Then I confirm that I am on the 3rd Party Personal Contact page
        And the error message summary for using third party respondants contact Phone is "Provide a contact number"
        And the error message details for using third party respondants contact Phone is "You have not provided any phone number information. Please select the other option."

    @ThirdParty @JDB-1963 @bug
    Scenario: As a third party respondant who has not provided an email address for myself on the detail screen I cannot ask to be contacted on my own email address details
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

      Then I confirm that I am on the 3rd Party Personal Contact page
        And the error message summary for using third party respondants contact Email Address is "Provide a contact email address"
        And the error message details for using third party respondants contact Email Address is "You have not provided any email address information. Please select the other option."

    @ThirdParty @JDB-1843
    Scenario: As a third party respondant if I enter new numbers for contacting the juror and then change my mind, the value is cleared
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
        When I choose to provide new contact numbers
        And I enter "01415555557" as the main contact phone number
        And I enter "01415555558" as the other contact phone number
        And I choose to use existing contact numbers
        And I choose to provide new contact numbers

      Then the main contact phone number is empty
        And the other contact phone number

    @ThirdParty @JDB-1843
    Scenario: As a third party respondant if I enter a new email address for contacting the juror and then change my mind, the value is cleared
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
      When I choose to provide new contact email addresses
        And I enter "jose.rivera@email.com" as the email address
        And I enter "jose.rivera@email.com" as the confirmed email address
        And I choose to use existing contact email addresses
        And I choose to provide new contact email addresses

      Then the contact email address is empty
        And the contact email address confirmation is empty


    @ThirdParty @JDB-1802 @bug
    Scenario: Summary page updates when user changes selection on Contacting the juror page
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
        And I choose to provide new contact numbers
        And I enter "01415555557" as the main contact phone number
        And I enter "01415555558" as the other contact phone number
        And I choose to provide new contact email addresses
        And I enter "jose.rivera@email.com" as the email address
        And I enter "jose.rivera@email.com" as the confirmed email address
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
        And I confirm that the main phone number is ""
        And I confirm that the secondary phone number is ""
        And I confirm that the third party main phone number is "01415555555"
        And I confirm that the third party secondary phone number is "01415555556"

      When I click the link to change my primary phone number

      # 3rd Party Contact Details
      Then I confirm that I am on the 3rd Party Personal Contact page
        And I choose to provide new contact numbers
        And I enter "01415555557" as the main contact phone number
        And I enter "01415555558" as the other contact phone number
        And I choose to provide new contact email addresses
        And I enter "jose.rivera@email.com" as the email address
        And I enter "jose.rivera@email.com" as the confirmed email address
        And I submit my 3rd Party Personal Contact Details

      # Confirm Information Page
      Then I confirm that I am on the Confirm Information page
        And I confirm that the main phone number is "01415555557"
        And I confirm that the secondary phone number is "01415555558"
        And I confirm that the third party main phone number is "01415555555"
        And I confirm that the third party secondary phone number is "01415555556"

      When I click the link to change my primary phone number

      # 3rd Party Contact Details
      Then I confirm that I am on the 3rd Party Personal Contact page
      When I choose to use existing contact numbers
        And I choose to use existing contact email addresses
        And I submit my 3rd Party Personal Contact Details

      # Confirm Information Page
      Then I confirm that I am on the Confirm Information page
        And I confirm that the main phone number is ""
        And I confirm that the secondary phone number is ""
        And I confirm that the third party main phone number is "01415555555"
        And I confirm that the third party secondary phone number is "01415555556"

    @ThirdParty @JDB-1994 @bug
    Scenario: As a third party respondant I must enter valid phone numbers on the Juror contact details page
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
        And I choose to provide new contact email addresses
        And I enter "test@email.com" as my email address
        And I enter "test@email.com" as my confirmed email address
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
        And I confirm that the main phone number is ""
        And I confirm that the secondary phone number is ""
        And I confirm that the third party main phone number is "01415555555"
        And I confirm that the third party secondary phone number is "01415555556"
        And I click the link to change my third party email address

      # Third Party Details
        Then I confirm that I am on the 3rd Party Details Contact page
        And I enter "" as my email address
        And I enter "" as my confirmed email address
        And I enter "thirdp@mail.com" as my email address
        And I enter "thirdp@mail.com" as my confirmed email address
        And I submit my 3rd Party Contact Details
        And I confirm that I am on the Confirm Information page

    @JDB-2111 @bug
    Scenario Outline: I am warned if either of the summoned juror's phone numbers <condition>
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
      When I choose to provide new contact numbers
        And I enter "<mainPhone>" as the main contact phone number
        And I enter "<otherPhone>" as the other contact phone number
        And I submit my 3rd Party Personal Contact Details

      Then I confirm that I am on the 3rd Party Personal Contact page
        And the error message summary for the jurors contact Phone number is "Check their main phone number"
        And the error message details for the jurors contact Phone number is "Check their main phone number"
        And the error message summary for the jurors other contact Phone number is "Check their other phone number"
        And the error message details for the jurors other contact Phone number is "Check their other phone number"

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

      When I choose to provide new contact numbers
        And I enter "<mainPhone>" as the main contact phone number
        And I enter "<otherPhone>" as the other contact phone number
        And I submit my 3rd Party Personal Contact Details

      Then there is no error message details for the jurors contact Phone number
        And there is no error message details for the jurors other contact Phone number

      Examples:
      | mainPhone       | otherPhone      | condition                                 |
      | +447123123456   | +448088888888   | includes numerical characters and plus    |
      | 07123 123456    | 080 88888888    | includes spaces and numerical characters  |
      | 07894567        | 48798426        | contains the minimum number of characters |
      | 148795487354879 | 145875964857267 | contains the maximum number of characters |

    @ThirdParty @JDB-2021 @bug
    Scenario: Changing contact detail for both 3rd party and juror
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
        And I choose to provide new contact email addresses
        And I enter "test@email.com" as my email address
        And I enter "test@email.com" as my confirmed email address
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
        And I confirm that the main phone number is ""
        And I confirm that the secondary phone number is ""
        And I confirm that the third party main phone number is "01415555555"
        And I confirm that the third party secondary phone number is "01415555556"
        And I click the link to change my third party email address

      # Third Party Details
        And I confirm that I am on the 3rd Party Details Contact page

        And I enter "" as my email address
        And I enter "" as my confirmed email address
        And I enter "thirdp@mail.com" as my email address
        And I enter "thirdp@mail.com" as my confirmed email address
        And I submit my 3rd Party Contact Details
        And I confirm that I am on the Confirm Information page

      Then I confirm that the third party email address is "thirdp@mail.com"
        And I click the link to change my email address
        And I choose to use existing contact email addresses
        And I submit my 3rd Party Contact Details
      Then I confirm that I am on the Confirm Information page
        And I confirm that the email address is ""
