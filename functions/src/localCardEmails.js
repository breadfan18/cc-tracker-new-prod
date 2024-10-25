const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const serviceAccount = require("../../firebase-service-account.json");
const prodServiceAccount = require("../../firebase-service-account-prod.json");
require("dotenv").config();
const _ = require("lodash");
const {
  annualFeeEmailVerifier,
  spendByEmailVerifier,
  convertDateToLocaleString,
} = require("./function-helpers");
const uid = require("uid");

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

const createNotificationsRef = (notificationId, onlineAccountKey) => {
  return admin
    .database()
    .ref(`/users/${onlineAccountKey}/notifications/${notificationId}`);
};

// Retrieve data once
ref.once("value").then(async (snapshot) => {
  const allAccountsData = snapshot.val();

  for (const onlineAccountKey in allAccountsData) {
    const userData = allAccountsData[onlineAccountKey];
    const cards = userData.cards;
    const primaryUser = _.values(userData.cardHolders).find(
      (holder) => holder.isPrimary
    );

    let emailCount = 0;

    if (cards) {
      for (const card of _.values(cards)) {
        const {
          annualFee,
          nextFeeDate,
          status,
          cardholder,
          bonusEarned,
          spendBy,
          issuer,
        } = card;

        const cardHasAnnualFee =
          status === "open" && annualFee && annualFee !== "0";

        const cardHasBonusToEarn = status === "open" && !bonusEarned;

        if (cardHasAnnualFee) {
          const {
            shouldSendAnnualFeeEmail,
            daysTillAnnualFee,
            annualFeeTemplateToUse,
          } = annualFeeEmailVerifier(nextFeeDate);

          if (shouldSendAnnualFeeEmail) {
            const msg = {
              from: "cctrackerapp@gmail.com",
              templateId: annualFeeTemplateToUse,
              personalizations: [
                {
                  to: primaryUser.email,
                  dynamic_template_data: {
                    primaryUser: primaryUser.name,
                    ...card,
                    daysTillAnnualFee,
                    formattedFeeDate: convertDateToLocaleString(nextFeeDate),
                  },
                },
              ],
            };

            try {
              await sgMail.send(msg);
              console.log(
                `Annual fee email for ${cardholder} sent successfully`
              );
              const notificationId = uid.uid();
              const notificationsRef = createNotificationsRef(
                notificationId,
                onlineAccountKey
              );
              const notificationsData = {
                dateSent: new Date().toISOString().split("T")[0],
                message: `Annual fee for ${cardholder}'s ${issuer.name} ${card.card} is due in ${daysTillAnnualFee} days`,
              };

              await notificationsRef.set(notificationsData);
              console.log(
                `Notification added to db - ${cardholder}'s ${issuer.name} ${card.card} - ${daysTillAnnualFee} day annual fee alert`
              );
              emailCount++;
            } catch (error) {
              console.error("Error sending email:", error);
            }
          }
        }

        if (cardHasBonusToEarn) {
          const {
            shouldSendSpendByEmail,
            daysTillSpendByDate,
            spendByTemplateToUse,
          } = spendByEmailVerifier(spendBy);

          if (shouldSendSpendByEmail) {
            const msg = {
              from: "cctrackerapp@gmail.com",
              templateId: spendByTemplateToUse,
              personalizations: [
                {
                  to: primaryUser.email,
                  dynamic_template_data: {
                    primaryUser: primaryUser.name,
                    ...card,
                    daysTillSpendByDate,
                    formattedSpendByDate: convertDateToLocaleString(spendBy),
                  },
                },
              ],
            };

            try {
              await sgMail.send(msg);
              console.log(
                `Bonus alert email for ${cardholder} sent successfully`
              );
              emailCount++;
            } catch (error) {
              console.error("Error sending email:", error);
            }
          }
        }
      }
    }

    console.log(`CARD - Sent ${emailCount} emails for ${primaryUser.name}`);
  }
});
