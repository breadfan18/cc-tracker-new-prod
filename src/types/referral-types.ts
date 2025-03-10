import { CardsByHolder } from "./cardholder-types";
import { Issuer } from "./cards-types";

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

export type ReferralsListAndCardProps = {
  referrals: Referral[];
  cardsByHolder: CardsByHolder;
};

export type ReferralCardTextProps = {
  referral: Referral;
  dataType: string;
  cardsByHolder: CardsByHolder;
};

export type ReferralForModalType = Referral & {
  imgFile?: any;
};
