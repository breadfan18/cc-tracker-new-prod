const AF_DUE_TEMPLATE_ID = "d-d8adc7796c93412a90c2a5d1c2b10023";
const AF_DATE_PASSED_TEMPLATE_ID = "d-71ac83215e494f5aa6138915cb771cc8";

const SPEND_BY_TEMPLATE_ID = "d-778bf701bf204af081fc21dd7c08fad6";
const SPEND_BY_PASSED_TEMPLATE_ID = "d-0d54f1cb6d1241319c5cb570351f2eac";

const LOYALTY_REMINDER_TEMPLATE_ID = "d-585b3e176444435bba99e697c48da0c6";

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
  const annualFeeDatePassed = daysTillAnnualFee < 0;

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
  const spendByDatePassed = daysTillSpendByDate < 0;

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

module.exports = {
  annualFeeEmailVerifier,
  spendByEmailVerifier,
  loyaltyEmailVerifier,
  convertDateToLocaleString,
  LOYALTY_REMINDER_TEMPLATE_ID,
};
