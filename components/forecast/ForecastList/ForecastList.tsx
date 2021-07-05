import React from 'react';
import classes from './ForecastList.module.scss';
import ForecastListItem from '../ForecastListItem/ForecastListItem';
import ForecastData from '../../../types/ForecastData';
import WeatherData from '../../../types/WeatherData';

interface Props {
  forecastData: ForecastData;
  locationWeatherData: WeatherData;
  darkTheme: boolean;
}

const ForecastList = (props: Props) => {
  const { forecastData, locationWeatherData, darkTheme } = props;
  const { list } = forecastData;
  return (
    <div
      className={`${classes['forecast']} ${
        darkTheme ? classes['forecast--dark'] : classes['forecast--light']
      }`}
    >
      <div className={classes['forecast__title']}>
        <h4>Forecast</h4>
      </div>
      <ul className={classes['forecast__list']}>
        {list.map((item, index) => (
          <ForecastListItem
            key={index}
            item={item}
            location={locationWeatherData}
            darkTheme={darkTheme}
          />
        ))}
      </ul>
    </div>
  );
};

export default ForecastList;
