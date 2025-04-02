
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type BudgetSliderProps = {
  channelName: string;
  initialBudget: number;
  recommendedBudget: number;
  maxBudget: number;
  color: string;
  onChange: (value: number) => void;
  disabled?: boolean;
};

export function BudgetSlider({
  channelName,
  initialBudget,
  recommendedBudget,
  maxBudget,
  color,
  onChange,
  disabled = false
}: BudgetSliderProps) {
  const [value, setValue] = useState(recommendedBudget);
  
  useEffect(() => {
    setValue(recommendedBudget);
  }, [recommendedBudget]);

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue[0]);
    onChange(newValue[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    const clampedValue = Math.min(Math.max(0, newValue), maxBudget);
    setValue(clampedValue);
    onChange(clampedValue);
  };

  // Calculate percentage change from initial budget
  const percentChange = ((value - initialBudget) / initialBudget) * 100;
  const isIncrease = percentChange > 0;
  const isDecrease = percentChange < 0;

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-medium">{channelName}</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className={cn(
              "text-xs px-1.5 py-0.5 rounded",
              isIncrease ? "bg-green-100 text-green-800" : 
              isDecrease ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
            )}
          >
            {percentChange.toFixed(1)}%
          </div>
          <div className="w-20">
            <Input
              type="number"
              min={0}
              max={maxBudget}
              value={value}
              onChange={handleInputChange}
              className="h-8 text-right"
              disabled={disabled}
            />
          </div>
        </div>
      </div>
      <Slider
        value={[value]}
        min={0}
        max={maxBudget}
        step={100}
        onValueChange={handleSliderChange}
        disabled={disabled}
        className={disabled ? "opacity-50" : ""}
      />
    </div>
  );
}
