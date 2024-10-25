const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const serviceAccount = require("../../firebase-service-account.json");
const prodServiceAccount = require("../../firebase-service-account-prod.json");
require("dotenv").config();
const loyaltyEmailsProcessor = require("./emailsProcessor-loyalty");

const testDatabaseURL = "https://cc-tracker-test-default-rtdb.firebaseio.com/";
const prodDatabaseURL = "https://cc-tracker-new-default-rtdb.firebaseio.com/";
const isTest = process.env.REACT_APP_ENV_TEST === "test";

// Initialize Firebase Admin SDK if sending locally or in a non-GCP environment
admin.initializeApp({
  credential: admin.credential.cert(
    isTest ? serviceAccount : prodServiceAccount
  ),
  databaseURL: isTest ? testDatabaseURL : prodDatabaseURL,
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const usersRef = admin.database().ref("/users");
loyaltyEmailsProcessor(usersRef, sgMail, admin);
