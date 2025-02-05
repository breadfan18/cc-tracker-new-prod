import initialState from "./initialState";
import {
  LOAD_LOYALTY_PROGRAMS_SUCCESS,
  CREATE_LOYALTY_PROGRAM_SUCCESS,
  UPDATE_LOYALTY_PROGRAM_SUCCESS,
  DELETE_LOYALTY_PROGRAM_SUCCESS,
} from "../actions/actionTypes";

export default function userLoyaltyProgramsReducer(
  state = initialState.userLoyaltyPrograms,
  action
) {
  switch (action.type) {
    case LOAD_LOYALTY_PROGRAMS_SUCCESS:
      return action.programs;
    case CREATE_LOYALTY_PROGRAM_SUCCESS:
      /* This is just returning state instead of [...state, { ...action.loyalty }]
      because Firebase real time database adds new data immediately..
      so it's already available in state */
      return state;
    case UPDATE_LOYALTY_PROGRAM_SUCCESS:
      return state.map((program) =>
        program.id === action.loyalty.id ? action.loyalty : program
      );
    case DELETE_LOYALTY_PROGRAM_SUCCESS:
      return state.filter((loyaltyAcc) => loyaltyAcc.id !== action.loyalty.id);
    default:
      return state;
  }
}
