const _ = require("lodash");

const {
  loyaltyEmailVerifier,
  convertDateToLocaleString,
  LOYALTY_REMINDER_TEMPLATE_ID,
  loyaltyNotificationCreator,
} = require("./function-helpers");

const loyaltyEmailsProcessor = (dbRef, sgMail, admin) => {
  return dbRef.once("value").then(async (snapshot) => {
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
            id: loyaltyId,
          } = loyaltyAccount;
          const { name, img } = program;
          const accountHasBalance = rewardsBalance && rewardsBalance !== "0";

          if (accountHasBalance && rewardsExpiration !== undefined) {
            const {
              shouldSendLoyaltyReminderEmail,
              daysTillRewardsExpiration,
            } = loyaltyEmailVerifier(rewardsExpiration);

            if (true) {
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
                // await sgMail.send(msg);
                // console.log(
                //   `Rewards expiration email for ${accountHolder} sent successfully`
                // );
                await loyaltyNotificationCreator(
                  admin,
                  onlineAccountKey,
                  accountHolder,
                  name,
                  daysTillRewardsExpiration,
                  loyaltyId
                );
                emailCount++;
              } catch (error) {
                console.error("Error sending email:", error);
              }
            }
          }
        }
      }

      console.log(
        `LOYALTY - Sent ${emailCount} emails for ${primaryUser.name}`
      );
    }
  });
};

module.exports = loyaltyEmailsProcessor;
