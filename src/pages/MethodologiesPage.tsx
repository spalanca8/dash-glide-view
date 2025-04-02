
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, BarChart, TrendingUp, Layers, ArrowRight, BookOpen, Scale, GitCompare } from "lucide-react";
import MethodologySelector from "@/components/methodologies/MethodologySelector";
import MethodologyDetails from "@/components/methodologies/MethodologyDetails";

const MethodologiesPage = () => {
  const [activeMethodology, setActiveMethodology] = useState<string>("mmm");
  
  return (
    <>
      <Helmet>
        <title>Analytics Methodologies - Artefact</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">Analytics Methodologies</h1>
      
      {/* Introduction to Analytics Methodologies */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              <span>1</span>
            </div>
            <CardTitle className="text-2xl">Marketing Analytics Intelligence</CardTitle>
          </div>
          <CardDescription>
            Comprehensive data-driven insights to optimize your marketing strategy and maximize ROI
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Methodology Triangle Relationship Model */}
          <div className="relative mb-12 pt-10">
            <div className="flex justify-center items-center mb-16">
              <div className="relative w-full max-w-4xl">
                {/* Strategic Planning - Top of Triangle */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-80 z-10">
                  <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <BarChart className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Marketing Mix Modeling</h3>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">Strategic Planning</Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">
                        Analyzes historical data to measure long-term impact of marketing channels on business outcomes.
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-blue-600 font-medium">Budget Allocation</span>
                        <ArrowRight className="h-4 w-4 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Triangle lines */}
                  <div className="absolute -bottom-10 left-1/4 w-[150%] h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400"></div>
                </div>
                
                {/* Bottom of triangle with connecting lines */}
                <div className="flex justify-between items-start mt-12 relative">
                  {/* Validation - Bottom Left */}
                  <div className="w-80">
                    <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Incrementality Testing</h3>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">Validation</Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          Measures causal impact through controlled experiments to isolate marketing effects.
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-purple-600 font-medium">Causal Validation</span>
                          <ArrowRight className="h-4 w-4 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Tactical Execution - Bottom Right */}
                  <div className="w-80">
                    <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Layers className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Multi-Touch Attribution</h3>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">Tactical Execution</Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          Tracks individual customer journeys to optimize campaign touchpoints in real-time.
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-green-600 font-medium">Customer Journey</span>
                          <ArrowRight className="h-4 w-4 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Triangle connecting line */}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 h-0.5 bg-gradient-to-r from-purple-400 to-green-400"></div>
                </div>
              </div>
            </div>

            {/* Explanation of how they work together */}
            <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/30 rounded-xl p-6 border border-indigo-100/50 shadow-sm mt-8">
              <h3 className="font-semibold text-lg mb-3">How These Methods Work Together</h3>
              <p className="text-muted-foreground mb-4">
                These complementary approaches combine to provide a complete view of your marketing performance:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/70 p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 font-semibold">1</div>
                    <h4 className="font-medium">Strategic Planning</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    MMM provides the big picture view for long-term budget allocation across channels
                  </p>
                </div>
                
                <div className="bg-white/70 p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2 font-semibold">2</div>
                    <h4 className="font-medium">Validation</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Incrementality testing verifies the causal impact of specific marketing activities
                  </p>
                </div>
                
                <div className="bg-white/70 p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 font-semibold">3</div>
                    <h4 className="font-medium">Tactical Execution</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    MTA helps fine-tune campaigns and optimize customer journey touchpoints
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional descriptive content is kept */}
          <div className="mt-8 p-5 rounded-lg border bg-card/50 shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Implementing an Integrated Approach</h3>
            <p className="text-muted-foreground mb-4">
              The most sophisticated marketing analytics strategies leverage all three methodologies:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">1</div>
                <div>
                  <span className="font-medium">Begin with MMM</span>
                  <p className="text-sm text-muted-foreground">Establish high-level channel effectiveness and budget allocation</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">2</div>
                <div>
                  <span className="font-medium">Validate with Incrementality</span>
                  <p className="text-sm text-muted-foreground">Test specific channels or tactics to confirm true causal impact</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">3</div>
                <div>
                  <span className="font-medium">Refine with MTA</span>
                  <p className="text-sm text-muted-foreground">Optimize customer journeys and campaign specifics in real-time</p>
                </div>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* New section: Integrated Analytics Framework */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            <span>2</span>
          </div>
          <h2 className="text-2xl font-semibold">Integrated Analytics Framework</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MTA Scaling Using MMM */}
          <Card className="glass-card border-t-4 border-t-green-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-green-600" />
                <CardTitle>How MTA is Scaled Using MMM</CardTitle>
              </div>
              <CardDescription>
                Creating alignment between tactical and strategic measurement approaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Multi-touch attribution (MTA) models often face challenges with completeness and bias. 
                To address these limitations, we use Marketing Mix Models (MMM) to calibrate MTA results:
              </p>

              <div className="space-y-4">
                <div className="bg-green-50/50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-medium text-green-800 mb-2">Scaling MTA With MMM</h4>
                  <p className="text-sm text-muted-foreground">
                    We ensure MTA aligns with MMM results by applying a scaling factor to each channel:
                  </p>
                  <ol className="mt-2 space-y-2 pl-5 list-decimal text-sm text-muted-foreground">
                    <li>Calculate total channel contribution from both MMM and MTA models</li>
                    <li>Determine scaling factor = MMM contribution ÷ MTA contribution</li>
                    <li>Apply scaling factor to MTA touchpoint values within each channel</li>
                    <li>Recalculate customer journey value using scaled touchpoints</li>
                  </ol>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Benefits of MTA-MMM Integration</h4>
                  <ul className="space-y-2 pl-5 list-disc text-sm text-muted-foreground">
                    <li>Combines strategic accuracy of MMM with customer journey insights from MTA</li>
                    <li>Accounts for offline touchpoints and external factors missed by MTA</li>
                    <li>Resolves cookie/tracking limitations in MTA data collection</li>
                    <li>Provides consistent reporting across tactical and strategic decisions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* MMM Calibration with Incrementality */}
          <Card className="glass-card border-t-4 border-t-blue-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <GitCompare className="h-5 w-5 text-blue-600" />
                <CardTitle>How MMM is Calibrated With Incrementality Tests</CardTitle>
              </div>
              <CardDescription>
                Validating econometric models with experimental evidence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Marketing Mix Models may not always capture true causal effects. Incrementality testing 
                provides experimental validation to refine MMM effectiveness estimates:
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">MMM Calibration Process</h4>
                  <p className="text-sm text-muted-foreground">
                    The calibration process involves several key steps:
                  </p>
                  <ol className="mt-2 space-y-2 pl-5 list-decimal text-sm text-muted-foreground">
                    <li>Run incrementality tests for key channels to determine true lift</li>
                    <li>Compare incrementality results with MMM-estimated effects</li>
                    <li>Calculate calibration factor = Incrementality lift ÷ MMM lift</li>
                    <li>Apply calibration factors to MMM coefficients</li>
                    <li>Re-optimize response curves based on calibrated coefficients</li>
                  </ol>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Why Calibration Matters</h4>
                  <ul className="space-y-2 pl-5 list-disc text-sm text-muted-foreground">
                    <li>MMM may overestimate impact due to correlation vs. causation issues</li>
                    <li>Incrementality tests provide ground truth for causal impact</li>
                    <li>Calibration removes selection bias that econometric models can't address</li>
                    <li>Results in more accurate budget allocation recommendations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Documentation Section (Moved from top) */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            <span>3</span>
          </div>
          <h2 className="text-2xl font-semibold">Documentation</h2>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Explore the technical foundations behind each measurement methodology to understand how they work and when to apply them.
        </p>
        
        <MethodologySelector 
          activeMethodology={activeMethodology} 
          setActiveMethodology={setActiveMethodology} 
        />
      </div>
      
      {/* Methodology Details Display */}
      <MethodologyDetails methodology={activeMethodology} />
    </>
  );
};

export default MethodologiesPage;

