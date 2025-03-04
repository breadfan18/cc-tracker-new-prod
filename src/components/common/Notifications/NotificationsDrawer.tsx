import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaBell } from "react-icons/fa";
import { APP_COLOR_BLUE, DELETE_COLOR_RED } from "../../../constants";
import Notification from "./Notification";
import { Notification as NotificationType } from "../../../types/cards-types";

type NotificationsDrawerProps = {
  notifications: NotificationType[];
  notificationsRef: React.RefObject<HTMLDivElement>;
  firebaseUid: string;
};
function NotificationsDrawer({
  notifications,
  notificationsRef,
  firebaseUid,
}: NotificationsDrawerProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <li className="userMenuOptions" onClick={handleShow}>
        <span
          className="userMenuNotificationsBadge"
          style={{
            marginRight: "10px",
            backgroundColor:
              notifications?.length === 0 ? APP_COLOR_BLUE : DELETE_COLOR_RED,
          }}
        >
          {notifications.length}
        </span>
        Notifications
      </li>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ padding: "10px" }}
        className="notificationsDrawer"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: APP_COLOR_BLUE }}>
            Notifications
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div ref={notificationsRef}>
            {notifications?.length === 0 ? (
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "1.2rem" }}>You're all caught up!</div>
                <br />

                <FaBell className="bell-icon ringing" />
              </section>
            ) : (
              notifications.map((notification, index) => (
                <>
                  <Notification
                    notification={notification}
                    index={index}
                    firebaseUid={firebaseUid}
                    setShow={setShow}
                  />
                  <hr style={{ color: APP_COLOR_BLUE }} />
                </>
              ))
            )}
            {}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NotificationsDrawer;
