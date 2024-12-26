import React from "react";
import PropTypes from "prop-types";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { deleteNotificationFromFirebase } from "../../../redux/actions/notificationsActions";

export const CardDetailsNotification = ({
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
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon
            style={{
              color: iconColor,
              fontSize: "1.2rem",
              marginRight: "1rem",
            }}
          />
          <small style={{ marginBottom: 0 }}>{notification.message}</small>
        </div>
        <TiDelete
          className="card-details-notification-delete"
          onClick={() => {
            dispatch(deleteNotificationFromFirebase(notification, firebaseUid));
          }}
        />
      </article>
      {!lastReminder && <hr style={{ color: "gray", margin: "3px 0" }} />}
    </>
  );
};

CardDetailsNotification.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  iconColor: PropTypes.string.isRequired,
  lastReminder: PropTypes.bool.isRequired,
};
