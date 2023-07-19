// Colors
export const APP_COLOR_BLUE = "#0080FF";
export const APP_COLOR_LIGHT_GRAY = "#D9D7D7";
export const APP_COLOR_LIGHT_BLUE = "rgb(210, 237, 246)";
export const APP_COLOR_BLACK_OPACITY = "rgba(0,0,0,0.09)";
export const EDIT_COLOR_GREEN = "#198754";
export const DELETE_COLOR_RED = "#DC3545";
export const CARD_COLOR_CLOSED = "rgb(248,215,218)";
export const CARD_COLOR_DOWNGRADED = "rgb(255,243,205)";

// Texts
export const REMINDERS_TEXT_AF = "Annual Fee is due within 90 days";
export const REMINDERS_TEXT_BONUS = "Bonus earn deadline is within 30 days";

// Data
export const NEW_CARD = {
  id: null,
  issuer: {
    name: null,
    img: null,
  },
  card: "",
  userId: null,
  inquiries: {
    experian: null,
    equifax: null,
    transunion: null,
  },
  annualFee: 0,
  nextFeeDate: null,
  creditLine: null,
  spendReq: 0,
  spendBy: null,
  signupBonus: null,
  bonusEarnDate: null,
  status: null,
};

export const NEW_NOTE = {
  note: "",
  date: null,
};

export const CARD_DATA_KEYS = {
  appDate: "appDate",
  creditLine: "creditLine",
  annualFee: "annualFee",
  nextFeeDate: "nextFeeDate",
  bonusEarnDate: "bonusEarnDate",
  cardType: "cardType",
  userId: "userId",
  bonusEarned: "bonusEarned",
  status: "status",
  issuer: "issuer",
  card: "card",
  spendReq: "spendReq",
  spendBy: "spendBy",
  signupBonus: "signupBonus",
  inquiries: "inquiries",
  cardholder: "cardholder",
};

export const LOYALTY_DATA_KEYS = {
  loyaltyType: "loyaltyType",
  program: "program",
  memberId: "memberId",
  loginId: "loginId",
  password: "password",
  userId: "userId",
};

export const ISSUERS = [
  { name: "Chase", img: "https://i.imgur.com/AsfYKFY.png" },
  { name: "Amex", img: "https://i.imgur.com/1XOuPt8.png" },
  { name: "CapOne", img: "https://i.imgur.com/u3Rr8rT.png" },
  { name: "Barclays", img: "https://i.imgur.com/bsjoGQv.png" },
];
export const CARD_TYPE = ["Personal", "Business"];
export const ACCOUNT_TYPE = ["airlines", "hotels", "misc"];
export const ACC_STATUS = ["open", "closed", "downgraded"];
export const PROGRAMS = [
  {
    id: 1,
    type: "airlines",
    name: "American AAdvantage",
    img: "https://i.imgur.com/Pc1I7uX.png",
  },
  {
    id: 2,
    type: "airlines",
    name: "United MileaguePlus",
    img: "https://i.imgur.com/znFTwQ1.png",
  },
  {
    id: 3,
    type: "hotels",
    name: "World of Hyatt",
    img: "https://i.imgur.com/UnaXElg.png",
  },
  {
    id: 4,
    type: "hotels",
    name: "Hilton Honors",
    img: "https://i.imgur.com/3A83gV6.png",
  },
  {
    id: 5,
    type: "misc",
    name: "Global Entry",
    img: "",
  },
];

export const USERS = [
  {
    id: 1,
    name: "Swaroop Uprety",
  },
  {
    id: 2,
    name: "Marcus Rashford",
  },
  {
    id: 3,
    name: "Mason Mount",
  },
  {
    id: 4,
    name: "David DeGea",
  },
  {
    id: 5,
    name: "Lisandro Martinez",
  },
];

export const CREDIT_BUREAUS = [
  {
    name: "experian",
    img: "https://i.imgur.com/c3o42yy.png",
  },
  {
    name: "equifax",
    img: "https://i.imgur.com/94ANFF2.png",
  },
  {
    name: "transunion",
    img: "https://i.imgur.com/4NwVzht.png",
  },
];
