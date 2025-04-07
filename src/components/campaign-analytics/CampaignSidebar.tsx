
import React from "react";
import { 
  BarChart3, 
  Activity, 
  DollarSign, 
  Calendar, 
  PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CampaignTab, CampaignSubPage } from "@/pages/CampaignAnalytics";

interface NavItemProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  indent?: boolean;
}

const NavItem = ({ isActive, onClick, icon, label, indent = false }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors hover:bg-muted/50 rounded-md",
      isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground",
      indent ? "pl-10" : ""
    )}
  >
    {icon}
    <span>{label}</span>
  </button>
);

interface CampaignSidebarProps {
  activeTab: CampaignTab;
  setActiveTab: (tab: CampaignTab) => void;
  activeSubPage: CampaignSubPage;
  setActiveSubPage: (subPage: CampaignSubPage) => void;
}

export const CampaignSidebar = ({ 
  activeTab, 
  setActiveTab, 
  activeSubPage, 
  setActiveSubPage 
}: CampaignSidebarProps) => {
  
  const handleTabChange = (tab: CampaignTab, defaultSubPage: CampaignSubPage) => {
    setActiveTab(tab);
    setActiveSubPage(defaultSubPage);
  };

  return (
    <div className="py-4 space-y-6">
      <div className="px-4 mb-2">
        <h2 className="text-lg font-semibold">Promotional Analytics</h2>
        <p className="text-xs text-muted-foreground">Real-time performance data</p>
      </div>
      
      {/* Promotion Analytics */}
      <div className="space-y-1">
        <div className="px-4 mb-1">
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            Promotion Analytics
          </h3>
        </div>
        <NavItem 
          isActive={activeSubPage === "impact"}
          onClick={() => handleTabChange("promotion", "impact")}
          icon={<Activity size={18} />}
          label="Promotion Impact"
        />
        <NavItem 
          isActive={activeSubPage === "cost-analysis"}
          onClick={() => handleTabChange("promotion", "cost-analysis")}
          icon={<PieChart size={18} />}
          label="Cost Analysis"
        />
      </div>
    </div>
  );
};
