import { ActionTypes } from "../../types/redux";
import {
  SLICE_LOADING_DONE,
  SLICE_LOADING_START,
} from "../actions/actionTypes";

export type LoadingState = Record<string, boolean>;

const initialState: LoadingState = {};

export default function loadingReducer(
  state: LoadingState = initialState,
  action: ActionTypes
): LoadingState {
  switch (action.type) {
    case SLICE_LOADING_START: {
      const slice = action.payload as string;
      return { ...state, [slice]: true };
    }
    case SLICE_LOADING_DONE: {
      const slice = action.payload as string;
      return { ...state, [slice]: false };
    }
    default:
      return state;
  }
}
