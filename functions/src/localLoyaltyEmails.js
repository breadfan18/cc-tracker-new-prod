const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const serviceAccount = require("../../firebase-service-account.json");
const prodServiceAccount = require("../../firebase-service-account-prod.json");
require("dotenv").config();
const _ = require("lodash");
const {
  loyaltyEmailVerifier,
  convertDateToLocaleString,
  LOYALTY_REMINDER_TEMPLATE_ID,
} = require("./function-helpers");

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

// Reference to your data location
const ref = admin.database().ref("/users");

// Retrieve data once
ref.once("value").then(async (snapshot) => {
  const allAccountsData = snapshot.val();

  for (const onlineAccountKey in allAccountsData) {
    const userData = allAccountsData[onlineAccountKey];
    const loyaltyData = userData.loyaltyData;

    const primaryUser = _.values(userData.cardHolders).find(
      (holder) => holder.isPrimary
    );

    let emailCount = 0;

    if (loyaltyData) {
      for (const loyaltyAccount of _.values(loyaltyData)) {
        const { accountHolder, rewardsBalance, rewardsExpiration, program } =
          loyaltyAccount;
        const { name, img } = program;
        const accountHasBalance = rewardsBalance && rewardsBalance !== "0";

        if (accountHasBalance && rewardsExpiration !== undefined) {
          const { shouldSendLoyaltyReminderEmail, daysTillRewardsExpiration } =
            loyaltyEmailVerifier(rewardsExpiration);

          if (shouldSendLoyaltyReminderEmail) {
            const msg = {
              from: "cctrackerapp@gmail.com",
              templateId: LOYALTY_REMINDER_TEMPLATE_ID,
              personalizations: [
                {
                  to: primaryUser.email,
                  dynamic_template_data: {
                    accountHolder,
                    primaryUser: primaryUser.name,
                    loyaltyAccountName: name,
                    loyaltyAccountImg: img,
                    rewardsExpirationDate:
                      convertDateToLocaleString(rewardsExpiration),
                    daysTillRewardsExpiration,
                  },
                },
              ],
            };

            try {
              await sgMail.send(msg);
              console.log(
                `Rewards expiration email for ${accountHolder} sent successfully`
              );
              emailCount++;
            } catch (error) {
              console.error("Error sending email:", error);
            }
          }
        }
      }
    }

    console.log(`LOYALTY - Sent ${emailCount} emails for ${primaryUser.name}`);
  }
});
