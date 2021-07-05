export default function getWeatherImage(iconCode: string) {
  switch (iconCode) {
    case '01d':
      return '/images/icons8-sun-100.png';
    case '01n':
      return '/images/icons8-moon-and-stars-100.png';
    case '02d':
      return '/images/icons8-partly-cloudy-day-100.png';
    case '02n':
      return '/images/icons8-night-100.png';
    case '03d':
      return '/images/icons8-cloud-100.png';
    case '03n':
      return '/images/icons8-cloud-100.png';
    case '04d':
      return '/images/icons8-cloud-100.png';
    case '04n':
      return '/images/icons8-cloud-100.png';
    case '09d':
      return '/images/icons8-rain-100.png';
    case '09n':
      return '/images/icons8-rain-100.png';
    case '10d':
      return '/images/icons8-rain-100.png';
    case '10n':
      return '/images/icons8-rain-100.png';
    case '11d':
      return '/images/icons8-storm-100.png';
    case '11n':
      return '/images/icons8-stormy-night-100.png';
    case '13d':
      return '/images/icons8-snow-100.png';
    case '13n':
      return '/images/icons8-snow-100.png';
    case '50d':
      return '/images/icons8-fog-100.png';
    case '50n':
      return '/images/icons8-fog-100-2.png';
    default:
      return '/images/icons8-partly-cloudy-day-100.png';
  }
}
