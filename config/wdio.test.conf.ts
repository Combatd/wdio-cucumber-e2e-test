import { config as baseConfig } from '../wdio.conf.js';

export const configOld = Object.assign(baseConfig, {
  // All test env specific key value pairs
  environment: "TEST",
  sauceDemoURL: "https://www.saucedemo.com",
  reqresBaseURL: "https://regres.io",
  nopeCommerceBaseURL: "https://admin-demo.nopcommerce.com",
  sqlConfig: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "AdventureWorksDW2019",
    server: "DESKTOP-P5LNVC8",
    options: {
      encrypt: false, // for asure
      trustServerCertificate: false, // change to true for local dev/ self-signed certs
      trustedConnection: true
    }
  }
});

export const config = Object.assign(baseConfig, {
  // All test env specific key value pairs
  environment: "TEST",
  sauceDemoURL: "https://www.saucedemo.com",
  reqresBaseURL: "https://regres.io",
  nopeCommerceBaseURL: "https://admin-demo.nopcommerce.com",
  sqlConfig: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "AdventureWorksDW2019",
    server: "DESKTOP-P5LNVC8",
    options: {
      encrypt: false, // for asure
      trustServerCertificate: false, // change to true for local dev/ self-signed certs
      trustedConnection: true
    }
  }
});