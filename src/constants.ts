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
  experian: false,
  equifax: false,
  transunion: false,
};

export const NEW_CARD = {
  id: "",
  appDate: "",
  issuer: {
    name: "",
    img: "",
  },
  card: "",
  cardType: "",
  userId: "",
  inquiries: INQUIRIES,
  annualFee: "0",
  nextFeeDate: "",
  creditLine: "",
  spendReq: "0",
  spendBy: "",
  signupBonus: "",
  bonusEarned: false,
  bonusEarnDate: "",
  status: "",
  cardholder: "",
};

export const NEW_NOTE = {
  note: "",
  date: "",
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
} as const;

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
} as const;

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
} as const;

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
    id: "airlines-american-aadvantage",
    type: "airlines",
    name: "American AAdvantage",
    img: "https://i.imgur.com/0UD33Y8.png",
    url: "https://www.aa.com/loyalty/login?uri=%2floyalty%2flogin&previousPage=&bookingPathStateId=&marketId=",
  },
  {
    id: "airlines-united-mileageplus",
    type: "airlines",
    name: "United MileagePlus",
    img: "https://i.imgur.com/IAWs57y.png",
    url: "https://www.united.com/ual/en/us/sso?return_to=wsta",
  },
  {
    id: "airlines-southwest",
    type: "airlines",
    name: "SouthWest",
    img: "https://i.imgur.com/4BseEAn.png",
    url: "https://www.southwest.com/loyalty/myaccount/",
  },
  {
    id: "airlines-delta",
    type: "airlines",
    name: "Delta",
    img: "https://i.imgur.com/W6lIiX5.png",
  },
  {
    id: "airlines-turkish",
    type: "airlines",
    name: "Turkish Airlines",
    img: "https://i.imgur.com/aeoorRK.png",
  },
  {
    id: "airlines-etihad-guest",
    type: "airlines",
    name: "Etihad Guest",
    img: "https://i.imgur.com/vuJCxdN.png",
  },
  {
    id: "airlines-british-airways",
    type: "airlines",
    name: "British Airways",
    img: "https://i.imgur.com/KewcSxm.png",
    url: "https://www.britishairways.com/travel/home/public/en_us/",
  },
  {
    id: "airlines-qatar-airways",
    type: "airlines",
    name: "Qatar Airways",
    img: "https://i.imgur.com/nFQMegw.png",
    url: "https://www.qatarairways.com/en-gb/Privilege-Club/loginpage.html",
  },
  {
    id: "airlines-singapore-air",
    type: "airlines",
    name: "Singapore Air",
    img: "https://i.imgur.com/5wGl5W8.png",
  },
  {
    id: "airlines-korean-skypass",
    type: "airlines",
    name: "Korean Skypass",
    img: "https://i.imgur.com/dwzSiBX.png",
  },
  {
    id: "airlines-flying-blue-airfrance-klm",
    type: "airlines",
    name: "Flying Blue - AirFrance/KLM",
    img: "https://i.imgur.com/l9kf8zG.png",
    url: "https://login.klm.com/login/otp",
  },
  {
    id: "airlines-frontier",
    type: "airlines",
    name: "Frontier",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: "airlines-asiana",
    type: "airlines",
    name: "Asiana Airlines",
    img: "https://i.imgur.com/oPoKtH5.png",
  },
  {
    id: "airlines-qantas",
    type: "airlines",
    name: "Qantas",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: "airlines-ana-mileage-club",
    type: "airlines",
    name: "Ana Mileage Club",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: "airlines-alaska-airlines",
    type: "airlines",
    name: "Alaska Airlines",
    img: "https://i.imgur.com/lz8tJu3.png",
  },
  {
    id: "airlines-hawaiian-airlines",
    type: "airlines",
    name: "Hawaiian Airlines",
    img: "https://i.imgur.com/yZ1CCBd.png",
  },
  {
    id: "misc-awardwallet",
    type: "misc",
    name: "AwardWallet",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: "misc-priority-pass",
    type: "misc",
    name: "Priority Pass",
    img: "https://i.imgur.com/zsKSMjM.png",
  },
  {
    id: "misc-aa-eshopping",
    type: "misc",
    name: "AA eShopping",
    img: "https://i.imgur.com/B7Jvm5b.png",
    url: "https://www.aadvantageeshopping.com/j____.htm",
  },
  {
    id: "misc-global-entry",
    type: "misc",
    name: "Global Entry",
    img: "https://i.imgur.com/dFmgSFt.jpg",
  },
  {
    id: "misc-hertz-rentals",
    type: "misc",
    name: "Hertz Rentals",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: "hotels-ihg",
    type: "hotels",
    name: "IHG",
    img: "https://i.imgur.com/sj4njcR.png",
  },
  {
    id: "hotels-hilton-honors",
    type: "hotels",
    name: "Hilton Honors",
    img: "https://i.imgur.com/3A83gV6.png",
    url: "https://www.hilton.com/en/hilton-honors/login/?forwardPageURI=%252Fen%252Fhilton-honors%252Fguest%252Fmy-account%252F",
  },
  {
    id: "hotels-club-carlson",
    type: "hotels",
    name: "Club Carlson",
    img: "https://i.imgur.com/B7Jvm5b.png",
  },
  {
    id: "hotels-marriott-spg",
    type: "hotels",
    name: "Marriott/SPG",
    img: "https://i.imgur.com/DnJUT35.png",
  },
  {
    id: "hotels-hyatt",
    type: "hotels",
    name: "Hyatt",
    img: "https://i.imgur.com/XbQJMri.png",
    url: "https://www.hyatt.com/en-US/member/sign-in",
  },
  {
    id: "misc-chase-ultimate-rewards",
    type: "misc",
    name: "Chase Ultimate Rewards",
    img: "https://firebasestorage.googleapis.com/v0/b/cc-tracker-new.appspot.com/o/images%2Fchase_UR.png?alt=media&token=964ca70a-2bba-47f2-8368-d4c414ac810f&_gl=1*1hr61hr*_ga*MTMyNTkwOTMwOC4xNjkxNDIzMzUw*_ga_CW55HF8NVT*MTY5NzY3Mjc0Ni41NS4xLjE2OTc2NzI3NTQuNTIuMC4w",
  },
  {
    id: "misc-capital-one-rewards",
    type: "misc",
    name: "Capital One Rewards",
    img: "https://i.imgur.com/u3Rr8rT.png",
  },
  {
    id: "misc-amtrak",
    type: "misc",
    name: "Amtrak",
    img: "https://imgur.com/HJoyVAz.png",
  },
  {
    id: "hotels-marriott-bonvoy",
    type: "hotels",
    name: "Marriott Bonvoy",
    img: "https://www.marriott.com/sign-in.mi",
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
export const AIRLINE_PROGRAMS_IMG = "https://i.imgur.com/B7Jvm5b.png";
export const HOTELS_PROGRAMS_IMG = "https://i.imgur.com/fx3xMcJ.png";
export const MISC_PROGRAMS_IMG = "https://i.imgur.com/v0x6olF.png";

export const NOTIFICATIONS_AF_DATA_TYPE = "annualFee";
export const NOTIFICATIONS_SPEND_BY_DATA_TYPE = "spendBy";
export const NOTIFICATIONS_LOYALTY_DATA_TYPE = "loyalty";
