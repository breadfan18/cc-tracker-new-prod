const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const foo = process.env.SENDGRID_API_KEY;

console.log(foo);

sgMail.setApiKey(
  "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"
);

const msg = {
  to: "upretyswaroop@gmail.com", // Change to your recipient
  from: "cctrackerapp@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
