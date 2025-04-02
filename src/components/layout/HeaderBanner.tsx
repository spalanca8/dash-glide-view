import React from "react";
import { Link, useLocation } from "react-router-dom";

export function HeaderBanner() {
  const location = useLocation();
  
  // Function to get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/analytics":
        return "Analytics Overview";
      case "/data":
        return "Data Overview";
      case "/channels":
        return "Channel Analysis";
      case "/campaign":
        return "Campaign Performance";
      case "/channel-details":
        return "Campaign Analysis";
      case "/metrics":
        return "Exploratory Data Analysis";
      case "/methodologies":
        return "Analytics Methodologies";
      case "/incremental":
        return "Incremental Analysis";
      case "/budget":
        return "Budget Optimizer";
      case "/incrementality-testing":
        return "Incrementality Testing";
      case "/guide":
        return "Guide";
      case "/settings":
        return "Settings";
      case "/chat-ai":
        return "Analytics AI Assistant";
      case "/recommendations":
        return "Recommendations";
      case "/getting-started":
        return "Getting Started";
      default:
        return "Dashboard";
    }
  };
  
  // Function to get page description based on current route
  const getPageDescription = () => {
    switch (location.pathname) {
      case "/analytics":
        return "Analytics Dashboard";
      case "/channels":
        return "Analyze campaign performance by channel";
      case "/metrics":
        return "Explore data patterns and distributions";
      case "/data":
        return "Data sources and processing";
      case "/campaign":
        return "Track and analyze your marketing campaign results";
      case "/channel-details":
        return "Detailed campaign performance";
      case "/incremental":
        return "Measure incremental impact";
      case "/budget":
        return "Optimize budget allocation";
      case "/incrementality-testing":
        return "Analyze the incremental impact of marketing campaigns on business outcomes";
      case "/chat-ai":
        return "AI-powered insights and recommendations";
      case "/recommendations":
        return "Actionable marketing recommendations";
      case "/methodologies":
        return "Understand analytics methodologies";
      case "/guide":
        return "Platform documentation and help";
      case "/settings":
        return "Configure application settings";
      case "/getting-started":
        return "Welcome to the Artefact Marketing Intelligence Platform";
      default:
        return "";
    }
  };

  return (
    <div className="flex items-center gap-5 mb-6 animate-fade-in">
      <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/86767657.png" 
            alt="Logo" 
            className="h-10 w-auto" 
          />
        </div>
      </Link>
      
      <div className="h-12 w-px bg-gradient-to-b from-gray-200 to-gray-100 hidden md:block"></div>
      
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800">
            {getPageTitle()}
            {location.pathname === "/chat-ai" && (
              <span className="ml-2 text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                Beta
              </span>
            )}
          </h1>
          <div className={`h-2 w-2 rounded-full ${location.pathname === "/chat-ai" ? "bg-primary animate-pulse" : "bg-primary/70 animate-pulse"} hidden sm:block`}></div>
        </div>
        <p className="text-sm text-muted-foreground">{getPageDescription()}</p>
      </div>
    </div>
  );
}
