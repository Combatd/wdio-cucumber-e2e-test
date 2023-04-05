import { Given } from '@cucumber/cucumber';
import chai from 'chai';

Given(/^As (a|an) (.*) user I login to inventory web app$/, async function(prefixText, userType, dataTable) {
  // Get the testid
  console.log(`>> Starting ${this.testid}`);
  console.log(`>> Given step Test ID: ${this.testid}`);


  // Getting values from data table
  let dt = dataTable.hashes();
  console.log(`>> The type of dt: ${dt.constructor}`);
  console.log(`>> The value of dt: ${JSON.stringify(dt)}`);

  /**
   * 1. Launch browser
   */
  // await browser.url('https://saucedemo.com');
  // @ts-ignore
  await browser.url(browser.config.sauceDemoURL);
  console.log (`>> Test config values: ${JSON.stringify(browser.config)}`);
  
  // await browser.setTimeout( { implicit: 15000, pageLoad: 10000 } )
  // await browser.maximizeWindow();


  /**
   * 2. Login to inventory app
   */
  try {
    // await $('#user-name').setValue(process.env.TEST_STD_USERNAME);
    await $('#user-name').setValue(dt[0].Username);
    await $('#password').setValue(process.env.TEST_STD_PASSWORD); // in actual projects, use environment variables
    await $('#login-button').click();
  } catch (err) {
    console.log('Error in first login, Retrying...');
    await browser.refresh();
    await browser.pause(2000);
    await $('#user-name').setValue('standard_user');
    await $('#password').setValue('secret_sauce'); // in actual projects, use environment variables
    await $('#login-button').click();
  }

  /**
   * Login with another user
   */
  // await browser.pause(2000);
  // await browser.reloadSession();
  // await browser.url('https://saucedemo.com');
  // await $('#user-name').setValue('problem_user');
  // await $('#password').setValue('secret_sauce'); // in actual projects, use environment variables
  // await $('#login-button').click();

  // await browser.back(); // go back in the browser history one step to the inventory page
  // await browser.pause(2000);
  // await browser.forward();
  // await browser.debug();

  // this = CustomWorld instance
  this.appid = 'ABC123';
});