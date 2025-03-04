import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

export default function Burger({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  return (
    <button id="burger" onClick={() => setOpen(!open)}>
      {open ? (
        <MdClose style={{ color: "white", fontSize: "2rem" }} />
      ) : (
        <GiHamburgerMenu style={{ color: "white", fontSize: "2rem" }} />
      )}
    </button>
  );
}
