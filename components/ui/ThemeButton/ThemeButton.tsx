import React from 'react';
import classes from './ThemeButton.module.scss';
const ThemeButton = (props: any) => {
  const { onChangeTheme, isDark } = props;
  return (
    <div className={classes['theme-btn']}>
      <h4
        className={`${classes['theme-btn__title']} ${
          isDark
            ? classes['theme-btn__title--dark']
            : classes['theme-btn__title--light']
        }`}
      >
        Dark Mode
      </h4>
      <label className={classes['switch']}>
        <input type='checkbox' checked={isDark} onChange={onChangeTheme} />
        <span className={classes['slider']}></span>
      </label>
    </div>
  );
};

export default ThemeButton;
