import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TiDelete } from "react-icons/ti";
import { APP_COLOR_BLUE, DELETE_COLOR_RED } from "../../constants";
import { useDispatch } from "react-redux";
import { deleteNotificationFromFirebase } from "../../redux/actions/notificationsActions";

function Notifications({ notifications, notificationsRef, firebaseUid }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <li className="userMenuOptions" onClick={handleShow}>
        <span
          class="userMenuNotificationsBadge"
          style={{ marginRight: "10px" }}
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
            {notifications.map((notification, index) => (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <p style={{ fontSize: "15px", maxWidth: "18rem" }}>
                    {notification.message}
                  </p>
                  <TiDelete
                    style={{
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      color: DELETE_COLOR_RED,
                    }}
                    onClick={() => {
                      dispatch(
                        deleteNotificationFromFirebase(
                          notification,
                          firebaseUid
                        )
                      );
                    }}
                  />
                </div>
                <hr style={{ color: APP_COLOR_BLUE }} />
              </>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Notifications;
