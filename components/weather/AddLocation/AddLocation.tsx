import React, { useContext } from 'react';
import { UiContext } from '../../../context/ui-context';
import { FiMap, FiPlusCircle, FiX } from 'react-icons/fi';
import Modal from '../../ui/Modal/Modal';
import classes from './AddLocation.module.scss';
import SearchBar from '../../search/SearchBar/SearchBar';
import { ThemeContext } from '../../../context/theme-context';

const AddLocation: React.FC = () => {
  const uiCtx = useContext(UiContext);
  const themeCtx = useContext(ThemeContext);

  const { isSearchBarOpen, toggleSearchBarModal } = uiCtx;
  const { darkTheme } = themeCtx;

  const toggleModalHandler = () => {
    toggleSearchBarModal();
  };
  return (
    <div
      className={`${classes['add-location']} ${
        darkTheme
          ? classes[`add-location--dark`]
          : classes[`add-location--light`]
      }`}
    >
      <FiPlusCircle
        size='24'
        className={classes['add-location__add-btn']}
        onClick={toggleModalHandler}
      />
      {isSearchBarOpen && (
        <Modal onConfirm={toggleSearchBarModal}>
          <div className={classes['add-location__modal']}>
            <div className={classes['add-location__title']}>
              <FiMap size='24' />
              <span>Add new location</span>
              <FiX
                color='red'
                size='32'
                className={classes['add-location__close-btn']}
                onClick={toggleModalHandler}
              />
            </div>
            <span className={classes['add-location__instructions']}>
              Find a city and tap on it to add
            </span>
            <SearchBar />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddLocation;
