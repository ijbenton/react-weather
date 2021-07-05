import WeatherData from './WeatherData';

export interface ForecastListDataItem {
  dt: number;
  main: WeatherData['main'];
  weather: WeatherData['weather'];
  clouds: {
    all: 38;
  };
  wind: WeatherData['wind'];
  visibility: number;
  pop: number;
  rain: {
    [key: string]: number;
  };
  sys: {
    [key: string]: string;
  };
  dt_txt: string;
}

interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastListDataItem[];
  city: {
    id: number;
    name: string;
    coord: WeatherData['coord'];
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default ForecastData;
