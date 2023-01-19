import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from 'chai';

Given(/^Google page is opened$/, async function() {
  console.log('Before opening browser...');
  await browser.url('https://www.google.com');
  await browser.pause(1000);
  console.log('After opening browser...');
});

When(/^Search with (.*)$/, async function(searchItem) {
  console.log(`>> searchItem ${searchItem}`);
  let ele = await $(`[name=q]`);
  await ele.setValue(searchItem);
  await browser.keys('Enter');
});

Then(/^Click on the first search result$/, async function() {
  let ele = await $('<h3>');
  await ele.click();
});

Then(/^URL should match (.*)$/, async function(expectedURL) {
  console.log(`>> expectedURL: ${expectedURL}`);
  let url = await browser.getUrl();
  await chai.expect(url).to.equal(expectedURL);
}); 

/**
 * Web Interactions
 */

Given(/^A web page is opened$/, async function() {
  await browser.url('https://google.com');
  await browser.setTimeout({implicit: 15000, pageLoad: 15000});
  await browser.maximizeWindow();
});

When(/^Perform web interactions$/, async function() {
  /**
   * 1. Input Box
   * Actions:
   * 1. Type into input box
   * 2. Clear the field or just addvalue
   * 3. Click and type
   * 4. Slow typing
   */
  let num = 12345;
  let strNum = num.toString();

  let ele = await $(`[name=q]`);
  ele.setValue('Las Vegas Hotel'); // #setValue clears the input before putting a value
  await browser.pause(3000);
  await browser.keys('Enter');
  await browser.pause(5000);

  await browser.url('https://www.google.com/');
  ele.clearValue();
  ele.addValue(strNum);
  browser.pause(3000);
  await browser.keys('Enter');
  await browser.pause(1500);
  await chai.expect(await browser.getUrl()).to.contain('google');

  let ddEle = await $('[aria-label="Google apps"]');
  // await ddEle.selectByAttribute('value', '1');
  await ddEle.click();
  browser.pause(3000);
});