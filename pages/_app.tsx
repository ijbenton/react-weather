import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { WeatherProvider } from '../context/weather-context';
import UiProvider from '../context/ui-context';
import ThemeProvider from '../context/theme-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WeatherProvider>
      <UiProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </WeatherProvider>
  );
}
export default MyApp;
