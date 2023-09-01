import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as loyaltyApi from "../../api/loyaltyApi";
import {
  CREATE_LOYALTY_DATA_SUCCESS,
  DELETE_LOYALTY_ACC_SUCCESS,
  LOAD_LOYALTY_DATA_SUCCESS,
  UPDATE_LOYALTY_DATA_SUCCESS,
} from "./actionTypes";
import {
  deleteFromFirebase,
  getFireBaseData,
  writeToFirebase,
} from "../../tools/firebase";
import { slugify } from "../../helpers";
import { uid } from "uid";

function loadLoyaltyDataSuccess(loyaltyData) {
  return { type: LOAD_LOYALTY_DATA_SUCCESS, loyaltyData };
}
function createLoyaltyAccSuccess(loyalty) {
  return { type: CREATE_LOYALTY_DATA_SUCCESS, loyalty };
}
function updateLoyaltyAccountSuccess(loyalty) {
  return { type: UPDATE_LOYALTY_DATA_SUCCESS, loyalty };
}
function deleteLoyaltyAccSuccess(loyalty) {
  return { type: DELETE_LOYALTY_ACC_SUCCESS, loyalty };
}

export function loadloyaltyDataFromFirebase(firebaseUid) {
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

export function saveLoyaltyDataToFirebase(loyaltyAcc, firebaseUid) {
  return async (dispatch) => {
    /*
      BUG: dispatching beginApiCall twice here..This is a workaround for the followinsg issue:
      - Everytime new data is created or saved, redux fires LOAD and CREATE/UPDATE SUCCESS
      - This causes apiCallsInProgress to go negative. 
      - Need to understand why the LOAD action fires on Create/Update
    */
    dispatch(beginApiCall());
    dispatch(beginApiCall());

    const loyaltyId =
      loyaltyAcc.id === null
        ? slugify(
            loyaltyAcc.program.name + "-" + loyaltyAcc.userId + "-" + uid()
          )
        : loyaltyAcc.id;

    writeToFirebase("loyaltyData", loyaltyAcc, loyaltyId, firebaseUid);
    dispatch(createLoyaltyAccSuccess(loyaltyAcc));
  };
}

export function deleteLoyaltyDataFromFirebase(loyaltyAcc, firebaseUid) {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase("loyaltyData", loyaltyAcc.id, firebaseUid);
    dispatch(deleteLoyaltyAccSuccess(loyaltyAcc));
  };
}

// JSON Server Functions for testing
export function loadloyaltyDataFromJsonServer() {
  return (dispatch) => {
    dispatch(beginApiCall());
    loyaltyApi
      .getLoyaltyData()
      .then((loyaltyData) => {
        dispatch(loadLoyaltyDataSuccess(loyaltyData));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveLoyaltyDataToJsonServer(loyalty) {
  return async (dispatch) => {
    return loyaltyApi
      .createLoyaltyData(loyalty)
      .then((savedAcc) => {
        loyalty.id
          ? dispatch(updateLoyaltyAccountSuccess(savedAcc))
          : dispatch(createLoyaltyAccSuccess(savedAcc));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteLoyaltyDataFromJsonServer(loyaltyAcc) {
  return (dispatch) => {
    return loyaltyApi
      .deleteLoyaltyAcc(loyaltyAcc)
      .then(() => {
        dispatch(deleteLoyaltyAccSuccess(loyaltyAcc));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
