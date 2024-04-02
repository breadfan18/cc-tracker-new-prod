import { useEffect, useState } from "react";

export default function useWindhowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

    return () =>
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  const isDesktop = windowWidth > 1000;
  const isTablet = windowWidth <= 1000 && windowWidth >= 700;
  const isMobile = windowWidth < 700;
  const isMobileXS = windowWidth < 500;

  return {
    windowWidth,
    isTablet,
    isMobile,
    isMobileXS,
    isDesktop,
  };
}
