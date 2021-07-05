import React, { useState } from 'react';

interface UiCtxObj {
  isSearchBarOpen: boolean;
  isSingleLocationOpen: boolean;
  toggleSearchBarModal: () => void;
  toggleSingleLocationModal: () => void;
}

export const UiContext = React.createContext<UiCtxObj>({
  isSearchBarOpen: false,
  isSingleLocationOpen: false,
  toggleSearchBarModal: () => {},
  toggleSingleLocationModal: () => {},
});

const UiProvider: React.FC = (props) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [isSingleLocationOpen, setIsSingleLocationOpen] = useState(false);
  const toggleSearchBarModal = () => {
    setIsSearchBarOpen((prevState) => !prevState);
  };
  const toggleSingleLocationModal = () => {
    setIsSingleLocationOpen((prevState) => !prevState);
  };
  const contextValue: UiCtxObj = {
    isSearchBarOpen,
    isSingleLocationOpen,
    toggleSearchBarModal,
    toggleSingleLocationModal,
  };
  return (
    <UiContext.Provider value={contextValue}>
      {props.children}
    </UiContext.Provider>
  );
};

export default UiProvider;
