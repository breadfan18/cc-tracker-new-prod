import React from "react";
import { Button } from "react-bootstrap";
import { login } from "../../tools/firebase";

export default function SocialLoginButton({
  Icon,
  loginType,
  btnColor,
  btnDisabled,
}) {
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
      onClick={login}
    >
      <Icon style={{ fontSize: "1.5rem", color: "white" }} />
    </Button>
  );
}
