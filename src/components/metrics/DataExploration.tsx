
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileBarChart, BarChart, GitCompare, PieChart, InfoIcon } from "lucide-react";
import { MetricDistributionChart } from "@/components/channels/MetricDistributionChart";
import { CorrelationMatrix } from "@/components/channels/CorrelationMatrix";
import { MetricScatterPlot } from "@/components/channels/MetricScatterPlot";

interface DataExplorationProps {
  channelData: any[];
  loading: boolean;
  timeframe: string;
  edaTab: string;
  setEdaTab: (tab: string) => void;
}

export const DataExploration = ({ channelData, loading, timeframe, edaTab, setEdaTab }: DataExplorationProps) => {
  return (
    <div id="metrics-content" className="eda-card mb-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FileBarChart className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Data Exploration</h3>
        </div>
        <Button variant="outline" size="sm" className="gap-1 transition-all duration-300 hover:bg-primary/10">
          <InfoIcon className="h-4 w-4" /> 
          About EDA
        </Button>
      </div>

      <Tabs
        defaultValue="distribution"
        value={edaTab}
        onValueChange={setEdaTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1">
          <TabsTrigger value="distribution" className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
            <BarChart className="h-4 w-4 mr-2" /> Distribution Analysis
          </TabsTrigger>
          <TabsTrigger value="correlation" className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
            <GitCompare className="h-4 w-4 mr-2" /> Correlation Analysis
          </TabsTrigger>
          <TabsTrigger value="scatter" className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
            <PieChart className="h-4 w-4 mr-2" /> Scatter Analysis
          </TabsTrigger>
        </TabsList>
        
        <div className="bg-white/50 p-4 rounded-lg border border-white/30 shadow-sm">
          <TabsContent value="distribution" className="mt-0">
            <div className="mb-3 flex justify-between">
              <h4 className="font-medium flex items-center text-primary">
                <BarChart className="h-4 w-4 mr-2" /> 
                Metric Distribution Across Channels
              </h4>
              <span className="text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded-full border border-border/30">
                Showing data for {timeframe === "7d" ? "past week" : timeframe === "30d" ? "past month" : "past quarter"}
              </span>
            </div>
            <MetricDistributionChart data={channelData} loading={loading} />
          </TabsContent>
          
          <TabsContent value="correlation" className="mt-0">
            <div className="mb-3 flex justify-between">
              <h4 className="font-medium flex items-center text-primary">
                <GitCompare className="h-4 w-4 mr-2" /> 
                Metric Correlation Heatmap
              </h4>
              <span className="text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded-full border border-border/30">
                {channelData.length} data points analyzed
              </span>
            </div>
            <CorrelationMatrix data={channelData} loading={loading} />
          </TabsContent>
          
          <TabsContent value="scatter" className="mt-0">
            <div className="mb-3 flex justify-between">
              <h4 className="font-medium flex items-center text-primary">
                <PieChart className="h-4 w-4 mr-2" /> 
                Metric Relationship Analysis
              </h4>
              <span className="text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded-full border border-border/30">
                Interactive scatter visualization
              </span>
            </div>
            <MetricScatterPlot data={channelData} loading={loading} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
