import { combineReducers } from "redux";
import cards from "./cardsReducer";
import loyaltyData from "./loyaltyReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  cards,
  loyaltyData,
  apiCallsInProgress,
});

export default rootReducer;
