import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
export const IncrementalRevenueCounter = () => {
  const [count, setCount] = useState(0);
  const targetValue = 3750000; // $3.75M
  const previousValue = 3200000; // $3.2M
  const percentChange = (targetValue - previousValue) / previousValue * 100;

  // Animate the counter
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepTime = duration / steps;
    const increment = targetValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [targetValue]);
  return <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <p className="text-sm text-muted-foreground mb-2">
        Incremental Revenue (YTD) From Promotional Periods
      </p>
      <div className="text-6xl font-bold mb-3 w-full text-center px-0 mx-0 my-0 py-[100px]">
        ${(count / 1000000).toFixed(2)}M
      </div>
      <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
        <ArrowUp className="h-4 w-4 mr-1" />
        <span className="text-sm font-medium">{percentChange.toFixed(1)}% vs Last Year</span>
      </div>
      <div className="mt-4 text-xs text-muted-foreground">
        Previous Year: $3.2M
      </div>
    </div>;
};