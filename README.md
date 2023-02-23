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