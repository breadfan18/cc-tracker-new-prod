import {
  CREATE_CARDS_SUCCESS,
  CREATE_CARD_NOTES_SUCCESS,
  DELETE_CARD_NOTES_SUCCESS,
  DELETE_CARD_SUCCESS,
  LOAD_CARDS_SUCCESS,
  CREATE_TAG_SUCCESS,
  DELETE_TAG_SUCCESS,
} from "./actionTypes";
import { sliceLoadingDone, sliceLoadingStart } from "./uiLoadingActions";
import {
  deleteFromFirebase,
  subscribeToFirebaseData,
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
    dispatch(sliceLoadingStart("cards"));
    subscribeToFirebaseData<Card>(
      "cards",
      dispatch,
      loadCardsSuccess,
      firebaseUid,
      () => dispatch(sliceLoadingDone("cards"))
    );
  };
}

export function saveCardToFirebase(
  card: Card,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    const cardId =
      card.id === ""
        ? slugify(
            card.issuer.name + " " + card.card + " " + card.userId + " " + uid()
          )
        : card.id;

    await writeToFirebase("cards", card, cardId, firebaseUid);
    dispatch(createCardSuccess(card));
  };
}

export function deleteCardFromFirebase(
  card: Card,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    await deleteFromFirebase("cards", card.id, firebaseUid);
    dispatch(deleteCardSuccess(card));
  };
}

export function saveCardNoteToFirebase(
  note: CardNote,
  cardId: string,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    const uuid = note.id === null || note.id === undefined ? uid() : note.id;
    await writeToFirebase(`cards/${cardId}/cardNotes`, note, uuid, firebaseUid);
    dispatch(createCardNotesSuccess(note));
  };
}

export function deleteCardNoteFromFirebase(
  note: CardNote,
  cardId: string,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    await deleteFromFirebase(
      `cards/${cardId}/cardNotes`,
      note.id!,
      firebaseUid
    );
    dispatch(deleteCardNotesSuccess(note));
  };
}

export function saveCardTagToFirebase(
  tag: Tag,
  cardId: string,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    const uuid =
      tag.id === null || tag.id === undefined ? `tag_${uid()}` : tag.id;
    await writeToFirebase(`cards/${cardId}/tags`, tag, uuid, firebaseUid);
    dispatch(createCardTagSuccess(tag));
  };
}

export function deleteCardTagFromFirebase(
  tag: Tag,
  cardId: string,
  firebaseUid: string
): ActionThunkReturn {
  return async (dispatch) => {
    await deleteFromFirebase(`cards/${cardId}/tags`, tag.id!, firebaseUid);
    dispatch(deleteCardTagSuccess(tag));
  };
}
