
import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMockABTestData } from "@/hooks/useMockABTestData";
import { ABTestScenarioSelector } from "@/components/ab-testing/ABTestScenarioSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewTab } from "@/components/incrementality-testing/OverviewTab";
import { ContextTab } from "@/components/incrementality-testing/ContextTab";
import { FileText, LineChart } from "lucide-react";

const IncrementalityTestingPage = () => {
  const { completedTests, loading } = useMockABTestData();
  const [selectedTest, setSelectedTest] = useState<string>(completedTests[0]?.id || "");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get the currently selected test data
  const selectedTestData = completedTests.find(test => test.id === selectedTest) || completedTests[0];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Incrementality Testing Dashboard"
        description="Analyze test results and understand the incremental impact of marketing activities"
      />

      <div className="mb-6">
        <ABTestScenarioSelector 
          tests={completedTests} 
          selectedTestId={selectedTest}
          onSelectTest={setSelectedTest}
          loading={loading}
        />
      </div>

      {selectedTestData && (
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="mb-4 bg-white/70 backdrop-blur-sm border border-white/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20">
              <LineChart className="h-4 w-4 mr-2" />
              Overview of Results
            </TabsTrigger>
            <TabsTrigger value="context" className="data-[state=active]:bg-primary/20">
              <FileText className="h-4 w-4 mr-2" />
              Context
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in">
            <OverviewTab test={selectedTestData} loading={loading} />
          </TabsContent>
          
          <TabsContent value="context" className="animate-fade-in">
            <ContextTab test={selectedTestData} loading={loading} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default IncrementalityTestingPage;
