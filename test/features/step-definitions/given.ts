import { Given } from '@cucumber/cucumber';
import chai from 'chai';
import reporter from '../../helper/reporter.js';
import sauceHomePage from '../../page-objects/sauce.home.page';
import constants from '../../../data/constants.json' assert {type: 'json'}
import apiHelper from '../../helper/apiHelper.js';
import fs from 'fs';


Given(/^As (a|an) (.*) user I login to inventory web app$/, async function(prefixText, userType, dataTable) {
  reporter.addStep(this.testid, 'info',`Starting to login sauce demo app`);

  // Get the testid
  // console.log(`>> Starting ${this.testid}`);
  // console.log(`>> Given step Test ID: ${this.testid}`);


  // Getting values from data table
  let dt = dataTable.hashes();
  // console.log(`>> The type of dt: ${dt.constructor}`);
  // console.log(`>> The value of dt: ${JSON.stringify(dt)}`);

  /**
   * 1. Launch browser
   */
  // await browser.url('https://saucedemo.com');
  // @ts-ignore
  // await browser.url(browser.config.sauceDemoURL);
  // console.log (`>> Test config values: ${JSON.stringify(browser.config)}`);
  
  // await browser.setTimeout( { implicit: 15000, pageLoad: 10000 } )
  // await browser.maximizeWindow();


  /**
   * 2. Login to inventory app
   */
  try {
    // @ts-ignore
    await sauceHomePage.navigateTo(browser.config.sauceDemoURL);
    await sauceHomePage.loginToSauceApp(this.testid, process.env.TEST_STD_USERNAME, process.env.TEST_STD_PASSWORD);

    // await $('#user-name').setValue(process.env.TEST_STD_USERNAME);
    // await $('#user-name').setValue(dt[0].Username);
    // await $('#password').setValue(process.env.TEST_STD_PASSWORD); // in actual projects, use environment variables
    // await $('#login-button').click();
  } catch (err) {
      err.message = `Failed at login step, ${err.message}`;
      throw err;

    // console.log('Error in first login, Retrying...');
    // await browser.refresh();
    // await browser.pause(2000);
    // await $('#user-name').setValue('standard_user');
    // await $('#password').setValue('secret_sauce'); // in actual projects, use environment variables
    // await $('#login-button').click();
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
  // this.appid = 'ABC123';

  // reporter.addStep(this.testid, 'debug', 'login is successful');
});


/**
 * Get list of users from reqres api
 * Sub-steps:
 * 1. Get payload data
 * 2. Make get call by using API helper
 * 3. Store results
 */
Given(/^Get list of (.*) from regres.in$/, async function(endpointRef) {
  if (!endpointRef) throw Error(`Given endpoint ref: ${endpointRef} is not valid`);

  try {
    let endpoint = '';
    /**1. Get payload data*/
    reporter.addStep(this.testid, "info", `Getting the payload data endpoint: ${endpointRef}`);
    if (endpointRef.trim().toUpperCase() === "USERS") {
      endpoint = constants.REQRES.GET_USERS;
    }
  
    /** 2. Make get call by using API helper */
    let res;
    await browser.call(async function() {
      // @ts-ignore
      res = apiHelper.GET(this.testid, browser.config.reqresBaseURL, endpoint, "", constants.REQRES.QUERY_PARAM);
    });
    // @ts-ignore
    if (res.status !== 200) await chai.expect.fail(`Failed getting users from ${browser.config.reqresBaseURL}/${endpoint}`);
    let data = JSON.stringify(res.body);
    let filename = `${process.cwd()}/data/api-rest/reqresAPIUsers.json`;
    fs.writeFileSync(filename, data);
    reporter.addStep(this.testid, "info", `API response from ${endpoint} stored in json file`);
  } catch (err) {
    err.message = `${this.testid}: Failed at getting API users from reqres, ${err.message}`;
    throw err;
  }

});