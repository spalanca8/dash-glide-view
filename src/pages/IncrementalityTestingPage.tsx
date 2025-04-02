
import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMockABTestData, ABTest } from "@/hooks/useMockABTestData";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart3, 
  FileCog, 
  Users, 
  TrendingUp, 
  LineChart,
  Lightbulb, 
  HelpCircle, 
  Calculator,
  Calendar,
  Map,
  ChartBar
} from "lucide-react";
import { TestSetupSummary } from "@/components/incrementality/TestSetupSummary";
import { UpliftChart } from "@/components/incrementality/UpliftChart";
import { ROASComparison } from "@/components/incrementality/ROASComparison";
import { MethodologyComparison } from "@/components/incrementality/MethodologyComparison";
import { LearningAgenda } from "@/components/incrementality/LearningAgenda";
import { BusinessQuestion } from "@/components/incrementality/BusinessQuestion";
import { MethodologySelection } from "@/components/incrementality/MethodologySelection";
import { FinalResults } from "@/components/incrementality/FinalResults";

const IncrementalityTestingPage = () => {
  const { activeTests, completedTests, loading } = useMockABTestData();
  const allTests = [...activeTests, ...completedTests];
  const [selectedTest, setSelectedTest] = useState<string>(allTests[0]?.id || "");
  
  // Find the selected test data
  const selectedTestData = allTests.find(test => test.id === selectedTest);
  
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Incrementality Testing Dashboard"
        description="Analyze the incremental impact of marketing campaigns on business outcomes"
      />
      
      {/* Test Selection Dropdown */}
      <Card className="mb-6 glass-card premium-shadow border-white/30 bg-gradient-to-r from-purple-50/80 via-violet-50/80 to-fuchsia-50/80 backdrop-blur-md">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-purple-100">
              <BarChart3 className="h-5 w-5 text-purple-700" />
            </div>
            <div className="text-base font-medium text-purple-900">Select Test Scenario:</div>
            <Select 
              value={selectedTest} 
              onValueChange={setSelectedTest}
              disabled={loading}
            >
              <SelectTrigger className="w-[300px] bg-white/80 backdrop-blur-sm border-purple-200">
                <SelectValue placeholder="Select a test" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border-purple-200">
                {allTests.map((test) => (
                  <SelectItem key={test.id} value={test.id}>
                    {test.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Content with Tabs */}
      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-[500px] w-full" />
        </div>
      ) : selectedTestData ? (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-white/70 backdrop-blur-sm border border-white/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20">
              <ChartBar className="h-4 w-4 mr-2" />
              Overview of Results
            </TabsTrigger>
            <TabsTrigger value="context" className="data-[state=active]:bg-primary/20">
              <Lightbulb className="h-4 w-4 mr-2" />
              Context
            </TabsTrigger>
          </TabsList>
          
          {/* Tab 1: Overview of Results */}
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            <TestSetupSummary test={selectedTestData} />
            <UpliftChart test={selectedTestData} />
            <ROASComparison test={selectedTestData} />
            <MethodologyComparison test={selectedTestData} />
          </TabsContent>
          
          {/* Tab 2: Context */}
          <TabsContent value="context" className="space-y-6 animate-fade-in">
            <LearningAgenda test={selectedTestData} />
            <BusinessQuestion test={selectedTestData} />
            <MethodologySelection test={selectedTestData} />
            <FinalResults test={selectedTestData} />
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Test Selected</h3>
            <p className="text-muted-foreground">Please select a test to view its details.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IncrementalityTestingPage;
