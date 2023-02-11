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
  await browser.url('/');
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

  /**
   * 3. Checkbox
   * Actions:
   * 1. Select an option
   * 2. Unselect an option (if selected)
   * 3. Assert if option is selected
   * 4.Select all options
   * 
   */
  // let checkboxEle = await $('//form[@id="checkboxes]/input[1]') // you can right click and copy xpath when inspecting
  
  // let isChecked = await checkboxEle.isSelected();
  // await chai.expect(isChecked).to.be.true;
  // // if (!await checkboxEle.isSelected()) {
  // //   await checkboxEle.click();
  // // }

  // let checkboxesEle = await $('//form[@id="checkboxes]/input') // you can right click and copy xpath when inspecting
  // for (let i = 0; i < checkboxesEle.length; i++) {
  //   let ele = checkboxesEle[i];
  //   if (await ele.isSelected()) {
  //     await ele.click();
  //   }
  // }

  /**
   * 4. Window handling
   * Actions:
   * 1. getTitle()
   * 2. getWindowHandle()
   * 3. getWindowHandles()
   * 4. switchToWindow()
   */

  // await $('=Click Here').click(); // link text
  // await $('=Elemental Selenium').click();
  // let currentWinTitle = await browser.getTitle();
  // let parentWinHandle = await browser.getWindowHandle();
  // console.log('>> currentWinTitle: ' + currentWinTitle);


  // // Switch to specific window
  // let winHandles = await browser.getWindowHandles();
  // for (let i = 0; i < winHandles.length; i++) {
  //   console.log(`>> winHandle: ${winHandles[i]}`); // print out the new window title
  //   await browser.switchToWindow(winHandles[i]); // will switch to the new window
  //   if (currentWinTitle === "Elemental Selenium: Receive a Free, Weekly Tip on Using Selenium like a Pro") {
  //     await browser.switchToWindow(winHandles[i]);
  //     let headerTxtEleSel = await $('<h1>');
  //     console.log(`headerTxtEleSel: ${headerTxtEleSel}`);

  //     // Rest of the actions go here
  //     break;
  //   }
  // }

  // // Switch back to parent window
  // await browser.switchToWindow(parentWinHandle);
  // let parentWinHeaderText = await $('<h1>').getText();
  // console.log(`>> parentWinHeaderText: ${parentWinHeaderText}`);
  // // Continue with the rest of the execution

  /**
   * 4. Handling alerts
   * 
   * Methods used:
   * 1. isAlertOpen()
   * 2. acceptAlert()
   * 3. dismissAlert()
   * 4. getAlertText()
   * 5. sendAlertText()
   */

  // await $('button=Click for JS Alert').click();
  // if (await browser.isAlertOpen()) {
  //   let alertText = await browser.getAlertText();
  //   console.log(alertText);
  //   // await browser.dismissAlert();
  //   await browser.acceptAlert();
  //   await browser.pause(2000);

  // }

  /**
   * 5. File upload
   */
  // await $('#file-upload').setValue('dd');
  // await $('#file-upload').addValue('../../../data/fileupload/dummy.txt'); // The relative path here will not work!
  // await $('#file-upload').addValue(`${process.cwd()}/data/fileupload/dummy.txt`); // Use absolute path for file upload

  // await $('#file-submit').click();

  /**
   * 6. Frames
   * Methods used
   * 1. switchToFrame
   * 2. switchtoParentFrame
   */  
  
  // await $('=iFrame').click();
  // let frameEle = await $('#mce_0)str');
  // await browser.switchToFrame(frameEle);
  // // Interactions with frames...
  // await $('#tinymce').setValue('Typing into a frame...'); // Set value of the text, override existing
  // await $('#tinymce').addValue('Typing into a frame...'); // Add value to existing text
  // await browser.switchToParentFrame();

  /**
   * 6a. Key press
   * Methods used:
   * 1. switchToFrame
   * 2. switchtoParentFrame
   */

  // await $('=iFrame').click();
  // let frameEle = await $('#mce_0)str');
  // await browser.switchToFrame(frameEle);
  // // Interactions with frames...
  // await $('#tinymce').click(); // we want to click the field before our input comes
  // await browser.keys(['meta', "A"]);
  // await browser.pause(2000);
  // await browser.keys('delete');
  // await $('#tinymce').addValue('Typing into a frame...'); // Add value to existing text
  // await browser.switchToParentFrame();

  /**
   * 7. Basic scrolling
   * Methods: (Element methods)
   * 1. scrollIntoView
   */

  //await $('span=Best Sellers in Books').scrollIntoView();


/**
 *  Web table:
 * 1. Check number of rows and columns
 * 2. Get whole table data
 * 3. Get single row (based on a condition)
 * 4. Get single column
 * 5. Get single cell value (based on another cell)
 * 
 * 
 */


  // * 1. Check number of rows and columns
  let rowCount = await $$('//table[@id="table1"/tbody/tr').length;
  await chai.expect(rowCount).to.equal(4);
  console.log('>> Number of rows: ' + rowCount);
  let columnCount = await $$('//table[@id="table1"/thead/tr/th').length;
    console.log('>> Number of column: ' + columnCount);
  await chai.expect(columnCount).to.equal(6);

  // * 2. Get whole table data
  // //table[@id="table1"/tbody/tr[2]/td[4] x-path example
  let arr = [];
  for (let i = 0; i < rowCount; i++) {
    let personObj = {
      lastName: '',
      firstName: '',
      email: '',
      due: '',
      web: ''
    }
    for (let j = 0; j < columnCount; j++) {
      let cellVal = await $(`//table[@id="table1"/tbody/tr[${i}}]/td[${j}]`).getText();
      if (j === 0) {
        personObj.lastName = cellVal;
      }
      if (j === 1) {
        personObj.firstName = cellVal;
      }
      if (j === 2) {
        personObj.email = cellVal;
      }
      if (j === 3) {
        personObj.due = cellVal;
      }
      if (j === 4) {
        personObj.web = cellVal;
      }
    }
    arr.push(personObj);
  }
  console.log(`Whole Table: ${JSON.stringify(arr)}`);

  // * 3. Get single row (based on a condition)

  // * 4. Get single column

  // * 5. Get single cell value (based on another cell)

  await browser.debug();

});