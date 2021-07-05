import React from 'react';
import Image from 'next/image';
import classes from './SubLocation.module.scss';
import SubLocationCardProps from '../../../types/SubLocationCardProps';
import capitalizeEachWord from '../../../utils/capitalizeEachWord';
import getWeatherImage from '../../../utils/getWeatherImage';

const SubLocationData = (props: SubLocationCardProps) => {
  const { onClick, location, darkTheme } = props;
  let capitalizedDescription = capitalizeEachWord(
    location.weather[0].description
  );
  const imageSrcString = getWeatherImage(location.weather[0].icon);
  return (
    <div
      className={`${classes['sub-location']} ${
        darkTheme
          ? classes['sub-location--dark']
          : classes['sub-location--light']
      }`}
      onClick={onClick}
    >
      <div className={classes['sub-location__area']}>
        <span>{`${location.name}, ${location.sys.country}`}</span>
      </div>
      <div className={classes['sub-location__weather']}>
        <Image
          src={imageSrcString}
          alt={location.weather[0].description}
          width={80}
          height={80}
        />
        <div className={classes['sub-location__details']}>
          <span className={classes['sub-location__description']}>
            {capitalizedDescription}
          </span>
          <span className={classes['sub-location__min-max']}>
            {`${Math.round(location.main.temp_min)}`} &#176;F &#183;{' '}
            {`${Math.round(location.main.temp_max)}`} &#176;F
          </span>
        </div>
        <span className={classes['sub-location__main-temp']}>
          {`${Math.round(location.main.temp)}`} &#176;F
        </span>
      </div>
    </div>
  );
};

export default SubLocationData;
