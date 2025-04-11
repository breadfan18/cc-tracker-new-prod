import { Button } from "react-bootstrap";
import { auth, login } from "../../tools/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { IconType } from "react-icons/lib";

type SocialLoginButtonProps = {
  Icon: IconType;
  btnColor: string;
  btnDisabled: boolean;
};
export default function SocialLoginButton({
  Icon,
  btnColor,
  btnDisabled,
}: SocialLoginButtonProps) {
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
        borderRadius: "30px",
        margin: "5px 0",
      }}
      disabled={btnDisabled}
      onClick={handleLogin}
    >
      <Icon style={{ fontSize: "1.5rem", color: "white" }} />
    </Button>
  );
}
