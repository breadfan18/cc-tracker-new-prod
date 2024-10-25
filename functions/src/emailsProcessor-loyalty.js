const uid = require("uid");
const _ = require("lodash");

const {
  loyaltyEmailVerifier,
  convertDateToLocaleString,
  LOYALTY_REMINDER_TEMPLATE_ID,
  createNotificationsRef,
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
          const { accountHolder, rewardsBalance, rewardsExpiration, program } =
            loyaltyAccount;
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

                const notificationId = uid.uid();
                const notificationsRef = createNotificationsRef(
                  admin,
                  notificationId,
                  onlineAccountKey
                );
                const notificationsData = {
                  dateSent: new Date().toISOString().split("T")[0],
                  message: `Reward points for ${accountHolder}'s ${name} program will expire in ${daysTillRewardsExpiration} days`,
                };

                await notificationsRef.set(notificationsData);
                console.log(
                  `Notification added to db - ${accountHolder}'s ${name} - ${daysTillRewardsExpiration} day rewards expiration alert`
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
