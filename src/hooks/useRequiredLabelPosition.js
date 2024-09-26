import { useState, useContext, useEffect } from "react";
import { WindowWidthContext } from "../components/App";
import useWindhowWidth from "./windowWidth";

export function useRequiredLabelPosition(isAgentField) {
  const { windowWidth } = useWindhowWidth();
  const [absoluteLeft, setAbsoluteLeft] = useState();

  useEffect(() => {
    if (!isAgentField) {
      setAbsoluteLeft(
        windowWidth > 991
          ? "690px"
          : windowWidth <= 991 && windowWidth > 500
          ? "384px"
          : windowWidth - 120
      );
    } else {
      setAbsoluteLeft(windowWidth > 505 ? "395px" : windowWidth - 120);
    }
  }, [windowWidth, isAgentField]);

  return absoluteLeft;
}
