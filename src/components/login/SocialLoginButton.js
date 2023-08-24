import React from "react";
import { Button } from "react-bootstrap";
import { auth, login } from "../../tools/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function SocialLoginButton({ Icon, btnColor, btnDisabled }) {
  // The handle login function specifically uses the google login function right now
  // In the future, when more sign in features are implemented, we need to change this.
  const history = useHistory();
  function handleLogin() {
    login(auth).then(() => {
      history.push("/");
    });
  }
  return (
    <Button
      style={{
        backgroundColor: btnColor,
        border: "none",
        borderRadius: "5px",
        marginBottom: "8px",
        padding: "10px",
      }}
      disabled={btnDisabled}
      onClick={handleLogin}
    >
      <Icon style={{ fontSize: "1.5rem", color: "white" }} />
    </Button>
  );
}
