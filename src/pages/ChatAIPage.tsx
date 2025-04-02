
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Bot, BarChart3, Zap, TrendingUp, Lightbulb, Brain, Sparkles } from "lucide-react";
import { FilterExportControls } from "@/components/channels/FilterExportControls";

const ChatAIPage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Analytics AI Assistant"
        description="Unlock deeper insights and get intelligent recommendations from your marketing data."
      >
        <FilterExportControls
          filterOptions={{ channels: false, metrics: false }}
          exportFileName="ai-conversation"
          contentId="chat-content"
        />
      </PageHeader>
      
      <div className="dashboard-card relative overflow-hidden mb-8 bg-gradient-to-br from-purple-100 to-blue-100 border-primary/20 shadow-lg">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-purple-400"></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <span>How can the AI assistant help?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={BarChart3} 
              title="Analyze Trends" 
              description="Dive deep into data trends across channels and timeframes."
              color="bg-purple-100 text-purple-700 shadow-purple-200"
            />
            <FeatureCard 
              icon={Zap} 
              title="Actionable Insights" 
              description="Get smart recommendations to optimize your marketing strategy."
              color="bg-amber-100 text-amber-700 shadow-amber-200"
            />
            <FeatureCard 
              icon={Sparkles} 
              title="Intelligent Support" 
              description="Get expert guidance on metrics and performance analysis."
              color="bg-blue-100 text-blue-700 shadow-blue-200"
            />
          </div>
        </div>
      </div>

      <div id="chat-content" className="dashboard-card relative overflow-hidden shadow-lg border-primary/20" style={{minHeight: "600px"}}>
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-purple-400"></div>
        <ChatInterface />
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  color
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  color?: string;
}) => {
  return (
    <div className={`p-5 flex flex-col gap-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${color}`}>
      <div className="bg-white/70 rounded-lg p-3 w-12 h-12 flex items-center justify-center shadow-sm">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default ChatAIPage;
