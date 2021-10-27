Feature: Age Ineligible

   Scenarios specific to a juror who is age Ineligable, this userflow allows certain pages to be skipped and therefore not sent to the API

  @ALWAYS @FirstPerson @JDB-1937 @bug @PhoneNumberFormat
  Scenario Outline: As a juror responding on behalf of myself I wish to inform the Bureau that I am <years> old
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
    And I enter "+123 456 789" as my Main Phone Number
    And I enter "+987 654 321" as My Secondary Phone Number
    Then I submit my phone details
 
    # Your Details Email Page
    Then I confirm that I am on the Your Details Email page
    When I enter "test@test.co.uk" as my Email Address
    When I enter "test@test.co.uk" as my Confirmation Email Address
    Then I submit my email details

    # Your Details DOB Page
    Then I confirm that I am on the Your Details DOB page
    When I enter a date of birth which makes me "<years>" years old
    Then I submit my DOB details

    # Confirm date of birth
    Then I confirm that I am on the Confirm Date of Birth page
    When I confirm the date of birth

    # Confirm Information Page
    Then I confirm that I am on the Confirm Information page
    When I tick the Confirm My Information checkbox
      And I submit my information

    # Confirmation Page
    Then I confirm that I am on the Confirmation Age Disqualified page

    Examples:
    | years |
    | 78    |
    #| 14    |

  # @ALWAYS @FirstPerson @JDB-1500 @bug
  # Scenario Outline: As a juror responding on behalf of myself I wish to inform the Bureau that I am <years> old when a custom age range applies
  #   # DB Steps
  #   Given I truncate the database tables
  #   And I add the "data" data
  #   And I add the "basic_valid_login" data
  #   And I add the "custom_age_range" data

  #   # Juror Portal Page
  #   When I navigate to the Juror Portal
  #   And I click the Start Now button

  #   # Responder Type Page
  #   Then I confirm that I am on the Responder Type page
  #   And I state that I am replying on behalf of myself
  #   And I submit my Responder Type

  #   # Login Page
  #   Then I confirm that I am on the Login page
  #   And I submit "352004504", "Rivera" and "EC3M 2NY" as my login credentials

  #   # Your Details Page
  #   Then I confirm that I am on the Your Details page
  #   When I enter a date of birth which makes me "<years>" years old
  #   And I enter "11111111111" as my Main Phone Number
  #   And I enter "00000000000" as My Secondary Phone Number
  #   And I enter "email@email.com" as my Email Address
  #   And I enter "email@email.com" as my Confirmation Email Address
  #   And I submit my details

  #   # Confirm date of birth
  #   Then I confirm that I am on the Confirm Date of Birth page
  #   When I confirm the date of birth

  #   # Confirm Information Page
  #   Then I confirm that I am on the Confirm Information page
  #   When I tick the Confirm My Information checkbox
  #   And I submit my information

  #   # Confirmation Page
  #   Then I confirm that I am on the Confirmation Age Disqualified page

  #   Examples:
  #     | years |
  #     | 61    |
  #     | 24    |


  @ALWAYS @ThirdParty @JDB-1937 @bug
  Scenario Outline: As a person responding on behalf of a juror I wish to inform the Bureau that I am <years> old

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

    # 3rd Party Your Contact Details
    Then I confirm that I am on the 3rd Party Details Contact page
      And I toggle my contact preference for phone
      And I enter "+123 456 789" as my main phone number
      And I enter "+987 654 321" as my other phone number
      And I toggle my contact preference for email
      And I enter "john.doe@email.com" as my email address
      And I enter "john.doe@email.com" as my confirmed email address
      And I submit my 3rd Party Contact Details

    # 3rd Party Reason
    Then I confirm that I am on the 3rd Party Reason page
      And I state that the person is unable to reply by themself
      And I submit my 3rd Party Reason

    # 3rd Party Personal Name
    Then I confirm that I am on the 3rd Party Personal Name page
    Then I confirm that the juror's name is correct
      And I submit my 3rd Party Personal Name Details

    # 3rd Party Personal Address
    Then I confirm that I am on the 3rd Party Personal Address page
    Then I confirm that the juror's address is correct
      And I submit my 3rd Party Personal Address Details

    # 3rd Party DOB 
    Then I confirm that I am on the 3rd Party Personal DOB page
      And I enter a date of birth which makes the juror "<years>" years old
      And I submit my 3rd Party Personal DOB Details

    # Confirm date of birth
    Then I confirm that I am on the Confirm Date of Birth page
      And I confirm the date of birth

    # Confirm Information Page
    Then I confirm that I am on the Confirm Information page
    When I tick the Confirm My Information checkbox
      And I submit my information

    # Confirmation Page
    Then I confirm that I am on the Confirmation Age Disqualified page

    Examples:
    | years |
    | 78    |
    | 14    |
