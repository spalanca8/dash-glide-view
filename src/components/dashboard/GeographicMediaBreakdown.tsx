
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUp, Info, Maximize2, X, Map, Flag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for European regions with ROAS and incremental values
const europeRegionsData = [
  { region: "United Kingdom", roas: 4.2, incremental: 850000, flag: "🇬🇧", channels: {
    paid: 380000, organic: 220000, nonPaid: 150000, baseline: 100000
  }},
  { region: "Germany", roas: 3.9, incremental: 720000, flag: "🇩🇪", channels: {
    paid: 320000, organic: 190000, nonPaid: 130000, baseline: 80000
  }},
  { region: "France", roas: 3.5, incremental: 580000, flag: "🇫🇷", channels: {
    paid: 250000, organic: 150000, nonPaid: 100000, baseline: 80000
  }},
  { region: "Italy", roas: 2.8, incremental: 420000, flag: "🇮🇹", channels: {
    paid: 180000, organic: 100000, nonPaid: 80000, baseline: 60000
  }},
  { region: "Spain", roas: 3.1, incremental: 480000, flag: "🇪🇸", channels: {
    paid: 210000, organic: 120000, nonPaid: 90000, baseline: 60000
  }},
  { region: "Netherlands", roas: 4.5, incremental: 380000, flag: "🇳🇱", channels: {
    paid: 180000, organic: 90000, nonPaid: 70000, baseline: 40000
  }},
  { region: "Belgium", roas: 3.2, incremental: 280000, flag: "🇧🇪", channels: {
    paid: 130000, organic: 70000, nonPaid: 50000, baseline: 30000
  }},
  { region: "Sweden", roas: 5.1, incremental: 320000, flag: "🇸🇪", channels: {
    paid: 160000, organic: 80000, nonPaid: 50000, baseline: 30000
  }},
  { region: "Norway", roas: 4.8, incremental: 290000, flag: "🇳🇴", channels: {
    paid: 140000, organic: 70000, nonPaid: 50000, baseline: 30000
  }},
  { region: "Denmark", roas: 4.3, incremental: 250000, flag: "🇩🇰", channels: {
    paid: 120000, organic: 60000, nonPaid: 40000, baseline: 30000
  }},
  { region: "Finland", roas: 4.0, incremental: 220000, flag: "🇫🇮", channels: {
    paid: 100000, organic: 60000, nonPaid: 35000, baseline: 25000
  }},
  { region: "Poland", roas: 2.5, incremental: 380000, flag: "🇵🇱", channels: {
    paid: 160000, organic: 100000, nonPaid: 70000, baseline: 50000
  }},
  { region: "Switzerland", roas: 4.7, incremental: 310000, flag: "🇨🇭", channels: {
    paid: 150000, organic: 80000, nonPaid: 50000, baseline: 30000
  }},
  { region: "Austria", roas: 3.6, incremental: 240000, flag: "🇦🇹", channels: {
    paid: 110000, organic: 60000, nonPaid: 40000, baseline: 30000
  }},
];

// Define channel names for display
const channelNames = {
  paid: "Paid Media",
  organic: "Organic Media",
  nonPaid: "Non-Paid Media",
  baseline: "Baseline"
};

// Get colors for the heatmap based on incremental value
const getIncrementalColor = (value: number) => {
  if (value >= 700000) return "bg-blue-600 text-white";
  if (value >= 500000) return "bg-blue-500 text-white";
  if (value >= 350000) return "bg-blue-400 text-white";
  if (value >= 200000) return "bg-blue-300";
  return "bg-blue-200";
};

// Get colors for the heatmap based on ROAS value
const getRoasColor = (roas: number) => {
  if (roas >= 5.0) return "bg-green-600 text-white";
  if (roas >= 4.0) return "bg-green-500 text-white";
  if (roas >= 3.5) return "bg-green-400";
  if (roas >= 3.0) return "bg-green-300";
  if (roas >= 2.5) return "bg-yellow-300";
  if (roas >= 2.0) return "bg-yellow-400";
  if (roas >= 1.5) return "bg-orange-400";
  if (roas >= 1.0) return "bg-orange-500 text-white";
  return "bg-red-500 text-white";
};

// Function to get emoji indicators for trend
const getTrendIndicator = (value: number, isRevenue: boolean = false) => {
  if (isRevenue) {
    if (value >= 500000) return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (value >= 300000) return <ArrowUp className="h-4 w-4 text-green-400" />;
    return <ArrowDown className="h-4 w-4 text-yellow-500" />;
  } else {
    // ROAS indicators
    if (value >= 4.0) return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (value >= 3.0) return <ArrowUp className="h-4 w-4 text-green-400" />;
    if (value >= 2.0) return <ArrowDown className="h-4 w-4 text-yellow-500" />;
    return <ArrowDown className="h-4 w-4 text-red-500" />;
  }
};

// Function to format currency values
const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

interface GeographicMediaBreakdownProps {
  loading?: boolean;
  selectedProduct: string;
}

export function GeographicMediaBreakdown({ loading = false, selectedProduct }: GeographicMediaBreakdownProps) {
  // Sort regions by incremental revenue instead of ROAS
  const sortedRegions = [...europeRegionsData].sort((a, b) => b.incremental - a.incremental);

  // Calculate total incremental contribution
  const totalIncremental = sortedRegions.reduce((sum, region) => sum + region.incremental, 0);

  // Calculate summary stats
  const averageIncremental = totalIncremental / sortedRegions.length;
  const bestRegion = sortedRegions[0];
  const worstRegion = sortedRegions[sortedRegions.length - 1];
  const averageRoas = sortedRegions.reduce((sum, region) => sum + region.roas, 0) / sortedRegions.length;

  // State for selected region for detailed view
  const [selectedRegion, setSelectedRegion] = useState<typeof europeRegionsData[0] | null>(null);
  const [activeView, setActiveView] = useState<"incremental" | "roas">("incremental");

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 justify-between">
          <Skeleton className="h-24 w-[30%]" />
          <Skeleton className="h-24 w-[30%]" />
          <Skeleton className="h-24 w-[30%]" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="table" className="flex items-center gap-2">
            <Info className="h-4 w-4" /> Detailed View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="map">
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium text-sm text-muted-foreground mb-1">Total Incremental Revenue</div>
                  <div className="text-2xl font-bold">{formatCurrency(totalIncremental)}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Product: {selectedProduct || "All Products"}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium text-sm text-muted-foreground mb-1">Top Performing Region</div>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">{bestRegion.flag} {bestRegion.region}</span>
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">Revenue: {formatCurrency(bestRegion.incremental)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="font-medium text-sm text-muted-foreground mb-1">Average ROAS</div>
                  <div className="text-2xl font-bold">{averageRoas.toFixed(2)}x</div>
                  <div className="text-xs text-muted-foreground mt-2">Across all European regions</div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Regional Analysis</CardTitle>
              <CardDescription>
                Incremental contribution by region across Europe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium mb-1">Understanding Regional Distribution</h3>
                    <p className="text-sm text-muted-foreground">
                      This analysis shows incremental revenue contribution across European markets. 
                      Use this data to identify top-performing regions and optimize your marketing investments
                      based on regional performance trends.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Revenue by Region</h3>
                  
                  <div className="flex items-center gap-4">
                    <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "incremental" | "roas")} className="w-[300px]">
                      <TabsList>
                        <TabsTrigger value="incremental">Incremental Revenue</TabsTrigger>
                        <TabsTrigger value="roas">ROAS</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Region</TableHead>
                        <TableHead>{activeView === "incremental" ? "Incremental Revenue" : "ROAS"}</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedRegions.map((region) => (
                        <TableRow 
                          key={region.region} 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => setSelectedRegion(region)}
                        >
                          <TableCell>
                            <div className="flex items-center">
                              <span className="text-lg mr-2">{region.flag}</span>
                              <span className="font-medium">{region.region}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {activeView === "incremental" ? (
                              <Badge className={`${getIncrementalColor(region.incremental)}`}>
                                {formatCurrency(region.incremental)}
                              </Badge>
                            ) : (
                              <Badge className={`${getRoasColor(region.roas)}`}>
                                {region.roas.toFixed(2)}x
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {activeView === "incremental" 
                                ? getTrendIndicator(region.incremental, true)
                                : getTrendIndicator(region.roas)}
                              <span className="ml-1">
                                {activeView === "incremental" 
                                  ? (region.incremental >= 500000 ? "Excellent" : 
                                     region.incremental >= 300000 ? "Good" : 
                                     region.incremental >= 200000 ? "Average" : "Poor")
                                  : (region.roas >= 4.0 ? "Excellent" : 
                                     region.roas >= 3.0 ? "Good" : 
                                     region.roas >= 2.0 ? "Average" : "Poor")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge 
                              variant="outline" 
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRegion(region);
                              }}
                            >
                              <Maximize2 className="h-3 w-3 mr-1" />
                              Details
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Regional Analysis</CardTitle>
              <CardDescription>
                Comprehensive breakdown of media performance by region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sortedRegions.map((region) => {
                  const totalChannelRevenue = Object.values(region.channels).reduce((sum, val) => sum + (val as number), 0);
                  
                  return (
                    <Card key={region.region} className="overflow-hidden">
                      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{region.flag}</div>
                            <div>
                              <h3 className="text-lg font-medium">{region.region}</h3>
                              <p className="text-sm text-muted-foreground">Incremental Revenue: {formatCurrency(region.incremental)}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(region.channels).map(([channel, value]) => (
                              <div key={channel} className="text-center">
                                <div className="text-xs text-muted-foreground mb-1">{channelNames[channel as keyof typeof channelNames]}</div>
                                <div className="font-semibold">{formatCurrency(value as number)}</div>
                                <div className="text-xs text-muted-foreground">
                                  {Math.round(((value as number) / totalChannelRevenue) * 100)}% of total
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Region detail sheet that appears when a region is clicked */}
      <Sheet open={!!selectedRegion} onOpenChange={() => setSelectedRegion(null)}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <span className="text-xl mr-2">{selectedRegion?.flag}</span>
              {selectedRegion?.region} - Performance Analysis
            </SheetTitle>
            <SheetDescription>
              Detailed performance metrics for {selectedRegion?.region}
            </SheetDescription>
          </SheetHeader>
          
          {selectedRegion && (
            <div className="py-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Incremental Revenue</div>
                  <div className="text-2xl font-bold">{formatCurrency(selectedRegion.incremental)}</div>
                  <div className="flex items-center gap-1 mt-1 text-xs">
                    {getTrendIndicator(selectedRegion.incremental, true)}
                    <span>
                      {selectedRegion.incremental >= 500000 ? "Excellent" : 
                       selectedRegion.incremental >= 300000 ? "Good" : 
                       selectedRegion.incremental >= 200000 ? "Average" : "Poor"}
                    </span>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">ROAS</div>
                  <div className="text-2xl font-bold">{selectedRegion.roas.toFixed(2)}x</div>
                  <div className="flex items-center gap-1 mt-1 text-xs">
                    {getTrendIndicator(selectedRegion.roas)}
                    <span>
                      {selectedRegion.roas >= 4.0 ? "Excellent" : 
                       selectedRegion.roas >= 3.0 ? "Good" : 
                       selectedRegion.roas >= 2.0 ? "Average" : "Poor"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Revenue Breakdown by Media Type</h3>
                <div className="space-y-3">
                  {Object.entries(selectedRegion.channels).map(([channel, value]) => {
                    const percentage = ((value as number) / selectedRegion.incremental) * 100;
                    
                    return (
                      <div key={channel}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{channelNames[channel as keyof typeof channelNames]}</span>
                          <span className="text-sm font-medium">{formatCurrency(value as number)} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg mb-6">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium mb-1">Regional Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedRegion.incremental >= 500000 
                        ? `${selectedRegion.region} is a top-performing region with excellent incremental revenue. 
                          Continue to prioritize this market in your media planning.` 
                        : selectedRegion.incremental >= 300000
                        ? `${selectedRegion.region} shows good performance with strong incremental revenue potential. 
                          Consider optimizing your media mix to further improve results.`
                        : `${selectedRegion.region} has room for improvement. Review your media strategy and 
                          consider testing new approaches to boost incremental revenue.`
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Recommendations</h3>
                <ul className="space-y-2 text-sm">
                  {selectedRegion.incremental >= 500000 ? (
                    <>
                      <li className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-green-500" />
                        <span>Consider increasing investment in this high-performing region</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-green-500" />
                        <span>Test expanding into similar neighboring markets</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-green-500" />
                        <span>Use this region's strategy as a blueprint for lower-performing areas</span>
                      </li>
                    </>
                  ) : selectedRegion.incremental >= 300000 ? (
                    <>
                      <li className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-blue-500" />
                        <span>Optimize media mix to improve incremental revenue</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-blue-500" />
                        <span>Identify top-performing channels and increase their budget allocation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-blue-500" />
                        <span>Test new creative approaches to boost engagement</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-amber-500" />
                        <span>Review overall strategy for this region</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-amber-500" />
                        <span>Consider reallocating budget from low-performing channels</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-amber-500" />
                        <span>Analyze audience data to improve targeting</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
          
          <SheetClose asChild>
            <div className="absolute top-4 right-4">
              <X className="h-4 w-4" />
            </div>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}
