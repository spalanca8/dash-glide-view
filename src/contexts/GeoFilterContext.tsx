
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the geographical options
export interface GeoOption {
  value: string;
  label: string;
}

// Updated options from regions to countries
export const geoOptions: GeoOption[] = [
  { value: "all", label: "All Countries" },
  { value: "usa", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "germany", label: "Germany" },
  { value: "france", label: "France" },
  { value: "italy", label: "Italy" },
  { value: "spain", label: "Spain" },
  { value: "japan", label: "Japan" },
  { value: "australia", label: "Australia" },
  { value: "brazil", label: "Brazil" },
  { value: "china", label: "China" },
  { value: "india", label: "India" },
];

// Create the context interface
interface GeoFilterContextType {
  selectedGeo: string;
  setSelectedGeo: (value: string) => void;
  geoOptions: GeoOption[];
}

// Create the context with default values
const GeoFilterContext = createContext<GeoFilterContextType>({
  selectedGeo: "all",
  setSelectedGeo: () => {},
  geoOptions: geoOptions,
});

// Create a provider component
export const GeoFilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGeo, setSelectedGeo] = useState<string>("all");

  const value = {
    selectedGeo,
    setSelectedGeo,
    geoOptions,
  };

  return (
    <GeoFilterContext.Provider value={value}>
      {children}
    </GeoFilterContext.Provider>
  );
};

// Create a hook for using the context
export const useGeoFilter = () => useContext(GeoFilterContext);
