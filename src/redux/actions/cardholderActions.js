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

function loadCardholdersSuccess(cardholders) {
  return { type: LOAD_CARDHOLDERS_SUCCESS, cardholders };
}
function createCardholderSuccess(cardholder) {
  return { type: CREATE_CARDHOLDER_SUCCESS, cardholder };
}

function deleteCardholderSuccess(cardholder) {
  return { type: DELETE_CARDHOLDER_SUCCESS, cardholder };
}

export function loadCardholdersFromFirebase(firebaseUid) {
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

export function saveCardholderToFirebase(cardholder, firebaseUid) {
  return async (dispatch) => {
    dispatch(beginApiCall());

    const cardholderId =
      cardholder.id === null ? slugify(cardholder.name) : cardholder.id;

    writeToFirebase("cardHolders", cardholder, cardholderId, firebaseUid);
    dispatch(createCardholderSuccess(cardholder));
  };
}

export function deleteCardholderFromFirebase(cardholder, firebaseUid) {
  return (dispatch) => {
    dispatch(beginApiCall());
    deleteFromFirebase("cardHolders", cardholder.id, firebaseUid);
    dispatch(deleteCardholderSuccess(cardholder));
  };
}
