import WeatherData from './WeatherData';

interface MainLocationCardProps {
  onClick: () => void;
  currentLocation: WeatherData;
  singleLocation: boolean;
}

export default MainLocationCardProps;
