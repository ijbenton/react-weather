import React, { useContext, useEffect } from 'react';
import WeatherContext from '../../../context/weather-context';

import classes from './SavedLocations.module.scss';
import { FiMap } from 'react-icons/fi';
import { UiContext } from '../../../context/ui-context';
import WeatherData from '../../../types/WeatherData';
import SubLocationData from '../../ui/SubLocationData/SubLocationData';
import { ThemeContext } from '../../../context/theme-context';

const SavedLocations = () => {
  const weatherCtx = useContext(WeatherContext);
  const uiCtx = useContext(UiContext);
  const themeCtx = useContext(ThemeContext);
  const { darkTheme } = themeCtx;

  useEffect(() => {
    weatherCtx.getSavedLocations();
  }, []);

  const locationClickHandler = (location: WeatherData) => {
    weatherCtx.setSingleLocationCurrentWeather(location);
    uiCtx.toggleSingleLocationModal();
  };

  let savedLocationsContent: JSX.Element = (
    <p className={classes['saved-location__empty']}>
      You have no saved locations. Search above to add some!
    </p>
  );

  if (weatherCtx.savedLocations.length > 0) {
    savedLocationsContent = (
      <>
        {weatherCtx.savedLocations.map((location, index) => {
          return (
            <SubLocationData
              onClick={() => locationClickHandler(location)}
              location={location}
              key={index}
              darkTheme={darkTheme}
            />
          );
        })}
      </>
    );
  }

  return (
    <div
      className={`${classes['saved-location']} ${
        darkTheme
          ? classes['saved-location--dark']
          : classes['saved-location--light']
      }`}
    >
      <div className={classes['saved-location__title']}>
        <FiMap size='24' />
        <h4>Saved Locations</h4>
      </div>
      <div className={classes['saved-location__container']}>
        {savedLocationsContent}
      </div>
    </div>
  );
};

export default SavedLocations;
