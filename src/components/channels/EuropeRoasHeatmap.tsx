import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUp, Info, Maximize2, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";

// Mock data for European cities with ROAS values
const europeRegionsData = [
  { region: "London", roas: 4.2, flag: "🇬🇧", channels: {
    social: 3.8, search: 5.2, email: 4.5, display: 3.1, video: 4.7
  }},
  { region: "Berlin", roas: 3.9, flag: "🇩🇪", channels: {
    social: 4.1, search: 4.8, email: 3.2, display: 2.9, video: 4.5
  }},
  { region: "Paris", roas: 3.5, flag: "🇫🇷", channels: {
    social: 3.2, search: 4.1, email: 3.8, display: 2.7, video: 3.7
  }},
  { region: "Rome", roas: 2.8, flag: "🇮🇹", channels: {
    social: 2.5, search: 3.2, email: 3.0, display: 2.1, video: 2.8
  }},
  { region: "Madrid", roas: 3.1, flag: "🇪🇸", channels: {
    social: 3.4, search: 3.7, email: 2.8, display: 2.3, video: 3.3
  }},
  { region: "Amsterdam", roas: 4.5, flag: "🇳🇱", channels: {
    social: 4.7, search: 5.3, email: 4.1, display: 3.4, video: 5.0
  }},
  { region: "Brussels", roas: 3.2, flag: "🇧🇪", channels: {
    social: 3.0, search: 3.8, email: 3.5, display: 2.5, video: 3.2
  }},
  { region: "Stockholm", roas: 5.1, flag: "🇸🇪", channels: {
    social: 5.4, search: 5.9, email: 4.5, display: 4.2, video: 5.5
  }},
  { region: "Oslo", roas: 4.8, flag: "🇳🇴", channels: {
    social: 5.0, search: 5.5, email: 4.2, display: 3.9, video: 5.2
  }},
  { region: "Copenhagen", roas: 4.3, flag: "🇩🇰", channels: {
    social: 4.5, search: 5.0, email: 3.9, display: 3.8, video: 4.3
  }},
  { region: "Helsinki", roas: 4.0, flag: "🇫🇮", channels: {
    social: 4.2, search: 4.7, email: 3.7, display: 3.5, video: 4.2
  }},
  { region: "Warsaw", roas: 2.5, flag: "🇵🇱", channels: {
    social: 2.2, search: 2.9, email: 2.6, display: 2.0, video: 2.8
  }},
  { region: "Zurich", roas: 4.7, flag: "🇨🇭", channels: {
    social: 4.9, search: 5.4, email: 4.3, display: 3.8, video: 5.1
  }},
  { region: "Vienna", roas: 3.6, flag: "🇦🇹", channels: {
    social: 3.8, search: 4.2, email: 3.3, display: 3.0, video: 3.7
  }},
  { region: "Dublin", roas: 3.8, flag: "🇮🇪", channels: {
    social: 4.0, search: 4.5, email: 3.5, display: 3.2, video: 4.0
  }},
  { region: "Lisbon", roas: 2.7, flag: "🇵🇹", channels: {
    social: 2.4, search: 3.1, email: 2.9, display: 2.2, video: 2.9
  }},
  { region: "Athens", roas: 2.3, flag: "🇬🇷", channels: {
    social: 2.0, search: 2.7, email: 2.5, display: 1.8, video: 2.5
  }},
  { region: "Prague", roas: 2.9, flag: "🇨🇿", channels: {
    social: 2.7, search: 3.4, email: 3.0, display: 2.4, video: 3.0
  }},
];

const channelNames = {
  social: "Social Media",
  search: "Search",
  email: "Email",
  display: "Display",
  video: "Video"
};

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

const getTrendIndicator = (value: number) => {
  if (value >= 4.0) return <ArrowUp className="h-4 w-4 text-green-500" />;
  if (value >= 3.0) return <ArrowUp className="h-4 w-4 text-green-400" />;
  if (value >= 2.0) return <ArrowDown className="h-4 w-4 text-yellow-500" />;
  return <ArrowDown className="h-4 w-4 text-red-500" />;
};

interface EuropeRoasHeatmapProps {
  loading?: boolean;
  selectedChannel: string | null;
}

export function EuropeRoasHeatmap({ loading = false, selectedChannel }: EuropeRoasHeatmapProps) {
  const sortedRegions = [...europeRegionsData].sort((a, b) => b.roas - a.roas);

  const averageRoas = sortedRegions.reduce((sum, region) => sum + region.roas, 0) / sortedRegions.length;
  const bestRegion = sortedRegions[0];
  const worstRegion = sortedRegions[sortedRegions.length - 1];

  const [selectedRegion, setSelectedRegion] = useState<typeof europeRegionsData[0] | null>(null);

  const filteredRegions = selectedChannel && selectedChannel !== "all" 
    ? sortedRegions.map(region => ({
        ...region,
        roas: region.channels[selectedChannel as keyof typeof region.channels] || region.roas
      }))
    : sortedRegions;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Europe ROAS Heatmap</CardTitle>
          <CardDescription>ROAS performance across European cities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 justify-between">
              <Skeleton className="h-24 w-[30%]" />
              <Skeleton className="h-24 w-[30%]" />
              <Skeleton className="h-24 w-[30%]" />
            </div>
            <Skeleton className="h-[400px] w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Europe ROAS Heatmap</CardTitle>
        <CardDescription>
          ROAS performance across European cities
          {selectedChannel && selectedChannel !== "all" && ` - Filtered by ${channelNames[selectedChannel as keyof typeof channelNames]}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="font-medium text-sm text-muted-foreground mb-1">Average ROAS</div>
              <div className="text-2xl font-bold">{averageRoas.toFixed(2)}x</div>
              <div className="text-xs text-muted-foreground mt-2">Across all European cities</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="font-medium text-sm text-muted-foreground mb-1">Best Performing City</div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{bestRegion.flag} {bestRegion.region}</span>
                <ArrowUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-xs text-muted-foreground mt-2">ROAS: {bestRegion.roas.toFixed(2)}x</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="font-medium text-sm text-muted-foreground mb-1">Lowest Performing City</div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{worstRegion.flag} {worstRegion.region}</span>
                <ArrowDown className="h-4 w-4 text-red-500" />
              </div>
              <div className="text-xs text-muted-foreground mt-2">ROAS: {worstRegion.roas.toFixed(2)}x</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <div className="mb-3 flex justify-between items-center">
            <div className="text-sm font-medium">ROAS by City</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Info className="h-4 w-4 mr-1" /> 
              Click on a city to view channel breakdown
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>City</TableHead>
                  <TableHead>ROAS</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegions.map((region) => (
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
                      <Badge className={`${getRoasColor(region.roas)}`}>
                        {region.roas.toFixed(2)}x
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getTrendIndicator(region.roas)}
                        <span className="ml-1">
                          {region.roas >= 4.0 ? "Excellent" : 
                           region.roas >= 3.0 ? "Good" : 
                           region.roas >= 2.0 ? "Average" : "Poor"}
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

        <Sheet open={!!selectedRegion} onOpenChange={() => setSelectedRegion(null)}>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <span className="text-xl mr-2">{selectedRegion?.flag}</span>
                {selectedRegion?.region} - ROAS Breakdown
              </SheetTitle>
              <SheetDescription>
                Channel performance analysis for {selectedRegion?.region}
              </SheetDescription>
            </SheetHeader>
            
            {selectedRegion && (
              <div className="py-6">
                <div className="mb-6">
                  <div className="text-sm font-medium mb-2">Overall ROAS</div>
                  <div className="flex items-center">
                    <Badge className={`text-lg ${getRoasColor(selectedRegion.roas)}`}>
                      {selectedRegion.roas.toFixed(2)}x
                    </Badge>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {selectedRegion.roas >= 4.0 ? "Excellent performance" : 
                       selectedRegion.roas >= 3.0 ? "Good performance" : 
                       selectedRegion.roas >= 2.0 ? "Average performance" : "Needs improvement"}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg mb-6">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        The table below shows ROAS for each marketing channel in {selectedRegion.region}. 
                        Higher values indicate better performance. Use this data to optimize your 
                        channel mix and budget allocation for this region.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium">ROAS by Channel</div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Channel</TableHead>
                        <TableHead>ROAS</TableHead>
                        <TableHead>Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(selectedRegion.channels).map(([channel, roas]) => (
                        <TableRow key={channel}>
                          <TableCell className="font-medium">
                            {channelNames[channel as keyof typeof channelNames]}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getRoasColor(roas as number)}`}>
                              {(roas as number).toFixed(2)}x
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getTrendIndicator(roas as number)}
                              <span className="ml-1">
                                {(roas as number) >= 4.0 ? "Excellent" : 
                                 (roas as number) >= 3.0 ? "Good" : 
                                 (roas as number) >= 2.0 ? "Average" : "Poor"}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-1 text-primary" />
                      City Insights
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedRegion.roas >= 4.0 
                        ? `${selectedRegion.region} shows excellent ROAS performance across most channels. Consider increasing budget allocation to this city, especially for ${Object.entries(selectedRegion.channels)
                            .sort(([, a], [, b]) => (b as number) - (a as number))
                            .slice(0, 1)
                            .map(([channel]) => channelNames[channel as keyof typeof channelNames])}.`
                        : selectedRegion.roas >= 3.0
                        ? `${selectedRegion.region} shows good overall performance. Optimize channel mix to improve results further.`
                        : `${selectedRegion.region} has below-average ROAS performance. Consider revising targeting strategy or creative assets for this city.`
                      }
                    </p>
                  </div>
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
      </CardContent>
    </Card>
  );
}
