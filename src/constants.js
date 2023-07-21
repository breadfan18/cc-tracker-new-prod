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
  { name: "Citi", img: "https://i.imgur.com/3xnhXZo.png" },
  { name: "WellsFargo", img: "https://i.imgur.com/GJT4lHt.png" },
];

export const CARD_TYPE = ["Personal", "Business"];
export const ACCOUNT_TYPE = ["airlines", "hotels", "misc"];
export const ACC_STATUS = ["open", "closed", "downgraded"];
export const PROGRAMS = [
  {
    id: 1,
    type: 'airlines',
    name: 'American AAdvantage',
    img: 'https://i.imgur.com/Pc1I7uX.png'
  },
  {
    id: 2,
    type: 'airlines',
    name: 'United MileagePlus',
    img: 'https://i.imgur.com/znFTwQ1.png'
  },
  {
    id: 3,
    type: 'airlines',
    name: 'SouthWest',
    img: 'https://i.imgur.com/4BseEAn.png'
  },
  {
    id: 4,
    type: 'airlines',
    name: 'Delta',
    img: 'https://i.imgur.com/W6lIiX5.png'
  },
  {
    id: 5,
    type: 'airlines',
    name: 'Turkish Airlines',
    img: 'https://i.imgur.com/aeoorRK.png'
  },
  {
    id: 6,
    type: 'airlines',
    name: 'Etihad Guest',
    img: 'https://i.imgur.com/vuJCxdN.png'
},
  {
    id: 7,
    type: 'airlines',
    name: 'British Airways',
    img: 'https://i.imgur.com/KewcSxm.png'
  },
  {
    id: 8,
    type: 'airlines',
    name: 'Qatar Airways',
    img: 'https://i.imgur.com/nFQMegw.png'
  },
  {
    id: 9,
    type: 'airlines',
    name: 'Singapore Air',
    img: 'https://i.imgur.com/5wGl5W8.png'
  },
  {
    id: 10,
    type: 'airlines',
    name: 'Korean Skypass',
    img: 'https://i.imgur.com/dwzSiBX.png'
  },
  {
    id: 11,
    type: 'airlines',
    name: 'Air France Flying Blue',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 12,
    type: 'airlines',
    name: 'Frontier',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 13,
    type: 'airlines',
    name: 'Asiana Airlines',
    img: 'https://i.imgur.com/oPoKtH5.png'
  },
  {
    id: 14,
    type: 'airlines',
    name: 'Qantas',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 15,
    type: 'airlines',
    name: 'Ana Mileage Club',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 16,
    type: 'airlines',
    name: 'Alaska Airlines',
    img: 'https://i.imgur.com/lz8tJu3.png'
  },
  {
    id: 17,
    type: 'airlines',
    name: 'Hawaiian Airlines',
    img: 'https://i.imgur.com/yZ1CCBd.png'
  },
  {
    id: 18,
    type: 'misc',
    name: 'AwardWallet',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 19,
    type: 'misc',
    name: 'Priority Pass',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 20,
    type: 'misc',
    name: 'AA eShopping',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 21,
    type: 'misc',
    name: 'Global Entry',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 22,
    type: 'misc',
    name: 'Hertz Rentals',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 23,
    type: 'hotels',
    name: 'IHG',
    img: 'https://i.imgur.com/sj4njcR.png'
  },
  {
    id: 24,
    type: 'hotels',
    name: 'Hilton Honors',
    img: 'https://i.imgur.com/3A83gV6.png'
  },
  {
    id: 25,
    type: 'hotels',
    name: 'Club Carlson',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 26,
    type: 'hotels',
    name: 'Marriott/SPG',
    img: 'https://i.imgur.com/DnJUT35.png'
  },
  {
    id: 27,
    type: 'hotels',
    name: 'Hyatt',
    img: 'https://i.imgur.com/XbQJMri.png'
  }
]

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
