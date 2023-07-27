import React from "react";
import "./Login.css";
import { ImEyeBlocked, ImEye } from "react-icons/im";
import { AiOutlineUser } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { BsGoogle, BsFacebook, BsLinkedin } from "react-icons/bs";
import { Button } from "react-bootstrap";
import SocialLoginButton from "./SocialLoginButton";

export default function Login() {
  return (
    <main id="loginMain">
      <section id="loginForm">
        <h1>Credit Card Tracker</h1>
        <div id="socialLogin">
          <SocialLoginButton Icon={BsGoogle} loginType="google" />
          <SocialLoginButton Icon={BsFacebook} loginType="facebook" />
          <SocialLoginButton Icon={BsLinkedin} loginType="linkedin" />
        </div>
        <h2 id="loginOr">OR</h2>
        <form action="" id="userAndPwdForm">
          <div className="login-form-group">
            <AiOutlineUser className="loginLabels" />
            <input
              className="userAndPwdInput"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="login-form-group">
            <MdPassword className="loginLabels" />
            <input
              id="pwdField"
              className="userAndPwdInput"
              type="password"
              placeholder="Password"
            />
            <ImEye id="togglePwd" />
          </div>
        </form>
        <Button id="loginSubmit" className="btn btn-success">
          Log In
        </Button>
      </section>
    </main>
  );
}
