import { Card } from "../../types/cards-types";
import { CardActionTypes } from "../../types/redux";
import {
  CREATE_CARDS_SUCCESS,
  DELETE_CARD_SUCCESS,
  LOAD_CARDS_SUCCESS,
  UPDATE_CARDS_SUCCESS,
} from "../actions/actionTypes";
import initialState from "./initialState";

export default function cardsReducer(
  state: Card[] = initialState.cards,
  action: CardActionTypes
): Card[] {
  switch (action.type) {
    case LOAD_CARDS_SUCCESS:
      return action.payload;
    case CREATE_CARDS_SUCCESS:
      /* This is just returning state instead of [...state, { ...action.card }]
      because Firebase real time database adds new data immediately..
      so it's already available in state */
      return state;
    case UPDATE_CARDS_SUCCESS:
      return state.map((card) =>
        card.id === action.payload.id ? action.payload : card
      );
    case DELETE_CARD_SUCCESS:
      return state.filter((card) => card.id !== action.payload.id);
    default:
      return state;
  }
}
