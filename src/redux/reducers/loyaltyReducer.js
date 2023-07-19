import initialState from "./initialState";
import {
  CREATE_LOYALTY_DATA_SUCCESS,
  DELETE_LOYALTY_ACC_SUCCESS,
  LOAD_LOYALTY_DATA_SUCCESS,
  UPDATE_LOYALTY_DATA_SUCCESS,
} from "../actions/actionTypes";

export default function loyaltyReducer(
  state = initialState.loyaltyData,
  action
) {
  switch (action.type) {
    case LOAD_LOYALTY_DATA_SUCCESS:
      return action.loyaltyData;
    case CREATE_LOYALTY_DATA_SUCCESS:
      /* This is just returning state instead of [...state, { ...action.loyalty }]
      because Firebase real time database adds new data immediately..
      so it's already available in state */
      return state;
    case UPDATE_LOYALTY_DATA_SUCCESS:
      return state.map((loyaltyAcc) =>
        loyaltyAcc.id === action.loyalty.id ? action.loyalty : loyaltyAcc
      );
    case DELETE_LOYALTY_ACC_SUCCESS:
      return state.filter((loyaltyAcc) => loyaltyAcc.id !== action.loyalty.id);
    default:
      return state;
  }
}
