import React from "react";
import { Button } from "react-bootstrap";

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
    >
      <a href={`/${loginType}/auth`}>
        <Icon style={{ fontSize: "1.5rem", color: "white" }} />
      </a>
    </Button>
  );
}
