import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarContextProps {
  stationName: string | null;
  setStationName: (name: string | null) => void;
}

const NavbarContext = createContext<NavbarContextProps>({
  stationName: null,
  setStationName: () => {},
});

export const NavbarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [stationName, setStationName] = useState<string | null>(null);

  return (
    <NavbarContext.Provider value={{ stationName, setStationName }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => useContext(NavbarContext);
