import React, { useContext, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { UiContext } from '../../../context/ui-context';
import WeatherContext from '../../../context/weather-context';

import classes from './SearchBar.module.scss';

const LocationSearchInput: React.FC = (props) => {
  const [address, setAddress] = useState<string>('');

  const weatherCtx = useContext(WeatherContext);
  const uiCtx = useContext(UiContext);

  const handleChange = (newAddress: string) => {
    setAddress(newAddress);
  };

  const handleSelect = (selectedAddress: string) => {
    geocodeByAddress(selectedAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success', latLng);
        weatherCtx.getWeatherByCoords(latLng);
        uiCtx.toggleSearchBarModal();
      })
      .catch((error) => console.error('Error', error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className={classes.searchbar}>
          <input
            {...getInputProps({
              placeholder: 'Search Places...',
              className: classes['searchbar__input'],
            })}
          />
          <div className={classes['searchbar__dropdown']}>
            {/* Add spinner when loading */}
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? classes['searchbar__suggestion--active']
                : classes['searchbar__suggestion'];
              return (
                <div {...getSuggestionItemProps(suggestion, { className })}>
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
