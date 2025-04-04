import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ReferenceArea, ReferenceLine, Brush, Scatter, ScatterChart, ZAxis, ComposedChart, Label } from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useMemo } from "react";
type TimeSeriesChartProps = {
  data: any[];
  series: {
    dataKey: string;
    color: string;
    label: string;
    type?: "line" | "area" | "scatter";
    strokeDasharray?: string;
    hidden?: boolean;
  }[];
  xAxisKey?: string;
  loading?: boolean;
  height?: number;
  className?: string;
  stacked?: boolean;
  showBrush?: boolean;
  showRollingAverage?: boolean;
  comparisonPeriod?: {
    start: number;
    end: number;
  } | null;
  roasScatterVisible?: boolean;
  chartType?: "combined" | "separated" | "roas";
  showAverageLines?: boolean;
  legendSpacing?: boolean;
};
export function TimeSeriesChart({
  data,
  series,
  xAxisKey = "date",
  loading = false,
  height = 350,
  className,
  stacked = false,
  showBrush = false,
  showRollingAverage = false,
  comparisonPeriod = null,
  roasScatterVisible = false,
  chartType = "combined",
  showAverageLines = false,
  legendSpacing = false
}: TimeSeriesChartProps) {
  const [visibleSeries, setVisibleSeries] = useState<string[]>(series.map(s => s.dataKey));
  const rollingAverageData = useMemo(() => {
    if (!showRollingAverage) return [];
    const windowSize = 7;
    return data.map((item, index) => {
      if (index < windowSize - 1) return {
        ...item
      };
      const rollingAvgs: Record<string, number | null> = {};
      series.forEach(s => {
        if (s.dataKey === "roas" && !roasScatterVisible) {
          let sum = 0;
          for (let i = 0; i < windowSize; i++) {
            sum += data[index - i][s.dataKey] || 0;
          }
          rollingAvgs[`${s.dataKey}RollingAvg`] = sum / windowSize;
        } else if (s.dataKey !== "roas") {
          let sum = 0;
          for (let i = 0; i < windowSize; i++) {
            sum += data[index - i][s.dataKey] || 0;
          }
          rollingAvgs[`${s.dataKey}RollingAvg`] = sum / windowSize;
        }
      });
      return {
        ...item,
        ...rollingAvgs
      };
    });
  }, [data, showRollingAverage, series, roasScatterVisible]);
  const averageValues = useMemo(() => {
    if (!showAverageLines) return {};
    const result: Record<string, number> = {};
    series.forEach(s => {
      const values = data.map(item => item[s.dataKey]).filter(v => v !== undefined && v !== null);
      if (values.length > 0) {
        const sum = values.reduce((acc, val) => acc + val, 0);
        result[s.dataKey] = sum / values.length;
      }
    });
    return result;
  }, [data, series, showAverageLines]);
  const filteredSeries = series.filter(s => visibleSeries.includes(s.dataKey));
  const handleLegendClick = (e: any) => {
    const {
      dataKey
    } = e;
    setVisibleSeries(prev => {
      if (prev.includes(dataKey)) {
        return prev.filter(key => key !== dataKey);
      } else {
        return [...prev, dataKey];
      }
    });
  };
  if (loading) {
    return <div className={cn("w-full animate-pulse", className)} style={{
      height
    }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>;
  }
  const chartConfig = series.reduce((acc, item) => {
    acc[item.dataKey] = {
      label: item.label,
      color: item.color
    };
    if (showRollingAverage) {
      acc[`${item.dataKey}RollingAvg`] = {
        label: `${item.label} (7-day Avg)`,
        color: item.color
      };
    }
    return acc;
  }, {} as Record<string, any>);
  if (chartType === "roas") {
    return <ChartContainer className={cn("w-full", className)} style={{
      height
    }} config={chartConfig}>
        <ComposedChart data={showRollingAverage ? rollingAverageData : data} margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 30
      }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey={xAxisKey} tick={{
          fontSize: 12
        }} tickLine={false} axisLine={{
          stroke: "rgba(0,0,0,0.09)"
        }}>
            <Label value="Time Period" position="insideBottom" offset={-15} />
          </XAxis>
          <YAxis tick={{
          fontSize: 12
        }} tickLine={false} axisLine={false} domain={[0, 'auto']} label={{
          value: 'ROAS (x)',
          angle: -90,
          position: 'insideLeft',
          style: {
            textAnchor: 'middle'
          }
        }} />
          <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => {
          if (name.includes("RollingAvg")) {
            return [`${Number(value).toFixed(2)}x (Avg)`, name.replace("RollingAvg", "")];
          }
          return [`${Number(value).toFixed(2)}x`, name];
        }} />} />
          <Legend onClick={handleLegendClick} formatter={(value, entry, index) => {
          const seriesItem = filteredSeries[index];
          if (!seriesItem) return <span className="text-sm">{value}</span>;
          const isActive = visibleSeries.includes(seriesItem.dataKey);
          return <span className={cn("text-sm", {
            "opacity-50": !isActive
          })}>
                  {seriesItem.label || value}
                </span>;
        }} iconSize={10} wrapperStyle={legendSpacing ? {
          paddingLeft: 20,
          paddingRight: 20,
          columnGap: '40px'
        } : undefined} />

          {comparisonPeriod && <ReferenceArea x1={data[comparisonPeriod.start]?.[xAxisKey]} x2={data[comparisonPeriod.end]?.[xAxisKey]} fill="#8884d83a" fillOpacity={0.3} />}

          {showAverageLines && averageValues.roas && <ReferenceLine y={averageValues.roas} stroke="#9b87f5" strokeDasharray="3 3" label={{
          position: 'right',
          value: `Avg: ${averageValues.roas.toFixed(2)}x`,
          fill: '#9b87f5',
          fontSize: 12
        }} />}

          <Line type="monotone" dataKey="roas" name="ROAS" stroke="#9b87f5" strokeWidth={2} dot={{
          r: 3,
          fill: '#9b87f5'
        }} activeDot={{
          r: 6
        }} animationDuration={1000} />

          {showRollingAverage && <Line type="monotone" dataKey="roasRollingAvg" name="ROAS (7-day Avg)" stroke="#7E69AB" strokeWidth={2.5} strokeDasharray="5 5" dot={false} activeDot={{
          r: 6
        }} animationDuration={1200} />}

          {showBrush && <Brush dataKey={xAxisKey} height={30} stroke="#9b87f5" startIndex={Math.max(0, data.length - 30)} />}
        </ComposedChart>
      </ChartContainer>;
  }
  if (chartType === "separated") {
    return <ChartContainer className={cn("w-full", className)} style={{
      height
    }} config={chartConfig}>
        <ComposedChart data={showRollingAverage ? rollingAverageData : data} margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 30
      }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis dataKey={xAxisKey} tick={{
          fontSize: 12
        }} tickLine={false} axisLine={{
          stroke: "rgba(0,0,0,0.09)"
        }}>
            <Label value="Time Period" position="insideBottom" offset={-15} />
          </XAxis>
          <YAxis yAxisId="left" tick={{
          fontSize: 12
        }} tickLine={false} axisLine={false} tickFormatter={value => `$${value.toLocaleString()}`} label={{
          value: 'USD ($)',
          angle: -90,
          position: 'insideLeft',
          style: {
            textAnchor: 'middle'
          }
        }} />
          <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => {
          if (name.includes("RollingAvg")) {
            return [`$${Number(value).toLocaleString()} (Avg)`, name.replace("RollingAvg", "")];
          }
          return [`$${Number(value).toLocaleString()}`, name];
        }} />} />
          <Legend onClick={handleLegendClick} formatter={(value, entry, index) => {
          const seriesItem = filteredSeries[index];
          if (!seriesItem) return <span className="text-sm">{value}</span>;
          const isActive = visibleSeries.includes(seriesItem.dataKey);
          return <span className={cn("text-sm", {
            "opacity-50": !isActive
          })}>
                  {seriesItem.label || value}
                </span>;
        }} iconSize={10} wrapperStyle={legendSpacing ? {
          paddingLeft: 20,
          paddingRight: 20,
          columnGap: '40px'
        } : undefined} />

          {comparisonPeriod && <ReferenceArea x1={data[comparisonPeriod.start]?.[xAxisKey]} x2={data[comparisonPeriod.end]?.[xAxisKey]} fill="#8884d83a" fillOpacity={0.3} />}

          {showAverageLines && averageValues.revenue && <ReferenceLine y={averageValues.revenue} stroke="#0EA5E9" strokeDasharray="3 3" yAxisId="left" label={{
          position: 'right',
          value: `Avg: $${averageValues.revenue.toLocaleString()}`,
          fill: '#0EA5E9',
          fontSize: 12
        }} />}
          
          {showAverageLines && averageValues.cost && <ReferenceLine y={averageValues.cost} stroke="#ea384c" strokeDasharray="3 3" yAxisId="left" label={{
          position: 'right',
          value: `Avg: $${averageValues.cost.toLocaleString()}`,
          fill: '#ea384c',
          fontSize: 12
        }} />}

          {filteredSeries.map((item, index) => {
          const isVisible = visibleSeries.includes(item.dataKey);
          if (!isVisible) return null;
          return <Line key={item.dataKey} type="monotone" dataKey={item.dataKey} name={item.label} stroke={item.color} strokeWidth={2} dot={{
            r: 3,
            fill: item.color
          }} activeDot={{
            r: 6
          }} animationDuration={1000 + index * 250} animationBegin={index * 100} yAxisId="left" />;
        })}

          {showRollingAverage && filteredSeries.map((item, index) => <Line key={`${item.dataKey}RollingAvg`} type="monotone" dataKey={`${item.dataKey}RollingAvg`} name={`${item.label} (7-day Avg)}`} stroke={item.color} strokeWidth={2.5} strokeDasharray="5 5" dot={false} activeDot={{
          r: 6
        }} animationDuration={1200 + index * 250} yAxisId="left" />)}

          {showBrush && <Brush dataKey={xAxisKey} height={30} stroke="#8884d8" startIndex={Math.max(0, data.length - 30)} />}
        </ComposedChart>
      </ChartContainer>;
  }
  return <ChartContainer className={cn("w-full", className)} style={{
    height
  }} config={chartConfig}>
      <ComposedChart data={showRollingAverage ? rollingAverageData : data} margin={{
      top: 20,
      right: 30,
      left: 20,
      bottom: 30
    }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
        <XAxis dataKey={xAxisKey} tick={{
        fontSize: 12
      }} tickLine={false} axisLine={{
        stroke: "rgba(0,0,0,0.09)"
      }}>
          <Label value="Time Period" position="insideBottom" offset={-15} />
        </XAxis>
        <YAxis yAxisId="left" tick={{
        fontSize: 12
      }} tickLine={false} axisLine={false} tickFormatter={value => `$${value.toLocaleString()}`} label={{
        value: 'USD ($)',
        angle: -90,
        position: 'insideLeft',
        style: {
          textAnchor: 'middle'
        }
      }} />
        {roasScatterVisible && <YAxis yAxisId="right" orientation="right" tick={{
        fontSize: 12
      }} tickLine={false} axisLine={false} domain={[0, 'dataMax + 1']} label={{
        value: 'ROAS (x)',
        angle: -90,
        position: 'insideRight',
        style: {
          textAnchor: 'middle'
        }
      }} />}
        <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => {
        if (name === "roas") {
          return [`${Number(value).toFixed(2)}x`, name];
        }
        if (name.includes("RollingAvg")) {
          if (name === "roasRollingAvg") {
            return [`${Number(value).toFixed(2)}x (Avg)`, "roas"];
          }
          return [`$${Number(value).toLocaleString()} (Avg)`, name.replace("RollingAvg", "")];
        }
        return [`$${Number(value).toLocaleString()}`, name];
      }} />} />
        <Legend onClick={handleLegendClick} formatter={(value, entry, index) => {
        const seriesItem = series[index];
        if (!seriesItem) return <span className="text-sm">{value}</span>;
        const isActive = visibleSeries.includes(seriesItem.dataKey);
        return <span className="mx-[120px] px-0 py- my-0 text-xs font-medium text-left">
                {seriesItem.label || value}
              </span>;
      }} iconSize={10} wrapperStyle={legendSpacing ? {
        paddingLeft: 20,
        paddingRight: 20,
        columnGap: '40px'
      } : undefined} />

        {comparisonPeriod && <ReferenceArea x1={data[comparisonPeriod.start]?.[xAxisKey]} x2={data[comparisonPeriod.end]?.[xAxisKey]} fill="#8884d83a" fillOpacity={0.3} />}

        {filteredSeries.map((item, index) => {
        const isVisible = visibleSeries.includes(item.dataKey);
        if (!isVisible && item.dataKey !== "rollingAvg") return null;
        if (item.type === "scatter" && roasScatterVisible) {
          return <Scatter key={item.dataKey} dataKey={item.dataKey} name={item.label} fill={item.color} yAxisId="right" animationDuration={1000 + index * 250} animationBegin={index * 100} />;
        } else if (item.type === "line") {
          return <Line key={item.dataKey} type="monotone" dataKey={item.dataKey} name={item.label} stroke={item.color} strokeWidth={item.dataKey === "rollingAvg" ? 3 : 2} strokeDasharray={item.dataKey === "rollingAvg" ? "" : item.strokeDasharray} dot={item.dataKey === "rollingAvg" ? false : {
            r: 3
          }} activeDot={item.dataKey === "rollingAvg" ? {
            r: 4
          } : {
            r: 5
          }} animationDuration={1000 + index * 250} animationBegin={index * 100} fill="transparent" yAxisId="left" />;
        } else {
          return <Area key={item.dataKey} type="monotone" dataKey={item.dataKey} name={item.label} stroke={item.color} fill={item.color} strokeWidth={1.5} fillOpacity={0.3} animationDuration={1000 + index * 250} animationBegin={index * 100} stackId={stacked ? "stack" : undefined} yAxisId="left" />;
        }
      })}

        {showRollingAverage && filteredSeries.filter(s => s.dataKey !== "roas" || !roasScatterVisible).map((item, index) => {
        if (item.dataKey === "roas" && roasScatterVisible) return null;
        return <Line key={`${item.dataKey}RollingAvg`} type="monotone" dataKey={`${item.dataKey}RollingAvg`} name={`${item.label} (7-day Avg)}`} stroke={item.color} strokeWidth={2.5} strokeDasharray="5 5" dot={false} activeDot={{
          r: 6
        }} animationDuration={1200 + index * 250} yAxisId={item.dataKey === "roas" ? "right" : "left"} />;
      })}

        {showBrush && <Brush dataKey={xAxisKey} height={30} stroke="#8884d8" startIndex={Math.max(0, data.length - 30)} />}
      </ComposedChart>
    </ChartContainer>;
}