import { Given, When, Then } from "@wdio/cucumber-framework";

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
  ele.click();
});