
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ABTest } from "@/hooks/useMockABTestData";
import { Calculator, BarChart3, LineChart, CheckCircle2, XCircle } from "lucide-react";

interface MethodologySelectionProps {
  test: ABTest;
}

export function MethodologySelection({ test }: MethodologySelectionProps) {
  return (
    <Card className="glass-card premium-shadow border-white/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Methodology Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-purple-50/80 backdrop-blur-sm p-4 rounded-md border border-purple-100">
          <p className="text-purple-700">
            Incrementality Testing was selected as the most appropriate methodology for this analysis because it provides
            direct causal evidence of the impact of our marketing intervention, unlike correlational methods.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-green-200 bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4 text-green-600" />
                <span className="text-green-700">Incrementality Testing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Direct causal measurement</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Isolated specific intervention</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Real-world environment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>Clear test & control groups</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-slate-600" />
                <span className="text-slate-700">Media Mix Modeling (MMM)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-slate-600" />
                  <span>Holistic channel analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-slate-600" />
                  <span>Long-term trend analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span>Doesn't isolate specific creative or tactic</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span>Correlational, not causal</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200 bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <LineChart className="h-4 w-4 text-slate-600" />
                <span className="text-slate-700">Multi-Touch Attribution (MTA)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-slate-600" />
                  <span>User-level journey analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-slate-600" />
                  <span>Digital touchpoint tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span>Doesn't account for offline channels</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span>Cookie limitations</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-muted/70 backdrop-blur-sm p-4 rounded-md border border-white/20">
          <h3 className="font-medium mb-2">Why Incrementality Testing?</h3>
          <p className="text-sm text-muted-foreground">
            For this specific business question, incrementality testing provides the most robust methodology because we needed to:
          </p>
          <ul className="space-y-1 mt-2">
            <li className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> 
              Establish a clear causal relationship between the specific {
                test.name.toLowerCase().includes("homepage") ? "call-to-action change" : 
                test.name.toLowerCase().includes("social") ? "ad creative approach" : 
                test.name.toLowerCase().includes("email") ? "personalization strategy" : 
                "layout modification"
              } and business outcomes
            </li>
            <li className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> 
              Control for external factors and isolate the specific impact of our intervention
            </li>
            <li className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> 
              Measure direct performance metrics in a real-world environment with actual customers
            </li>
            <li className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> 
              Generate high-confidence results that can directly inform business decisions
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
