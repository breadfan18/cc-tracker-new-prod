import { combineReducers } from "redux";
import cards from "./cardsReducer";
import loyaltyData from "./loyaltyReducer";
import cardholders from "./cardholdersReducer";
import referrals from "./referralsReducer";
import notifications from "./notificationsReducer";
import apiCallsInProgress from "./apiStatusReducer";
import theme from "./themeReducer";
import userLoyaltyPrograms from "./userLoyaltyProgramsReducer";
import { USER_LOGOUT_SUCCESS } from "../actions/actionTypes";
import { ActionTypes } from "../../types/redux";

const appReducer = combineReducers({
  cards,
  loyaltyData,
  apiCallsInProgress,
  cardholders,
  referrals,
  notifications,
  theme,
  userLoyaltyPrograms,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState | undefined, action: ActionTypes) => {
  // The following is done in order to reset the state on logout.
  if (state === undefined || action.type === USER_LOGOUT_SUCCESS) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
