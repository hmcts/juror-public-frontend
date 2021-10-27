Feature: Your Details Pages

   Test for individual Your Details Pages - Name / Address / DOB

  @ALWAYS @gds @yourdetailspages
  Scenario: As a juror responding on behalf of myself I wish to inform the Bureau that I am <years> old
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
    When I enter "07744728746" as my Main Phone Number
    Then I submit my phone details
 
    # Your Details Email Page
    Then I confirm that I am on the Your Details Email page
    When I enter "test@test.co.uk" as my Email Address
    When I enter "test@test.co.uk" as my Confirmation Email Address
    Then I submit my email details

    # Your Details DOB Page
    Then I confirm that I am on the Your Details DOB page
    When I enter 01/08/1980 as my Date of Birth
    Then I submit my DOB details