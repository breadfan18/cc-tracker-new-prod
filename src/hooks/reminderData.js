import { CARD_DATA_KEYS } from "../constants";
import {
  dateHasPassed,
  getSpendByRemainingDays,
  isDateApproaching,
  setNextFeeDataForTable,
} from "../helpers";

export const getRemindersData = (card) => {
  const { nextFeeText, nextFeeColor } = setNextFeeDataForTable(card);
  const isAnnualFeeClose =
    isDateApproaching(card, CARD_DATA_KEYS.nextFeeDate, 90) &&
    card.status === "open";

  const isSpendByDateClose = isDateApproaching(
    card,
    CARD_DATA_KEYS.spendBy,
    30
  );

  const { spendDaysRemaining, spendDaysRemainingText, spendByTextColor } =
    getSpendByRemainingDays(card.bonusEarned, card.spendBy);

  const bonusNotEarned =
    isSpendByDateClose && (card.bonusEarned === undefined || !card.bonusEarned);

  const isLastReminder =
    isAnnualFeeClose && isSpendByDateClose && bonusNotEarned ? false : true;

  const annualFeeDatePassed =
    dateHasPassed(card.nextFeeDate) && card.status === "open";

  const showAnnualFeeDueIcon = isAnnualFeeClose || annualFeeDatePassed;

  return {
    nextFeeText,
    nextFeeColor,
    isAnnualFeeClose,
    isSpendByDateClose,
    spendDaysRemaining,
    spendDaysRemainingText,
    spendByTextColor,
    bonusNotEarned,
    isLastReminder,
    showAnnualFeeDueIcon,
    annualFeeDatePassed,
  };
};
