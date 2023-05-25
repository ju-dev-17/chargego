import { useState } from "react";

function useTheme() {
  const [isDark, setIsDark] = useState(localStorage.getItem("isDark"));

  const switchTheme = () => {
    setIsDark(isDark === "true" ? "false" : "true");
    localStorage.setItem("isDark", isDark === "true" ? "false" : "true");
  };

  return [isDark, switchTheme];
}

export default useTheme;
