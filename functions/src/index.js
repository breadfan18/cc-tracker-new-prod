const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const _ = require("lodash");
const {
  annualFeeEmailVerifier,
  spendByEmailVerifier,
  loyaltyEmailVerifier,
} = require("./function-helpers");

admin.initializeApp();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Reference to your data location
const ref = admin.database().ref("/users");

// Retrieve data once
exports.sendCardReminderEmails = functions.pubsub
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

exports.sendLoyaltyReminderEmails = functions.pubsub
  .schedule("40 20 * * *")
  .onRun(async (context) => {
    return ref.once("value").then(async (snapshot) => {
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
            const {
              accountHolder,
              rewardsBalance,
              rewardsExpiration,
              program,
            } = loyaltyAccount;
            const { name, img } = program;
            const accountHasBalance = rewardsBalance && rewardsBalance !== "0";

            if (accountHasBalance && rewardsExpiration !== undefined) {
              const {
                shouldSendLoyaltyReminderEmail,
                daysTillRewardsExpiration,
              } = loyaltyEmailVerifier(rewardsExpiration);

              if (shouldSendLoyaltyReminderEmail) {
                const msg = {
                  from: "cctrackerapp@gmail.com",
                  templateId: "d-befc59aaef1d4517aba14e687a27bf2b",
                  personalizations: [
                    {
                      to: primaryUser.email,
                      dynamic_template_data: {
                        accountHolder,
                        primaryUser: primaryUser.name,
                        loyaltyAccountName: name,
                        loyaltyAccountImg: img,
                        rewardsExpirationDate: rewardsExpiration,
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

        console.log(`Sent ${emailCount} card emails for ${primaryUser.name}`);
      }
    });
  });
