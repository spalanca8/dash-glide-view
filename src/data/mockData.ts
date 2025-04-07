import { faker } from "@faker-js/faker";

// Define the channel names
export const channelNames = {
  google: "Google Ads",
  facebook: "Facebook Ads",
  tiktok: "TikTok Ads",
  email: "Email Marketing",
  affiliate: "Affiliate Marketing",
  video: "Video Advertising"
};

// Define the channel colors
export const channelColors = {
  google: "#4361ee",
  facebook: "#f72585",
  tiktok: "#4cc9f0",
  email: "#f9c74f",
  affiliate: "#90be6d",
  video: "#7209b7",
  search: "#4361ee",
  social: "#f72585",
  display: "#4cc9f0",
  direct: "#560bad",
  referral: "#8338ec"
};

// Define media group colors for different categories
export const mediaGroupColors = {
  paid: "#4361ee",
  organic: "#06d6a0",
  nonPaid: "#ffd166",
  baseline: "#ef476f",
  offline: "#8338ec",
  branding: "#ff9f1c",
  promotions: "#ff70a6",
  pricing: "#43aa8b",
  distribution: "#277da1",
  external: "#9e2a2b"
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
    color: "#8B5CF6"
  },
  display: {
    currentSpend: 30000,
    maxSaturation: 60000,
    color: "#D946EF"
  },
  video: {
    currentSpend: 25000,
    maxSaturation: 55000,
    color: "#0EA5E9"
  }
};

// Generate year-over-year comparison data
export const generateYearOverYearData = () => {
  // Percentage change in incremental revenue by factor
  const revenueByFactor = [
    { name: "Paid Online Media", value: 24, color: mediaGroupColors.paid },
    { name: "Organic Search", value: 8, color: mediaGroupColors.organic },
    { name: "Offline Media", value: -2, color: mediaGroupColors.offline },
    { name: "Branding", value: 18, color: mediaGroupColors.branding },
    { name: "Promotions", value: 14, color: mediaGroupColors.promotions },
    { name: "Pricing", value: -8, color: mediaGroupColors.pricing },
    { name: "Distribution", value: 5, color: mediaGroupColors.distribution },
    { name: "External Factors", value: -12, color: mediaGroupColors.external },
    { name: "Baseline", value: 3, color: mediaGroupColors.baseline },
  ];

  // Percentage change in incremental revenue by channel - ensuring consistent data with insights
  const revenueByChannel = [
    { name: channelNames.google, value: 32, color: channelColors.google },
    { name: channelNames.facebook, value: 28, color: channelColors.facebook },
    { name: channelNames.tiktok, value: 15, color: channelColors.tiktok },
    { name: channelNames.email, value: 15, color: channelColors.email },
    { name: channelNames.affiliate, value: 10, color: channelColors.affiliate },
    { name: channelNames.video, value: 20, color: channelColors.video },
  ];

  // Percentage change in ROAS by channel - ensuring consistent data with insights
  const roasByChannel = [
    { name: channelNames.google, value: 22, color: channelColors.google },
    { name: channelNames.facebook, value: 18, color: channelColors.facebook },
    { name: channelNames.tiktok, value: 8, color: channelColors.tiktok },
    { name: channelNames.email, value: 25, color: channelColors.email },
    { name: channelNames.affiliate, value: 14, color: channelColors.affiliate },
    { name: channelNames.video, value: 12, color: channelColors.video },
  ];

  return {
    revenueByFactor,
    revenueByChannel,
    roasByChannel
  };
};

// Generate external factors YoY data
export const generateExternalFactorsYoYData = () => {
  return [
    { name: "Market Conditions", value: -12, color: "#D3455B" },
    { name: "Competitor Activity", value: -15, color: "#FB8500" },
    { name: "Economic Factors", value: -5, color: "#0077B6" },
    { name: "Seasonality", value: 8, color: "#8338EC" },
    { name: "Industry Trends", value: 16, color: "#06D6A0" }
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
    { name: "Google Ads", category: "Paid Media", fill: "#4361ee", value: 850000 },
    { name: "Facebook Ads", category: "Paid Media", fill: "#4361ee", value: 780000 },
    { name: "TikTok Ads", category: "Paid Media", fill: "#4361ee", value: 520000 },
    { name: "Video Ads", category: "Paid Media", fill: "#4361ee", value: 620000 },
    
    { name: "Email Marketing", category: "Organic Media", fill: "#06d6a0", value: 380000 },
    
    { name: "Affiliate Marketing", category: "Non-Paid Media", fill: "#ffd166", value: 320000 },
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
    
    if (channel === "google") {
      currentBudget = 45000;
      impact = 25;
    } else if (channel === "facebook") {
      currentBudget = 35000;
      impact = 20;
    } else if (channel === "video") {
      currentBudget = 25000;
      impact = 15;
    } else if (channel === "tiktok") {
      currentBudget = 30000;
      impact = 18;
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

// Generate month-over-month comparison data between this year and last year
export const generateMonthOverMonthData = (metric = "revenue") => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const channelKeys = Object.keys(channelNames);
  const factorTypes = ["paidMedia", "ownedMedia", "promotions", "external", "pricing"];
  
  // Create a comprehensive dataset where each channel and factor has data for every month
  const result = [];
  
  // For each channel
  channelKeys.forEach(channel => {
    // For each factor
    factorTypes.forEach(factor => {
      // Generate data for each month
      months.forEach((month, index) => {
        // Base values with some consistent patterns
        let baseValue = 100000 + (index * 5000); // Gradual increase through the year
        
        // Add seasonal effects
        if (month === "Nov" || month === "Dec") {
          baseValue *= 1.5; // Holiday season boost
        } else if (month === "Jan" || month === "Feb") {
          baseValue *= 0.8; // Post-holiday slump
        } else if (month === "Jun" || month === "Jul" || month === "Aug") {
          baseValue *= 1.2; // Summer increase
        }
        
        // Add channel-specific variations
        const channelMultiplier = {
          google: 1.2,
          facebook: 1.15,
          tiktok: 1.1,
          email: 0.9,
          affiliate: 1.05,
          video: 1.0
        }[channel] || 1;
        
        // Add factor-specific variations
        const factorMultiplier = {
          paidMedia: 1.15,
          ownedMedia: 0.9,
          promotions: 1.2,
          external: 0.8,
          pricing: 1.05
        }[factor];
        
        // Last year's value with some randomness
        const previousYear = baseValue * channelMultiplier * factorMultiplier * 
          faker.number.float({ min: 0.92, max: 1.08 });
        
        // Improvement trend varies by channel and factor
        let improvementTrend = 1.15;  // Overall 15% improvement
        
        // Add some monthly variation to the improvement trend
        if (month === "Mar" || month === "Apr") {
          improvementTrend = 1.25; // Stronger improvement in spring
        } else if (month === "Aug") {
          improvementTrend = 0.95; // Dip in August
        } else if (month === "Sep") {
          improvementTrend = 1.05; // Smaller improvement in September
        }
        
        // Current year value with channel and factor specific trends
        const currentYear = previousYear * improvementTrend * 
          faker.number.float({ min: 0.97, max: 1.03 });
        
        // Calculate percentage change
        const change = ((currentYear - previousYear) / previousYear) * 100;
        
        result.push({
          date: month,
          previousYear: Math.round(previousYear),
          currentYear: Math.round(currentYear),
          change: parseFloat(change.toFixed(1)),
          channel: channel,
          factor: factor
        });
      });
    });
  });
  
  return result;
};
