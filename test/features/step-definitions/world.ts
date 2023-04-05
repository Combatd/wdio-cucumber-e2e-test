import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from "chai";

class CustomWorld {
  testID: string;
  appid: string;
  
  constructor() {
    this.appid = '';
    this.testID = '';
  }
}

setWorldConstructor(CustomWorld);