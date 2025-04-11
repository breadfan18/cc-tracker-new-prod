export type Card = {
  id: string;
  appDate: string;
  issuer: Issuer;
  card: string;
  cardType: string;
  userId: string;
  inquiries: Inquiries;
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

export type Inquiries = {
  equifax: boolean;
  experian: boolean;
  transunion: boolean;
};

export type Tag = {
  id?: string;
  description: string;
  color: string;
  label: string;
};

export type CardNote = {
  id?: string;
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

export type Notification = {
  cardId?: string;
  loyaltyId?: string;
  dateSent: string;
  notificationId: string;
  notificationType: string;
  pageNotification: string;
  sidebarNotification: string;
};
