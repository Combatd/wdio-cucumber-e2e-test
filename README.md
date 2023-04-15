# End to End Test Automation with WebDriver IO
Much of the configurations will be done in the ```wdio.conf.ts``` file.

## Directory
* config
* data
* debug
* logs
* results
* test
  * features
    * demo
    * step-definitions
  * helper
  * page-objects

## Hidden Files
* .env
* .env.example

## Test Plan Format

```
Feature: Feature name

    Feature Description
    Scenario Outline: Scenario Outline name
      Given Start to type your Given step here
      When Start to type your When step here
      Then Start to type your Then step here

    Examples:
        | Header 1 | Header 2 | Header 3 |
        | Value 1  | Value 2  | Value 3  |
```

## Scenario, Steps and Background
1. Steps:
  * Given - Precondition
  * When - Event or action
  * Then - Results
  * And, But and * can be used
  * Same step with different step keywords are considered as 'duplicate'
2. Scenario used to describe a specific scenario
3. Background is sued to perform certain steps repeatedly for all scenarios
4. Only one background is allowed in a single feature file

## Merge different environment configuration files
1. Create different environment files (e.g. test, uat, preprod)
2. Merge with wdio conf file (using ```Object.assign```)
3. Update ```package.json``` file with new conf path
4. Access the property with ```browser.config.<key>```, update and run test

## World Object
1. Create a ```world.ts``` file under ```step-definitions```
2. Import ```setWordConstructor``` from cucumber
3. Create ```CustomWorld``` class and set it as an argument to ```setWorldConstructor```

* The values are accessible only per scenario/iteration and values are reset at every new scenario/iteration

### this.testid
* Follow this convention when writing scenario or scenario outline:
  * ```<TestID>: <Description of scenario>```

## Set up logger winston
1. ``` npm install --save-dev winston```
2. Create logger file under /helper directory
3. Set log level in ```process.env``` as 'debug'
4. Import logger in different files and start using it

## Allure Reporter
* ```npm install -g allure-commandline```
* Issue this command: ```which/where allure``` should return the install path
* Set these two flags
  1. ```disableWebdriverStepsReporting: true```
  1. ```useCucumberStepReporter: true```

### Tips, Issues, and challenges
1. You can see allure options in ```node_modules``` folder
2. In office network, you may need to turn-off proxy setting before running allure

## Exception Handling
* An exception is a condition that interrupts/stops normal code execution.
  * Standard JavaScript errors: ReferenceError, SyntaxError, TypeError
  * Custom Error (using throw Error functional call)
  * Chai Assertion failure
* There are two main causes for execution failure
  * Error prone test code
  * Application bug
* You can use ```try/catch``` or other conditional branching to catch exceptions