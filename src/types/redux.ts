import { Cardholder } from "./cardholder-types";
import { Card, Notification } from "./cards-types";
import { LoyaltyData, LoyaltyProgram } from "./loyalty-types";
import { Referral } from "./referral-types";

export type MainReduxState = {
  cards: Card[];
  loyaltyData: LoyaltyData[];
  apiCallsInProgress: number;
  cardholders: Cardholder[];
  referrals: Referral[];
  notifications: Notification[];
  theme: string;
  userLoyaltyPrograms: LoyaltyProgram[];
};

export type ActionTypes = {
  type: string;
  payload?: any;
};
