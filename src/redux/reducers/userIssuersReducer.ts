import initialState from "./initialState";
import {
  LOAD_ISSUERS_SUCCESS,
  CREATE_ISSUER_SUCCESS,
} from "../actions/actionTypes";
import { Issuer } from "../../types/cards-types";
import { IssuerActionTypes } from "../../types/redux";

export default function userIssuersReducer(
  state: Issuer[] = initialState.userIssuers,
  action: IssuerActionTypes,
): Issuer[] {
  switch (action.type) {
    case LOAD_ISSUERS_SUCCESS:
      return action.payload;
    case CREATE_ISSUER_SUCCESS:
      return state.some(
        (issuer) =>
          issuer.name.toLowerCase() === action.payload.name.toLowerCase(),
      )
        ? state
        : [...state, action.payload];
    default:
      return state;
  }
}
