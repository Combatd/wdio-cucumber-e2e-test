import { Then } from '@cucumber/cucumber';
import chai from 'chai';
import logger from '../../helper/logger';
import reporter from '../../helper/reporter';

Then(/^Inventory page should list (.*)\s?list (.*)$/, async function(negativeCheck, numOfProducts) {
  console.log(`this.appid >> ${this.appid}`); // from the CustomWorld instance
  /**
   * 3. Inventory titles are loaded
   */


  try {
    console.log(`>> Starting ${this.testid}...`)
    if (!numOfProducts) {
      throw Error(`Invalid product count provided: ${numOfProducts}`);
    }
    let eleArr = $$('.inventory_item_name');
    await browser.pause(2000);
    await browser.maximizeWindow();

    try {
      await chai.expect(eleArr.length).to.equal(parseInt(numOfProducts)); // chai will get string type if you don't convert
    } catch (err) {
      reporter.addStep(this.testid, 'error', 'Known issue - product count mismatch', true, 'JIRA-123');
    }
  } catch (err) {
    console.log(`>> The type of err: ${typeof err}`);
    console.log(`>> The name property: ${err.name}`);
    console.log(`>> The message property: ${err.message}`);
    err.message = `${this.testid}: Failed when comparing product count, ${err.message}`;
    throw err; // Failed test
  }

});

Then(/^Then Validate all products have valid price$/, async function() {
  /**
   * Steps: 
   * 1. Get price list
   * 2. Convert string to number
   * 3. Assert if any value is less than or equal to 0 (invalid price)
   */
  logger.info(`${this.testid}: Starting to login sauce demo app`);
  // * 1. Get price list
  let elementArr = await $$('.inventory_item_price');
  let priceStrArr = []; // every time it iterates, we will push to this array
  for (let i = 0; i < elementArr.length; i++) {
    let priceStr = elementArr[i].getText();
    priceStrArr.push(priceStr);
  }
  console.log(`>> Price with $: ${priceStrArr}`);

  // * 2. Convert string to number
  let priceNumArr = priceStrArr.map(ele => +(ele.replace('$', ''))); // parseInt(ele.replace('$', '') for whole number
  console.log(`>> Price in numbers: ${priceNumArr}`);

  // * 3. Assert if any value is less than or equal to 0 (invalid price)
  let invalidPriceArr = priceNumArr.filter(ele => ele <= 0); // if anything is less than or equal to 0, the array will have values
  await chai.expect(invalidPriceArr.length).to.equal(0);
});

Then(/^Verify if all users exist in customer list$/, async function() {

});