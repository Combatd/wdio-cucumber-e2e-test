import { Then } from '@cucumber/cucumber';
import chai from 'chai';

Then(/^Inventory page should list (.*)\s?list (.*)$/, async function(negativeCheck, numOfProducts) {
  if (!numOfProducts) throw Error(`Invalid number provided: ${numOfProducts}`)

  /**
   * 3. Inventory titles are loaded
   */
  let eleArr = $$('.inventory_item_name');
  await browser.pause(2000);
  await browser.maximizeWindow();
  await chai.expect(eleArr.length).to.equal(parseInt(numOfProducts)); // chai will get string type if you don't convert

});

Then(/^Then Validate all products have valid price$/, async function() {
  /**
   * Steps: 
   * 1. Get price list
   * 2. Convert string to number
   * 3. Assert if any value is less than or equal to 0 (invalid price)
   */

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