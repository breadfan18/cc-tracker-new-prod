import React from "react";
import { logout } from "../../tools/firebase";
import { GoSignOut } from "react-icons/go";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function UserProfileSection({ user, windowWidth }) {
  const history = useHistory();

  function handleSignOut() {
    logout();
    history.push("/signin");
  }
  return (
    <div className="userInfo">
      <section id="userImg">
        <img
          src={user.photoURL}
          alt=""
          style={{
            borderRadius: "50%",
            height: "2rem",
            border: "2px solid white",
          }}
          title={user.displayName}
        />
        <GoSignOut
          onClick={handleSignOut}
          style={{
            fontSize: "1.8rem",
            cursor: "pointer",
            marginLeft: "5px",
          }}
          title="Sign Out"
        />
      </section>
    </div>
  );
}
