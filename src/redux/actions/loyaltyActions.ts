import { sliceLoadingDone, sliceLoadingStart } from "./uiLoadingActions";
import {
  CREATE_LOYALTY_DATA_SUCCESS,
  DELETE_LOYALTY_ACC_SUCCESS,
  LOAD_LOYALTY_DATA_SUCCESS,
  LOAD_LOYALTY_PROGRAMS_SUCCESS,
  CREATE_LOYALTY_PROGRAM_SUCCESS,
} from "./actionTypes";
import {
  deleteFromFirebase,
  subscribeToFirebaseData,
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
    dispatch(sliceLoadingStart("loyaltyData"));
    subscribeToFirebaseData<LoyaltyData>(
      "loyaltyData",
      dispatch,
      loadLoyaltyDataSuccess,
      firebaseUid,
      () => dispatch(sliceLoadingDone("loyaltyData"))
    );
  };
}

export function saveLoyaltyDataToFirebase(
  loyaltyAcc: LoyaltyData,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    const loyaltyId =
      loyaltyAcc.id === ""
        ? slugify(
            loyaltyAcc.program.name + "-" + loyaltyAcc.userId + "-" + uid()
          )
        : loyaltyAcc.id;

    await writeToFirebase("loyaltyData", loyaltyAcc, loyaltyId, firebaseUid);
    dispatch(createLoyaltyAccSuccess(loyaltyAcc));
  };
}

export function deleteLoyaltyDataFromFirebase(
  loyaltyAcc: LoyaltyData,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    await deleteFromFirebase("loyaltyData", loyaltyAcc.id, firebaseUid);
    dispatch(deleteLoyaltyAccSuccess(loyaltyAcc));
  };
}

export function loadUserLoyaltyProgramsFromFirebase(
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    dispatch(sliceLoadingStart("userLoyaltyPrograms"));
    subscribeToFirebaseData<LoyaltyProgram>(
      "userLoyaltyPrograms",
      dispatch,
      loadLoyaltyProgramsSuccess,
      firebaseUid,
      () => dispatch(sliceLoadingDone("userLoyaltyPrograms"))
    );
  };
}

export function saveUserLoyaltyProgramToFirebase(
  program: LoyaltyProgram,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    const programId = `${program.type}-${slugify(program.name)}-${uid()}`;
    await writeToFirebase(
      "userLoyaltyPrograms",
      program,
      programId,
      firebaseUid
    );
    dispatch(createLoyaltyProgramSuccess(program));
  };
}
