import React, { useContext, useState } from 'react';
import classes from './Layout.module.scss';
import ThemeButton from '../../ui/ThemeButton/ThemeButton';
import { ThemeContext } from '../../../context/theme-context';
const Layout: React.FC = (props) => {
  const themeCtx = useContext(ThemeContext);
  const { darkTheme, toggleDarkTheme } = themeCtx;
  const mainStyles = `${classes['layout__main']} ${
    darkTheme ? classes['layout__main-dark'] : classes['layout__main-light']
  }`;
  return (
    <main className={mainStyles}>
      <ThemeButton onChangeTheme={toggleDarkTheme} isDark={darkTheme} />
      {props.children}
    </main>
  );
};

export default Layout;
