import initialState from "./initialState";
import {
  LOAD_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATION_SUCCESS,
} from "../actions/actionTypes";

export default function notificationsReducer(
  state = initialState.notifications,
  action
) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS_SUCCESS:
      return action.notifications;
    case DELETE_NOTIFICATION_SUCCESS:
      return state.filter(
        (notification) =>
          notification.notificationId !== action.notification.notificationId
      );
    default:
      return state;
  }
}
