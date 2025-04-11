import {
  CREATE_CARDS_SUCCESS,
  CREATE_CARD_NOTES_SUCCESS,
  DELETE_CARD_NOTES_SUCCESS,
  DELETE_CARD_SUCCESS,
  LOAD_CARDS_SUCCESS,
  CREATE_TAG_SUCCESS,
  DELETE_TAG_SUCCESS,
} from "./actionTypes";
import { beginApiCall } from "./apiStatusActions";
import {
  deleteFromFirebase,
  getFireBaseData,
  writeToFirebase,
} from "../../tools/firebase";
import { slugify } from "../../helpers";
import { uid } from "uid";
import { ActionThunkReturn, ActionTypes } from "../../types/redux";
import { Dispatch } from "redux";
import { Card, CardNote, Tag } from "../../types/cards-types";

function loadCardsSuccess(cards: Card[]): ActionTypes {
  return { type: LOAD_CARDS_SUCCESS, payload: cards };
}

function createCardSuccess(card: Card) {
  return { type: CREATE_CARDS_SUCCESS, payload: card };
}

function deleteCardSuccess(card: Card) {
  return { type: DELETE_CARD_SUCCESS, payload: card };
}

function createCardNotesSuccess(cardNote: CardNote) {
  return { type: CREATE_CARD_NOTES_SUCCESS, payload: cardNote };
}

function deleteCardNotesSuccess(cardNote: CardNote) {
  return { type: DELETE_CARD_NOTES_SUCCESS, payload: cardNote };
}

function createCardTagSuccess(tag: Tag) {
  return { type: CREATE_TAG_SUCCESS, payload: tag };
}

function deleteCardTagSuccess(tag: Tag) {
  return { type: DELETE_TAG_SUCCESS, payload: tag };
}

export function loadCardsFromFirebase(firebaseUid: string) {
  return (dispatch: Dispatch) => {
    dispatch(beginApiCall());
    getFireBaseData("cards", dispatch, loadCardsSuccess, firebaseUid);
  };
}

export function saveCardToFirebase(
  card: Card,
  firebaseUid: string
): ActionThunkReturn {
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
      card.id === ""
        ? slugify(
            card.issuer.name + " " + card.card + " " + card.userId + " " + uid()
          )
        : card.id;

    writeToFirebase("cards", card, cardId, firebaseUid);
    dispatch(createCardSuccess(card));
  };
}

export function deleteCardFromFirebase(
  card: Card,
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase("cards", card.id, firebaseUid);
    dispatch(deleteCardSuccess(card));
  };
}

export function saveCardNoteToFirebase(
  note: CardNote,
  cardId: string,
  firebaseUid: string
): ActionThunkReturn {
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

export function deleteCardNoteFromFirebase(
  note: CardNote,
  cardId: string,
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase(`cards/${cardId}/cardNotes`, note.id, firebaseUid);
    dispatch(deleteCardNotesSuccess(note));
  };
}

export function saveCardTagToFirebase(
  tag: Tag,
  cardId: string,
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    const uuid =
      tag.id === null || tag.id === undefined ? `tag_${uid()}` : tag.id;
    writeToFirebase(`cards/${cardId}/tags`, tag, uuid, firebaseUid);
    dispatch(createCardTagSuccess(tag));
  };
}

export function deleteCardTagFromFirebase(
  tag: Tag,
  cardId: string,
  firebaseUid: string
): ActionThunkReturn {
  return (dispatch) => {
    // Same reason to dispatch apiCall twice here as mentioned above in save function
    dispatch(beginApiCall());
    dispatch(beginApiCall());
    deleteFromFirebase(`cards/${cardId}/tags`, tag.id, firebaseUid);
    dispatch(deleteCardTagSuccess(tag));
  };
}
