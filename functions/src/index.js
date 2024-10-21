const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const _ = require("lodash");

function isDateApproaching(data, dataType, numberOfDays) {
  if (!data[dataType]) return;
  const formattedDate = new Date(data[dataType]);
  const parsedDate = Date.parse(data[dataType]);
  const today = Date.now();
  const daysBeforeDate = Date.parse(
    new Date(formattedDate.setDate(formattedDate.getDate() - numberOfDays))
  );
  return today >= daysBeforeDate && today <= parsedDate;
}

function daysUntilNextFee(annualFeeDate) {
  if (!annualFeeDate) return;
  const nextFeeDate = new Date(annualFeeDate);
  const todaysDate = Date.now();
  return Math.round((nextFeeDate - todaysDate) / (1000 * 60 * 60 * 24));
}

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

        if (cards) {
          for (const card of _.values(cards)) {
            const { annualFee, nextFeeDate, status, emailSent, id } = card;
            const cardRef = admin
              .database()
              .ref(`/users/${onlineAccountKey}/cards/${id}`);
            const hasAnnualFee = annualFee && annualFee !== "0";

            if (hasAnnualFee) {
              const numberOfDays = daysUntilNextFee(nextFeeDate);
              const isAnnualFeeClose =
                numberOfDays <= 90 && numberOfDays > 0 && status === "open";
              const emailAlreadySent = emailSent?.annuaFeeDue;

              if (isAnnualFeeClose && !emailAlreadySent) {
                const msg = {
                  to: primaryUser.email,
                  from: "cctrackerapp@gmail.com",
                  templateId: "d-06023a5c215a48d6b802ecae1b335777",
                  personalizations: [
                    {
                      to: ["breadfan18@gmail.com"],
                      dynamic_template_data: {
                        primaryUser: primaryUser.name,
                        ...card,
                        numberOfDays,
                      },
                    },
                  ],
                };

                try {
                  await sgMail.send(msg).then(() => {
                    const data = {
                      ...card,
                      emailSent: {
                        annuaFeeDue: true,
                      },
                    };
                    cardRef.set(data);
                    console.log("Data written successfully");
                  });
                  console.log("Email sent successfully");
                } catch (error) {
                  console.error("Error sending email:", error);
                }
              }
            }
          }
        }

        console.log("All emails for this user sent (or skipped)");
      }
    });
  });
