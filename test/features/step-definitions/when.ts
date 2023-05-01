import { When } from "@wdio/cucumber-framework";
import chai from 'chai';
import reporter from "../../helper/reporter";
import nopcommerceHomepage from '../../page-objects/nopcommerce.home.page';

When(/^As an (.*) user login to nopcommerce site$/, async function(user) {
  if (!user) throw Error(`Given user: ${user} is not valid`);
  user = user.trim().toUppercase();

  try {
    reporter.addStep(this.testid, "info", "Login to nopcommerce demo site...");
    await nopcommerceHomepage.loginTonopCommerceWeb(
      this.testid,
      // @ts-ignore
      browser.config.nopCommerceBaseURL,
      process.env[`TEST_NOP_${user}_USERNAME`],
      process.env[`TEST_NOP_${user}_PASSWORD`]
    )
  } catch (err) {
    
  }
});

When(/^Search users in customer list$/, async function(user) {

});

// assert { type: "json" };