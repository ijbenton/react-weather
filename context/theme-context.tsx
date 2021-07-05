import React, { useState } from 'react';

interface ThemeCtxObj {
  darkTheme: boolean;
  toggleDarkTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeCtxObj>({
  darkTheme: true,
  toggleDarkTheme: () => {},
});

const ThemeProvider: React.FC = (props) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleDarkTheme = () => {
    setDarkTheme((prevState) => !prevState);
  };
  const contextValue: ThemeCtxObj = {
    darkTheme,
    toggleDarkTheme,
  };
  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
