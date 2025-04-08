import { beginApiCall } from "./apiStatusActions";
import {
  CREATE_CARDHOLDER_SUCCESS,
  LOAD_CARDHOLDERS_SUCCESS,
  DELETE_CARDHOLDER_SUCCESS,
} from "./actionTypes";
import {
  deleteFromFirebase,
  getFireBaseData,
  writeToFirebase,
} from "../../tools/firebase";
import { slugify } from "../../helpers";
import { ActionThunkReturn, ActionTypes } from "../../types/redux";
import { Cardholder } from "../../types/cardholder-types";

function loadCardholdersSuccess(cardholders: Cardholder[]): ActionTypes {
  return { type: LOAD_CARDHOLDERS_SUCCESS, payload: cardholders };
}

function createCardholderSuccess(cardholder: Cardholder): ActionTypes {
  return { type: CREATE_CARDHOLDER_SUCCESS, payload: cardholder };
}

function deleteCardholderSuccess(cardholder: Cardholder): ActionTypes {
  return { type: DELETE_CARDHOLDER_SUCCESS, payload: cardholder };
}

export function loadCardholdersFromFirebase(
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData(
      "cardHolders",
      dispatch,
      loadCardholdersSuccess,
      firebaseUid
    );
  };
}

export function saveCardholderToFirebase(
  cardholder: Cardholder,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    /*
      BUG: dispatching beginApiCall twice here..This is a workaround for the followinsg issue:
      - Everytime new data is created or saved, redux fires LOAD and CREATE/UPDATE SUCCESS
      - This causes apiCallsInProgress to go negative. 
      - Need to understand why the LOAD action fires on Create/Update
    */
    dispatch(beginApiCall());
    dispatch(beginApiCall());

    const cardholderId =
      cardholder.id === "" ? slugify(cardholder.name) : cardholder.id;

    writeToFirebase("cardHolders", cardholder, cardholderId, firebaseUid);
    dispatch(createCardholderSuccess(cardholder));
  };
}

export function deleteCardholderFromFirebase(
  cardholder: Cardholder,
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase("cardHolders", cardholder.id, firebaseUid);
    dispatch(deleteCardholderSuccess(cardholder));
  };
}
