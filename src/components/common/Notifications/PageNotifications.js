import React from "react";
import PropTypes from "prop-types";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { deleteNotificationFromFirebase } from "../../../redux/actions/notificationsActions";
import { formatDate } from "../../../helpers";

export const PageNotifications = ({
  notification,
  Icon,
  iconColor,
  lastReminder,
  firebaseUid,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <article
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div
          className="page-notification-icon-container"
          style={{
            marginRight: "0.5rem",
          }}
        >
          <Icon
            style={{
              color: iconColor,
              fontSize: "1.2rem",
            }}
          />
        </div>
        <small id="page-notification-date">
          {formatDate(notification.dateSent)}
        </small>
        <small
          id="page-notification-message"
          title={notification.pageNotification}
        >
          {notification.pageNotification}
        </small>
        <div className="page-notification-icon-container">
          <TiDelete
            className="page-notification-delete"
            onClick={() => {
              dispatch(
                deleteNotificationFromFirebase(notification, firebaseUid)
              );
            }}
          />
        </div>
      </article>
      {!lastReminder && <hr style={{ color: "gray", margin: "3px 0" }} />}
    </>
  );
};

PageNotifications.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  iconColor: PropTypes.string.isRequired,
  lastReminder: PropTypes.bool.isRequired,
};
