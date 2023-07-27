import React from "react";
import { Button } from "react-bootstrap";

export default function SocialLoginButton({ Icon, loginType }) {
  return (
    <Button id={`${loginType}Login`}>
      <a href={`/${loginType}/auth`}>
        <Icon id={`${loginType}Icon`} style={{ fontSize: "3rem" }} />
      </a>
    </Button>
  );
}
