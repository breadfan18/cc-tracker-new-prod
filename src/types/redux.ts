import { Cardholder } from "./cardholder-types";
import { Card, Notification } from "./cards-types";
import { LoyaltyData, LoyaltyProgram } from "./loyalty-types";
import { Referral } from "./referral-types";
import { ThunkAction } from "redux-thunk";

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

export type ActionTypes<T = any> = {
  type: string;
  payload?: T;
};

export type ActionThunkReturn = ThunkAction<
  void,
  MainReduxState,
  unknown,
  ActionTypes
>;
