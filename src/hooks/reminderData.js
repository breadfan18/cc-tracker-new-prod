import { CARD_DATA_KEYS } from "../constants";
import {
  getSpendByRemainingDays,
  isDateApproaching,
  setNextFeeDataForTable,
} from "../helpers";

export const getRemindersData = (card) => {
  const { nextFeeText, nextFeeColor } = setNextFeeDataForTable(card);
  const isAnnualFeeClose = isDateApproaching(
    card,
    CARD_DATA_KEYS.nextFeeDate,
    90
  );
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
  };
};
