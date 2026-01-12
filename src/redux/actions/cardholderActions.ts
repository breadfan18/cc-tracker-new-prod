// api status removed; using per-slice loading for initial data
import { sliceLoadingDone, sliceLoadingStart } from "./uiLoadingActions";
import {
  CREATE_CARDHOLDER_SUCCESS,
  LOAD_CARDHOLDERS_SUCCESS,
  DELETE_CARDHOLDER_SUCCESS,
} from "./actionTypes";
import {
  deleteFromFirebase,
  subscribeToFirebaseData,
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
    dispatch(sliceLoadingStart("cardholders"));
    subscribeToFirebaseData<Cardholder>(
      "cardHolders",
      dispatch,
      loadCardholdersSuccess,
      firebaseUid,
      () => dispatch(sliceLoadingDone("cardholders"))
    );
  };
}

export function saveCardholderToFirebase(
  cardholder: Cardholder,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    const cardholderId =
      cardholder.id === "" ? slugify(cardholder.name) : cardholder.id;

    await writeToFirebase("cardHolders", cardholder, cardholderId, firebaseUid);
    dispatch(createCardholderSuccess(cardholder));
  };
}

export function deleteCardholderFromFirebase(
  cardholder: Cardholder,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    await deleteFromFirebase("cardHolders", cardholder.id, firebaseUid);
    dispatch(deleteCardholderSuccess(cardholder));
  };
}
