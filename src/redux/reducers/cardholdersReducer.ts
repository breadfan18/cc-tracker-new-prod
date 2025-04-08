import initialState from "./initialState";
import {
  CREATE_CARDHOLDER_SUCCESS,
  LOAD_CARDHOLDERS_SUCCESS,
  DELETE_CARDHOLDER_SUCCESS,
  UPDATE_CARDHOLDER_SUCCESS,
} from "../actions/actionTypes";
import { Cardholder } from "../../types/cardholder-types";
import { CardholderActionTypes } from "../../types/redux";

export default function cardholdersReducer(
  state: Cardholder[] = initialState.cardholders,
  action: CardholderActionTypes
): Cardholder[] {
  switch (action.type) {
    case LOAD_CARDHOLDERS_SUCCESS:
      return action.payload;
    case CREATE_CARDHOLDER_SUCCESS:
      /* This is just returning state instead of [...state, { ...action.cardholder }]
      because Firebase real time database adds new data immediately..
      so it's already available in state */
      return state;
    case UPDATE_CARDHOLDER_SUCCESS:
      return state.map((loyaltyAcc) =>
        loyaltyAcc.id === action.payload.id ? action.payload : loyaltyAcc
      );
    case DELETE_CARDHOLDER_SUCCESS:
      return state.filter((holder) => holder.id !== action.payload.id);
    default:
      return state;
  }
}
