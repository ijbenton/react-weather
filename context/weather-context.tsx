import axios from 'axios';
import React, { useState } from 'react';
import ForecastData from '../types/ForecastData';
import WeatherData from '../types/WeatherData';
import CoordsData from '../types/CoordsData';

interface SingleLocationStateObj {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
}

interface WeatherContextObj {
  isCurrentLocationLoading: boolean;
  savedLocations: WeatherData[];
  currentLocation: WeatherData | null;
  singleLocationCurrentWeather: WeatherData | null;
  singleLocationForecast: ForecastData | null;
  getUserLocation: () => void;
  getSavedLocations: () => void;
  getWeatherByCoords: (coords: CoordsData) => void;
  getForecastByCoords: (coords: CoordsData) => void;
  setSingleLocationCurrentWeather: (locationData: WeatherData) => void;
  setSingleLocationForecast: (forecastData: ForecastData) => void;
  cleanupSingleLocationState: () => void;
}

const WeatherContext = React.createContext<WeatherContextObj>({
  isCurrentLocationLoading: false,
  savedLocations: [],
  currentLocation: null,
  singleLocationCurrentWeather: null,
  singleLocationForecast: null,
  getUserLocation: () => {},
  getSavedLocations: () => {},
  getWeatherByCoords: (coords) => {},
  getForecastByCoords: (coords) => {},
  setSingleLocationCurrentWeather: (locationData) => {},
  setSingleLocationForecast: (forecastData) => {},
  cleanupSingleLocationState: () => {},
});

export const WeatherProvider: React.FC = (props) => {
  const [savedCoords, setSavedCoords] = useState<CoordsData[]>([]);
  const [savedLocations, setSavedLocations] = useState<WeatherData[]>([]);

  const [singleLocationState, setSingleLocationState] =
    useState<SingleLocationStateObj>({
      currentWeather: null,
      forecast: null,
    });

  const [currentLocation, setCurrentLocation] =
    useState<WeatherData | null>(null);

  const [isCurrentLocationLoading, setIsCurrentLocationLoading] =
    useState(true);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const res = await axios(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial`
          );
          console.log('GET USER LOCATION API CALL', res.data);
          setCurrentLocation(res.data);
          setIsCurrentLocationLoading(false);
        },
        (error) => {
          setIsCurrentLocationLoading(false);
        }
      );
    }
  };

  const getSavedLocations = () => {
    const savedLocations = localStorage.getItem('savedLocations');
    if (savedLocations) {
      const savedLocationsCoords = JSON.parse(savedLocations);
      if (savedLocationsCoords.length > 0) {
        console.log('LOOPING THROUGH SAVED LOCATIONS API CALLS');
        setSavedCoords(savedLocationsCoords);
        Promise.all(
          savedLocationsCoords.map(async (coords: CoordsData) => {
            const res = await axios(
              `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial`
            );

            return res.data;
          })
        ).then((data: any[]) => {
          setSavedLocations(data);
        });
      }
    }
  };

  const getWeatherByCoords = async (coords: CoordsData) => {
    const res = await axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial`
    );
    console.log('GET WEATHER BY COORDS API CALL', res.data);
    setSavedCoords((prevState) => {
      localStorage.setItem(
        'savedLocations',
        JSON.stringify([...prevState, coords])
      );

      return [...prevState, coords];
    });
    setSavedLocations((prevState) => [...prevState, res.data]);
  };

  const getForecastByCoords = async (coords: CoordsData) => {
    const res = await axios(`
    https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial
    `);
    console.log('FORECAST API CALL', res.data);
    setSingleLocationForecast(res.data);
  };

  const setSingleLocationCurrentWeather = (locationData: WeatherData) => {
    setSingleLocationState((prevState) => {
      return {
        ...prevState,
        currentWeather: locationData,
      };
    });
  };

  const setSingleLocationForecast = (forecastData: ForecastData) => {
    setSingleLocationState((prevState) => {
      return {
        ...prevState,
        forecast: forecastData,
      };
    });
  };

  const cleanupSingleLocationState = () => {
    setSingleLocationState({
      currentWeather: null,
      forecast: null,
    });
  };
  const contextValue: WeatherContextObj = {
    isCurrentLocationLoading,
    savedLocations,
    currentLocation,
    singleLocationCurrentWeather: singleLocationState.currentWeather,
    singleLocationForecast: singleLocationState.forecast,
    getUserLocation,
    getSavedLocations,
    getWeatherByCoords,
    getForecastByCoords,
    setSingleLocationCurrentWeather,
    setSingleLocationForecast,
    cleanupSingleLocationState,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
