import React from "react";
import { auth, logout } from "../../tools/firebase";
import { GoSignOut } from "react-icons/go";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function UserProfileSection({ user }) {
  const history = useHistory();

  function handleSignOut() {
    logout(auth);
    history.push("/signin");
  }
  return (
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
  );
}
