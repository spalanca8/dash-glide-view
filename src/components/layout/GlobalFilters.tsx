import React, { useState } from 'react';
import { useProductFilter } from '@/contexts/ProductFilterContext';
import { useGeoFilter } from '@/contexts/GeoFilterContext';
import { useDateRange } from '@/contexts/DateRangeContext';
import { FilterDropdown } from '@/components/dashboard/FilterDropdown';
import { Package, Globe, Calendar, CalendarRange } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, subDays } from 'date-fns';
import { Input } from '@/components/ui/input';

export function GlobalFilters() {
  const { selectedProduct, setSelectedProduct, productOptions } = useProductFilter();
  const { selectedGeo, setSelectedGeo, geoOptions } = useGeoFilter();
  const { selectedDateRange, setSelectedDateRange, dateRangeOptions } = useDateRange();
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);

  // Get predefined date range from the selected range option
  const getDateRangeLabel = () => {
    if (startDate && endDate) {
      return `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
    }
    return 'Select Date Range';
  };
  // Apply the date range and automatically update the predefined range if it matches
  const applyDateRange = () => {
    if (startDate && endDate) {
      // Logic to find if the selected range matches any predefined options could be added here
      // For now, we'll just use the custom range
      const daysDiff = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= 7) {
        setSelectedDateRange('7d');
      } else if (daysDiff <= 30) {
        setSelectedDateRange('30d');
      } else if (daysDiff <= 90) {
        setSelectedDateRange('90d');
      } else if (daysDiff <= 180) {
        setSelectedDateRange('6m');
      } else {
        setSelectedDateRange('1y');
      }
    }
  };

  return (
    <div className="ml-auto flex items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm">
            <CalendarRange className="h-4 w-4 mr-2" />
            {getDateRangeLabel()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          <div className="space-y-4">
            <h4 className="font-medium">Select Date Range</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Start Date</label>
                <Popover open={isStartCalendarOpen} onOpenChange={setIsStartCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                    >
                      {startDate ? format(startDate, 'MMM d, yyyy') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setStartDate(date);
                        setIsStartCalendarOpen(false);
                      }}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">End Date</label>
                <Popover open={isEndCalendarOpen} onOpenChange={setIsEndCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                    >
                      {endDate ? format(endDate, 'MMM d, yyyy') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        setEndDate(date);
                        setIsEndCalendarOpen(false);
                      }}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setStartDate(subDays(new Date(), 30));
                  setEndDate(new Date());
                }}
              >
                Last 30 Days
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setStartDate(subDays(new Date(), 90));
                  setEndDate(new Date());
                }}
              >
                Last 90 Days
              </Button>
              <Button variant="default" size="sm" onClick={applyDateRange}>
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <FilterDropdown 
        options={geoOptions}
        value={selectedGeo}
        onChange={setSelectedGeo}
        icon={<Globe className="h-4 w-4 mr-2" />}
        label="Region"
        className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm"
      />
      
      <FilterDropdown 
        options={productOptions}
        value={selectedProduct}
        onChange={setSelectedProduct}
        icon={<Package className="h-4 w-4 mr-2" />}
        label="Product"
        className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm"
      />
    </div>
  );
}
