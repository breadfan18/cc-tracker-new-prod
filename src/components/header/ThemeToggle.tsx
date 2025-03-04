import { useState, useEffect } from "react";
import "./ThemeToggle.css";
import { useDispatch } from "react-redux";
import { changeReduxTheme } from "../../redux/actions/themeActions";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

const ThemeToggle = ({ displayToggle }: { displayToggle: boolean }) => {
  const savedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(savedTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    dispatch(changeReduxTheme(theme));
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    displayToggle && (
      <div className="theme-toggle">
        <input
          type="checkbox"
          id="themeSwitch"
          className="theme-switch"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <label htmlFor="themeSwitch" className="slider">
          <span className="sun-icon">
            <MdWbSunny style={{ color: "white" }} />
          </span>
          <span className="moon-icon">
            <FaMoon style={{ color: "white" }} />
          </span>
          <div className="slider-thumb"></div>
        </label>
      </div>
    )
  );
};

export default ThemeToggle;
