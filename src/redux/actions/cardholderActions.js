import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as loyaltyApi from "../../api/loyaltyApi";
import {
  CREATE_CARDHOLDER_SUCCESS,
  LOAD_CARDHOLDERS_SUCCESS,
  UPDATE_CARDHOLDER_SUCCESS,
  DELETE_CARDHOLDER_SUCCESS,
} from "./actionTypes";
import {
  deleteFromFirebase,
  getFireBaseData,
  writeToFirebase,
} from "../../tools/firebase";
import { slugify } from "../../helpers";
import { uid } from "uid";

function loadCardholdersSuccess(cardholders) {
  return { type: LOAD_CARDHOLDERS_SUCCESS, cardholders };
}
function createCardholderSuccess(cardholder) {
  return { type: CREATE_CARDHOLDER_SUCCESS, cardholder };
}
function updateCardholderSuccess(cardholder) {
  return { type: UPDATE_CARDHOLDER_SUCCESS, cardholder };
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

// export function saveLoyaltyDataToFirebase(loyaltyAcc, firebaseUid) {
//   return async (dispatch) => {
//     dispatch(beginApiCall());

//     const loyaltyId =
//       loyaltyAcc.id === null
//         ? slugify(
//             loyaltyAcc.program.name + "-" + loyaltyAcc.userId + "-" + uid()
//           )
//         : loyaltyAcc.id;

//     writeToFirebase("loyaltyData", loyaltyAcc, loyaltyId, firebaseUid);
//     dispatch(createCardholderSuccess(loyaltyAcc));
//   };
// }

// export function deleteLoyaltyDataFromFirebase(loyaltyAcc, firebaseUid) {
//   return (dispatch) => {
//     deleteFromFirebase("loyaltyData", loyaltyAcc.id, firebaseUid);
//     dispatch(deleteCardholderSuccess(loyaltyAcc));
//   };
// }
