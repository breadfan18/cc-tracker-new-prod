import { beginApiCall } from "./apiStatusActions";
import {
  CREATE_REFERRAL_SUCCESS,
  LOAD_REFERRAL_SUCCESS,
  DELETE_REFERRAL_SUCCESS,
} from "./actionTypes";
import {
  deleteFromFirebase,
  getFireBaseData,
  writeToFirebase,
} from "../../tools/firebase";
import { uid } from "uid";
import { ActionThunkReturn, ActionTypes } from "../../types/redux";
import { Referral } from "../../types/referral-types";

function loadReferralsSuccess(referrals: Referral[]): ActionTypes {
  return { type: LOAD_REFERRAL_SUCCESS, payload: referrals };
}
function createReferralSuccess(referral: Referral): ActionTypes {
  return { type: CREATE_REFERRAL_SUCCESS, payload: referral };
}

function deleteReferralSuccess(referral: Referral): ActionTypes {
  return { type: DELETE_REFERRAL_SUCCESS, payload: referral };
}

export function loadReferralsFromFirebase(
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData("referrals", dispatch, loadReferralsSuccess, firebaseUid);
  };
}

export function saveReferralToFirebase(
  referral: Referral,
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

    const referralId = referral.id === "" ? `referral-${uid()}` : referral.id;
    writeToFirebase("referrals", referral, referralId, firebaseUid);
    dispatch(createReferralSuccess(referral));
  };
}

export function deleteReferralFromFirebase(
  referral: Referral,
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase("referrals", referral.id, firebaseUid);
    dispatch(deleteReferralSuccess(referral));
  };
}
