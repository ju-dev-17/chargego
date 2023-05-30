import React from "react";

function Settings({ isDark, switchTheme }) {
  return (
    <div className="view" id="settings">
      <div
        style={{ backgroundColor: isDark === "true" ? "#000437" : "#66cdaa" }}
        onClick={switchTheme}
      >
        <span>Switch Theme</span>
        <img
          src={isDark === "true" ? "/icons/sun.svg" : "/icons/moon.svg"}
          alt="Switch theme"
          id="switch-theme-btn"
          style={{ backgroundColor: isDark === "true" ? "#000437" : "#66cdaa" }}
        />
      </div>
      <div
        style={{ backgroundColor: isDark === "true" ? "#000437" : "#66cdaa" }}
      >
        <span>Location Permission</span>
      </div>
    </div>
  );
}

export default Settings;
