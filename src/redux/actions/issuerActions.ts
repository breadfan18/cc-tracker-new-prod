import { sliceLoadingDone, sliceLoadingStart } from "./uiLoadingActions";
import { LOAD_ISSUERS_SUCCESS, CREATE_ISSUER_SUCCESS } from "./actionTypes";
import { subscribeToFirebaseData, writeToFirebase } from "../../tools/firebase";
import { slugify } from "../../helpers";
import { uid } from "uid";
import { ActionThunkReturn, ActionTypes } from "../../types/redux";
import { Issuer } from "../../types/cards-types";

function loadIssuersSuccess(issuers: Issuer[]): ActionTypes {
  return { type: LOAD_ISSUERS_SUCCESS, payload: issuers };
}

function createIssuerSuccess(issuer: Issuer): ActionTypes {
  return { type: CREATE_ISSUER_SUCCESS, payload: issuer };
}

export function loadUserIssuersFromFirebase(
  firebaseUid: string,
): ActionThunkReturn {
  return (dispatch) => {
    dispatch(sliceLoadingStart("userIssuers"));
    subscribeToFirebaseData<Issuer>(
      "userIssuers",
      dispatch,
      loadIssuersSuccess,
      firebaseUid,
      () => dispatch(sliceLoadingDone("userIssuers")),
    );
  };
}

export function saveUserIssuerToFirebase(
  issuer: Issuer,
  firebaseUid: string,
): ActionThunkReturn {
  return async (dispatch) => {
    const normalizedIssuer: Issuer = {
      ...issuer,
      img: issuer.img.trim(),
    };
    const issuerId = `${slugify(issuer.name)}-${uid()}`;
    await writeToFirebase(
      "userIssuers",
      normalizedIssuer,
      issuerId,
      firebaseUid,
    );
    dispatch(createIssuerSuccess(normalizedIssuer));
  };
}
