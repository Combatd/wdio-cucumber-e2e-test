import Page from './page';
import chai from 'chai';
import reporter from '../helper/reporter';

class HomePage extends Page {
  constructor() {
    super();
  }
  
  /**Page Objects */
  get usernameInputBox() { return $('#user-name') }
  get passwordInputBox() { return $('#password') }
  get loginInputBox() { return $('#login-button') }

  /**Page Actions */
  

  loginTonopCommerceWeb = async function(testid: string, url: string, username: string, password: string) {
    try {
      reporter.addStep(testid, "info", `Login to: ${url} with ${username}`)
      await this.enterUsername(testid, username);
      await this.enterPassword(testid, password);
      await this.clickLoginBtn(testid);
    } catch (err) {
      err.message = `Failed login to nopcommerce web: ${url}, with username ${username}`;
      throw err;
    }
  }


}

export default new HomePage();