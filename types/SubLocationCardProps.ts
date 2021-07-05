import WeatherData from './WeatherData';

interface SubLocationCardProps {
  onClick: () => void;
  location: WeatherData;
  darkTheme: boolean;
}

export default SubLocationCardProps;
