const AF_DUE_TEMPLATE_ID = "d-06023a5c215a48d6b802ecae1b335777";
const AF_DATE_PASSED_TEMPLATE_ID = "d-3dc493b5cd734400a4655a523b2cdd4e";

const SPEND_BY_TEMPLATE_ID = "d-4c08e57e490a4964a1a0015e6ca1d781";
const SPEND_BY_PASSED_TEMPLATE_ID = "d-ee42189c15dc45a7aeb5e9dd0a79eaa9";

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

module.exports = {
  annualFeeEmailVerifier,
  spendByEmailVerifier,
};
