import { faker } from "@faker-js/faker";

// Define the channel names
export const channelNames = {
  google: "Google Ads",
  facebook: "Facebook Ads",
  youtube: "YouTube Ads",
  tiktok: "TikTok Ads",
  email: "Email Marketing",
  affiliate: "Affiliate Marketing",
  direct: "Direct Traffic",
  referral: "Referral Traffic",
  organicSearch: "Organic Search",
  organicSocial: "Organic Social",
  // Add media type names
  search: "Search Advertising",
  social: "Social Media",
  display: "Display Advertising",
  video: "Video Advertising"
};

// Define the channel colors
export const channelColors = {
  google: "#4361ee",
  facebook: "#f72585",
  youtube: "#7209b7",
  tiktok: "#4cc9f0",
  email: "#f9c74f",
  affiliate: "#90be6d",
  direct: "#f8961e",
  referral: "#577590",
  organicSearch: "#4d908e",
  organicSocial: "#277da1",
  // Add media type colors
  search: "#4361ee",
  social: "#8B5CF6",
  display: "#D946EF",
  video: "#0EA5E9"
};

// Define media group colors for different categories
export const mediaGroupColors = {
  paid: "#4361ee", // Blue
  organic: "#06d6a0", // Green
  nonPaid: "#ffd166", // Amber
  baseline: "#ef476f", // Red
  offline: "#8338ec", // Purple
  branding: "#ff9f1c", // Orange
  promotions: "#ff70a6", // Pink
  pricing: "#43aa8b", // Teal
  distribution: "#277da1", // Dark Blue
  external: "#9e2a2b", // Red-Brown
};

// Define saturation points and current spending for channel types
export const channelSaturationData = {
  search: {
    currentSpend: 45000,
    maxSaturation: 85000,
    color: "#4361ee"
  },
  social: {
    currentSpend: 35000,
    maxSaturation: 70000,
    color: "#8B5CF6" // Vivid Purple
  },
  display: {
    currentSpend: 30000,
    maxSaturation: 60000,
    color: "#D946EF" // Magenta Pink
  },
  video: {
    currentSpend: 25000,
    maxSaturation: 55000,
    color: "#0EA5E9" // Ocean Blue
  }
};

// Generate year-over-year comparison data
export const generateYearOverYearData = () => {
  // Percentage change in incremental revenue by factor
  const revenueByFactor = [
    { name: "Paid Online Media", value: faker.number.int({ min: 15, max: 35 }), color: mediaGroupColors.paid },
    { name: "Organic Search", value: faker.number.int({ min: 5, max: 25 }), color: mediaGroupColors.organic },
    { name: "Offline Media", value: faker.number.int({ min: -10, max: 15 }), color: mediaGroupColors.offline },
    { name: "Branding", value: faker.number.int({ min: 10, max: 30 }), color: mediaGroupColors.branding },
    { name: "Promotions", value: faker.number.int({ min: -5, max: 20 }), color: mediaGroupColors.promotions },
    { name: "Pricing", value: faker.number.int({ min: -15, max: 5 }), color: mediaGroupColors.pricing },
    { name: "Distribution", value: faker.number.int({ min: -20, max: 10 }), color: mediaGroupColors.distribution },
    { name: "External Factors", value: faker.number.int({ min: -25, max: 5 }), color: mediaGroupColors.external },
    { name: "Baseline", value: faker.number.int({ min: -5, max: 10 }), color: mediaGroupColors.baseline },
  ];

  // Percentage change in incremental revenue by channel
  const revenueByChannel = Object.keys(channelNames).map(channel => ({
    name: channelNames[channel as keyof typeof channelNames],
    value: faker.number.int({ min: -30, max: 45 }),
    color: channelColors[channel as keyof typeof channelColors]
  }));

  // Percentage change in ROAS by channel
  const roasByChannel = Object.keys(channelNames).map(channel => ({
    name: channelNames[channel as keyof typeof channelNames],
    value: faker.number.int({ min: -25, max: 40 }),
    color: channelColors[channel as keyof typeof channelColors]
  }));

  return {
    revenueByFactor,
    revenueByChannel,
    roasByChannel
  };
};

// Generate external factors YoY data
export const generateExternalFactorsYoYData = () => {
  return [
    { name: "Market Conditions", value: faker.number.int({ min: -20, max: 15 }), color: "#D3455B" },
    { name: "Competitor Activity", value: faker.number.int({ min: -30, max: 10 }), color: "#FB8500" },
    { name: "Economic Factors", value: faker.number.int({ min: -15, max: 20 }), color: "#0077B6" },
    { name: "Seasonality", value: faker.number.int({ min: -5, max: 25 }), color: "#8338EC" },
    { name: "Industry Trends", value: faker.number.int({ min: 5, max: 30 }), color: "#06D6A0" }
  ];
};

// Function to generate random incremental data for each channel
export const generateIncrementalData = () => {
  const channels = Object.keys(channelNames);
  return channels.map((channel) => ({
    id: channel,
    name: channelNames[channel as keyof typeof channelNames],
    color: channelColors[channel as keyof typeof channelColors],
    baseline: faker.number.int({ min: 50000, max: 200000 }),
    incremental: faker.number.int({ min: 10000, max: 100000 }),
    total: faker.number.int({ min: 100000, max: 300000 }),
  }));
};

// Function to generate random performance data for each day
export const generatePerformanceData = (days: number) => {
  if (days <= 0) {
    // Safety check: ensure days is positive
    console.warn("Days must be greater than 0, defaulting to 7 days");
    days = 7;
  }

  const channels = Object.keys(channelNames);
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));

    const day = {
      name: `Day ${i + 1}`,
      date: date.toLocaleDateString(),
      totalRevenue: faker.number.int({ min: 10000, max: 50000 }),
    };
    channels.forEach((channel) => {
      day[channel] = faker.number.float({ min: 0.1, max: 1, fractionDigits: 2 });
    });
    data.push(day);
  }
  return data;
};

// Generate Sankey diagram data showing flow from media types to channels
export function generateSankeyData() {
  // Define media categories (sources)
  const mediaCategories = [
    { name: "Paid Media", fill: "#4361ee" },
    { name: "Organic Media", fill: "#06d6a0" },
    { name: "Non-Paid Media", fill: "#ffd166" }
  ];
  
  // Define channels (targets)
  const channels = [
    { name: "Search Ads", category: "Paid Media", fill: "#4361ee", value: 850000 },
    { name: "Display Ads", category: "Paid Media", fill: "#4361ee", value: 620000 },
    { name: "Social Ads", category: "Paid Media", fill: "#4361ee", value: 780000 },
    { name: "Video Ads", category: "Paid Media", fill: "#4361ee", value: 520000 },
    
    { name: "Organic Search", category: "Organic Media", fill: "#06d6a0", value: 910000 },
    { name: "Organic Social", category: "Organic Media", fill: "#06d6a0", value: 430000 },
    { name: "Email", category: "Organic Media", fill: "#06d6a0", value: 380000 },
    
    { name: "Direct", category: "Non-Paid Media", fill: "#ffd166", value: 680000 },
    { name: "Referral", category: "Non-Paid Media", fill: "#ffd166", value: 320000 },
    { name: "Affiliates", category: "Non-Paid Media", fill: "#ffd166", value: 240000 },
  ];
  
  // Create nodes array for Sankey diagram
  const nodes = [
    ...mediaCategories.map(cat => ({ name: cat.name, fill: cat.fill })),
    ...channels.map(channel => ({ name: channel.name, fill: channel.fill }))
  ];
  
  // Create links array for Sankey diagram
  const links = channels.map(channel => {
    const sourceIndex = mediaCategories.findIndex(cat => cat.name === channel.category);
    const targetIndex = mediaCategories.length + channels.indexOf(channel);
    
    return {
      source: sourceIndex,
      target: targetIndex,
      value: channel.value,
      fill: channel.fill
    };
  });
  
  return { nodes, links };
}

// Generate channel performance data with metrics
export const generateChannelData = (period = "Q2") => {
  const channels = Object.keys(channelNames);
  return channels.map((channel) => {
    // Base metrics with some variance by period
    const periodMultiplier = period === "Q1" ? 0.8 : period === "Q3" ? 1.2 : 1;
    const revenue = faker.number.int({ min: 80000, max: 350000 }) * periodMultiplier;
    const cost = faker.number.int({ min: 20000, max: 120000 }) * periodMultiplier;
    const incremental = Math.round(revenue * faker.number.float({ min: 0.5, max: 0.85 }) - cost * 0.8); // Generate realistic incremental outcomes
    const roas = +(revenue / cost).toFixed(2);
    const impressions = faker.number.int({ min: 500000, max: 3000000 });
    const clicks = faker.number.int({ min: 10000, max: 100000 });
    const ctr = +((clicks / impressions) * 100).toFixed(2);
    const cpc = +(cost / clicks).toFixed(2);
    const conversions = faker.number.int({ min: 100, max: 3000 });
    const convRate = +((conversions / clicks) * 100).toFixed(2);
    const cpa = +(cost / conversions).toFixed(2);

    return {
      id: channel,
      name: channelNames[channel as keyof typeof channelNames],
      color: channelColors[channel as keyof typeof channelColors],
      revenue,
      cost,
      incremental,
      roas,
      impressions,
      clicks,
      ctr,
      cpc,
      conversions,
      convRate,
      cpa,
      impact: faker.number.int({ min: 5, max: 30 }),
    };
  });
};

// Generate trends data for channels over time
export const generateChannelTrendsData = (days = 30) => {
  if (days <= 0) {
    console.warn("Days must be greater than 0, defaulting to 30 days");
    days = 30;
  }
  
  const channels = Object.keys(channelNames);
  const data = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    const entry = {
      name: `Day ${i + 1}`,
      date: date.toISOString().split('T')[0],
    };

    channels.forEach((channel) => {
      // Generate values with slight upward trend over time
      const trendFactor = 1 + (i / days) * 0.2; // 20% increase over the period
      entry[channel] = +(faker.number.float({ min: 0.8, max: 4.5, fractionDigits: 2 }) * trendFactor).toFixed(2);
    });

    data.push(entry);
  }

  return data;
};

// Generate budget allocation data
export const generateBudgetAllocation = () => {
  const channels = Object.keys(channelNames);
  return channels.map((channel) => {
    return {
      name: channelNames[channel as keyof typeof channelNames],
      value: faker.number.int({ min: 10000, max: 100000 }),
      color: channelColors[channel as keyof typeof channelColors],
    };
  });
};

// Generate budget recommendations
export const generateBudgetRecommendations = () => {
  const channels = Object.keys(channelNames);
  return channels.map((channel) => {
    // Aligned with saturation curve data
    let currentBudget, impact;
    
    if (channel === "google" || channel === "search") {
      currentBudget = 45000;
      impact = 25;
    } else if (channel === "facebook" || channel === "social") {
      currentBudget = 35000;
      impact = 20;
    } else if (channel === "display") {
      currentBudget = 30000;
      impact = 18;
    } else if (channel === "youtube" || channel === "video") {
      currentBudget = 25000;
      impact = 15;
    } else {
      currentBudget = faker.number.int({ min: 10000, max: 20000 });
      impact = faker.number.int({ min: 5, max: 15 });
    }
    
    // Calculate recommended budget based on impact
    // Higher impact channels get higher budget recommendations
    const recommendedBudget = Math.round(currentBudget * (1 + (impact / 100) * 2));
    
    // Calculate change percentage
    const change = Math.round(((recommendedBudget - currentBudget) / currentBudget) * 100);
    
    return {
      id: channel,
      name: channelNames[channel as keyof typeof channelNames],
      color: channelColors[channel as keyof typeof channelColors],
      currentBudget,
      recommendedBudget,
      change,
      impact,
    };
  });
};
