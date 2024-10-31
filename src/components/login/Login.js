import React, { useState } from "react";
import "./Login.css";
import { ImEyeBlocked, ImEye } from "react-icons/im";
import { AiOutlineUser, AiFillLock } from "react-icons/ai";
import { BsGoogle, BsMeta, BsLinkedin } from "react-icons/bs";
import { Button } from "react-bootstrap";
import SocialLoginButton from "./SocialLoginButton";
import useWindhowWidth from "../../hooks/windowWidth";
import ThemeToggle from "../header/ThemeToggle";

export default function Login({ windowWidth }) {
  const [showPwd, setShowPwd] = useState(false);
  const [pwdType, setPwdType] = useState("password");

  const desktopStyle = {
    borderRadius: "15px",
    boxShadow: "0 0 5px gray",
  };

  function togglePwdDisplay() {
    if (pwdType === "password") {
      setPwdType("text");
      setShowPwd(!showPwd);
    } else {
      setPwdType("password");
      setShowPwd(!showPwd);
    }
  }

  const { isMobile } = useWindhowWidth();

  return (
    <main id="loginMain">
      <section
        id="loginForm"
        style={{ ...(isMobile ? {} : desktopStyle), padding: "2rem" }}
      >
        <ThemeToggle displayToggle={true} />
        <img
          src="https://i.imgur.com/BZL5x4M.png"
          alt=""
          style={{ height: "8rem", marginBottom: 0 }}
        />
        <h2>Credit Card Tracker</h2>
        <div id="socialLogin">
          <p>Only Google Login is active at this time</p>
          <SocialLoginButton
            Icon={BsGoogle}
            loginType="google"
            btnColor="rgba(234, 67, 53)"
            btnDisabled={false}
          />
          {/* <SocialLoginButton
            Icon={BsMeta}
            loginType="facebook"
            btnColor="rgba(60, 88, 156)"
            btnDisabled={true}
          />
          <SocialLoginButton
            Icon={BsLinkedin}
            loginType="linkedin"
            btnColor="rgba(10, 102, 194)"
            btnDisabled={true}
          /> */}
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
            <AiFillLock className="loginLabels" />
            <input
              id="pwdField"
              className="userAndPwdInput"
              type={pwdType}
              placeholder="Password"
            />
            {showPwd ? (
              <ImEyeBlocked id="togglePwd" onClick={togglePwdDisplay} />
            ) : (
              <ImEye id="togglePwd" onClick={togglePwdDisplay} />
            )}
          </div>
          <Button id="loginSubmit" className="btn btn-success" disabled>
            Log In
          </Button>
        </form>
      </section>
    </main>
  );
}
