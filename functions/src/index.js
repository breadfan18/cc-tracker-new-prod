const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const cardEmailsProcessor = require("./emailsProcessor-cards");
const loyaltyEmailsProcessor = require("./emailsProcessor-loyalty");

admin.initializeApp();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Reference to your data location
const ref = admin.database().ref("/users");

// Retrieve data once
exports.sendCardReminderEmails = functions.pubsub
  .schedule("40 14 * * *")
  .onRun(async (context) => {
    return cardEmailsProcessor(ref, sgMail, admin);
  });

exports.sendLoyaltyReminderEmails = functions.pubsub
  .schedule("40 20 * * *")
  .onRun(async (context) => {
    return loyaltyEmailsProcessor(ref, sgMail, admin);
  });
