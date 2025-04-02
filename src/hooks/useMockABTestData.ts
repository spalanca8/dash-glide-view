import { useState, useEffect } from "react";

export interface ABTestVariant {
  id: string;
  name: string;
  visitors: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  isControl: boolean;
  improvement?: number;
  confidenceLevel?: number;
  timeSeriesData?: { date: string; conversions: number; visitors: number }[];
}

export interface GeoDistribution {
  name: string;
  isTestGroup: boolean;
  visitors: number;
  conversions: number;
}

export interface Methodology {
  name: string;
  uplift: number;
  confidence: number;
  description: string;
}

export interface ABTest {
  id: string;
  name: string;
  status: "active" | "completed" | "draft";
  startDate: string;
  endDate: string | null;
  description: string;
  hypothesis: string;
  variants: ABTestVariant[];
  channel: string;
  audience: string;
  goal: string;
  analysis?: string;
  nextSteps?: string;
  winner?: string;
  confidenceLevel?: number;
  geoDistribution?: GeoDistribution[];
  methodologiesComparison?: Methodology[];
  learningAgenda?: {
    team: string;
    description: string;
    stakeholders: string[];
  };
  businessQuestion?: {
    question: string;
    implication: string;
    keyMetrics: string[];
  };
  methodologySelection?: {
    reason: string;
    alternatives: string[];
  };
  finalResults?: {
    summary: string;
    implications: string[];
    financialImpact: string;
    nextSteps: string[];
  };
}

export function useMockABTestData() {
  const [loading, setLoading] = useState(true);
  const [testScenarios, setTestScenarios] = useState<string[]>([]);
  const [activeTests, setActiveTests] = useState<ABTest[]>([]);
  const [completedTests, setCompletedTests] = useState<ABTest[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockCompletedTests: ABTest[] = [
        {
          id: "test-1",
          name: "Homepage Call-to-Action Test",
          status: "completed",
          startDate: "2023-11-01",
          endDate: "2023-11-15",
          description: "Testing different call-to-action button copy on the homepage to improve click-through rate.",
          hypothesis: "Changing the CTA from 'Learn More' to 'Start Free Trial' will increase conversion rate by at least 15%.",
          channel: "Website",
          audience: "All visitors",
          goal: "Increase conversion rate",
          variants: [
            {
              id: "variant-a",
              name: "Control (Learn More)",
              visitors: 5000,
              conversions: 250,
              revenue: 12500,
              conversionRate: 5.0,
              isControl: true,
              timeSeriesData: generateTimeSeriesData(15, 5000, 250)
            },
            {
              id: "variant-b",
              name: "Start Free Trial",
              visitors: 5000,
              conversions: 350,
              revenue: 17500,
              conversionRate: 7.0,
              isControl: false,
              improvement: 40,
              confidenceLevel: 99.8,
              timeSeriesData: generateTimeSeriesData(15, 5000, 350)
            }
          ],
          winner: "variant-b",
          confidenceLevel: 99.8,
          analysis: "The 'Start Free Trial' button outperformed the control with a 40% higher conversion rate. This is statistically significant with a 99.8% confidence level.",
          nextSteps: "Implement 'Start Free Trial' as the default CTA on the homepage and test additional variations in other locations.",
          geoDistribution: [
            { name: "United States", isTestGroup: true, visitors: 2500, conversions: 175 },
            { name: "Canada", isTestGroup: true, visitors: 1000, conversions: 70 },
            { name: "United Kingdom", isTestGroup: false, visitors: 2000, conversions: 100 },
            { name: "Australia", isTestGroup: false, visitors: 1500, conversions: 75 },
            { name: "Germany", isTestGroup: true, visitors: 1500, conversions: 105 },
            { name: "France", isTestGroup: false, visitors: 1500, conversions: 75 }
          ],
          methodologiesComparison: [
            {
              name: "Synthetic Control",
              uplift: 38.2,
              confidence: 97.5,
              description: "Constructs a synthetic version of the test group using control group data to estimate causal effects."
            },
            {
              name: "Bayesian Causal Inference",
              uplift: 39.6,
              confidence: 98.7,
              description: "Uses Bayesian statistics to model the causal relationship between intervention and outcome."
            },
            {
              name: "Potential Outcomes Framework",
              uplift: 40.0,
              confidence: 99.8,
              description: "Based on the Rubin Causal Model, calculates treatment effect by comparing potential outcomes."
            }
          ]
        },
        {
          id: "test-2",
          name: "Social Media Ad Creative Test",
          status: "completed",
          startDate: "2023-10-15",
          endDate: "2023-11-01",
          description: "Testing different ad creatives on social media platforms to identify the most effective messaging.",
          hypothesis: "Ad creatives featuring product benefits will outperform those featuring product features.",
          channel: "Social Media",
          audience: "Prospecting audience",
          goal: "Increase click-through rate and conversion",
          variants: [
            {
              id: "variant-a",
              name: "Features Focus",
              visitors: 10000,
              conversions: 300,
              revenue: 15000,
              conversionRate: 3.0,
              isControl: true,
              timeSeriesData: generateTimeSeriesData(17, 10000, 300)
            },
            {
              id: "variant-b",
              name: "Benefits Focus",
              visitors: 10000,
              conversions: 420,
              revenue: 21000,
              conversionRate: 4.2,
              isControl: false,
              improvement: 40,
              confidenceLevel: 99.5,
              timeSeriesData: generateTimeSeriesData(17, 10000, 420)
            }
          ],
          winner: "variant-b",
          confidenceLevel: 99.5,
          analysis: "The benefits-focused creative generated a 40% higher conversion rate compared to the features-focused creative. The results are statistically significant.",
          nextSteps: "Update all social media ad creative to emphasize benefits over features. Develop additional benefit-focused variations for further testing.",
          geoDistribution: [
            { name: "North America", isTestGroup: true, visitors: 5000, conversions: 210 },
            { name: "Europe", isTestGroup: false, visitors: 5000, conversions: 150 },
            { name: "Asia Pacific", isTestGroup: true, visitors: 5000, conversions: 210 }
          ],
          methodologiesComparison: [
            {
              name: "Synthetic Control",
              uplift: 38.5,
              confidence: 97.2,
              description: "Constructs a synthetic version of the test group using control group data to estimate causal effects."
            },
            {
              name: "Bayesian Causal Inference",
              uplift: 39.8,
              confidence: 98.4,
              description: "Uses Bayesian statistics to model the causal relationship between intervention and outcome."
            },
            {
              name: "Potential Outcomes Framework",
              uplift: 40.0,
              confidence: 99.5,
              description: "Based on the Rubin Causal Model, calculates treatment effect by comparing potential outcomes."
            }
          ]
        },
        {
          id: "test-3",
          name: "Email Subject Line Test",
          status: "completed",
          startDate: "2023-09-01",
          endDate: "2023-09-15",
          description: "Testing different email subject lines to improve open rates and click-through rates.",
          hypothesis: "Subject lines with personalization will outperform generic subject lines.",
          channel: "Email",
          audience: "Existing customers",
          goal: "Increase email open rate and click-through rate",
          variants: [
            {
              id: "variant-a",
              name: "Generic Subject",
              visitors: 25000,
              conversions: 5000,
              revenue: 75000,
              conversionRate: 20.0,
              isControl: true,
              timeSeriesData: generateTimeSeriesData(15, 25000, 5000)
            },
            {
              id: "variant-b",
              name: "Personalized Subject",
              visitors: 25000,
              conversions: 6250,
              revenue: 93750,
              conversionRate: 25.0,
              isControl: false,
              improvement: 25,
              confidenceLevel: 99.9,
              timeSeriesData: generateTimeSeriesData(15, 25000, 6250)
            }
          ],
          winner: "variant-b",
          confidenceLevel: 99.9,
          analysis: "Personalized subject lines resulted in a 25% higher open rate and subsequently a 25% higher conversion rate. This result was highly statistically significant.",
          nextSteps: "Implement personalization in all email campaigns. Test different types of personalization to further optimize results.",
          geoDistribution: [
            { name: "Western Europe", isTestGroup: true, visitors: 10000, conversions: 2500 },
            { name: "Eastern Europe", isTestGroup: false, visitors: 5000, conversions: 1000 },
            { name: "North America", isTestGroup: true, visitors: 15000, conversions: 3750 },
            { name: "Latin America", isTestGroup: false, visitors: 10000, conversions: 2000 },
            { name: "Asia", isTestGroup: true, visitors: 5000, conversions: 1250 },
            { name: "Oceania", isTestGroup: false, visitors: 5000, conversions: 1000 }
          ],
          methodologiesComparison: [
            {
              name: "Synthetic Control",
              uplift: 24.2,
              confidence: 98.8,
              description: "Constructs a synthetic version of the test group using control group data to estimate causal effects."
            },
            {
              name: "Bayesian Causal Inference",
              uplift: 24.7,
              confidence: 99.4,
              description: "Uses Bayesian statistics to model the causal relationship between intervention and outcome."
            },
            {
              name: "Potential Outcomes Framework",
              uplift: 25.0,
              confidence: 99.9,
              description: "Based on the Rubin Causal Model, calculates treatment effect by comparing potential outcomes."
            }
          ]
        }
      ];
      
      const mockActiveTests: ABTest[] = [
        {
          id: "test-4",
          name: "Pricing Page Layout Test",
          status: "active",
          startDate: "2023-11-20",
          endDate: null,
          description: "Testing different pricing page layouts to improve conversion rate.",
          hypothesis: "A simplified pricing page with fewer options will reduce decision fatigue and increase conversions.",
          channel: "Website",
          audience: "All visitors",
          goal: "Increase conversion rate",
          variants: [
            {
              id: "variant-a",
              name: "Current Layout",
              visitors: 3200,
              conversions: 192,
              revenue: 19200,
              conversionRate: 6.0,
              isControl: true,
              timeSeriesData: generateTimeSeriesData(10, 3200, 192)
            },
            {
              id: "variant-b",
              name: "Simplified Layout",
              visitors: 3180,
              conversions: 223,
              revenue: 22300,
              conversionRate: 7.0,
              isControl: false,
              improvement: 16.7,
              confidenceLevel: 92.3,
              timeSeriesData: generateTimeSeriesData(10, 3180, 223)
            }
          ],
          geoDistribution: [
            { name: "United States", isTestGroup: true, visitors: 1600, conversions: 112 },
            { name: "Canada", isTestGroup: false, visitors: 1600, conversions: 96 },
            { name: "United Kingdom", isTestGroup: true, visitors: 1580, conversions: 111 },
            { name: "Australia", isTestGroup: false, visitors: 1580, conversions: 95 }
          ],
          methodologiesComparison: [
            {
              name: "Synthetic Control",
              uplift: 15.9,
              confidence: 91.2,
              description: "Constructs a synthetic version of the test group using control group data to estimate causal effects."
            },
            {
              name: "Bayesian Causal Inference",
              uplift: 16.4,
              confidence: 91.9,
              description: "Uses Bayesian statistics to model the causal relationship between intervention and outcome."
            },
            {
              name: "Potential Outcomes Framework",
              uplift: 16.7,
              confidence: 92.3,
              description: "Based on the Rubin Causal Model, calculates treatment effect by comparing potential outcomes."
            }
          ]
        }
      ];
      
      setCompletedTests(mockCompletedTests);
      setActiveTests(mockActiveTests);
      setTestScenarios(["Homepage", "Social Media", "Email", "Pricing Page"]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return { testScenarios, activeTests, completedTests, loading };
}

function generateTimeSeriesData(
  days: number, 
  totalVisitors: number, 
  totalConversions: number
) {
  const result = [];
  const avgVisitorsPerDay = totalVisitors / days;
  const avgConversionsPerDay = totalConversions / days;
  
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (days - i));
    
    const randomFactor = 0.8 + Math.random() * 0.4; // between 0.8 and 1.2
    const visitors = Math.round(avgVisitorsPerDay * randomFactor);
    const conversions = Math.round(avgConversionsPerDay * randomFactor);
    
    result.push({
      date: date.toISOString().split('T')[0],
      visitors,
      conversions
    });
  }
  
  return result;
}
