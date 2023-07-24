"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setColorForCardStatus = exports.handleInquiriesList = exports.formDisabledCheck = exports.normalizeData = exports.slugify = exports.formatCurrency = exports.formatDate = exports.maskPwd = exports.titleCase = exports.sortNotesByDate = exports.sortCardsByDate = exports.addUserNameToCard = exports.isDateApproaching = exports.wasCardOpenedWithinLast24Months = void 0;
const constants_1 = require("./constants");
function wasCardOpenedWithinLast24Months(appDate) {
    const twoYearsAgoFromToday = Date.parse(new Date(new Date().setFullYear(new Date().getFullYear() - 2)));
    const today = Date.now();
    const parsedAppDate = Date.parse(appDate);
    return parsedAppDate >= twoYearsAgoFromToday && parsedAppDate <= today;
}
exports.wasCardOpenedWithinLast24Months = wasCardOpenedWithinLast24Months;
function isDateApproaching(card, dataType, numberOfDays) {
    const formattedNextFeeDate = new Date(card[dataType]);
    const parsedNextFeeDate = Date.parse(card[dataType]);
    const today = Date.now();
    const ninetyDaysBeforeNextFeeDate = Date.parse(new Date(formattedNextFeeDate.setDate(formattedNextFeeDate.getDate() - numberOfDays)));
    return today >= ninetyDaysBeforeNextFeeDate && today <= parsedNextFeeDate;
}
exports.isDateApproaching = isDateApproaching;
function addUserNameToCard(card) {
    const cardholder = constants_1.USERS.find((user) => user.id === parseInt(card.userId)).name;
    return {
        ...card,
        cardholder,
    };
}
exports.addUserNameToCard = addUserNameToCard;
function sortCardsByDate(cards) {
    return cards.sort((a, b) => Date.parse(a.appDate) - Date.parse(b.appDate));
}
exports.sortCardsByDate = sortCardsByDate;
function sortNotesByDate(notes) {
    return notes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}
exports.sortNotesByDate = sortNotesByDate;
function titleCase(str) {
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
exports.titleCase = titleCase;
function maskPwd(str) {
    const centerStr = str
        .split("")
        .splice(1, str.length - 5)
        .fill("*")
        .join("");
    return str.charAt(0) + centerStr + str.substring(str.length - 4);
}
exports.maskPwd = maskPwd;
function formatDate(dateStr) {
    const dateSplit = dateStr.split("-");
    return `${dateSplit[1]}-${dateSplit[2]}-${dateSplit[0]}`;
}
exports.formatDate = formatDate;
function formatCurrency(currencyStr) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(currencyStr);
}
exports.formatCurrency = formatCurrency;
const slugify = (str) => {
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
exports.slugify = slugify;
// Not using this function right now. But need to try again in the future
const normalizeData = (cards) => {
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
exports.normalizeData = normalizeData;
function formDisabledCheck(dataType) {
    return (dataType === 0 || dataType === "0" || dataType === "" || dataType === null);
}
exports.formDisabledCheck = formDisabledCheck;
// export function handleInquiriesList(inq, delimiter) {
//   const inqArr = Object.keys(inq).filter((i) => inq[i]);
//   const lastInq = inqArr[inqArr.length - 1];
//   return inqArr.reduce(
//     (output, i) => (output += titleCase(i) + (i === lastInq ? "" : delimiter)),
//     ""
//   );
// }
function handleInquiriesList(inq) {
    return Object.keys(inq)
        .filter((i) => inq[i])
        .map((inq) => constants_1.CREDIT_BUREAUS.find((i) => inq === i.name));
}
exports.handleInquiriesList = handleInquiriesList;
function setColorForCardStatus(componentType, cardStatus) {
    if (componentType === "cardTable") {
        return cardStatus === "closed"
            ? "table-danger"
            : cardStatus === "downgraded"
                ? "table-warning"
                : null;
    }
    else if (componentType === "cardCard") {
        return cardStatus === "closed"
            ? constants_1.CARD_COLOR_CLOSED
            : cardStatus === "downgraded"
                ? constants_1.CARD_COLOR_DOWNGRADED
                : null;
    }
}
exports.setColorForCardStatus = setColorForCardStatus;
//# sourceMappingURL=helpers.js.map