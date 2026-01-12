// api status removed; using per-slice loading for initial data
import { sliceLoadingDone, sliceLoadingStart } from "./uiLoadingActions";
import {
  CREATE_REFERRAL_SUCCESS,
  LOAD_REFERRAL_SUCCESS,
  DELETE_REFERRAL_SUCCESS,
} from "./actionTypes";
import {
  deleteFromFirebase,
  subscribeToFirebaseData,
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
    dispatch(sliceLoadingStart("referrals"));
    subscribeToFirebaseData<Referral>(
      "referrals",
      dispatch,
      loadReferralsSuccess,
      firebaseUid,
      () => dispatch(sliceLoadingDone("referrals"))
    );
  };
}

export function saveReferralToFirebase(
  referral: Referral,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    const referralId = referral.id === "" ? `referral-${uid()}` : referral.id;
    await writeToFirebase("referrals", referral, referralId, firebaseUid);
    dispatch(createReferralSuccess(referral));
  };
}

export function deleteReferralFromFirebase(
  referral: Referral,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    await deleteFromFirebase("referrals", referral.id, firebaseUid);
    dispatch(deleteReferralSuccess(referral));
  };
}
