import {
  CARD_COLOR_CLOSED,
  CARD_COLOR_DOWNGRADED,
  CREDIT_BUREAUS,
  DELETE_COLOR_RED,
  EDIT_COLOR_GREEN,
} from "./constants";
import {
  Cardholder,
  CardsByHolder,
  InquiriesByHolder,
} from "./types/cardholder-types";
import { Card, CardNote, Inquiries } from "./types/cards-types";
import { LoyaltyData } from "./types/loyalty-types";
import { Referral } from "./types/referral-types";

export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

export function wasCardOpenedWithinLast24Months(appDate: string): boolean {
  const twoYearsAgoFromToday = Date.parse(
    new Date(new Date().setFullYear(new Date().getFullYear() - 2)).toISOString()
  );
  const today = Date.now();
  const parsedAppDate = Date.parse(appDate);
  return parsedAppDate >= twoYearsAgoFromToday && parsedAppDate <= today;
}

export function isDateApproaching(
  data: Card | LoyaltyData,
  dataType: string,
  numberOfDays: number = 30
): boolean | undefined {
  if (!data[dataType]) return;
  const formattedDate = new Date(data[dataType]);
  const parsedDate = Date.parse(data[dataType]);
  const today = Date.now();
  const daysBeforeDate = Date.parse(
    new Date(
      formattedDate.setDate(formattedDate.getDate() - numberOfDays)
    ).toISOString()
  );
  return today >= daysBeforeDate && today <= parsedDate;
}

export function dateHasPassed(dateString: string): boolean {
  const givenDate = new Date(dateString);
  const currentDate = new Date();
  return givenDate < currentDate ? true : false;
}

export function daysTillRewardsExpiration(
  rewardsExpirationDate: string
): number | undefined {
  if (!rewardsExpirationDate) return;
  const expirationDate = Date.parse(rewardsExpirationDate);
  const todaysDate = Date.now();
  return Math.round((expirationDate - todaysDate) / (1000 * 60 * 60 * 24));
}

export function addUserNameToCard(card: Card, cardholders: Cardholder[]): Card {
  const cardholder = cardholders.find((holder) => holder.id === card.userId);
  if (cardholder && cardholder?.name !== card?.cardholder) {
    return {
      ...card,
      cardholder: cardholder.name,
      userId: cardholder.id,
    };
  }
  return card;
}

export function sortCardsByDate(cards: Card[]): Card[] {
  return [...cards].sort(
    (a, b) => Date.parse(b.appDate) - Date.parse(a.appDate)
  );
}

export function sortNotesByDate(notes: CardNote[]): CardNote[] {
  return notes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

export function sortReferralsByDate(referrals: Referral[]): Referral[] {
  return [...referrals].sort(
    (a, b) => Date.parse(b.referralDate) - Date.parse(a.referralDate)
  );
}

export function titleCase(str: string): string {
  const smallWords = [
    "a",
    "an",
    "and",
    "the",
    "but",
    "or",
    "on",
    "in",
    "with",
    "to",
    "of",
    "at",
    "by",
    "for",
    "nor",
    "up",
  ];
  return str
    ?.toLowerCase()
    .split(" ")
    .map((word, i) =>
      i !== 0 && smallWords.includes(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export function maskPwd(str: string): string {
  const centerStr = str.substring(1, str.length - 2);
  return (
    str.charAt(0) + "*".repeat(centerStr.length) + str.substring(str.length - 2)
  );
}

export function formatDate(dateStr) {
  if (!dateStr || dateStr === undefined || dateStr === "") return "N/A";

  const dateSplit = dateStr.split("-");
  return `${dateSplit[1]}-${dateSplit[2]}-${dateSplit[0]}`;
}

export function formatCurrency(currencyStr: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(currencyStr) || 0);
}

export const slugify = (str: string): string => {
  const whitespacePattern = /[\s-]+/g;
  const nonLatinPattern = /[^\w-]/g;
  return str
    .trim()
    .toLocaleLowerCase("en-US")
    .normalize("NFKD")
    .replace(nonLatinPattern, " ")
    .replace(whitespacePattern, "-")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

// Not using this function right now. But need to try again in the future
// export const normalizeData = (cards) => {
//   const formattedCards = [...cards].map((card) => {
//     card.appDate = formatDate(card.appDate);
//     card.nextFeeDate === ""
//       ? (card.nextFeeDate = "N/A")
//       : (card.nextFeeDate = formatDate(card.nextFeeDate));
//     card.spendBy === ""
//       ? (card.spendBy = "N/A")
//       : (card.spendBy = formatDate(card.spendBy));
//     card.bonusEarnDate === "" || card.bonusEarnDate === undefined
//       ? (card.bonusEarnDate = "WIP")
//       : formatDate(card.bonusEarnDate);
//     card.status = titleCase(card.status);
//     card.inquiries = handleInquiriesList(card.inquiries);
//     return card;
//   });

//   return formattedCards;
// };

export function formDisabledCheck(dataType?: string | number): boolean {
  return (
    dataType === 0 ||
    dataType === "0" ||
    dataType === "" ||
    dataType === undefined
  );
}

export function handleInquiriesList(inq: Inquiries): {
  img: string;
  name: string;
}[] {
  return Object.keys(inq)
    .filter((i) => inq[i])
    .map((inq) => CREDIT_BUREAUS.find((i) => inq === i.name))
    .filter(
      (item): item is { img: string; name: string } => item !== undefined
    );
}

export function setColorForCardStatus(
  componentType: string,
  cardStatus: string
): string | undefined {
  if (componentType === "cardTable") {
    return cardStatus === "closed"
      ? "table-danger"
      : cardStatus === "downgraded"
      ? "table-warning"
      : undefined;
  } else if (componentType === "cardCard") {
    return cardStatus === "closed"
      ? CARD_COLOR_CLOSED
      : cardStatus === "downgraded"
      ? CARD_COLOR_DOWNGRADED
      : undefined;
  }
}

export function calculateCurrentInquiries(
  cardsByHolder: CardsByHolder
): InquiriesByHolder {
  return Object.fromEntries(
    Object.entries(cardsByHolder).map(([holder, cards]) => {
      const totalInq = cards.reduce(
        (acc, card) => {
          if (!wasCardOpenedWithinLast24Months(card.appDate)) return acc;

          acc.experian += card.inquiries.experian ? 1 : 0;
          acc.equifax += card.inquiries.equifax ? 1 : 0;
          acc.transunion += card.inquiries.transunion ? 1 : 0;

          return acc;
        },
        { experian: 0, equifax: 0, transunion: 0 }
      );

      return [holder, totalInq];
    })
  );
}

export function sortNumberDesc(num1: string, num2: string): number {
  const parsedNum1 = parseInt(num1 || "0");
  const parsedNum2 = parseInt(num2 || "0");

  return parsedNum2 - parsedNum1;
}

export function setNextFeeDataForTable(card: Card): {
  nextFeeText: string;
  nextFeeColor: string | null;
} {
  if (dateHasPassed(card.nextFeeDate) && card.status === "open") {
    return {
      nextFeeText: `AF due date has passed`,
      nextFeeColor: DELETE_COLOR_RED,
    };
  }
  if (card.nextFeeDate && card.status === "open") {
    return {
      nextFeeText: `Next Fee: ${formatDate(card.nextFeeDate)}`,
      nextFeeColor: DELETE_COLOR_RED,
    };
  } else if (card.status === "closed") {
    return {
      nextFeeText: "Account Closed",
      nextFeeColor: null,
    };
  } else if (card.status === "downgraded") {
    return {
      nextFeeText: "Account Downgraded",
      nextFeeColor: null,
    };
  } else {
    return {
      nextFeeText: "No Annual Fee",
      nextFeeColor: "green",
    };
  }
}

export function getSpendByRemainingDays(
  bonusEarned: boolean,
  spendByDate: string
): {
  spendDaysRemaining: number | null;
  spendDaysRemainingText: string;
  spendByTextColor: string | null;
} {
  if (bonusEarned)
    return {
      spendDaysRemaining: null,
      spendDaysRemainingText: "Bonus Earned 🥳",
      spendByTextColor: EDIT_COLOR_GREEN,
    };
  const currentDate = new Date();
  const targetDate = new Date(spendByDate);
  const differenceInMillis = targetDate.getTime() - currentDate.getTime();
  const daysDifference = differenceInMillis / (1000 * 3600 * 24);
  const spendDaysRemaining = Math.floor(daysDifference);
  const spendByTextColor =
    spendDaysRemaining > 30 || !spendByDate ? null : "orange";
  return {
    spendDaysRemaining,
    spendDaysRemainingText:
      spendDaysRemaining < 0
        ? "Spend date has passed"
        : spendByDate
        ? `${spendDaysRemaining} days remaining`
        : "No Spend By date",
    spendByTextColor,
  };
}

export function generateDarkHexColor(): string {
  // Generate random RGB values in the darker range (0-100)
  const r = Math.floor(Math.random() * 100);
  const g = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);

  // Convert RGB to a hex color string
  const hex = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return hex;
}

export function generateLightHexColor(): string {
  // Generate random RGB values in the lighter range (155-255)
  const r = Math.floor(Math.random() * 55) + 200; // Red (155-255)
  const g = Math.floor(Math.random() * 55) + 200; // Green (155-255)
  const b = Math.floor(Math.random() * 55) + 200; // Blue (155-255)

  // Convert RGB to a hex color string
  const hex = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return hex;
}
