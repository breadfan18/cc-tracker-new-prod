import initialState from "./initialState";
import {
  CREATE_REFERRAL_SUCCESS,
  LOAD_REFERRAL_SUCCESS,
  DELETE_REFERRAL_SUCCESS,
} from "../actions/actionTypes";

export default function referralsReducer(
  state = initialState.referrals,
  action
) {
  switch (action.type) {
    case LOAD_REFERRAL_SUCCESS:
      return action.payload;
    case CREATE_REFERRAL_SUCCESS:
      /* This is just returning state instead of [...state, { ...action.cardholder }]
      because Firebase real time database adds new data immediately..
      so it's already available in state */
      return state;
    // case UPDATE_REFERRAL_SUCCESS:
    //   return state.map((loyaltyAcc) =>
    //     loyaltyAcc.id === action.loyalty.id ? action.loyalty : loyaltyAcc
    //   );
    case DELETE_REFERRAL_SUCCESS:
      return state.filter((referral) => referral.id !== action.payload.id);
    default:
      return state;
  }
}
