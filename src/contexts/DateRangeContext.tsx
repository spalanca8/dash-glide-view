
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the date range options
export interface DateRangeOption {
  value: string;
  label: string;
}

// Default date range options
export const dateRangeOptions: DateRangeOption[] = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "6m", label: "Last 6 Months" },
  { value: "1y", label: "Last Year" },
];

// Create the context interface
interface DateRangeContextType {
  selectedDateRange: string;
  setSelectedDateRange: (value: string) => void;
  dateRangeOptions: DateRangeOption[];
}

// Create the context with default values
const DateRangeContext = createContext<DateRangeContextType>({
  selectedDateRange: "30d",
  setSelectedDateRange: () => {},
  dateRangeOptions: dateRangeOptions,
});

// Create a provider component
export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDateRange, setSelectedDateRange] = useState<string>("30d");

  const value = {
    selectedDateRange,
    setSelectedDateRange,
    dateRangeOptions,
  };

  return (
    <DateRangeContext.Provider value={value}>
      {children}
    </DateRangeContext.Provider>
  );
};

// Create a hook for using the context
export const useDateRange = () => useContext(DateRangeContext);
