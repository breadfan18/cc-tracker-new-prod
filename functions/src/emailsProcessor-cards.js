const _ = require("lodash");

const {
  convertDateToLocaleString,
  spendByEmailVerifier,
  annualFeeEmailVerifier,
  cardNotificationCreator,
  AF_DATA_TYPE,
  SPEND_BY_DATA_TYPE,
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
                await cardNotificationCreator(
                  admin,
                  onlineAccountKey,
                  card,
                  daysTillAnnualFee,
                  AF_DATA_TYPE
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
                await cardNotificationCreator(
                  admin,
                  onlineAccountKey,
                  card,
                  daysTillSpendByDate,
                  SPEND_BY_DATA_TYPE
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
