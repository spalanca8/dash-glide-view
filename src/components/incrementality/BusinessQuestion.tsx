
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABTest } from "@/hooks/useMockABTestData";
import { HelpCircle, Target, Sparkles } from "lucide-react";

interface BusinessQuestionProps {
  test: ABTest;
}

export function BusinessQuestion({ test }: BusinessQuestionProps) {
  // Generate business question data based on the test
  const getBusinessQuestion = () => {
    if (test.name.toLowerCase().includes("homepage") || test.name.toLowerCase().includes("cta")) {
      return {
        question: "Does changing our call-to-action messaging from 'Learn More' to 'Start Free Trial' increase website conversion rates?",
        businessImplication: "By optimizing our CTA messaging, we aim to increase trial sign-ups by at least 15%, which would potentially generate an additional $1.2M in annual recurring revenue.",
        keyMetrics: ["Conversion Rate", "Trial Sign-ups", "Customer Acquisition Cost"]
      };
    } else if (test.name.toLowerCase().includes("social") || test.name.toLowerCase().includes("ad")) {
      return {
        question: "Do benefit-focused ad creatives outperform feature-focused creatives in driving qualified traffic and conversions?",
        businessImplication: "Understanding the most effective creative approach could improve our ROAS by up to 30% and inform our broader content strategy across all marketing channels.",
        keyMetrics: ["Click-through Rate", "Conversion Rate", "Cost per Acquisition", "Return on Ad Spend"]
      };
    } else if (test.name.toLowerCase().includes("email") || test.name.toLowerCase().includes("subject")) {
      return {
        question: "Does personalization in email subject lines significantly improve open rates and downstream conversion metrics?",
        businessImplication: "Improving email engagement could increase customer lifetime value by making our CRM activities more effective, with an estimated 10% increase in revenue per customer.",
        keyMetrics: ["Open Rate", "Click-through Rate", "Conversion Rate", "Revenue per Email"]
      };
    } else {
      return {
        question: "Does a simplified pricing page layout reduce decision fatigue and increase conversion rates?",
        businessImplication: "Optimizing the pricing page could potentially reduce cart abandonment by 20% and increase average order value, leading to a significant revenue impact.",
        keyMetrics: ["Page Time on Site", "Conversion Rate", "Average Order Value", "Cart Abandonment Rate"]
      };
    }
  };
  
  const businessQuestionData = getBusinessQuestion();
  
  return (
    <Card className="glass-card premium-shadow border-white/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          Business Question
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-purple-50/80 backdrop-blur-sm p-6 rounded-md border border-purple-100">
          <h3 className="font-medium text-purple-800 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Primary Business Question
          </h3>
          <p className="text-purple-700 mt-2 text-lg">
            "{businessQuestionData.question}"
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Business Implications
            </h3>
            <p className="text-sm text-muted-foreground">
              {businessQuestionData.businessImplication}
            </p>
          </div>
          
          <div className="bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Key Metrics
            </h3>
            <ul className="space-y-1">
              {businessQuestionData.keyMetrics.map((metric, i) => (
                <li key={i} className="text-sm flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" /> {metric}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
          <h3 className="font-medium mb-2">Alignment with Business Objectives</h3>
          <p className="text-sm text-muted-foreground">
            This test directly supports our Q3 objective to {
              test.name.toLowerCase().includes("homepage") ? "optimize the customer acquisition funnel and reduce CAC by 20%" : 
              test.name.toLowerCase().includes("social") ? "improve marketing efficiency and increase ROAS across digital channels" : 
              test.name.toLowerCase().includes("email") ? "enhance customer engagement and increase customer lifetime value" : 
              "streamline the purchase process and improve conversion metrics"
            }.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
