import { combineReducers } from "redux";
import cards from "./cardsReducer";
import loyaltyData from "./loyaltyReducer";
import cardholders from "./cardholdersReducer";
import apiCallsInProgress from "./apiStatusReducer";
import { USER_LOGOUT_SUCCESS } from "../actions/actionTypes";

const appReducer = combineReducers({
  cards,
  loyaltyData,
  apiCallsInProgress,
  cardholders,
});

const rootReducer = (state, action) => {
  // The following is done in order to reset the state on logout.
  if (action.type === USER_LOGOUT_SUCCESS) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
