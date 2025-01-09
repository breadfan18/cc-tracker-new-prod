// Colors
export const APP_COLOR_BLUE = "#6b58e5";
export const APP_COLOR_BLUE_OPACITY = "#4BA5FF";
export const APP_COLOR_LIGHT_GRAY = "#D9D7D7";
export const APP_COLOR_LIGHT_BLACK = "rgb(59, 54, 54)";
export const APP_COLOR_LIGHT_BLUE = "#c9bffc";
export const APP_COLOR_BLACK_OPACITY = "rgba(0,0,0,0.09)";
export const EDIT_COLOR_GREEN = "#198754";
export const EDIT_COLOR_GREEN_OPACITY = "#5DAA87";
export const DELETE_COLOR_RED = "#DC3545";
export const CARD_COLOR_CLOSED = "rgb(248,215,218)";
export const CARD_COLOR_DOWNGRADED = "rgb(255,243,205)";
export const CANCELLED_COLOR_RED = "#F8D7DA";

// Texts
export const REMINDERS_TEXT_AF = "Annual Fee is due within 90 days";
export const REMINDERS_TEXT_AF_DATE_PASSED =
  "Annual Fee due date has passed. Adjust the Next Fee Date if AF was paid";
export const REMINDERS_TEXT_BONUS = "Bonus earn deadline is within 30 days";
export const REMINDERS_TEXT_BONUS_DATE_PASSED =
  "Bonus earn deadline has passed. Please update bonus status if earned";

// Data
export const INQUIRIES = {
  experian: null,
  equifax: null,
  transunion: null,
};

export const NEW_CARD = {
  id: null,
  issuer: {
    name: null,
    img: null,
  },
  card: "",
  cardType: null,
  userId: null,
  inquiries: INQUIRIES,
  annualFee: 0,
  nextFeeDate: null,
  creditLine: null,
  spendReq: 0,
  spendBy: null,
  signupBonus: null,
  bonusEarnDate: null,
  status: null,
  cardholder: null,
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

export const CARD_DATA_IN_CARD_VIEW = {
  appDate: "appDate",
  creditLine: "creditLine",
  annualFee: "annualFee",
  nextFeeDate: "nextFeeDate",
  cardType: "cardType",
};

export const LOYALTY_DATA_KEYS = {
  loyaltyType: "loyaltyType",
  program: "program",
  memberId: "memberId",
  loginId: "loginId",
  password: "password",
  userId: "userId",
  rewardsBalance: "rewardsBalance",
  rewardsExpiration: "rewardsExpiration",
};

export const REFERRAL_DATA_KEYS = {
  referralFor: "referralFor",
  referralDate: "referralDate",
  issuer: "issuer",
  referredCard: "referredCard",
  referralBonus: "referralBonus",
  referralLink: "referralLink",
  referrerId: "referrerId",
  referringCardId: "referringCardId",
  referralBonusEarned: "referralBonusEarned",
  referralEarnDate: "referralEarnDate",
};

export const REFERRAL_DATA_IN_CARD_VIEW = {
  referralDate: "referralDate",
  referralFor: "referralFor",
  referredCard: "referredCard",
};

export const ISSUERS = [
  { name: "Chase", img: "https://i.imgur.com/AsfYKFY.png" },
  { name: "Amex", img: "https://i.imgur.com/1XOuPt8.png" },
  { name: "Capital One", img: "https://i.imgur.com/u3Rr8rT.png" },
  { name: "Barclays", img: "https://i.imgur.com/bsjoGQv.png" },
  { name: "Citi", img: "https://i.imgur.com/3xnhXZo.png" },
  { name: "Wells Fargo", img: "https://i.imgur.com/GJT4lHt.png" },
  { name: "Bank of America", img: "https://i.imgur.com/PsqVIEx.png" },
];

export const CARD_TYPE = ["Personal", "Business"];
export const ACCOUNT_TYPE = ["airlines", "hotels", "misc"];
export const CARD_STATUS = ["open", "closed", "downgraded"];
export const PROGRAMS = [
  {
    id: 1,
    type: "airlines",
    name: "American AAdvantage",
    img: "https://i.imgur.com/0UD33Y8.png",
    url: "https://www.aa.com/loyalty/login?uri=%2floyalty%2flogin&previousPage=&bookingPathStateId=&marketId=",
  },
  {
    id: 2,
    type: "airlines",
    name: "United MileagePlus",
    img: "https://i.imgur.com/IAWs57y.png",
    url: "https://www.united.com/ual/en/us/sso?return_to=wsta",
  },
  {
    id: 3,
    type: "airlines",
    name: "SouthWest",
    img: "https://i.imgur.com/4BseEAn.png",
    url: "https://www.southwest.com/loyalty/myaccount/",
  },
  {
    id: 4,
    type: "airlines",
    name: "Delta",
    img: "https://i.imgur.com/W6lIiX5.png",
  },
  {
    id: 5,
    type: "airlines",
    name: "Turkish Airlines",
    img: "https://i.imgur.com/aeoorRK.png",
  },
  {
    id: 6,
    type: "airlines",
    name: "Etihad Guest",
    img: "https://i.imgur.com/vuJCxdN.png",
  },
  {
    id: 7,
    type: "airlines",
    name: "British Airways",
    img: "https://i.imgur.com/KewcSxm.png",
    url: "https://www.britishairways.com/travel/home/public/en_us/",
  },
  {
    id: 8,
    type: "airlines",
    name: "Qatar Airways",
    img: "https://i.imgur.com/nFQMegw.png",
    url: "https://www.qatarairways.com/en-gb/Privilege-Club/loginpage.html",
  },
  {
    id: 9,
    type: "airlines",
    name: "Singapore Air",
    img: "https://i.imgur.com/5wGl5W8.png",
  },
  {
    id: 10,
    type: "airlines",
    name: "Korean Skypass",
    img: "https://i.imgur.com/dwzSiBX.png",
  },
  {
    id: 11,
    type: "airlines",
    name: "Flying Blue - AirFrance/KLM",
    img: "https://i.imgur.com/l9kf8zG.png",
    url: "https://login.klm.com/login/otp",
  },
  {
    id: 12,
    type: "airlines",
    name: "Frontier",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: 13,
    type: "airlines",
    name: "Asiana Airlines",
    img: "https://i.imgur.com/oPoKtH5.png",
  },
  {
    id: 14,
    type: "airlines",
    name: "Qantas",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: 15,
    type: "airlines",
    name: "Ana Mileage Club",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: 16,
    type: "airlines",
    name: "Alaska Airlines",
    img: "https://i.imgur.com/lz8tJu3.png",
  },
  {
    id: 17,
    type: "airlines",
    name: "Hawaiian Airlines",
    img: "https://i.imgur.com/yZ1CCBd.png",
  },
  {
    id: 18,
    type: "misc",
    name: "AwardWallet",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: 19,
    type: "misc",
    name: "Priority Pass",
    img: "https://i.imgur.com/zsKSMjM.png",
  },
  {
    id: 20,
    type: "misc",
    name: "AA eShopping",
    img: "https://i.imgur.com/B7Jvm5b.png",
    url: "https://www.aadvantageeshopping.com/j____.htm",
  },
  {
    id: 21,
    type: "misc",
    name: "Global Entry",
    img: "https://i.imgur.com/dFmgSFt.jpg",
  },
  {
    id: 22,
    type: "misc",
    name: "Hertz Rentals",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: 23,
    type: "hotels",
    name: "IHG",
    img: "https://i.imgur.com/sj4njcR.png",
  },
  {
    id: 24,
    type: "hotels",
    name: "Hilton Honors",
    img: "https://i.imgur.com/3A83gV6.png",
    url: "https://www.hilton.com/en/hilton-honors/login/?forwardPageURI=%252Fen%252Fhilton-honors%252Fguest%252Fmy-account%252F",
  },
  {
    id: 25,
    type: "hotels",
    name: "Club Carlson",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: 26,
    type: "hotels",
    name: "Marriott/SPG",
    img: "https://i.imgur.com/DnJUT35.png",
  },
  {
    id: 27,
    type: "hotels",
    name: "Hyatt",
    img: "https://i.imgur.com/XbQJMri.png",
    url: "https://www.hyatt.com/en-US/member/sign-in",
  },
  {
    id: 28,
    type: "misc",
    name: "Chase Ultimate Rewards",
    img: "https://firebasestorage.googleapis.com/v0/b/cc-tracker-new.appspot.com/o/images%2Fchase_UR.png?alt=media&token=964ca70a-2bba-47f2-8368-d4c414ac810f&_gl=1*1hr61hr*_ga*MTMyNTkwOTMwOC4xNjkxNDIzMzUw*_ga_CW55HF8NVT*MTY5NzY3Mjc0Ni41NS4xLjE2OTc2NzI3NTQuNTIuMC4w",
  },
  {
    id: 29,
    type: "misc",
    name: "Capital One Rewards",
    img: "https://i.imgur.com/u3Rr8rT.png",
  },
  {
    id: 30,
    type: "misc",
    name: "Amtrak",
    img: "https://imgur.com/HJoyVAz.png",
  },
];

export const USERS = [
  {
    id: 1,
    name: "Swaroop Uprety",
  },
  {
    id: 2,
    name: "Anshu Thapa",
  },
  {
    id: 3,
    name: "Astha Thapa",
  },
  {
    id: 4,
    name: "Tulasi Uprety",
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

export const DELETE_MODAL_TYPES = {
  card: "card",
  loyaltyAcc: "loyaltyAcc",
  cardholder: "cardholder",
  referral: "referral",
};

export const CARDHOLDER_STOCK_IMG = "https://i.imgur.com/JFgA7EB.png";
export const HEADER_CARD_LOGO = "https://i.imgur.com/oow4rrn.png";
export const CLOSED_CARD_STAMP = "https://i.imgur.com/uAgLvwh.png";
export const DOWNGRADED_CARD_STAMP = "https://i.imgur.com/CWz7lFi.png";

export const NOTIFICATIONS_AF_DATA_TYPE = "annualFee";
export const NOTIFICATIONS_SPEND_BY_DATA_TYPE = "spendBy";
export const NOTIFICATIONS_LOYALTY_DATA_TYPE = "loyalty";
