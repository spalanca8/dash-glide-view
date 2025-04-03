
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  ArrowUpRight,
  PieChart,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Link } from "react-router-dom";
import { generatePerformanceData, channelColors } from "@/data/mockData";

const AnalyticsOverview = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState(30); // Default to 30 days
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const days = timeframe; // Directly use the number of days
      const performanceData = generatePerformanceData(days);
      setData(performanceData);
      setLoading(false);
    };
    
    loadData();
  }, [timeframe]);
  
  // Calculate summary metrics
  const totalRevenue = !loading && data.length
    ? data.reduce((sum, day) => sum + day.totalRevenue, 0)
    : 0;
    
  const totalMediaSpend = !loading && data.length
    ? data.reduce((sum, day) => sum + day.mediaCost, 0)
    : 0;
    
  const totalRoas = totalMediaSpend > 0 ? (totalRevenue / totalMediaSpend).toFixed(2) : 0;
  
  const incrementalRevenue = totalRevenue * 0.68; // Assuming 68% of revenue is incremental based on MMM
  
  // Calculate week-over-week changes
  const revenueChange = 5.8; // Mocked for now, would calculate from actual data
  const spendChange = 3.2;   // Mocked for now, would calculate from actual data
  const roasChange = 2.5;    // Mocked for now, would calculate from actual data
  
  // Prepare time series data for revenue and incremental revenue
  const revenueTimeSeriesData = React.useMemo(() => {
    if (loading || data.length === 0) return [];
    
    return data.map(day => ({
      date: day.name,
      revenue: day.totalRevenue,
      incrementalRevenue: day.totalRevenue * 0.68, // 68% based on MMM model
      baseline: day.totalRevenue * 0.32, // 32% baseline
    }));
  }, [data, loading]);
  
  // Prepare time series data for media spend and ROAS with dummy distributions
  const mediaTimeSeriesData = React.useMemo(() => {
    if (loading || data.length === 0) return [];
    
    // Generate dummy ROAS distribution data
    const roasDistribution = {
      low: 1.2,    // Minimum ROAS
      high: 4.8,   // Maximum ROAS
      mean: 2.8,   // Average ROAS
      stdDev: 0.5  // Standard deviation
    };

    // Generate dummy media spend distribution data
    const spendDistribution = {
      min: 5000,   // Minimum daily spend
      max: 25000,  // Maximum daily spend
      mean: 15000, // Average daily spend
      stdDev: 3000 // Standard deviation
    };

    return data.map(day => {
      // Generate random ROAS within distribution range
      const roas = Math.max(roasDistribution.low, 
        Math.min(roasDistribution.high,
          roasDistribution.mean + (Math.random() - 0.5) * 2 * roasDistribution.stdDev
        )
      );

      // Generate random media spend within distribution range
      const spend = Math.max(spendDistribution.min,
        Math.min(spendDistribution.max,
          spendDistribution.mean + (Math.random() - 0.5) * 2 * spendDistribution.stdDev
        )
      );

      // Calculate derived metrics
      const impressions = Math.round(spend * (Math.random() * 10 + 5)); // Random impressions based on spend
      const clicks = Math.round(impressions * (Math.random() * 0.05 + 0.01)); // Random CTR between 1-6%
      const ctr = clicks / impressions;
      const cpc = spend / clicks;

      return {
        date: day.name,
        spend: parseFloat(spend.toFixed(2)),
        roas: parseFloat(roas.toFixed(2)),
        impressions,
        clicks,
        ctr: parseFloat(ctr.toFixed(4)),
        cpc: parseFloat(cpc.toFixed(2))
      };
    });
  }, [data, loading]);
  return (
    <div className="space-y-8">
      <Helmet>
        <title>Strategic Overview - Marketing Analytics</title>
      </Helmet>
      
      {/* Header Section with MMM highlight */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-purple-50/30 rounded-2xl p-8 border border-indigo-100/50 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 shadow-sm">
            <BarChart3 className="h-10 w-10 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Strategic Overview</h1>
            <p className="text-muted-foreground text-balance text-lg">
              Marketing Mix Modeling (MMM) insights to understand the impact of your marketing investments
            </p>
          </div>
          <Link 
            to="/model-metrics" 
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-md"
          >
            <span>View Model Metrics</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      
      {/* Section 1: Total Revenue & Media Spend */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Total Revenue & Media Spend</h2>
            <p className="text-muted-foreground">Quick high-level overview of your business performance</p>
          </div>
          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Last {timeframe === 7 ? "7 days" : timeframe === 30 ? "30 days" : "90 days"}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Revenue"
            value={!loading ? `$${totalRevenue.toLocaleString()}` : "Loading..."}
            change={revenueChange}
            description="vs. previous period"
            icon={<DollarSign className="h-4 w-4" />}
            loading={loading}
            className="bg-white shadow-sm hover:shadow-md transition-all"
          />
          
          <MetricCard
            title="Total Media Spend"
            value={!loading ? `$${isNaN(totalMediaSpend) ? (totalRevenue * 0.26).toLocaleString() : totalMediaSpend.toLocaleString()}` : "Loading..."}
            change={spendChange}
            description="vs. previous period"
            icon={<PieChart className="h-4 w-4" />}
            loading={loading}
            className="bg-white shadow-sm hover:shadow-md transition-all"
          />
          
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                <span>Key Takeaways</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Revenue is {Math.abs(revenueChange) > Math.abs(spendChange) ? 'increasing faster' : 'increasing slower'} than spending, with one behind the comma by {Math.round((Math.abs(Math.abs(revenueChange) - Math.abs(spendChange))) * 100) / 100} percentage points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Marketing efficiency might be {revenueChange > spendChange ? 'improving' : 'declining'} as revenue growth {revenueChange > spendChange ? 'outpaces' : 'lags behind'} spending growth</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Section 2: Average ROAS */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Average ROAS</h2>
            <p className="text-muted-foreground">Overall effectiveness of media investments</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-100/30 shadow-sm col-span-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Return on Ad Spend</p>
                  <div className="flex items-end gap-2">
                    <h3 className="text-4xl font-bold">
                      {totalRoas === 0 ? ((Math.floor(Math.random() * (7 - 3 + 1)) + 3).toString()) : parseFloat(totalRoas).toFixed(2)}x
                    </h3>
                    <div className={`flex items-center mb-1 ${roasChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {roasChange >= 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">{Math.abs(roasChange)}%</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-full bg-green-100">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="mt-6 px-2 pt-4 border-t border-green-100/50">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Incremental Revenue</p>
                    <p className="font-medium mt-1">${incrementalRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Media Cost</p>
                    <p className="font-medium mt-1">${(totalMediaSpend || (Math.floor(Math.random() * (1000000 - 500000 + 1)) + 500000)).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenue Contribution</p>
                    <p className="font-medium mt-1">28%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                <span>Key Takeaways</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Marketing efficiency is {roasChange >= 0 ? 'improving' : 'declining'} by {Math.abs(roasChange)}% {roasChange >= 0 ? 'but profitability will only increase if spending grows proportionally' : ''}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>28% of total revenue is driven by marketing</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Section 3: Incremental Revenue Over Time */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Incremental Revenue Over Time</h2>
            <p className="text-muted-foreground">Tracking the portion of revenue driven by media</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
            <div className="mb-4">
              <h3 className="text-base font-semibold">Total vs Incremental Revenue</h3>
              <p className="text-sm text-muted-foreground">Based on MMM attribution</p>
            </div>
            
            <PerformanceChart
              data={revenueTimeSeriesData}
              lines={[
                { dataKey: "revenue", color: "#4f46e5", label: "Total Revenue" },
                { dataKey: "incrementalRevenue", color: "#22c55e", label: "Incremental Revenue" },
                { dataKey: "baseline", color: "#94a3b8", label: "Baseline Revenue" }
              ]}
              height={320}
            />
          </div>
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                <span>Key Takeaways</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Highest Incrementality Period: Q2 2023 (45% of total revenue)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Lowest Incrementality Period: Q4 2023 (18% of total revenue)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Peak Marketing Contribution: November 2023 ($2.8M incremental)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Average Marketing Contribution: 28% of total revenue</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Section 4: Media Spend & ROAS Over Time */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Media Spend & ROAS Over Time</h2>
            <p className="text-muted-foreground">Understanding spend evolution and efficiency trends</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
            <div className="mb-4">
              <h3 className="text-base font-semibold">Media Spend & ROAS Trends</h3>
              <p className="text-sm text-muted-foreground">Daily evolution</p>
            </div>
            
            <PerformanceChart
              data={mediaTimeSeriesData}
              lines={[
                { dataKey: "spend", color: "#8b5cf6", label: "Media Spend", yAxisId: "left" },
                { dataKey: "roas", color: "#f97316", label: "Daily ROAS", yAxisId: "right" }
              ]}
              height={320}
            />
          </div>
          
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100/30 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                <span>Key Takeaways</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Highest ROAS Period: Q2 2023 (ROAS: 4.8x)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Lowest ROAS Period: Q4 2023 (ROAS: 2.1x)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Peak Spend Period: November 2023 ($1.2M)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Lowest Spend Period: January 2023 ($450K)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Best Efficiency: March 2023 (ROAS: 5.2x at $600K spend)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Next Steps Card */}
      <Card className="mb-8 border-l-4 border-l-primary animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <ArrowUpRight className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
              <p className="text-muted-foreground mb-4">
                Dive deeper into specific areas of your marketing analytics:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link to="/channels" className="flex items-center gap-2 rounded-lg p-3 bg-muted/50 hover:bg-muted transition-colors">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span className="font-medium">Channel Analysis</span>
                </Link>
                <Link to="/campaign" className="flex items-center gap-2 rounded-lg p-3 bg-muted/50 hover:bg-muted transition-colors">
                  <PieChart className="h-5 w-5 text-primary" />
                  <span className="font-medium">Campaign Analysis</span>
                </Link>
                <Link to="/model-metrics" className="flex items-center gap-2 rounded-lg p-3 bg-muted/50 hover:bg-muted transition-colors">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="font-medium">Model Metrics</span>
                </Link>
                <Link to="/budget" className="flex items-center gap-2 rounded-lg p-3 bg-muted/50 hover:bg-muted transition-colors">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                  <span className="font-medium">Budget Optimization</span>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsOverview;
