import { Given } from '@cucumber/cucumber';
import chai from 'chai';

Given(/^Login to inventory web app$/, async function() {
  /**
   * 1. Launch browser
   */
  await browser.url('https://saucedemo.com');
  await browser.setTimeout( { implicit: 15000, pageLoad: 10000 } )
  // await browser.maximizeWindow();


  /**
   * 2. Login to inventory app
   */
  await $('#user-name').setValue('standard_user');
  await $('#password').setValue('secret_sauce'); // in actual projects, use environment variables
  await $('#login-button').click();
});