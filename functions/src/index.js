const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const _ = require("lodash");
const {
  annualFeeEmailVerifier,
  spendByEmailVerifier,
} = require("./function-helpers");

admin.initializeApp();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Reference to your data location
const ref = admin.database().ref("/users");

// Retrieve data once
exports.sendAnnualFeeDueEmail = functions.pubsub
  .schedule("40 14 * * *")
  .onRun(async (context) => {
    return ref.once("value").then(async (snapshot) => {
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
            } = card;
            // const cardRef = admin
            //   .database()
            //   .ref(`/users/${onlineAccountKey}/cards/${id}`);
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
                      },
                    },
                  ],
                };

                try {
                  await sgMail.send(msg);
                  console.log(
                    `Annual fee email for ${cardholder} sent successfully`
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
  });
