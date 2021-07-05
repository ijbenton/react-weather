import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/theme-context';
import classes from './Modal.module.scss';

const Modal: React.FC<{ onConfirm: () => void }> = (props) => {
  const themeCtx = useContext(ThemeContext);
  const { darkTheme } = themeCtx;
  return (
    <div
      className={`${classes.modal} ${
        darkTheme ? classes['modal--dark'] : classes['modal--light']
      }`}
    >
      {props.children}
    </div>
  );
};

export default Modal;
