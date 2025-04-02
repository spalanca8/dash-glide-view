
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, TrendingUp, BarChart3, PieChart, Activity, Calendar, Globe, ShoppingBag } from "lucide-react";
import {
  generateIncrementalData,
  channelColors,
  generateSankeyData,
  generateChannelTrendsData
} from "@/data/mockData";
import {
  generateMediaGroupData,
  generateSaturationData,
  generateTimeSeriesData,
  generateMarginalReturnsData,
  getChannelDataByMediaType,
} from "@/data/mediaGroupData";

// Import the components
import { PerformanceBreakdownSection } from "@/components/dashboard/PerformanceBreakdownSection";
import { MediaTypeAnalysisSection } from "@/components/dashboard/MediaTypeAnalysisSection";
import { KeyContributorsSection } from "@/components/dashboard/KeyContributorsSection";
import { MediaTypesExplanationCard } from "@/components/dashboard/MediaTypesExplanationCard";
import { ChannelOption } from "@/components/dashboard/MediaTypeSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterDropdown } from "@/components/dashboard/FilterDropdown";
import { useProductFilter } from "@/contexts/ProductFilterContext";

const IncrementalPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [incrementalData, setIncrementalData] = useState<any[]>([]);
  const [mediaGroupData, setMediaGroupData] = useState<any[]>([]);
  const [saturationData, setSaturationData] = useState<any[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  const [marginalReturnsData, setMarginalReturnsData] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [channelTrendsData, setChannelTrendsData] = useState<any[]>([]);
  const [mediaType, setMediaType] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [timeframe, setTimeframe] = useState("90d");
  
  // Use the global product filter
  const { selectedProduct } = useProductFilter();

  // Time period options
  const timeframeOptions = [
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "6m", label: "Last 6 Months" },
    { value: "1y", label: "Last Year" }
  ];

  // Channel options for each media type
  const channelOptions: ChannelOption[] = [
    // Paid Media Channels
    { value: "search", label: "Search", color: "#4361ee", group: "paid" },
    { value: "social", label: "Social Media", color: "#3a0ca3", group: "paid" },
    { value: "display", label: "Display", color: "#4cc9f0", group: "paid" },
    { value: "video", label: "Video", color: "#7209b7", group: "paid" },
    
    // Organic Media Channels
    { value: "seo", label: "SEO", color: "#06d6a0", group: "organic" },
    { value: "content", label: "Content", color: "#2dc653", group: "organic" },
    { value: "referral", label: "Referral", color: "#57cc99", group: "organic" },
    
    // Non-Paid Media Channels
    { value: "email", label: "Email", color: "#ffd166", group: "nonPaid" },
    { value: "affiliate", label: "Affiliate", color: "#ffb703", group: "nonPaid" },
    { value: "pr", label: "PR", color: "#fb8500", group: "nonPaid" },
    
    // Baseline Channels
    { value: "brand", label: "Brand", color: "#ef476f", group: "baseline" },
    { value: "seasonal", label: "Seasonal", color: "#e56b6f", group: "baseline" },
    { value: "market", label: "Market Factors", color: "#d62828", group: "baseline" },
  ];

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Load all the data
      const incData = generateIncrementalData();
      const mediaData = generateMediaGroupData();
      const satData = generateSaturationData();
      const tsData = generateTimeSeriesData();
      const mrData = generateMarginalReturnsData();
      const chData = getChannelDataByMediaType(mediaType);
      const trendData = generateChannelTrendsData(90); // 90 days of trend data

      setIncrementalData(incData);
      setMediaGroupData(mediaData);
      setSaturationData(satData);
      setTimeSeriesData(tsData);
      setMarginalReturnsData(mrData);
      setChannelData(chData);
      setChannelTrendsData(trendData);
      setLoading(false);
    };

    loadData();
  }, [timeframe, selectedProduct]);

  // Update channel data when media type or selected channel changes
  useEffect(() => {
    if (!loading) {
      const updatedChannelData = getChannelDataByMediaType(mediaType);
      setChannelData(updatedChannelData);
    }
  }, [mediaType, selectedChannel, loading]);

  // Calculate latest period data for key metrics
  const latestPeriodData = !loading && mediaGroupData.length > 0 
    ? mediaGroupData[mediaGroupData.length - 1] 
    : { paid: 0, organic: 0, nonPaid: 0, baseline: 0, total: 0 };

  // Handler for timeframe change  
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Incremental Analysis"
        description="Analyze baseline and incremental contribution to performance across media types and channels"
      >
        <div className="flex items-center gap-2">
          <FilterDropdown 
            options={timeframeOptions}
            value={timeframe}
            onChange={handleTimeframeChange}
            icon={<Calendar className="h-4 w-4 mr-2" />}
            label="Time Period"
          />
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </PageHeader>

      {/* Key metrics section with improved visual cards */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Paid Media Card */}
          <Card className="shadow-sm border border-border/40 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-500/40 to-blue-400/20"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Paid Media</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loading ? "..." : `$${Math.round(latestPeriodData.paid).toLocaleString()}`}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {loading ? "" : `${Math.round((latestPeriodData.paid / latestPeriodData.total) * 100)}% of total`}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-blue-50">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organic Media Card */}
          <Card className="shadow-sm border border-border/40 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-500/40 to-green-400/20"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Organic Media</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loading ? "..." : `$${Math.round(latestPeriodData.organic).toLocaleString()}`}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {loading ? "" : `${Math.round((latestPeriodData.organic / latestPeriodData.total) * 100)}% of total`}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-green-50">
                  <Activity className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Non-Paid Media Card */}
          <Card className="shadow-sm border border-border/40 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-purple-500/40 to-purple-400/20"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Non-Paid Media</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loading ? "..." : `$${Math.round(latestPeriodData.nonPaid).toLocaleString()}`}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {loading ? "" : `${Math.round((latestPeriodData.nonPaid / latestPeriodData.total) * 100)}% of total`}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-purple-50">
                  <PieChart className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Baseline Card */}
          <Card className="shadow-sm border border-border/40 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-gray-500/40 to-gray-400/20"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Baseline</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {loading ? "..." : `$${Math.round(latestPeriodData.baseline).toLocaleString()}`}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {loading ? "" : `${Math.round((latestPeriodData.baseline / latestPeriodData.total) * 100)}% of total`}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-gray-50">
                  <TrendingUp className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content with Tabs Navigation */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-8"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="mediaTypes" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" /> Media Types
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-8">
          <PerformanceBreakdownSection data={timeSeriesData} loading={loading} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <KeyContributorsSection incrementalData={incrementalData} loading={loading} />
            <MediaTypesExplanationCard />
          </div>
        </TabsContent>

        {/* Media Types Tab Content */}
        <TabsContent value="mediaTypes" className="space-y-8">
          <MediaTypeAnalysisSection
            mediaGroupData={mediaGroupData}
            saturationData={saturationData}
            marginalReturnsData={marginalReturnsData}
            channelData={channelData}
            mediaType={mediaType}
            setMediaType={setMediaType}
            loading={loading}
            channelOptions={channelOptions}
            selectedChannel={selectedChannel}
            setSelectedChannel={setSelectedChannel}
            timeSeriesData={timeSeriesData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncrementalPage;
