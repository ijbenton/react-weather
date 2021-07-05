import React from 'react';
import classes from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <span>Weather App</span>
      <nav>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
