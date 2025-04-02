
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  TrendingUp, 
  Layers 
} from "lucide-react";

const MethodologySelector = ({ 
  activeMethodology, 
  setActiveMethodology 
}: { 
  activeMethodology: string; 
  setActiveMethodology: (methodology: string) => void;
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100/50 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-indigo-900 flex items-center gap-2">
        <span className="bg-indigo-100 p-1.5 rounded-md">
          <BarChart className="h-5 w-5 text-indigo-700" />
        </span>
        Select a methodology for detailed technical background
      </h3>
      
      <Tabs value={activeMethodology} onValueChange={setActiveMethodology} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm p-1 rounded-lg border border-indigo-100">
          <TabsTrigger 
            value="mmm" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
          >
            <BarChart className="h-4 w-4" />
            <span>Marketing Mix Modeling</span>
          </TabsTrigger>
          <TabsTrigger 
            value="incrementality" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Incrementality Testing</span>
          </TabsTrigger>
          <TabsTrigger 
            value="mta" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
          >
            <Layers className="h-4 w-4" />
            <span>Multi-Touch Attribution</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {!activeMethodology && (
        <div className="mt-6 text-center py-12 bg-white/70 rounded-lg border border-dashed border-indigo-200">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-indigo-100">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <p className="text-indigo-900 font-medium">Select a methodology above to view detailed technical information</p>
          <p className="text-indigo-600/70 text-sm mt-2 max-w-md mx-auto">
            Each methodology offers different approaches to measuring marketing effectiveness
          </p>
        </div>
      )}
    </div>
  );
};

export default MethodologySelector;
