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

}

export default new HomePage();