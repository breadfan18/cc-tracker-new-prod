import {
  CARD_COLOR_CLOSED,
  CARD_COLOR_DOWNGRADED,
  CREDIT_BUREAUS,
  DELETE_COLOR_RED,
  EDIT_COLOR_GREEN,
} from "./constants";

export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

export function wasCardOpenedWithinLast24Months(appDate) {
  const twoYearsAgoFromToday = Date.parse(
    new Date(new Date().setFullYear(new Date().getFullYear() - 2))
  );
  const today = Date.now();
  const parsedAppDate = Date.parse(appDate);
  return parsedAppDate >= twoYearsAgoFromToday && parsedAppDate <= today;
}

export function isDateApproaching(data, dataType, numberOfDays) {
  if (!data[dataType]) return;
  const formattedDate = new Date(data[dataType]);
  const parsedDate = Date.parse(data[dataType]);
  const today = Date.now();
  const daysBeforeDate = Date.parse(
    new Date(formattedDate.setDate(formattedDate.getDate() - numberOfDays))
  );
  return today >= daysBeforeDate && today <= parsedDate;
}

export function dateHasPassed(dateString) {
  const givenDate = new Date(dateString);
  const currentDate = new Date();
  return givenDate < currentDate ? true : false;
}

export function daysTillRewardsExpiration(rewardsExpirationDate) {
  if (!rewardsExpirationDate) return;
  const expirationDate = new Date(rewardsExpirationDate);
  const todaysDate = Date.now();
  return Math.round((expirationDate - todaysDate) / (1000 * 60 * 60 * 24));
}

export function addUserNameToCard(card, cardholders) {
  const cardholder = cardholders.find((holder) => holder.id === card.userId);
  if (cardholder?.name !== card?.cardholder) {
    return {
      ...card,
      cardholder: cardholder?.name,
      userId: cardholder?.id,
    };
  }
  return card;
}

export function sortCardsByDate(cards) {
  return [...cards].sort(
    (a, b) => Date.parse(b.appDate) - Date.parse(a.appDate)
  );
}

export function sortNotesByDate(notes) {
  return notes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}

export function sortReferralsByDate(referrals) {
  return [...referrals].sort(
    (a, b) => Date.parse(b.referralDate) - Date.parse(a.referralDate)
  );
}

export function titleCase(str) {
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
    .toLowerCase()
    .split(" ")
    .map((word, i) =>
      i !== 0 && smallWords.includes(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export function maskPwd(str) {
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

export function formatCurrency(currencyStr) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(currencyStr);
}

export const slugify = (str) => {
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
export const normalizeData = (cards) => {
  const formattedCards = [...cards].map((card) => {
    card.appDate = formatDate(card.appDate);
    card.nextFeeDate === ""
      ? (card.nextFeeDate = "N/A")
      : (card.nextFeeDate = formatDate(card.nextFeeDate));
    card.spendBy === ""
      ? (card.spendBy = "N/A")
      : (card.spendBy = formatDate(card.spendBy));
    card.bonusEarnDate === "" || card.bonusEarnDate === undefined
      ? (card.bonusEarnDate = "WIP")
      : formatDate(card.bonusEarnDate);
    card.status = titleCase(card.status);
    card.inquiries = handleInquiriesList(card.inquiries, "\n");
    return card;
  });

  return formattedCards;
};

export function formDisabledCheck(dataType) {
  return (
    dataType === 0 || dataType === "0" || dataType === "" || dataType === null
  );
}

// export function handleInquiriesList(inq, delimiter) {
//   const inqArr = Object.keys(inq).filter((i) => inq[i]);
//   const lastInq = inqArr[inqArr.length - 1];
//   return inqArr.reduce(
//     (output, i) => (output += titleCase(i) + (i === lastInq ? "" : delimiter)),
//     ""
//   );
// }

export function handleInquiriesList(inq) {
  return Object.keys(inq)
    .filter((i) => inq[i])
    .map((inq) => CREDIT_BUREAUS.find((i) => inq === i.name));
}

export function setColorForCardStatus(componentType, cardStatus) {
  if (componentType === "cardTable") {
    return cardStatus === "closed"
      ? "table-danger"
      : cardStatus === "downgraded"
      ? "table-warning"
      : null;
  } else if (componentType === "cardCard") {
    return cardStatus === "closed"
      ? CARD_COLOR_CLOSED
      : cardStatus === "downgraded"
      ? CARD_COLOR_DOWNGRADED
      : null;
  }
}

export function calculateCurrentInquiries(cardsByHolder) {
  const inquiriesByHolder = { ...cardsByHolder };

  Object.keys(inquiriesByHolder).forEach((holder) => {
    const totalInq = cardsByHolder[holder]
      .filter((i) => wasCardOpenedWithinLast24Months(i.appDate))
      .reduce(
        (output, i) => {
          const inquiries = i.inquiries;
          if (inquiries.experian) output["experian"]++;
          if (inquiries.equifax) output["equifax"]++;
          if (inquiries.transunion) output["transunion"]++;

          return output;
        },
        {
          experian: 0,
          equifax: 0,
          transunion: 0,
        }
      );
    inquiriesByHolder[holder] = totalInq;
  });

  return inquiriesByHolder;
}

export function sortNumberDesc(num1, num2) {
  const parsedNum1 = parseInt(num1 || "0");
  const parsedNum2 = parseInt(num2 || "0");

  return parsedNum2 - parsedNum1;
}

export function setNextFeeDataForTable(card) {
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

export function getSpendByRemainingDays(bonusEarned, spendByDate) {
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

export function generateDarkHexColor() {
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

export function generateLightHexColor() {
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
