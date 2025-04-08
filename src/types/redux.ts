import {
  LOAD_LOYALTY_DATA_SUCCESS,
  CREATE_LOYALTY_DATA_SUCCESS,
  UPDATE_LOYALTY_DATA_SUCCESS,
  DELETE_LOYALTY_ACC_SUCCESS,
  BEGIN_API_CALL,
  API_CALL_ERROR,
  LOAD_CARDHOLDERS_SUCCESS,
  CREATE_CARDHOLDER_SUCCESS,
  DELETE_CARDHOLDER_SUCCESS,
  UPDATE_CARDHOLDER_SUCCESS,
  LOAD_CARDS_SUCCESS,
  DELETE_CARD_SUCCESS,
  CREATE_CARDS_SUCCESS,
  UPDATE_CARDS_SUCCESS,
  LOAD_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATION_SUCCESS,
  LOAD_REFERRAL_SUCCESS,
  CREATE_REFERRAL_SUCCESS,
  DELETE_REFERRAL_SUCCESS,
  SET_THEME_DARK,
  SET_THEME_LIGHT,
  LOAD_LOYALTY_PROGRAMS_SUCCESS,
  CREATE_LOYALTY_PROGRAM_SUCCESS,
  UPDATE_LOYALTY_PROGRAM_SUCCESS,
  DELETE_LOYALTY_PROGRAM_SUCCESS,
} from "../redux/actions/actionTypes";
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

export type ApiActionTypes =
  | { type: typeof BEGIN_API_CALL }
  | { type: typeof API_CALL_ERROR }
  | { type: string };

export type LoyaltyActionTypes =
  | { type: typeof LOAD_LOYALTY_DATA_SUCCESS; payload: LoyaltyData[] }
  | { type: typeof CREATE_LOYALTY_DATA_SUCCESS; payload: LoyaltyData }
  | { type: typeof UPDATE_LOYALTY_DATA_SUCCESS; payload: LoyaltyData }
  | { type: typeof DELETE_LOYALTY_ACC_SUCCESS; payload: LoyaltyData };

export type CardholderActionTypes =
  | { type: typeof LOAD_CARDHOLDERS_SUCCESS; payload: Cardholder[] }
  | { type: typeof CREATE_CARDHOLDER_SUCCESS; payload: Cardholder }
  | { type: typeof UPDATE_CARDHOLDER_SUCCESS; payload: Cardholder }
  | { type: typeof DELETE_CARDHOLDER_SUCCESS; payload: Cardholder };

export type CardActionTypes =
  | { type: typeof LOAD_CARDS_SUCCESS; payload: Card[] }
  | { type: typeof CREATE_CARDS_SUCCESS; payload: Card }
  | { type: typeof UPDATE_CARDS_SUCCESS; payload: Card }
  | { type: typeof DELETE_CARD_SUCCESS; payload: Card };

export type NotificationActionTypes =
  | { type: typeof LOAD_NOTIFICATIONS_SUCCESS; payload: Notification[] }
  | { type: typeof DELETE_NOTIFICATION_SUCCESS; payload: Notification };

export type ReferralActionTypes =
  | { type: typeof LOAD_REFERRAL_SUCCESS; payload: Referral[] }
  | { type: typeof CREATE_REFERRAL_SUCCESS; payload: Referral }
  | { type: typeof DELETE_REFERRAL_SUCCESS; payload: Referral };

export type ThemeActionTypes =
  | { type: typeof SET_THEME_DARK }
  | { type: typeof SET_THEME_LIGHT };

export type LoyaltyProgramActionTypes =
  | { type: typeof LOAD_LOYALTY_PROGRAMS_SUCCESS; payload: LoyaltyProgram[] }
  | { type: typeof CREATE_LOYALTY_PROGRAM_SUCCESS; payload: LoyaltyProgram }
  | { type: typeof UPDATE_LOYALTY_PROGRAM_SUCCESS; payload: LoyaltyProgram }
  | { type: typeof DELETE_LOYALTY_PROGRAM_SUCCESS; payload: LoyaltyProgram };
