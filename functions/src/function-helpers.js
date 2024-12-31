const AF_DUE_TEMPLATE_ID = "d-d8adc7796c93412a90c2a5d1c2b10023";
const AF_DATE_PASSED_TEMPLATE_ID = "d-71ac83215e494f5aa6138915cb771cc8";

const SPEND_BY_TEMPLATE_ID = "d-778bf701bf204af081fc21dd7c08fad6";
const SPEND_BY_PASSED_TEMPLATE_ID = "d-0d54f1cb6d1241319c5cb570351f2eac";

const LOYALTY_REMINDER_TEMPLATE_ID = "d-585b3e176444435bba99e697c48da0c6";

const AF_DATA_TYPE = "annualFee";
const SPEND_BY_DATA_TYPE = "spendBy";

const convertDateToLocaleString = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

function getNumberOfDaysFromDate(date) {
  if (!date) return;
  const enteredDate = new Date(date);
  const todaysDate = Date.now();
  return Math.round((enteredDate - todaysDate) / (1000 * 60 * 60 * 24));
}

function annualFeeEmailVerifier(annualFeeDate) {
  const daysTillAnnualFee = getNumberOfDaysFromDate(annualFeeDate);
  const annualFeeDueIn90Days = daysTillAnnualFee === 90;
  const annualFeeDueIn30Days = daysTillAnnualFee === 30;
  const annualFeeDueIn5Days = daysTillAnnualFee === 5;
  const annualFeeDatePassed = daysTillAnnualFee === -1;

  const shouldSendAnnualFeeEmail =
    annualFeeDueIn90Days ||
    annualFeeDueIn30Days ||
    annualFeeDueIn5Days ||
    annualFeeDatePassed;

  const annualFeeTemplateToUse = annualFeeDatePassed
    ? AF_DATE_PASSED_TEMPLATE_ID
    : AF_DUE_TEMPLATE_ID;

  return {
    shouldSendAnnualFeeEmail,
    daysTillAnnualFee,
    annualFeeTemplateToUse,
  };
}

function spendByEmailVerifier(spendByDate) {
  const daysTillSpendByDate = getNumberOfDaysFromDate(spendByDate);
  const spendByDateIn30Days = daysTillSpendByDate === 30;
  const spendByDateIn5Days = daysTillSpendByDate === 5;
  const spendByDatePassed = daysTillSpendByDate === -1;

  const shouldSendSpendByEmail =
    spendByDateIn30Days || spendByDateIn5Days || spendByDatePassed;

  const spendByTemplateToUse = spendByDatePassed
    ? SPEND_BY_PASSED_TEMPLATE_ID
    : SPEND_BY_TEMPLATE_ID;

  return {
    shouldSendSpendByEmail,
    daysTillSpendByDate,
    spendByTemplateToUse,
  };
}

function loyaltyEmailVerifier(loyaltyExpirationDate) {
  const daysTillRewardsExpiration = getNumberOfDaysFromDate(
    loyaltyExpirationDate
  );

  const rewardsExpireIn180Days = daysTillRewardsExpiration === 180;
  const rewardsExpireIn60Days = daysTillRewardsExpiration === 60;

  const shouldSendLoyaltyReminderEmail =
    rewardsExpireIn180Days || rewardsExpireIn60Days;

  return { shouldSendLoyaltyReminderEmail, daysTillRewardsExpiration };
}

const createNotificationsRef = (admin, cardId, onlineAccountKey) => {
  return admin
    .database()
    .ref(`/users/${onlineAccountKey}/notifications/${cardId}`);
};

const cardAnnualFeeNotificationCreator = async (
  admin,
  onlineAccountKey,
  card,
  daysUntilDue
) => {
  const { issuer, cardholder, card: cardName, id: cardId } = card;

  const notificationId = `${AF_DATA_TYPE}_${
    daysUntilDue <= 0 ? "passed" : daysUntilDue
  }_${cardId}`;

  const message =
    daysUntilDue <= 0
      ? `Annual fee date for ${cardholder}'s ${issuer.name} ${cardName} has passed! Please review the card`
      : `Annual fee for ${cardholder}'s ${issuer.name} ${cardName} is due in ${daysUntilDue} days`;

  const cardDetailsMessage =
    daysUntilDue <= 0
      ? `Annual fee date for this card has passed! Please review`
      : `Annual fee for this card is due in ${daysUntilDue} days`;

  const notificationLog =
    daysUntilDue <= 0
      ? `Notification added to db - ${cardholder}'s ${issuer.name} ${cardName} - Annual fee due date passed`
      : `Notification added to db - ${cardholder}'s ${issuer.name} ${cardName} - ${daysUntilDue} days until bonus deadline`;

  const notificationsRef = createNotificationsRef(
    admin,
    notificationId,
    onlineAccountKey
  );
  const notificationsData = {
    dateSent: new Date().toISOString().split("T")[0],
    message,
    cardDetailsMessage,
    notificationId,
    cardId,
    notificationType: AF_DATA_TYPE,
  };

  await notificationsRef.set(notificationsData);
  console.log(notificationLog);
};

const cardSpendByNotificationCreator = async (
  admin,
  onlineAccountKey,
  card,
  daysUntilDue
) => {
  const { issuer, cardholder, card: cardName, id: cardId } = card;

  const notificationId = `${SPEND_BY_DATA_TYPE}_${
    daysUntilDue <= 0 ? "passed" : daysUntilDue
  }_${cardId}`;

  const message =
    daysUntilDue <= 0
      ? `Bonus spend deadline for ${cardholder}'s ${issuer.name} ${cardName} has passed! Please review the card`
      : `Bonus spend deadline for ${cardholder}'s ${issuer.name} ${cardName} is in ${daysUntilDue} days`;

  const notificationLog =
    daysUntilDue <= 0
      ? `Notification added to db - ${cardholder}'s ${issuer.name} ${cardName} - Bonus spend deadline passed`
      : `Notification added to db - ${cardholder}'s ${issuer.name} ${cardName} - ${daysUntilDue} days until bonus deadline`;

  const cardDetailsMessage =
    daysUntilDue <= 0
      ? `Bonus spend deadline for this card has passed! Please review the card`
      : `Bonus spend deadline for this card is in ${daysUntilDue} days`;

  const notificationsRef = createNotificationsRef(
    admin,
    notificationId,
    onlineAccountKey
  );
  const notificationsData = {
    dateSent: new Date().toISOString().split("T")[0],
    message,
    cardDetailsMessage,
    notificationId,
    cardId,
    notificationType: SPEND_BY_DATA_TYPE,
  };

  await notificationsRef.set(notificationsData);
  console.log(notificationLog);
};

const loyaltyNotificationCreator = async (
  admin,
  onlineAccountKey,
  accountHolder,
  loyaltyProgram,
  expirationDate,
  loyaltyId
) => {
  const notificationId = `loyalty_${loyaltyId}`;
  const notificationsRef = createNotificationsRef(
    admin,
    notificationId,
    onlineAccountKey
  );
  const notificationsData = {
    dateSent: new Date().toISOString().split("T")[0],
    message: `Reward points for ${accountHolder}'s ${loyaltyProgram} program will expire in ${expirationDate} days`,
    notificationId,
    notificationType: "loyalty",
  };

  await notificationsRef.set(notificationsData);
  console.log(
    `Notification added to db - ${accountHolder}'s ${loyaltyProgram} - ${expirationDate} day rewards expiration alert`
  );
};

module.exports = {
  annualFeeEmailVerifier,
  spendByEmailVerifier,
  loyaltyEmailVerifier,
  convertDateToLocaleString,
  createNotificationsRef,
  cardAnnualFeeNotificationCreator,
  cardSpendByNotificationCreator,
  loyaltyNotificationCreator,
  LOYALTY_REMINDER_TEMPLATE_ID,
  AF_DATA_TYPE,
  SPEND_BY_DATA_TYPE,
};
