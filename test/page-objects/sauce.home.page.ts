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
  enterUsername = async function(testid: string, username: string) {
    if (!username) throw Error(`Given username: ${username} is not valid`);

    try {
      username = username.trim();
      await this.typeInto(await this.usernameInputBox, username);
      reporter.addStep(testid, 'info', `${username} entered sccessfuly`);
    } catch (err) {
      err.message = `Error entering username: ${username}, ${err.message}`;
      throw err;
    }

  }

  enterPassword = async function(testid: string, password: string) {
    if (!password) throw Error(`Given username is not valid`);

    try {
      password = password.trim();
      await this.typeInto(await this.usernameInputBox, password);
      reporter.addStep(testid, 'info', `password entered sccessfuly`);
    } catch (err) {
      err.message = `Error entering password, ${err.message}`;
      throw err;
    }

  }

  clickLoginBtn = async function(testid: string) {
    try {
      await this.click(await this.loginBtn);
      reporter.addStep(testid, 'info', `login button clicked`);
    } catch (err) {
      err.message = `Error clicking login button, ${err.message}`;
      throw err;
    }

  }

  loginToSauceApp = async function(testid: string, username: string, password: string) {
    try {
      await this.enterUsername(testid, username);
      await this.enterPassword(testid, password);
      await this.clickLoginBtn(testid);
    } catch (err) {
      throw err;
    }
  }


}

export default new HomePage();