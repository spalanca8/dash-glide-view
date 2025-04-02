
// Format value based on metric type
export const formatValue = (value: any, metricType: string) => {
  if (metricType === 'revenue' || metricType === 'cost' || metricType === 'cpa' || metricType === 'cpc') {
    return `$${value?.toLocaleString() || "0"}`;
  }
  if (metricType === 'ctr' || metricType === 'conversionRate') {
    return `${value || "0"}%`;
  }
  if (metricType === 'roas') {
    return `${value?.toFixed(2) || "0"}x`;
  }
  return value?.toLocaleString() || "0";
};

// Get display name for metric
export const getMetricDisplayName = (metricKey: string) => {
  const displayNames: Record<string, string> = {
    revenue: "Revenue",
    cost: "Marketing Cost",
    clicks: "Clicks",
    impressions: "Impressions",
    conversions: "Conversions",
    ctr: "Click-Through Rate",
    roas: "ROAS",
    cpa: "Cost per Acquisition",
    cpc: "Cost per Click",
    conversionRate: "Conversion Rate",
    frequency: "Frequency",
    reach: "Reach",
    avgSessionDuration: "Avg. Session Duration",
    bounceRate: "Bounce Rate",
    engagementRate: "Engagement Rate"
  };
  return displayNames[metricKey] || metricKey;
};

// Get color for metric
export const getMetricColor = (metricKey: string) => {
  const colors: Record<string, string> = {
    revenue: "#0EA5E9",
    cost: "#ea384c",
    clicks: "#22c55e",
    impressions: "#8b5cf6",
    conversions: "#f59e0b",
    ctr: "#ec4899",
    roas: "#06b6d4",
    cpa: "#f43f5e",
    cpc: "#d946ef",
    conversionRate: "#10b981",
    frequency: "#6366f1",
    reach: "#0284c7",
    avgSessionDuration: "#f97316",
    bounceRate: "#ef4444",
    engagementRate: "#84cc16"
  };
  return colors[metricKey] || "#64748b";
};

// List of all available metrics
export const availableMetrics = [
  { key: "revenue", name: "Revenue" },
  { key: "cost", name: "Marketing Cost" },
  { key: "clicks", name: "Clicks" },
  { key: "impressions", name: "Impressions" },
  { key: "conversions", name: "Conversions" },
  { key: "ctr", name: "Click-Through Rate" },
  { key: "roas", name: "ROAS" },
  { key: "cpa", name: "Cost per Acquisition" },
  { key: "cpc", name: "Cost per Click" },
  { key: "conversionRate", name: "Conversion Rate" },
  { key: "frequency", name: "Frequency" },
  { key: "reach", name: "Reach" }
];

// All potential advertisement metrics
export const advertisementMetrics = [
  { key: "impressions", name: "Impressions", icon: "Eye", description: "Number of times your ad was displayed" },
  { key: "clicks", name: "Clicks", icon: "MousePointerClick", description: "Number of clicks on your advertisements" },
  { key: "ctr", name: "CTR", icon: "Percent", description: "Click-through rate (clicks ÷ impressions)" },
  { key: "cost", name: "Ad Spend", icon: "DollarSign", description: "Total cost of advertising campaigns" },
  { key: "cpc", name: "CPC", icon: "CreditCard", description: "Average cost per click" },
  { key: "conversions", name: "Conversions", icon: "Check", description: "Completed desired actions" },
  { key: "conversionRate", name: "Conv. Rate", icon: "Target", description: "Percentage of clicks that led to conversions" },
  { key: "cpa", name: "CPA", icon: "Receipt", description: "Cost per acquisition/conversion" },
  { key: "revenue", name: "Revenue", icon: "BarChart", description: "Total sales revenue from ads" },
  { key: "roas", name: "ROAS", icon: "TrendingUp", description: "Return on ad spend (revenue ÷ cost)" },
  { key: "frequency", name: "Frequency", icon: "Repeat", description: "Average times a user saw your ad" },
  { key: "reach", name: "Reach", icon: "Users", description: "Unique users who saw your ad" },
  { key: "engagementRate", name: "Engagement", icon: "Heart", description: "Interactions with your content" },
  { key: "avgSessionDuration", name: "Session Time", icon: "Clock", description: "Average time spent on site from ads" },
  { key: "bounceRate", name: "Bounce Rate", icon: "ArrowLeft", description: "Percentage of single-page visits" }
];
