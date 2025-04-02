
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the geographical options
export interface GeoOption {
  value: string;
  label: string;
}

// Default geographical options
export const geoOptions: GeoOption[] = [
  { value: "all", label: "All Regions" },
  { value: "europe", label: "Europe" },
  { value: "na", label: "North America" },
  { value: "apac", label: "APAC" },
  { value: "latam", label: "Latin America" },
  { value: "mena", label: "Middle East & North Africa" },
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
