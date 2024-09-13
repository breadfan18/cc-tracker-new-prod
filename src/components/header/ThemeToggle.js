import React, { useState, useEffect } from "react";
import "./ThemeToggle.css"; // CSS file for styles

const ThemeToggle = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="theme-toggle">
      <input
        type="checkbox"
        id="themeSwitch"
        className="theme-switch"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label htmlFor="themeSwitch" className="slider">
        <span className="sun-icon">☀️</span>
        <span className="moon-icon">🌙</span>
        <div className="slider-thumb"></div>
      </label>
    </div>
  );
};

export default ThemeToggle;
