import { ApiActionTypes } from "../../types/redux";
import { API_CALL_ERROR, BEGIN_API_CALL } from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type: string): boolean {
  return type.match(/.*_SUCCESS/) ? true : false;
}

export default function apiCallsInProgress(
  state: number = initialState.apiCallsInProgress,
  action: ApiActionTypes
): number {
  if (action.type === BEGIN_API_CALL) return state + 1;
  else if (
    action.type === API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
}
