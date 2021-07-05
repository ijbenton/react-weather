import React, { useContext, useEffect } from 'react';
import WeatherContext from '../../../context/weather-context';

import { FiMapPin } from 'react-icons/fi';

import classes from './CurrentLocation.module.scss';
import { UiContext } from '../../../context/ui-context';
import MainLocationData from '../../ui/MainLocationData/MainLocationData';
import { ThemeContext } from '../../../context/theme-context';

const CurrentLocation = () => {
  const weatherCtx = useContext(WeatherContext);
  const uiCtx = useContext(UiContext);
  const { currentLocation, isCurrentLocationLoading } = weatherCtx;
  const themeCtx = useContext(ThemeContext);
  const { darkTheme } = themeCtx;
  useEffect(() => {
    weatherCtx.getUserLocation();
  }, []);

  const locationClickHandler = () => {
    if (currentLocation) {
      weatherCtx.setSingleLocationCurrentWeather(currentLocation);
      uiCtx.toggleSingleLocationModal();
    }
  };

  let currentLocationContent: JSX.Element = (
    <div className={classes['current-location__loading']}></div>
  );

  if (!isCurrentLocationLoading) {
    if (currentLocation) {
      currentLocationContent = (
        <MainLocationData
          onClick={locationClickHandler}
          currentLocation={currentLocation}
          singleLocation={false}
          darkTheme={darkTheme}
          modalOpen={uiCtx.isSingleLocationOpen}
        />
      );
    } else {
      currentLocationContent = (
        <span className={classes['current-location__no-location']}>
          Cannot grab current location
        </span>
      );
    }
  }
  return (
    <section
      className={`${classes['current-location']} ${
        darkTheme
          ? classes['current-location--dark']
          : classes['current-location--light']
      }`}
    >
      <div className={classes['current-location__title']}>
        <FiMapPin className={classes['current-location__map-icon']} size='24' />
        <h4>Current Location</h4>
      </div>
      {currentLocationContent}
    </section>
  );
};

export default CurrentLocation;
