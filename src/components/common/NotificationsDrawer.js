import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TiDelete } from "react-icons/ti";
import { APP_COLOR_BLUE } from "../../constants";

function Notifications({ notifications, notificationsRef }) {
  const [show, setShow] = useState(false);

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

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: APP_COLOR_BLUE }}>
            Notifications
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div ref={notificationsRef}>
            {notifications.map((notification, index) => (
              <>
                <div style={{ display: "flex" }} key={index}>
                  <div>{notification.message}</div>
                  <TiDelete
                    style={{ cursor: "pointer", fontSize: "2.5rem" }}
                    onClick={() => {
                      console.log("Delete notification");
                    }}
                  />
                </div>
                <hr />
              </>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Notifications;
