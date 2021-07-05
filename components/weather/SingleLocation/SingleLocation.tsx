import React, { useContext, useEffect } from 'react';
import { FiMapPin, FiX } from 'react-icons/fi';
import { UiContext } from '../../../context/ui-context';
import WeatherContext from '../../../context/weather-context';
import CoordsData from '../../../types/CoordsData';
import Modal from '../../ui/Modal/Modal';
import MainLocationData from '../../ui/MainLocationData/MainLocationData';

import classes from './SingleLocation.module.scss';
import ForecastList from '../../forecast/ForecastList/ForecastList';
import { ThemeContext } from '../../../context/theme-context';

const SingleLocation = () => {
  const uiCtx = useContext(UiContext);
  const weatherCtx = useContext(WeatherContext);
  const { isSingleLocationOpen, toggleSingleLocationModal } = uiCtx;
  const {
    singleLocationCurrentWeather,
    singleLocationForecast,
    cleanupSingleLocationState,
  } = weatherCtx;
  const themeCtx = useContext(ThemeContext);
  const { darkTheme } = themeCtx;
  const toggleSingleLocationModalHandler = () => {
    toggleSingleLocationModal();
  };
  useEffect(() => {
    if (isSingleLocationOpen && singleLocationCurrentWeather) {
      // Grab "coords" property from single location WeatherData and format into CoordsObj
      const { lat, lon } = singleLocationCurrentWeather.coord;
      const coords: CoordsData = { lat, lng: lon };

      weatherCtx.getForecastByCoords(coords);
    } else if (!isSingleLocationOpen && singleLocationCurrentWeather) {
      cleanupSingleLocationState();
    }
  }, [isSingleLocationOpen, singleLocationCurrentWeather]);

  return (
    <>
      {isSingleLocationOpen && singleLocationCurrentWeather && (
        <Modal onConfirm={toggleSingleLocationModalHandler}>
          <div className={classes['single-forecast__modal']}>
            <div
              className={`${classes['single-forecast__title']} ${
                darkTheme
                  ? classes['single-forecast__title--dark']
                  : classes['single-forecast__title--light']
              }`}
            >
              <FiMapPin color={darkTheme ? 'white' : 'black'} size='24' />
              <h4>{singleLocationCurrentWeather.name}</h4>
              <FiX
                color='red'
                size='32'
                className={classes['single-forecast__close-btn']}
                onClick={toggleSingleLocationModalHandler}
              />
            </div>
            <MainLocationData
              onClick={() => {}}
              currentLocation={singleLocationCurrentWeather}
              singleLocation={true}
              darkTheme={darkTheme}
            />
            {singleLocationForecast && (
              <ForecastList
                forecastData={singleLocationForecast}
                locationWeatherData={singleLocationCurrentWeather}
                darkTheme={darkTheme}
              />
            )}
            {!singleLocationForecast && <h2>Loading Forecast...</h2>}
          </div>
        </Modal>
      )}
    </>
  );
};

export default SingleLocation;
