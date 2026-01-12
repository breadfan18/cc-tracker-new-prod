import { ActionTypes } from "../../types/redux";
import { SLICE_LOADING_DONE, SLICE_LOADING_START } from "./actionTypes";

export function sliceLoadingStart(slice: string): ActionTypes {
  return { type: SLICE_LOADING_START, payload: slice };
}

export function sliceLoadingDone(slice: string): ActionTypes {
  return { type: SLICE_LOADING_DONE, payload: slice };
}
