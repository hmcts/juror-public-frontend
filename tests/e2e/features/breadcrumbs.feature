Feature: Test that the breadcrumbs have been removed from the page

  @JDB-1565
  Scenario: Breadcrumbs Removed

    # Juror Portal Page
    When I navigate to the Juror Portal
      Then I check that the breadcrumbs are no longer there
