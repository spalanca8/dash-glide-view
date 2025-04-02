
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABTest } from "@/hooks/useMockABTestData";
import { Flag, Sparkles, ArrowRight, CheckCircle2, LineChart, BarChart } from "lucide-react";

interface FinalResultsProps {
  test: ABTest;
}

export function FinalResults({ test }: FinalResultsProps) {
  // Get winning variant
  const controlVariant = test.variants.find(v => v.isControl);
  const testVariant = test.variants.find(v => !v.isControl);
  
  if (!controlVariant || !testVariant) {
    return (
      <Card className="glass-card premium-shadow border-white/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            Final Results & Implications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Insufficient data for final results.</p>
        </CardContent>
      </Card>
    );
  }
  
  const conversionRateUplift = ((testVariant.conversionRate - controlVariant.conversionRate) / controlVariant.conversionRate) * 100;
  
  // Business implications based on test type
  const getBusinessImplications = () => {
    if (test.name.toLowerCase().includes("homepage") || test.name.toLowerCase().includes("cta")) {
      return {
        summary: `The test clearly shows that the '${testVariant.name}' outperforms the '${controlVariant.name}' with ${conversionRateUplift.toFixed(1)}% higher conversion rate.`,
        implications: [
          "Update all CTAs across the website to use the winning variation",
          "Apply similar clear, action-oriented language in other marketing materials",
          "Consider additional A/B tests to further optimize button color and placement"
        ],
        financialImpact: `Based on current traffic levels, implementing the new CTA would generate an estimated additional $${(testVariant.revenue - controlVariant.revenue).toLocaleString()} in monthly revenue.`,
        nextSteps: [
          "Implement winning variant across all website pages by end of quarter",
          "Monitor post-implementation performance for 4 weeks",
          "Plan follow-up tests for secondary optimization opportunities"
        ]
      };
    } else if (test.name.toLowerCase().includes("social") || test.name.toLowerCase().includes("ad")) {
      return {
        summary: `The ${testVariant.name} creative approach delivered ${conversionRateUplift.toFixed(1)}% higher conversion rates compared to the ${controlVariant.name} approach.`,
        implications: [
          "Update creative guidelines to emphasize benefits over features in all ad copy",
          "Apply insights to other marketing channels including website and email",
          "Develop a more comprehensive benefit-focused messaging strategy"
        ],
        financialImpact: `At current spend levels, shifting to benefit-focused creatives would increase ROAS by approximately ${conversionRateUplift.toFixed(1)}%, translating to $${(testVariant.revenue - controlVariant.revenue).toLocaleString()} in additional monthly revenue.`,
        nextSteps: [
          "Update all active ad campaigns with benefit-focused messaging",
          "Retrain creative team on benefit-focused copywriting",
          "Expand testing to other audience segments and channels"
        ]
      };
    } else if (test.name.toLowerCase().includes("email") || test.name.toLowerCase().includes("subject")) {
      return {
        summary: `Personalized subject lines demonstrated a significant ${conversionRateUplift.toFixed(1)}% lift in conversion rate compared to generic subject lines.`,
        implications: [
          "Implement personalization across all email communications",
          "Invest in further data collection to enable deeper personalization",
          "Explore dynamic content personalization beyond subject lines"
        ],
        financialImpact: `Based on our email volume, implementing personalization would generate an estimated $${(testVariant.revenue - controlVariant.revenue).toLocaleString()} in incremental annual revenue through improved engagement.`,
        nextSteps: [
          "Update email templates and workflows to include personalization",
          "Develop segmentation strategy for enhanced personalization",
          "Test additional personalization elements in email body content"
        ]
      };
    } else {
      return {
        summary: `The ${testVariant.name} layout showed a ${conversionRateUplift.toFixed(1)}% improvement in conversion rate over the ${controlVariant.name}.`,
        implications: [
          "Implement the simplified layout across all product pages",
          "Apply similar simplification principles to other key conversion pages",
          "Review the entire website for opportunities to reduce decision fatigue"
        ],
        financialImpact: `The improved layout is projected to generate an additional $${(testVariant.revenue - controlVariant.revenue).toLocaleString()} in monthly revenue based on current traffic levels.`,
        nextSteps: [
          "Roll out the winning design to all pricing pages immediately",
          "Conduct follow-up user research to identify further optimization opportunities",
          "Expand testing to product detail pages using similar principles"
        ]
      };
    }
  };
  
  const businessImplications = getBusinessImplications();
  
  return (
    <Card className="glass-card premium-shadow border-white/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-primary" />
          Final Results & Implications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-green-50/80 backdrop-blur-sm p-4 rounded-md border border-green-100">
          <h3 className="font-medium text-green-800 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Results Summary
          </h3>
          <p className="text-green-700 mt-2">
            {businessImplications.summary}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Business Implications
            </h3>
            <ul className="space-y-1">
              {businessImplications.implications.map((implication, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary mt-1.5" /> 
                  {implication}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <BarChart className="h-4 w-4 text-primary" />
              Financial Impact
            </h3>
            <p className="text-sm text-muted-foreground">
              {businessImplications.financialImpact}
            </p>
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <LineChart className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  {conversionRateUplift > 0 ? "+" : ""}{conversionRateUplift.toFixed(1)}% Projected Growth
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50/80 backdrop-blur-sm p-4 rounded-md border border-purple-100">
          <h3 className="font-medium text-purple-800 flex items-center gap-2 mb-2">
            <ArrowRight className="h-5 w-5" />
            Recommended Next Steps
          </h3>
          <ol className="space-y-2">
            {businessImplications.nextSteps.map((step, i) => (
              <li key={i} className="text-purple-700 flex items-start gap-2">
                <span className="bg-purple-200 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mt-0.5">{i+1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
