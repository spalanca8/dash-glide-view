
import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DateRangeSelectorProps {
  dateRange: [Date, Date];
  setDateRange: (dateRange: [Date, Date]) => void;
}

export const DateRangeSelector = ({ dateRange, setDateRange }: DateRangeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [start, end] = dateRange;
  
  const presets = {
    'Last 7 Days': [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
    'Last 30 Days': [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
    'Last 90 Days': [new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()],
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const newDateRange: [Date, Date] = dateRange.slice() as [Date, Date];
    
    if (!start || (start && end)) {
      newDateRange[0] = date;
      newDateRange[1] = date;
    } else {
      if (date < start) {
        newDateRange[0] = date;
        newDateRange[1] = start;
      } else {
        newDateRange[1] = date;
      }
    }
    
    setDateRange(newDateRange);
    
    if (newDateRange[0] && newDateRange[1] && newDateRange[0] !== newDateRange[1]) {
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  const applyPreset = (preset: [Date, Date]) => {
    setDateRange(preset as [Date, Date]);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-white border border-border shadow-sm"
        >
          <CalendarIcon className="h-4 w-4" />
          <span>
            {format(start, "MMM d, yyyy")} - {format(end, "MMM d, yyyy")}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="flex">
          <div className="border-r">
            <div className="p-3 border-b">
              <h3 className="text-sm font-medium">Date Range</h3>
              <p className="text-xs text-muted-foreground">Select start and end dates</p>
            </div>
            <div className="p-2">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={start}
                selected={{
                  from: start,
                  to: end,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange([range.from, range.to]);
                  }
                }}
                numberOfMonths={2}
                className="rounded-md border"
              />
            </div>
          </div>
          <div className="p-3 min-w-[150px]">
            <h3 className="mb-2 text-sm font-medium">Presets</h3>
            <div className="space-y-2">
              {Object.entries(presets).map(([label, range]) => (
                <Button 
                  key={label}
                  variant="ghost" 
                  className="w-full justify-start text-xs" 
                  onClick={() => applyPreset(range as [Date, Date])}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
