
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AnalyticsOverview from "./pages/AnalyticsOverview";
import DataPage from "./pages/DataPage";
import ChannelsPage from "./pages/ChannelsPage";
import CampaignPage from "./pages/CampaignPage";
import MetricsPage from "./pages/MetricsPage";
import IncrementalPage from "./pages/IncrementalPage";
import BudgetPage from "./pages/BudgetPage";
import ABTestingPage from "./pages/ABTestingPage";
import GuidePage from "./pages/GuidePage";
import SettingsPage from "./pages/SettingsPage";
import MethodologiesPage from "./pages/MethodologiesPage";
import FAQPage from "./pages/FAQPage";
import MetricsGuidePage from "./pages/MetricsGuidePage";
import GettingStartedPage from "./pages/GettingStartedPage";
import ChatAIPage from "./pages/ChatAIPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<MainLayout />}>
            <Route path="/analytics" element={<AnalyticsOverview />} />
            <Route path="/methodologies" element={<MethodologiesPage />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/metrics" element={<MetricsPage />} />
            <Route path="/incremental" element={<IncrementalPage />} />
            <Route path="/channels" element={<ChannelsPage />} />
            <Route path="/campaign" element={<CampaignPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/ab-testing" element={<ABTestingPage />} />
            <Route path="/chat-ai" element={<ChatAIPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/metrics-guide" element={<MetricsGuidePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/getting-started" element={<GettingStartedPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
