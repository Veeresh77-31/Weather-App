// src/components/ThemeContext/ThemeContext.jsx
import React, { createContext, useContext } from "react";
import useDarkMode from "use-dark-mode";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const darkMode = useDarkMode(false);
  return (
    <ThemeContext.Provider value={darkMode}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
