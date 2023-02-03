import { Then } from '@cucumber/cucumber';
import chai from 'chai';

Then(/^Inventory page should list (.*)$/, async function(numOfProducts) {
  if (!numOfProducts) throw Error(`Invalid number provided: ${numOfProducts}`)

  /**
   * 3. Inventory titles are loaded
   */
  let eleArr = $$('.inventory_item_name');
  await browser.pause(2000);
  await browser.maximizeWindow();
  await chai.expect(eleArr.length).to.equal(parseInt(numOfProducts)); // chai will get string type if you don't convert

});