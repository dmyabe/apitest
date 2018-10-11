Feature: Test API 
    As an API tester
    I need to test some API requests
    To assure the correct API behavior


@api_test
Scenario: Load Feature Variables
        Given user stores the following list of variables:
        |"base_url" | "${params.[$.default.base_url]}"  |
        And (custom) user store the current timestamp in variable 'start_date'
        

@api_test @badge
 Scenario: Get a specific badge
        Given (api) user creates a GET request to '${vars.base_url}/badges/name?order=desc&sort=rank&inname=Citizen Patrol&site=stackoverflow'
        And (api) user will send and accept JSON
        When (api) user sends the request
        Then (api) the response status should be '200'
        And (api) the JSON response key '$..name' should have value equals to 'Citizen Patrol'


@api_test @answers
Scenario: Get a specific answer 
        Given (api) user creates a GET request to '${vars.base_url}/answers/2341234?order=desc&sort=activity&site=stackoverflow'
        And (api) user will send and accept JSON
        When (api) user sends the request
        Then (api) the response status should be '200'
        And (api) the JSON response key '$..answer_id' should have value equals to '2341234'


@api_test @questions
Scenario: Get forbidden response when no access token is provided
        Given (api) user creates a POST request to '${vars.base_url}/questions/add'
        And (api) user will send and accept JSON
        And (api) user add the request BODY from the resource 'test/templates/questions.json'
        And (api) user fills '$.title' with 'An other example post title'
        And (api) user fills '$.body' with 'An other example post body'
        When (api) user sends the request
        Then (api) the response status should be '400'
        And (api) the JSON response key '$.error_name' should have value equals to 'bad_parameter'


@api_test @users
Scenario: Get error when ID is set with alphanumeric      
        Given (api) user creates a GET request to '${vars.base_url}/users/8fg978/questions/no-answers?order=desc&sort=activity&site=stackoverflow'
        And (api) user will send and accept JSON
        When (api) user sends the request
        Then (api) the response status should be '400'
        And (api) the JSON response key '$.error_message' should have value equals to 'no method found with this name'


@api_test @posts
Scenario Outline: Get posts by ID
        Given (api) user creates a GET request to '${vars.base_url}/posts/<id_post>?order=desc&sort=activity&site=stackoverflow'
        And (api) user will send and accept JSON
        When (api) user sends the request
        Then (api) the response status should be '200'
        And (api) the JSON response key '$..post_id' should have value equals to '<id_post>'
        
        Examples:
        |id_post  |
        |12       |
        |25       |
        |27       |