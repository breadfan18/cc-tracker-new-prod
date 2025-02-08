import { Card, Cardholder, Referral, Notification } from "./cardsTypes";
import { LoyaltyData, UserLoyaltyPrograms } from "./loyaltyTypes";

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
