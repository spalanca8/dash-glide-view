
import React, { useState } from "react";
import { format, parse, startOfMonth, endOfMonth, eachWeekOfInterval, eachMonthOfInterval, addDays } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ChartHeatmap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock data for active promotions
const activePromotions = [
  { name: "Summer Sale", start: "2025-01-01", end: "2025-01-21", type: "percentage" },
  { name: "Valentine's Day", start: "2025-02-07", end: "2025-02-14", type: "bogo" },
  { name: "Spring Break", start: "2025-03-15", end: "2025-03-28", type: "flash" },
  { name: "Easter Special", start: "2025-04-01", end: "2025-04-10", type: "percentage" },
  { name: "Memorial Day", start: "2025-05-20", end: "2025-05-27", type: "flash" },
  { name: "Summer Kickoff", start: "2025-06-15", end: "2025-06-30", type: "bogo" },
  { name: "4th of July", start: "2025-07-01", end: "2025-07-07", type: "percentage" },
  { name: "Back to School", start: "2025-08-15", end: "2025-08-31", type: "percentage" },
  { name: "Labor Day", start: "2025-09-01", end: "2025-09-07", type: "flash" },
  { name: "Fall Festival", start: "2025-10-10", end: "2025-10-17", type: "bogo" },
  { name: "Black Friday", start: "2025-11-20", end: "2025-11-30", type: "percentage" },
  { name: "Holiday Sale", start: "2025-12-15", end: "2025-12-31", type: "percentage" },
];

// Generate weekly incremental revenue data for heatmap
const generateWeeklyData = () => {
  const currentYear = 2025;
  const startDate = new Date(`${currentYear}-01-01`);
  const endDate = new Date(`${currentYear}-12-31`);
  
  const weeks = eachWeekOfInterval({
    start: startDate,
    end: endDate
  });
  
  return weeks.map(weekStart => {
    const weekEnd = addDays(weekStart, 6);
    
    // Check if any promotion is active during this week
    const hasActivePromotion = activePromotions.some(promo => {
      const promoStart = parse(promo.start, 'yyyy-MM-dd', new Date());
      const promoEnd = parse(promo.end, 'yyyy-MM-dd', new Date());
      return (
        (promoStart <= weekEnd && promoEnd >= weekStart) // Promotion overlaps with this week
      );
    });
    
    // Find all active promotions for this week
    const weekPromotions = activePromotions.filter(promo => {
      const promoStart = parse(promo.start, 'yyyy-MM-dd', new Date());
      const promoEnd = parse(promo.end, 'yyyy-MM-dd', new Date());
      return (promoStart <= weekEnd && promoEnd >= weekStart);
    });
    
    // Calculate a base revenue (higher if promotions are active)
    const baseRevenue = hasActivePromotion ? 
      Math.floor(Math.random() * 30000) + 35000 : 
      Math.floor(Math.random() * 20000) + 5000;
    
    // Add some variability based on time of year (Q4 generally higher)
    const month = weekStart.getMonth();
    let seasonalMultiplier = 1.0;
    if (month >= 9) { // Q4 (Oct-Dec)
      seasonalMultiplier = 1.5;
    } else if (month >= 6) { // Q3 (Jul-Sep)
      seasonalMultiplier = 1.2;
    } else if (month >= 3) { // Q2 (Apr-Jun)
      seasonalMultiplier = 1.1;
    }
    
    // Add promotion type effect
    let promoTypeBoost = 0;
    if (weekPromotions.length > 0) {
      weekPromotions.forEach(promo => {
        if (promo.type === "percentage") promoTypeBoost += 5000;
        if (promo.type === "bogo") promoTypeBoost += 8000;
        if (promo.type === "flash") promoTypeBoost += 12000;
      });
    }
    
    // Calculate final revenue for the week
    const revenue = Math.round((baseRevenue * seasonalMultiplier) + promoTypeBoost);
    
    return {
      week: weekStart,
      weekLabel: `Week of ${format(weekStart, 'MMM d')}`,
      revenue,
      hasPromotion: hasActivePromotion,
      promotions: weekPromotions,
      intensity: Math.min(10, Math.max(1, Math.floor(revenue / 10000))) // Scale from 1-10 for intensity
    };
  });
};

// Generate monthly incremental revenue data for heatmap
const generateMonthlyData = () => {
  const currentYear = 2025;
  const startDate = new Date(`${currentYear}-01-01`);
  const endDate = new Date(`${currentYear}-12-31`);
  
  const months = eachMonthOfInterval({
    start: startDate,
    end: endDate
  });
  
  return months.map(monthStart => {
    const monthEnd = endOfMonth(monthStart);
    
    // Check if any promotion is active during this month
    const hasActivePromotion = activePromotions.some(promo => {
      const promoStart = parse(promo.start, 'yyyy-MM-dd', new Date());
      const promoEnd = parse(promo.end, 'yyyy-MM-dd', new Date());
      return (
        (promoStart <= monthEnd && promoEnd >= monthStart) // Promotion overlaps with this month
      );
    });
    
    // Find all active promotions for this month
    const monthPromotions = activePromotions.filter(promo => {
      const promoStart = parse(promo.start, 'yyyy-MM-dd', new Date());
      const promoEnd = parse(promo.end, 'yyyy-MM-dd', new Date());
      return (promoStart <= monthEnd && promoEnd >= monthStart);
    });
    
    // Calculate base revenue (based on promotions and seasonal factors)
    const month = monthStart.getMonth();
    let baseRevenue = 120000; // Base value
    
    // Seasonal adjustments
    if (month === 10 || month === 11) { // Nov-Dec (holiday season)
      baseRevenue *= 1.8;
    } else if (month === 6 || month === 7) { // Jul-Aug (summer peak)
      baseRevenue *= 1.3;
    } else if (month === 0 || month === 1) { // Jan-Feb (post-holiday slump)
      baseRevenue *= 0.8;
    }
    
    // Add promotion effect
    if (hasActivePromotion) {
      baseRevenue *= (1 + (monthPromotions.length * 0.15)); // Each promotion adds 15%
    }
    
    // Add some randomness
    const variation = (Math.random() * 0.2) - 0.1; // -10% to +10%
    const revenue = Math.round(baseRevenue * (1 + variation));
    
    return {
      month: monthStart,
      monthLabel: format(monthStart, 'MMM yyyy'),
      revenue,
      hasPromotion: hasActivePromotion,
      promotions: monthPromotions,
      intensity: Math.min(10, Math.max(1, Math.floor(revenue / 50000))) // Scale from 1-10 for intensity
    };
  });
};

const weeklyData = generateWeeklyData();
const monthlyData = generateMonthlyData();

export const PromotionRevenueHeatmap = () => {
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");
  const data = viewMode === "weekly" ? weeklyData : monthlyData;

  // Determine max revenue for proper color scaling
  const maxRevenue = Math.max(...data.map(item => item.revenue));
  
  // Function to determine color intensity based on revenue
  const getColorIntensity = (revenue: number): string => {
    const intensity = Math.floor((revenue / maxRevenue) * 10);
    return `rgba(255, 77, 143, ${0.2 + (intensity * 0.08)})`; // Using the same color as the saturation curve
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ChartHeatmap className="h-5 w-5 text-primary" /> 
          Promotion Revenue Heatmap
        </CardTitle>
        <CardDescription>
          Temporal distribution of incremental revenue during promotion periods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "weekly" | "monthly")} className="w-[200px]">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="overflow-x-auto">
          <div className={viewMode === "weekly" ? "min-w-[800px]" : ""}>
            <div className="flex flex-col">
              {/* Heatmap visualization */}
              <div className="grid grid-cols-1 gap-2">
                {viewMode === "weekly" ? (
                  <div className="grid grid-cols-52 gap-1 mt-2">
                    {weeklyData.map((week, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className={`h-16 rounded flex items-center justify-center cursor-pointer relative ${week.hasPromotion ? 'ring-2 ring-primary-foreground' : ''}`}
                              style={{ 
                                backgroundColor: getColorIntensity(week.revenue)
                              }}
                            >
                              {(index + 1) % 4 === 0 && (
                                <span className="absolute -bottom-6 text-xs text-muted-foreground transform -rotate-45 origin-top-left">
                                  {format(week.week, 'MMM d')}
                                </span>
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="p-3 max-w-xs">
                            <div>
                              <p className="font-semibold">{week.weekLabel}</p>
                              <p className="text-sm mt-1">Revenue: <span className="font-mono">${week.revenue.toLocaleString()}</span></p>
                              {week.hasPromotion && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium">Active Promotions:</p>
                                  <ul className="text-xs pl-2 mt-1">
                                    {week.promotions.map((promo, i) => (
                                      <li key={i} className="list-disc list-inside">
                                        {promo.name} ({promo.type})
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-12 gap-2 mt-2">
                    {monthlyData.map((month, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className={`h-24 rounded flex items-center justify-center cursor-pointer ${month.hasPromotion ? 'ring-2 ring-primary-foreground' : ''}`}
                              style={{ 
                                backgroundColor: getColorIntensity(month.revenue)
                              }}
                            >
                              <span className="font-medium">{format(month.month, 'MMM')}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="p-3 max-w-xs">
                            <div>
                              <p className="font-semibold">{month.monthLabel}</p>
                              <p className="text-sm mt-1">Revenue: <span className="font-mono">${month.revenue.toLocaleString()}</span></p>
                              {month.hasPromotion && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium">Active Promotions:</p>
                                  <ul className="text-xs pl-2 mt-1">
                                    {month.promotions.map((promo, i) => (
                                      <li key={i} className="list-disc list-inside">
                                        {promo.name} ({promo.type})
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Legend */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded ring-2 ring-primary-foreground" />
                  <span className="text-xs text-muted-foreground">Active Promotion</span>
                </div>
                <div className="flex items-center">
                  <div className="flex h-2">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-6 h-2"
                        style={{ backgroundColor: `rgba(255, 77, 143, ${0.2 + (i * 0.08)})` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between w-full text-xs text-muted-foreground mt-1">
                    <span>Low Revenue</span>
                    <span>High Revenue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Heatmap Analysis:</strong></p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Darker colors indicate higher incremental revenue periods</li>
            <li>Highlighted cells show weeks/months with active promotions</li>
            <li>Hover over cells to see detailed revenue data and active promotions</li>
            <li>Toggle between weekly and monthly views to analyze different time granularities</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
