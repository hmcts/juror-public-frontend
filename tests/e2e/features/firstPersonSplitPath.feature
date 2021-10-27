Feature: Test full happy path for first person responses after splitting the qualify questions

  @ALWAYS @FirstPerson
  Scenario: First person happy path with new page split up

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

  @ALWAYS @FirstPerson
  Scenario: Ensure the new qualify pages cannot be accessed without answers

    Given I truncate the database tables
      And I add the "data" data
      And I add the "basic_valid_login" data

    When I navigate to the Juror Portal

    Then I confirm that I am on the Responder Type page
      And I state that I am replying on behalf of myself
      And I submit my Responder Type

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

    # Stay on Qualify landing page
    Then I confirm that I am on the Qualify Landing page
      And I click the Continue button

    # Stay on residency page
    Then I confirm that I am on the Qualify Residency page
      And I navigate directly to the url "/steps/03-qualify/mental-health-sectioned"
      And I confirm that I am on the Qualify Residency page
      And I confirm I have lived in the UK for 5 years
      And I submit my Residency details

    # Qualify - Mental Health Sectioned page
    Then I confirm that I am on the mental health sectioned page
      And I navigate directly to the url "/steps/03-qualify/mental-health-capacity"
      And I confirm that I am on the mental health sectioned page
      And I confirm I have not been sectioned under the mental health act
      Then I submit my mental health sectioned details

    # Qualify - Mental Health Capacity Page
      Then I confirm that I am on the mental health capacity page
      And I navigate directly to the url "/steps/03-qualify/bail"
      And I confirm that I am on the mental health capacity page
      And I confirm I do not lack capacity under the mental health act
      And I submit my mental health capacity details

    # Stay on bail page
    Then I confirm that I am on the Qualify Bail page
      And I navigate directly to the url "/steps/03-qualify/convictions"
      And I confirm that I am on the Qualify Bail page
      And I confirm I am not currently on bail
      And I submit my Bail details

    # Convictions Page as normal
    Then I confirm that I am on the Qualify Convictions page
      And I confirm I have not been convicted of a crime resulting in a prison sentence, community order or suspended prison sentence
      And I submit my Convictions details

    Then I confirm that I am on the Confirm Date page
    When I state that I can do jury service for my availablity
      And I submit my Availablity

    Then I confirm that I am on the CJS page
    When I answer "No" for my CJS
      And I submit my CJS

    Then I confirm that I am on the Assistance page
    When I answer "No" for my Assistance
      And I submit my Assistance

    Then I confirm that I am on the Confirm Information page
    When I tick the Confirm My Information checkbox
      And I submit my information

    Then I confirm that I am on the Confirmation Straight Through page


  @JDB-2752
  Scenario: Ensure eligibility is stored correctly

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
    And  I submit "352004504", "Rivera" and "EC3M 2NY" as my login credentials

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
      And I confirm I have not lived in the UK for 5 years
      And I enter "residency details" as my residency details
      # And I confirm I have lived in the UK for 5 years
      And I submit my Residency details


    # Qualify - Mental Health Sectioned page
    Then I confirm that I am on the mental health sectioned page
      And I confirm I have been sectioned under the mental health act
      And I enter "mental health sectioned details" as my mental health sectioned details
      And I submit my mental health sectioned details


    # Qualify - Mental Health Capacity page
    Then I confirm that I am on the mental health capacity page
      And I confirm I lack capacity under the mental capacity act
      And I enter "mental health capacity details" as my mental health capacity details
      And I submit my mental health capacity details

    # Qualify - Bail Page
    Then I confirm that I am on the Qualify Bail page
      # And I confirm I am not currently on bail
      And I confirm I am currently on bail
      And I enter "bail details" as my bail details
      And I submit my Bail details

    # Qualify - Convictions Page
    Then I confirm that I am on the Qualify Convictions page
      # And I confirm I have not been convicted of a crime resulting in a prison sentence, community order or suspended prison sentence
      And I confirm I have been convicted of a crime resulting in a prison sentence, community order or suspended prison sentence
      And I enter "conviction details" as my conviction details
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
      And I confirm that the mental health sectioned details are "mental health sectioned details"
      And I confirm that the mental health capacity details are "mental health capacity details"
      And I confirm that the bail details are "bail details"
      And I confirm that the conviction details are "conviction details"
    When I tick the Confirm My Information checkbox
      And I submit my information

    # Confirmation Page
    Then I confirm that I am on the Confirmation Straight Through page
