export type Card = {
  id: string;
  appDate: string;
  issuer: Issuer;
  card: string;
  cardType: string;
  userId: string;
  inquiries: {
    equifax: boolean;
    experian: boolean;
    transunion: boolean;
  };
  annualFee: string;
  nextFeeDate: string;
  creditLine: string;
  spendReq: string;
  spendBy: string;
  signupBonus: string;
  bonusEarned: boolean;
  bonusEarnDate: string;
  status: string;
  tags?: Tag[];
  cardNotes?: CardNote[];
  cardholder: string;
  isFav?: boolean;
};

export type Tag = {
  id: string;
  description: string;
  color: string;
  label: string;
};

export type CardNote = {
  id: string;
  date: string;
  note: string;
};

export type Issuer = {
  name: string;
  img: string;
};

export type CardTabsProps = {
  cards: Card[];
  windowWidth: number;
  isDesktop: boolean;
};

export type Cardholder = {
  id: string;
  img: string;
  name: string;
  email?: string;
  isPrimary?: boolean;
};

export type Referral = {
  id: string;
  issuer: Issuer;
  referralBonus: string;
  referralBonusEarned: boolean;
  referralDate: string;
  referralEarnDate: string;
  referralFor: string;
  referralLink: string;
  referredCard: string;
  referrerId: string;
  referringCardId: string;
};

export type Notification = {
  cardId: string;
  dateSent: string;
  notificationId: string;
  notificationType: string;
  pageNotification: string;
  sidebarNotification: string;
};
