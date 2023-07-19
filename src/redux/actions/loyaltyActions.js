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

export function loadloyaltyDataFromFirebase() {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData("loyaltyData", dispatch, loadLoyaltyDataSuccess);
  };
}

export function saveLoyaltyDataToFirebase(loyaltyAcc) {
  return async (dispatch) => {
    dispatch(beginApiCall());

    const uuid =
      loyaltyAcc.id === null
        ? slugify(
            loyaltyAcc.program.name + "-" + loyaltyAcc.userId + "-" + uid()
          )
        : loyaltyAcc.id;

    writeToFirebase("loyaltyData", loyaltyAcc, uuid);
    dispatch(createLoyaltyAccSuccess(loyaltyAcc));
  };
}

export function deleteLoyaltyDataFromFirebase(loyaltyAcc) {
  return (dispatch) => {
    deleteFromFirebase("loyaltyData", loyaltyAcc.id);
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
