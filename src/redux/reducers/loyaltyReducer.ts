import initialState from "./initialState";
import {
  CREATE_LOYALTY_DATA_SUCCESS,
  DELETE_LOYALTY_ACC_SUCCESS,
  LOAD_LOYALTY_DATA_SUCCESS,
  UPDATE_LOYALTY_DATA_SUCCESS,
} from "../actions/actionTypes";
import { LoyaltyData } from "../../types/loyalty-types";
import { LoyaltyActionTypes } from "../../types/redux";

export default function loyaltyReducer(
  state: LoyaltyData[] = initialState.loyaltyData,
  action: LoyaltyActionTypes
): LoyaltyData[] {
  switch (action.type) {
    case LOAD_LOYALTY_DATA_SUCCESS:
      return action.payload;
    case CREATE_LOYALTY_DATA_SUCCESS:
      /* This is just returning state instead of [...state, { ...action.loyalty }]
      because Firebase real time database adds new data immediately..
      so it's already available in state */
      return state;
    case UPDATE_LOYALTY_DATA_SUCCESS:
      return state.map((loyaltyAcc) =>
        loyaltyAcc.id === action.payload.id ? action.payload : loyaltyAcc
      );
    case DELETE_LOYALTY_ACC_SUCCESS:
      return state.filter((loyaltyAcc) => loyaltyAcc.id !== action.payload.id);
    default:
      return state;
  }
}
