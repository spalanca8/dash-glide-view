
import React from "react";
import { X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type MetricsSelectorProps = {
  view: string;
  setView: (view: string) => void;
  selectedMetrics: string[];
  showAllMetrics: boolean;
  availableMetrics: Array<{ key: string; name: string }>;
  handleMetricSelect: (value: string) => void;
  removeMetric: (metricKey: string) => void;
  setShowAllMetrics: (show: boolean) => void;
  getMetricDisplayName: (metricKey: string) => string;
  getMetricColor: (metricKey: string) => string;
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
  setSelectedMetrics?: (metrics: string[]) => void;
};

export function MetricsSelector({
  view,
  setView,
  selectedMetrics,
  showAllMetrics,
  availableMetrics,
  handleMetricSelect,
  removeMetric,
  setShowAllMetrics,
  getMetricDisplayName,
  getMetricColor,
  timeframe,
  setTimeframe,
  setSelectedMetrics
}: MetricsSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex flex-col gap-2 w-full sm:w-auto">
        <div className="flex gap-2 items-center">
          <Tabs
            defaultValue="chart"
            value={view}
            onValueChange={(val) => {
              setView(val);
              // Reset showAllMetrics when switching to chart view
              if (val === "chart") {
                setShowAllMetrics(false);
              }
            }}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2 ml-4">
            <Select
              value=""
              onValueChange={handleMetricSelect}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Add metric" />
              </SelectTrigger>
              <SelectContent>
                {view === "table" && (
                  <SelectItem value="all">All Metrics</SelectItem>
                )}
                {availableMetrics
                  .filter(m => !selectedMetrics.includes(m.key) || showAllMetrics)
                  .map((m) => (
                    <SelectItem key={m.key} value={m.key}>
                      {m.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Selected metrics badges */}
        {!showAllMetrics && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedMetrics.map(metricKey => (
              <Badge 
                key={metricKey} 
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
                style={{ backgroundColor: `${getMetricColor(metricKey)}20` }}
              >
                <span style={{ color: getMetricColor(metricKey) }}>
                  {getMetricDisplayName(metricKey)}
                </span>
                <button 
                  onClick={() => removeMetric(metricKey)}
                  className="ml-1 hover:bg-black/5 rounded-full"
                >
                  <X size={14} className="opacity-70" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        {showAllMetrics && (
          <Badge 
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1 w-fit"
          >
            All Metrics
            <button 
              onClick={() => {
                setShowAllMetrics(false);
                if (selectedMetrics.length === 0 && setSelectedMetrics) {
                  setSelectedMetrics(["revenue"]);
                }
              }}
              className="ml-1 hover:bg-black/5 rounded-full"
            >
              <X size={14} className="opacity-70" />
            </button>
          </Badge>
        )}
      </div>

      <Tabs
        defaultValue="30d"
        value={timeframe}
        onValueChange={setTimeframe}
        className="w-[240px]"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="7d">7D</TabsTrigger>
          <TabsTrigger value="30d">30D</TabsTrigger>
          <TabsTrigger value="90d">90D</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
