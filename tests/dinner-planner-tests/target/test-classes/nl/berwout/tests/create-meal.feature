Feature: Add meals

  Scenario: Creating a meal by clicking ingredients and adding ourselves.
    Given We are on the add meals form
    When I add ingredients by clicking and writing
    And I submit the form
    Then We should have successfully added a new meal
