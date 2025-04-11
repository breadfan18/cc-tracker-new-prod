import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { deleteNotificationFromFirebase } from "../../../redux/actions/notificationsActions";
import { formatDate } from "../../../helpers";
import { Notification } from "../../../types/cards-types";
import { IconType } from "react-icons/lib";

type PageNotificationsProps = {
  notification: Notification;
  Icon: IconType;
  iconColor: string;
  lastReminder: boolean;
  firebaseUid: string;
};

export const PageNotifications = ({
  notification,
  Icon,
  iconColor,
  lastReminder,
  firebaseUid,
}: PageNotificationsProps) => {
  const dispatch = useDispatch();

  return (
    <>
      <article
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Icon
          style={{
            color: iconColor,
            fontSize: "1.2rem",
            marginRight: "10px",
          }}
        />
        <small id="page-notification-date">
          {formatDate(notification.dateSent)}
        </small>
        <small
          id="page-notification-message"
          title={notification.pageNotification}
        >
          {notification.pageNotification}
        </small>
        <TiDelete
          className="page-notification-delete"
          onClick={() => {
            dispatch(deleteNotificationFromFirebase(notification, firebaseUid));
          }}
        />
      </article>
      {!lastReminder && <hr style={{ color: "gray", margin: "7px 0" }} />}
    </>
  );
};
