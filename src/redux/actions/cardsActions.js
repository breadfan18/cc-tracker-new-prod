import {
  CREATE_CARDS_SUCCESS,
  CREATE_CARD_NOTES_SUCCESS,
  DELETE_CARD_NOTES_SUCCESS,
  DELETE_CARD_SUCCESS,
  LOAD_CARDS_SUCCESS,
  UPDATE_CARDS_SUCCESS,
} from "./actionTypes";
import * as cardsApi from "../../api/cardsApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import {
  deleteFromFirebase,
  getFireBaseData,
  writeToFirebase,
} from "../../tools/firebase";
import { slugify } from "../../helpers";
import { uid } from "uid";

function loadCardsSuccess(cards) {
  return { type: LOAD_CARDS_SUCCESS, cards };
}

function createCardSuccess(card) {
  return { type: CREATE_CARDS_SUCCESS, card };
}

function updateCardSuccess(card) {
  return { type: UPDATE_CARDS_SUCCESS, card };
}

function deleteCardSuccess(card) {
  return { type: DELETE_CARD_SUCCESS, card };
}

function createCardNotesSuccess(cardNote) {
  return { type: CREATE_CARD_NOTES_SUCCESS, cardNote };
}

function deleteCardNotesSuccess(cardNote) {
  return { type: DELETE_CARD_NOTES_SUCCESS, cardNote };
}

export function loadCardsFromFirebase(firebaseUid) {
  return (dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData("cards", dispatch, loadCardsSuccess, firebaseUid);
  };
}

export function saveCardToFirebase(card, firebaseUid) {
  return (dispatch) => {
    /*
      BUG: dispatching beginApiCall twice here..This is a workaround for the followinsg issue:
      - Everytime new data is created or saved, redux fires LOAD and CREATE/UPDATE SUCCESS
      - This causes apiCallsInProgress to go negative. 
      - Need to understand why the LOAD action fires on Create/Update
    */
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    const cardId =
      card.id === null
        ? slugify(
            card.issuer.name + " " + card.card + " " + card.userId + " " + uid()
          )
        : card.id;

    writeToFirebase("cards", card, cardId, firebaseUid);
    dispatch(createCardSuccess(card));
  };
}

export function deleteCardFromFirebase(card, firebaseUid) {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase("cards", card.id, firebaseUid);
    dispatch(deleteCardSuccess(card));
  };
}

export function saveCardNoteToFirebase(note, cardId, firebaseUid) {
  return (dispatch) => {
    /*
      BUG: dispatching beginApiCall twice here..This is a workaround for the followinsg issue:
      - Everytime new data is created or saved, redux fires LOAD and CREATE/UPDATE SUCCESS
      - This causes apiCallsInProgress to go negative. 
      - Need to understand why the LOAD action fires on Create/Update
    */
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    const uuid = note.id === null || note.id === undefined ? uid() : note.id;
    writeToFirebase(`cards/${cardId}/cardNotes`, note, uuid, firebaseUid);
    dispatch(createCardNotesSuccess(note));
  };
}

export function deleteCardNoteFromFirebase(note, cardId, firebaseUid) {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase(`cards/${cardId}/cardNotes`, note.id, firebaseUid);
    dispatch(deleteCardNotesSuccess(note));
  };
}

// JSON Server Functions for testing
export function loadCardsFromJsonServer() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return cardsApi
      .getCards()
      .then((cards) => {
        dispatch(loadCardsSuccess(cards));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCardToJsonServer(card) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return cardsApi
      .saveCard(card)
      .then((savedCard) => {
        card.id
          ? dispatch(updateCardSuccess(savedCard))
          : dispatch(createCardSuccess(savedCard));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCardFromJsonServer(card) {
  return (dispatch) => {
    return cardsApi
      .deleteCard(card)
      .then(() => {
        dispatch(deleteCardSuccess(card));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
