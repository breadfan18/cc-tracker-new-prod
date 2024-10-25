const uid = require("uid");
const _ = require("lodash");

const {
  convertDateToLocaleString,
  spendByEmailVerifier,
  annualFeeEmailVerifier,
  createNotificationsRef,
} = require("./function-helpers");

const cardEmailsProcessor = (dbRef, sgMail, admin) => {
  return dbRef.once("value").then(async (snapshot) => {
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
                  admin,
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
};

module.exports = cardEmailsProcessor;
