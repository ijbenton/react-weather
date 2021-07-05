import React from 'react';
import Image from 'next/image';
import classes from './MainLocationData.module.scss';
import WeatherData from '../../../types/WeatherData';
import getWeatherImage from '../../../utils/getWeatherImage';

interface Props {
  onClick: () => void;
  currentLocation: WeatherData;
  singleLocation: boolean;
  darkTheme: boolean;
  modalOpen: boolean;
}

const MainLocationData = (props: Props) => {
  const { onClick, currentLocation, singleLocation, darkTheme, modalOpen } =
    props;
  const imageSrcString = getWeatherImage(currentLocation.weather[0].icon);
  return (
    <div
      className={`${classes['main-location-data__content']} ${
        darkTheme
          ? classes['main-location-data__content--dark']
          : classes['main-location-data__content--light']
      } ${!modalOpen ? classes['main-location-data__content--cursor'] : ''}`}
      onClick={onClick}
    >
      <div className={classes['main-location-data__area']}>
        {singleLocation && <span>Current Weather</span>}
        {!singleLocation && (
          <span>{`${currentLocation.name}, ${currentLocation.sys.country}`}</span>
        )}
      </div>
      <div className={classes['main-location-data__weather']}>
        <Image
          src={imageSrcString}
          alt={currentLocation.weather[0].description}
          width={80}
          height={80}
        />
        <span className={classes['main-location-data__main-temp']}>
          {`${Math.round(currentLocation.main.temp)}`} &#176;F
        </span>
      </div>
      <div className={classes['main-location-data__footer']}>
        <span className={classes['main-location-data__description']}>
          {currentLocation.weather[0].main}
        </span>
        <span className={classes['main-location-data__min-max']}>
          {`${Math.round(currentLocation.main.temp_min)}`} &#176;F &#183;{' '}
          {`${Math.round(currentLocation.main.temp_max)}`} &#176;F
        </span>
      </div>
    </div>
  );
};

export default MainLocationData;
