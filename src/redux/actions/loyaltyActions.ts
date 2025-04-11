import { beginApiCall } from "./apiStatusActions";
import {
  CREATE_LOYALTY_DATA_SUCCESS,
  DELETE_LOYALTY_ACC_SUCCESS,
  LOAD_LOYALTY_DATA_SUCCESS,
  LOAD_LOYALTY_PROGRAMS_SUCCESS,
  CREATE_LOYALTY_PROGRAM_SUCCESS,
} from "./actionTypes";
import {
  deleteFromFirebase,
  getFireBaseData,
  writeToFirebase,
} from "../../tools/firebase";
import { slugify } from "../../helpers";
import { uid } from "uid";
import { ActionThunkReturn, ActionTypes } from "../../types/redux";
import { LoyaltyData, LoyaltyProgram } from "../../types/loyalty-types";

function loadLoyaltyDataSuccess(loyaltyData: LoyaltyData[]) {
  return { type: LOAD_LOYALTY_DATA_SUCCESS, payload: loyaltyData };
}
function createLoyaltyAccSuccess(loyalty: LoyaltyData): ActionTypes {
  return { type: CREATE_LOYALTY_DATA_SUCCESS, payload: loyalty };
}

function deleteLoyaltyAccSuccess(loyalty: LoyaltyData): ActionTypes {
  return { type: DELETE_LOYALTY_ACC_SUCCESS, payload: loyalty };
}
function loadLoyaltyProgramsSuccess(programs: LoyaltyProgram[]): ActionTypes {
  return { type: LOAD_LOYALTY_PROGRAMS_SUCCESS, payload: programs };
}
function createLoyaltyProgramSuccess(program: LoyaltyProgram): ActionTypes {
  return { type: CREATE_LOYALTY_PROGRAM_SUCCESS, payload: program };
}
// function updateLoyaltyAccountSuccess(loyalty: LoyaltyData): ActionTypes {
//   return { type: UPDATE_LOYALTY_DATA_SUCCESS, payload: loyalty };
// }
// function updateLoyaltyProgramSuccess(program: LoyaltyProgram): ActionTypes {
//   return { type: UPDATE_LOYALTY_PROGRAM_SUCCESS, payload: program };
// }
// function deleteLoyaltyProgramSuccess(program: LoyaltyProgram): ActionTypes {
//   return { type: DELETE_LOYALTY_PROGRAM_SUCCESS, payload: program };
// }

export function loadloyaltyDataFromFirebase(
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData(
      "loyaltyData",
      dispatch,
      loadLoyaltyDataSuccess,
      firebaseUid
    );
  };
}

export function saveLoyaltyDataToFirebase(
  loyaltyAcc: LoyaltyData,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    /*
      BUG: dispatching beginApiCall twice here..This is a workaround for the followinsg issue:
      - Everytime new data is created or saved, redux fires LOAD and CREATE/UPDATE SUCCESS
      - This causes apiCallsInProgress to go negative. 
      - Need to understand why the LOAD action fires on Create/Update
    */
    // dispatch(beginApiCall());
    dispatch(beginApiCall());

    const loyaltyId =
      loyaltyAcc.id === ""
        ? slugify(
            loyaltyAcc.program.name + "-" + loyaltyAcc.userId + "-" + uid()
          )
        : loyaltyAcc.id;

    writeToFirebase("loyaltyData", loyaltyAcc, loyaltyId, firebaseUid);
    dispatch(createLoyaltyAccSuccess(loyaltyAcc));
  };
}

export function deleteLoyaltyDataFromFirebase(
  loyaltyAcc: LoyaltyData,
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    // dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase("loyaltyData", loyaltyAcc.id, firebaseUid);
    dispatch(deleteLoyaltyAccSuccess(loyaltyAcc));
  };
}

export function loadUserLoyaltyProgramsFromFirebase(
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData(
      "userLoyaltyPrograms",
      dispatch,
      loadLoyaltyProgramsSuccess,
      firebaseUid
    );
  };
}

export function saveUserLoyaltyProgramToFirebase(
  program: LoyaltyProgram,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    /*
      BUG: dispatching beginApiCall twice here..This is a workaround for the followinsg issue:
      - Everytime new data is created or saved, redux fires LOAD and CREATE/UPDATE SUCCESS
      - This causes apiCallsInProgress to go negative. 
      - Need to understand why the LOAD action fires on Create/Update
    */
    // dispatch(beginApiCall());
    dispatch(beginApiCall());
    const programId = `${program.type}-${slugify(program.name)}-${uid()}`;
    writeToFirebase("userLoyaltyPrograms", program, programId, firebaseUid);
    dispatch(createLoyaltyProgramSuccess(program));
  };
}
