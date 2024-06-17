// src/components/ThemeContext/ThemeProvider.jsx
import React from "react";
import { ThemeProvider } from "./ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
};

const Main = () => {
  const darkMode = useTheme();

  return (
    <div className={darkMode.value ? "dark-mode" : "light-mode"}>
      <h1>Welcome to Dark Mode Example</h1>
      <button onClick={darkMode.toggle}>
        {darkMode.value ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
};

export default App;
