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

function loadReferralsSuccess(referrals) {
  return { type: LOAD_REFERRAL_SUCCESS, referrals };
}
function createReferralSuccess(referral) {
  return { type: CREATE_REFERRAL_SUCCESS, referral };
}

function deleteReferralSuccess(referral) {
  return { type: DELETE_REFERRAL_SUCCESS, referral };
}

export function loadReferralsFromFirebase(firebaseUid) {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData("referrals", dispatch, loadReferralsSuccess, firebaseUid);
  };
}

export function saveReferralToFirebase(referral, firebaseUid) {
  return async (dispatch) => {
    /*
      BUG: dispatching beginApiCall twice here..This is a workaround for the followinsg issue:
      - Everytime new data is created or saved, redux fires LOAD and CREATE/UPDATE SUCCESS
      - This causes apiCallsInProgress to go negative. 
      - Need to understand why the LOAD action fires on Create/Update
    */
    dispatch(beginApiCall());
    dispatch(beginApiCall());

    const referralId = referral.id === null ? `referral-${uid()}` : referral.id;
    writeToFirebase("referrals", referral, referralId, firebaseUid);
    dispatch(createReferralSuccess(referral));
  };
}

export function deleteReferralFromFirebase(referral, firebaseUid) {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase("referrals", referral.id, firebaseUid);
    dispatch(deleteReferralSuccess(referral));
  };
}
