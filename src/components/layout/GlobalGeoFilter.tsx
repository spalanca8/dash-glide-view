
import React from 'react';
import { Globe } from 'lucide-react';
import { FilterDropdown } from '@/components/dashboard/FilterDropdown';
import { useGeoFilter } from '@/contexts/GeoFilterContext';

export function GlobalGeoFilter() {
  const { selectedGeo, setSelectedGeo, geoOptions } = useGeoFilter();

  return (
    <FilterDropdown 
      options={geoOptions}
      value={selectedGeo}
      onChange={setSelectedGeo}
      icon={<Globe className="h-4 w-4 mr-2" />}
      label="Country"
      className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm"
    />
  );
}
