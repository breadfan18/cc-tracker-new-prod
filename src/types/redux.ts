import { Cardholder } from "./cardholder-types";
import { Card, Referral, Notification } from "./cards-types";
import { LoyaltyData, UserLoyaltyPrograms } from "./loyalty-types";

export type MainReduxState = {
  cards: Card[];
  loyaltyData: LoyaltyData[];
  apiCallsInProgress: number;
  cardholders: Cardholder[];
  referrals: Referral[];
  notifications: Notification[];
  theme: string;
  userLoyaltyPrograms: UserLoyaltyPrograms[];
};
