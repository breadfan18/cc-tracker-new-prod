import initialState from "./initialState";
import {
  CREATE_CARDHOLDER_SUCCESS,
  LOAD_CARDHOLDERS_SUCCESS,
  UPDATE_CARDHOLDER_SUCCESS,
  DELETE_CARDHOLDER_SUCCESS,
} from "../actions/actionTypes";

export default function loyaltyReducer(
  state = initialState.cardholders,
  action
) {
  switch (action.type) {
    case LOAD_CARDHOLDERS_SUCCESS:
      return action.cardholders;
    case CREATE_CARDHOLDER_SUCCESS:
      /* This is just returning state instead of [...state, { ...action.cardholder }]
      because Firebase real time database adds new data immediately..
      so it's already available in state */
      return state;
    // case UPDATE_CARDHOLDER_SUCCESS:
    //   return state.map((loyaltyAcc) =>
    //     loyaltyAcc.id === action.loyalty.id ? action.loyalty : loyaltyAcc
    //   );
    case DELETE_CARDHOLDER_SUCCESS:
      return state.filter((holder) => holder.id !== action.cardholder.id);
    default:
      return state;
  }
}
