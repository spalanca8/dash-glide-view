import { useState, useEffect } from "react";
import { generatePerformanceData, generateChannelData, channelNames } from "@/data/mockData";

type DataProcessorOptions = {
  dataGeneratorFn?: any;
  timeSeriesFn?: any;
  onError?: (error: any) => void;
  timeframe?: string;
};

export function useDataProcessor(options: DataProcessorOptions = {}) {
  const { timeframe = "30d", dataGeneratorFn, timeSeriesFn, onError } = options;
  
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [trendsData, setTrendsData] = useState<any[]>([]);
  const [processingError, setProcessingError] = useState<Error | null>(null);
  const [yearOverYearData, setYearOverYearData] = useState<any[]>([]);
  const [monthOverMonthData, setMonthOverMonthData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 600));

        const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
        
        // Generate channel data
        const channels = dataGeneratorFn ? dataGeneratorFn() : generateChannelData();
        setChannelData(channels);
        
        // Generate time series data
        const performance = timeSeriesFn ? timeSeriesFn(days) : generatePerformanceData(days);
        setPerformanceData(performance);
        setTrendsData(performance);
        
        // Generate year-over-year data
        const yoyData = channels.map(channel => ({
          name: channel.name,
          value: ((Math.random() * 30) - 10).toFixed(1), // -10% to +20% change
          color: channel.value >= 0 ? "#4ade80" : "#f87171"
        }));
        setYearOverYearData(yoyData);
        
        // Generate month-over-month data
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const momData = months.map(month => {
          const currentYear = Math.round(100000 + Math.random() * 50000);
          const previousYear = Math.round(currentYear * (0.7 + Math.random() * 0.5));
          const change = ((currentYear - previousYear) / previousYear) * 100;
          
          return {
            date: month,
            currentYear,
            previousYear,
            change: parseFloat(change.toFixed(1))
          };
        });
        setMonthOverMonthData(momData);
        
        setProcessingError(null);
      } catch (error) {
        console.error("Error processing data:", error);
        setProcessingError(error as Error);
        
        if (onError) {
          onError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [timeframe, dataGeneratorFn, timeSeriesFn, onError]);

  // Aggregate the data based on selected metrics
  const aggregateData = (data: any[]) => {
    if (!data.length) return [];
    
    return data.map(day => {
      const revenue = day.totalRevenue;
      // Generate last year's data with more significant variance (50-90% of current year's figures)
      const lastYearVariance = 0.5 + (Math.random() * 0.4); // 50-90% of current year
      const lastYearRevenue = revenue * lastYearVariance;
      
      const cost = Object.keys(channelNames).reduce((sum, channel) => sum + (day[channel] || 0) * 0.4, 0);
      // More significant variance for cost (70-120% of current year)
      const lastYearCost = cost * (0.7 + (Math.random() * 0.5)); // 70-120% of current year
      
      const clicks = Math.round(revenue / 2.5);
      const impressions = Math.round(revenue * 10);
      const conversions = Math.round(revenue / 50);
      const ctr = (clicks / impressions) * 100;
      const conversionRate = (conversions / clicks) * 100;
      // More significant variance for conversion rate (50-95% of current year)
      const lastYearConversionRate = conversionRate * (0.5 + (Math.random() * 0.45)); // 50-95% of current year
      
      const bounce = 35 + (Math.random() * 20);
      const sessionDuration = 120 + (Math.random() * 180);
      const reach = Math.round(impressions * 0.7);
      const frequency = impressions / reach;
      const engagementRate = 10 + (Math.random() * 15);
      
      // Calculate ROAS for current and previous year
      const roas = revenue / cost;
      const lastYearRoas = lastYearRevenue / lastYearCost;
      
      const metrics: Record<string, any> = {
        date: day.name,
        revenue: revenue,
        lastYearRevenue: lastYearRevenue,
        cost: cost,
        lastYearCost: lastYearCost,
        clicks: clicks,
        impressions: impressions,
        conversions: conversions,
        ctr: ctr.toFixed(2),
        conversionRate: conversionRate.toFixed(2),
        lastYearConversion: lastYearConversionRate.toFixed(2),
        cpc: (cost / clicks).toFixed(2),
        cpa: (cost / conversions).toFixed(2),
        roas: roas,
        lastYearRoas: lastYearRoas,
        bounceRate: bounce.toFixed(1),
        avgSessionDuration: Math.round(sessionDuration),
        frequency: frequency.toFixed(1),
        reach: reach,
        engagementRate: engagementRate.toFixed(1)
      };
      
      return metrics;
    });
  };

  const aggregatedData = aggregateData(performanceData);

  // Calculate summary metrics
  const getSummaryMetrics = () => {
    if (!aggregatedData.length) return null;
    
    const totalRevenue = aggregatedData.reduce((sum, day) => sum + day.revenue, 0);
    const totalLastYearRevenue = aggregatedData.reduce((sum, day) => sum + day.lastYearRevenue, 0);
    const totalCost = aggregatedData.reduce((sum, day) => sum + day.cost, 0);
    const totalLastYearCost = aggregatedData.reduce((sum, day) => sum + day.lastYearCost, 0);
    const totalClicks = aggregatedData.reduce((sum, day) => sum + day.clicks, 0);
    const totalImpressions = aggregatedData.reduce((sum, day) => sum + day.impressions, 0);
    const totalConversions = aggregatedData.reduce((sum, day) => sum + day.conversions, 0);
    const avgCTR = aggregatedData.reduce((sum, day) => sum + parseFloat(day.ctr), 0) / aggregatedData.length;
    const avgConversionRate = aggregatedData.reduce((sum, day) => sum + parseFloat(day.conversionRate), 0) / aggregatedData.length;
    const avgLastYearConversionRate = aggregatedData.reduce((sum, day) => sum + parseFloat(day.lastYearConversion), 0) / aggregatedData.length;
    const avgBounceRate = aggregatedData.reduce((sum, day) => sum + parseFloat(day.bounceRate), 0) / aggregatedData.length;
    const avgSessionDuration = aggregatedData.reduce((sum, day) => sum + day.avgSessionDuration, 0) / aggregatedData.length;
    const totalReach = aggregatedData.reduce((sum, day) => sum + day.reach, 0);
    const avgFrequency = aggregatedData.reduce((sum, day) => sum + parseFloat(day.frequency), 0) / aggregatedData.length;
    const avgEngagementRate = aggregatedData.reduce((sum, day) => sum + parseFloat(day.engagementRate), 0) / aggregatedData.length;
    
    // Calculate current and last year's ROAS
    const currentRoas = totalRevenue / totalCost;
    const lastYearRoas = totalLastYearRevenue / totalLastYearCost;

    return {
      revenue: totalRevenue,
      lastYearRevenue: totalLastYearRevenue,
      cost: totalCost,
      lastYearCost: totalLastYearCost,
      clicks: totalClicks,
      impressions: totalImpressions,
      conversions: totalConversions,
      ctr: avgCTR.toFixed(2),
      conversionRate: avgConversionRate.toFixed(2),
      lastYearConversion: avgLastYearConversionRate.toFixed(2),
      roas: currentRoas,
      lastYearRoas: lastYearRoas,
      cpa: totalCost / totalConversions,
      cpc: totalCost / totalClicks,
      bounceRate: avgBounceRate.toFixed(1),
      avgSessionDuration: Math.round(avgSessionDuration),
      reach: totalReach,
      frequency: avgFrequency.toFixed(1),
      engagementRate: avgEngagementRate.toFixed(1)
    };
  };

  const summaryMetrics = getSummaryMetrics();

  // Get date range information
  const getDateInfo = () => {
    if (!aggregatedData || aggregatedData.length === 0) return null;
    
    return {
      startDate: aggregatedData[0].date,
      endDate: aggregatedData[aggregatedData.length - 1].date,
      totalDataPoints: aggregatedData.length,
      dataGranularity: "daily"
    };
  };

  const dateInfo = getDateInfo();

  return {
    loading,
    performanceData,
    aggregatedData,
    summaryMetrics,
    dateInfo,
    channelData,
    trendsData,
    processingError,
    yearOverYearData,
    monthOverMonthData
  };
}
