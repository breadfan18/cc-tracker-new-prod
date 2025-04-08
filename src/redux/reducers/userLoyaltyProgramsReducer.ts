import initialState from "./initialState";
import {
  LOAD_LOYALTY_PROGRAMS_SUCCESS,
  CREATE_LOYALTY_PROGRAM_SUCCESS,
  UPDATE_LOYALTY_PROGRAM_SUCCESS,
  DELETE_LOYALTY_PROGRAM_SUCCESS,
} from "../actions/actionTypes";
import { LoyaltyProgram } from "../../types/loyalty-types";
import { LoyaltyProgramActionTypes } from "../../types/redux";

export default function userLoyaltyProgramsReducer(
  state: LoyaltyProgram[] = initialState.userLoyaltyPrograms,
  action: LoyaltyProgramActionTypes
): LoyaltyProgram[] {
  switch (action.type) {
    case LOAD_LOYALTY_PROGRAMS_SUCCESS:
      return action.payload;
    case CREATE_LOYALTY_PROGRAM_SUCCESS:
      /* This is just returning state instead of [...state, { ...action.loyalty }]
      because Firebase real time database adds new data immediately..
      so it's already available in state */
      return state;
    case UPDATE_LOYALTY_PROGRAM_SUCCESS:
      return state.map((program) =>
        program.id === action.payload.id ? action.payload : program
      );
    case DELETE_LOYALTY_PROGRAM_SUCCESS:
      return state.filter((loyaltyAcc) => loyaltyAcc.id !== action.payload.id);
    default:
      return state;
  }
}
