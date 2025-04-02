import * as React from "react";
import { Calendar, Clock, Database, Filter } from "lucide-react";

type DateRangeInfoProps = {
  dateInfo: {
    startDate: string;
    endDate: string;
    totalDataPoints: number;
    dataGranularity: string;
  } | null;
  timeframe: string;
  loading: boolean;
};

export function DateRangeInfo({ dateInfo, timeframe, loading }: DateRangeInfoProps) {
  if (loading) {
    return (
      <div className="mb-6 bg-muted/30 p-4 rounded-lg border animate-pulse">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3 h-5 bg-muted rounded"></div>
          <div className="w-full sm:w-1/3 h-5 bg-muted rounded"></div>
          <div className="w-full sm:w-1/3 h-5 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!dateInfo) return null;

  return (
    <div className="mb-6 bg-muted/30 p-4 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium">
          {dateInfo.startDate} to {dateInfo.endDate}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            <span className="font-medium">{dateInfo.totalDataPoints}</span> data points
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            <span className="font-medium capitalize">{dateInfo.dataGranularity}</span> granularity
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            <span className="font-medium">{timeframe === '7d' ? '7 Days' : timeframe === '30d' ? '30 Days' : '90 Days'}</span> timeframe
          </span>
        </div>
      </div>
    </div>
  );
}
