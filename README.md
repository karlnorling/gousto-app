# Requirements

## Backend API Technical Challenge
We'd like to get to know you better, so we've prepared a technical task that will tell us more about you. You can find more information about it below.

If you have any questions or you don't fully understand something, do not hesitate to ask us for clarification. Also, we are always looking to improve our technical test so feel free to send us any feedback on the exercise.

## Scenario
Gousto’s technical infrastructure includes an API Gateway that offers a number of operations related to recipes. The recipes are very detailed, containing information such as cuisine, customer ratings & comments, stock levels and diet types.

Your task is to design, develop and deliver to us your version of a set of recipe operations. The solution should meet our functional and nonfunctional requirements below.

## Functional Requirements

### Use Case 1
As an API client I want to see a recipe's details Given​ that I am an API client
  - When​ I fetch a recipe by ID
  - Then​ I can see recipe fields

### Use Case 2
As an API client I want to see a paginated list of recipes by cuisine Given​ that I am an API client
  - When​ I fetch a recipe by cuisine
  - Then​ I can see a list of recipes
  - And​ the list is split into paginated results with 10 recipes per page
  - And​ each recipe has to contain only the fields ID, title and description

### Use Case 3
As an API client I want to update one or more recipe's fields
  - Given​ that I am an API client
  - When​ I update one or more recipes fields
  - Then​ I can see the updated recipe fields

### No-Functional Requirements
  - The service should provide a set of ​RESTful​ JSON based routes API and you should not include any client code as HTML or JavaScript;
  - The service must be built using a modern web application framework like ​Lumen,​ ​Ruby on Rails​, ​Django,​ etc;
  - The code should be "production ready" - that means:
    - it should run;
    - satisfy the requirements (functional and non-functional);
    - be stable;
    - be readable;
    - be maintainable;
    - and have ​automated tests​ (preferable following ​TDD)​ ;
  - The service should use the accompanying CSV (in the zip you downloaded) as the
  primary data source, which can be loaded into memory;
    - Please don't use a database, though SQLite would be acceptable;
    - If it helps feel free to generate additional test data based on the scheme;
  - In order to understand your solution, we would like to see the following sections in the Readme:
    - How to use: details on how to use your solution (how to configure the local environment, how to run tests and how to run the local server);
    - A list of missing functional requirements (if any), and an explanation on why you didn't complete them;
    - Possible improvements/functionality: anything that you wish you could've added if you had more time;
    - Anything else you think is relevant to your solution.
  - Your completed exercise should be submitted via public ​Git Repository(​ ​Github​/
bitbucket/​ ​GitLab/​ etc);

# Solution

I've choosen to implement the soulution in the KOA framework.
I will be writing the code in TypeScript.
Test will be made and responses mocked.

## Data model
This is the attributes of the data in the CSV.
  - recipe
    - id
    - created_at
    - updated_at
    - box_type
    - title
    - slug
    - short_title
    - marketing_description
    - calories_kcal
    - protein_grams
    - fat_grams
    - carbs_grams
    - bulletpoint1
    - bulletpoint2
    - bulletpoint3
    - recipe_diet_type_id
    - season
    - base
    - protein_source
    - preparation_time_minutes
    - shelf_life_days
    - equipment_needed
    - origin_country
    - recipe_cuisine
    - in_your_box
    - gousto_reference

## Domain model
We take those properties from the data model and transform them to a domain model.
This model will be used in the response from the API.

  - recipe
    - id
    - meta
      - created_at
      - updated_at
      - gousto_reference
    - box_type
    - title
    - slug
    - short_title
    - marketing_description
    - bullets[]
    - recipe_diet_type
    - season
    - recipe_cuisine
    - nutrition
      - calories_kcal
      - protein_grams
      - fat_grams
      - carbs_grams
      - origin_country
    - ingredients
      - in_your_box
      - protein_source
      - base
    - cooking
      - preparation_time_minutes
      - shelf_life_days
      - equipment_needed

## REST API
To satisfy the requirements for the API we need a couple of endpoints.

Recipes
```
/recipes - list all recipes
/recipes/:id - get recipe based on recipe id
```

Cuisines
```
/cuisines - list all types of cuisines
/cuisines/:type - get cuisine based on cuisine type
```