import { mediaGroupColors } from "@/components/dashboard/MediaGroupBreakdownChart";

// Sample data for incremental analysis by media group
export const generateMediaGroupData = () => {
  return [
    {
      name: "Jan",
      paid: 12000,
      organic: 5000,
      nonPaid: 3000,
      baseline: 8000,
      total: 28000
    },
    {
      name: "Feb",
      paid: 14000,
      organic: 5500,
      nonPaid: 3200,
      baseline: 8200,
      total: 30900
    },
    {
      name: "Mar",
      paid: 17000,
      organic: 6200,
      nonPaid: 3800,
      baseline: 8500,
      total: 35500
    },
    {
      name: "Apr",
      paid: 15000,
      organic: 6800,
      nonPaid: 4100,
      baseline: 8800,
      total: 34700
    },
    {
      name: "May",
      paid: 18000,
      organic: 7300,
      nonPaid: 4500,
      baseline: 9100,
      total: 38900
    },
    {
      name: "Jun",
      paid: 20000,
      organic: 7800,
      nonPaid: 5000,
      baseline: 9400,
      total: 42200
    }
  ];
};

// Sample data for saturation curve analysis
export const generateSaturationData = () => {
  return [
    { spend: 10000, search: 15000, social: 10000, display: 5000 },
    { spend: 20000, search: 28000, social: 18000, display: 9000 },
    { spend: 30000, search: 39000, social: 24000, display: 12000 },
    { spend: 40000, search: 48000, social: 28000, display: 14000 },
    { spend: 50000, search: 55000, social: 31000, display: 15000 },
    { spend: 60000, search: 60000, social: 33000, display: 15500 },
    { spend: 70000, search: 63000, social: 34000, display: 16000 },
    { spend: 80000, search: 65000, social: 34500, display: 16200 },
    { spend: 90000, search: 66000, social: 35000, display: 16300 },
    { spend: 100000, search: 66500, social: 35200, display: 16400 }
  ];
};

// Sample data for time series analysis
export const generateTimeSeriesData = () => {
  return [
    {
      date: "Jan 1",
      baseline: 8000,
      paid: 12000,
      organic: 5000,
      nonPaid: 3000,
      total: 28000
    },
    {
      date: "Jan 8",
      baseline: 8100,
      paid: 12500,
      organic: 5100,
      nonPaid: 3100,
      total: 28800
    },
    {
      date: "Jan 15",
      baseline: 8200,
      paid: 13000,
      organic: 5200,
      nonPaid: 3150,
      total: 29550
    },
    {
      date: "Jan 22",
      baseline: 8150,
      paid: 13500,
      organic: 5300,
      nonPaid: 3200,
      total: 30150
    },
    {
      date: "Jan 29",
      baseline: 8200,
      paid: 14000,
      organic: 5500,
      nonPaid: 3200,
      total: 30900
    },
    {
      date: "Feb 5",
      baseline: 8250,
      paid: 14500,
      organic: 5700,
      nonPaid: 3300,
      total: 31750
    },
    {
      date: "Feb 12",
      baseline: 8300,
      paid: 15000,
      organic: 5900,
      nonPaid: 3400,
      total: 32600
    },
    {
      date: "Feb 19",
      baseline: 8350,
      paid: 15500,
      organic: 6000,
      nonPaid: 3500,
      total: 33350
    },
    {
      date: "Feb 26",
      baseline: 8400,
      paid: 16000,
      organic: 6100,
      nonPaid: 3600,
      total: 34100
    },
    {
      date: "Mar 5",
      baseline: 8450,
      paid: 16500,
      organic: 6200,
      nonPaid: 3700,
      total: 34850
    },
    {
      date: "Mar 12",
      baseline: 8500,
      paid: 17000,
      organic: 6300,
      nonPaid: 3800,
      total: 35600
    }
  ];
};

// Sample data for waterfall chart
export const generateWaterfallData = () => {
  return [
    {
      name: "Baseline",
      value: 8500,
      fill: mediaGroupColors.baseline
    },
    {
      name: "Paid Media",
      value: 17000,
      fill: mediaGroupColors.paid
    },
    {
      name: "Organic Media",
      value: 6300,
      fill: mediaGroupColors.organic
    },
    {
      name: "Non-Paid Media",
      value: 3800,
      fill: mediaGroupColors.nonPaid
    },
    {
      name: "Total Revenue",
      value: 35600,
      fill: "#6366f1", // Indigo
      isTotal: true
    }
  ];
};

// Enhanced channel data for the selected media type
export const getChannelDataByMediaType = (mediaType: string) => {
  switch (mediaType) {
    case "paid":
      return [
        { id: "search", name: "Search", value: 7000, color: "#4361ee" },
        { id: "social", name: "Social", value: 5000, color: "#3a0ca3" },
        { id: "display", name: "Display", value: 3000, color: "#7209b7" },
        { id: "video", name: "Video", value: 2000, color: "#f72585" }
      ];
    case "organic":
      return [
        { id: "seo", name: "SEO", value: 3500, color: "#06d6a0" },
        { id: "direct", name: "Direct", value: 1800, color: "#1b9aaa" },
        { id: "referral", name: "Referral", value: 1000, color: "#2ec4b6" }
      ];
    case "nonPaid":
      return [
        { id: "affiliate", name: "Affiliate", value: 1500, color: "#ffd166" },
        { id: "email", name: "Email", value: 1200, color: "#f4a261" },
        { id: "pr", name: "PR", value: 1100, color: "#e76f51" }
      ];
    case "baseline":
      return [
        { id: "brand", name: "Brand", value: 4000, color: "#ef476f" },
        { id: "seasonal", name: "Seasonal", value: 2500, color: "#bc4b51" },
        { id: "market", name: "Market", value: 2000, color: "#8a1c33" }
      ];
    default:
      return [];
  }
};

// Channel data for detailed breakdown
export const getChannelDetailsByType = (mediaType: string) => {
  const baseChannels = getChannelDataByMediaType(mediaType);
  return baseChannels.map(channel => ({
    ...channel,
    cost: channel.value * (0.3 + Math.random() * 0.3),
    roas: +(channel.value / (channel.value * (0.3 + Math.random() * 0.3))).toFixed(2),
    conversion: +(Math.random() * 5).toFixed(2),
    cpa: Math.round(100 + Math.random() * 200),
  }));
};

// Generate marginal returns data for each channel
export const generateMarginalReturnsData = () => {
  return [
    { spend: 10000, returns: 2.5, marginal: 2.5 },
    { spend: 20000, returns: 2.3, marginal: 2.1 },
    { spend: 30000, returns: 2.0, marginal: 1.8 },
    { spend: 40000, returns: 1.8, marginal: 1.5 },
    { spend: 50000, returns: 1.6, marginal: 1.2 },
    { spend: 60000, returns: 1.4, marginal: 0.9 },
    { spend: 70000, returns: 1.2, marginal: 0.6 },
    { spend: 80000, returns: 1.1, marginal: 0.4 },
    { spend: 90000, returns: 1.0, marginal: 0.3 },
    { spend: 100000, returns: 0.9, marginal: 0.2 }
  ];
};
