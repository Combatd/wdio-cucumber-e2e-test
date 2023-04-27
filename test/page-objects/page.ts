import chai from "chai";

class Page {
  constructor() {

  }

  /**
   *  All reusable web functions
   */
  navigateTo = async function(path: string) {
    await browser.url(path);
    await browser.maximizeWindow();
  }

  click = async function(ele: WebdriverIO.Element) {
    await ele.waitForClickable({ timeout: 25000 });
    if (!ele.elementId) {
      throw Error(ele.error.message);
    }
    await ele.click();
  }

  typeInto = async function(ele: WebdriverIO.Element, text: string) {
    await ele.waitForDisplayed({ timeout: 25000 });
    if (!ele.elementId) {
      throw Error(ele.error.message);
    }
    await ele.setValue(text);
  }
}

export default Page;