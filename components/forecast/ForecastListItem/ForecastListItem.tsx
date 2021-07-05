import React from 'react';
import Image from 'next/image';
import classes from './ForecastListItem.module.scss';
import capitalizeEachWord from '../../../utils/capitalizeEachWord';
import { ForecastListDataItem } from '../../../types/ForecastData';
import WeatherData from '../../../types/WeatherData';
import getFormattedDate from '../../../utils/getFormattedDate';
import getWeatherImage from '../../../utils/getWeatherImage';

interface Props {
  item: ForecastListDataItem;
  location: WeatherData;
  darkTheme: boolean;
}

const ForecastListItem = (props: Props) => {
  const { item, location, darkTheme } = props;

  const capitalizedDescription = capitalizeEachWord(
    item.weather[0].description
  );

  const imageSrcString = getWeatherImage(item.weather[0].icon);

  const utcSeconds = item.dt;
  const date = new Date(0);
  date.setUTCSeconds(utcSeconds);
  const formattedDate = getFormattedDate(date);
  //
  return (
    <li
      className={`${classes['forecast-list-item']} ${
        darkTheme
          ? classes['forecast-list-item--dark']
          : classes['forecast-list-item--light']
      }`}
    >
      <div className={classes['forecast-list-item__area']}>
        <span>{formattedDate}</span>
      </div>
      <div className={classes['forecast-list-item__weather']}>
        <Image
          src={imageSrcString}
          alt={item.weather[0].description}
          width={80}
          height={80}
        />
        <div className={classes['forecast-list-item__details']}>
          <span className={classes['forecast-list-item__description']}>
            {capitalizedDescription}
          </span>
          <span className={classes['forecast-list-item__min-max']}>
            {`${Math.round(item.main.temp_min)}`} &#176;F &#183;{' '}
            {`${Math.round(item.main.temp_max)}`} &#176;F
          </span>
        </div>
        <span className={classes['forecast-list-item__main-temp']}>
          {`${Math.round(item.main.temp)}`} &#176;F
        </span>
      </div>
    </li>
  );
};

export default ForecastListItem;
