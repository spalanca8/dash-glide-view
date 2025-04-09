import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  LineChart,
  Radio, 
  Layers, 
  GitCompare, 
  TrendingUp, 
  PieChart, 
  Settings, 
  HelpCircle,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  FileBarChart,
  Lightbulb,
  Home,
  Scale,
  Rocket,
  Bot,
  Zap,
  Tag,
  Activity,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href?: string;
  icon: React.ElementType;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    title: "Getting Started",
    href: "/getting-started",
    icon: Rocket,
  },
  {
    title: "Strategic Overview",
    href: "/analytics",
    icon: LayoutDashboard,
  },

  {
    title: "Channel Analysis",
    icon: Radio,
    children: [
      {
        title: "Overview",
        href: "/channels",
        icon: FileBarChart,
      },
      {
        title: "Detailed Analysis",
        href: "/channels",
        icon: GitCompare,
      },
      {
        title: "Year-over-Year",
        href: "/channels",
        icon: TrendingUp,
      }
    ]
  },
  {
    title: "Campaign Insights",
    icon: BarChart3,
    children: [
      {
        title: "Overview",
        href: "/campaign",
        icon: FileBarChart,
      },
      {
        title: "Detailed Analysis",
        href: "/campaign",
        icon: GitCompare,
      }
    ]
  },
  {
    title: "Promotional Analytics",
    icon: Tag,
    children: [
      {
        title: "Promotion Impact",
        href: "/campaign-analytics?view=impact",
        icon: Activity,
      },
      {
        title: "Cost Analysis",
        href: "/campaign-analytics?view=cost-analysis",
        icon: DollarSign,
      },
      {
        title: "Interaction & Strategy",
        href: "/campaign-analytics?view=interaction",
        icon: GitCompare,
      }
    ]
  },
  {
    title: "Budget Optimizer",
    href: "/budget",
    icon: PieChart,
  },
  {
    title: "Incrementality Testing",
    icon: Scale,
    children: [
      {
        title: "Overview",
        href: "/incrementality-testing",
        icon: FileBarChart,
      },
      {
        title: "Context",
        href: "/incrementality-testing",
        icon: TrendingUp,
      },
    ]
  },

  {
    title: "Model Metrics",
    href: "/model-metrics",
    icon: TrendingUp,
  },
  {
    title: "Quick Recommendations",
    href: "/recommendations",
    icon: Zap,
  },
  {
    title: "Chat AI Assistant",
    href: "/chat-ai",
    icon: Bot,
  },
  {
    title: "Data",
    href: "/data",
    icon: Layers,
  },
  {
    title: "Documentation",
    href: "/methodologies",
    icon: Lightbulb,
  },
  {
    title: "Help & Resources",
    icon: HelpCircle,
    children: [
      {
        title: "Pages Guide",
        href: "/guide",
        icon: Layers,
      },
      {
        title: "Metrics Guide",
        href: "/metrics-guide",
        icon: FileBarChart,
      },
      {
        title: "FAQ",
        href: "/faq",
        icon: HelpCircle,
      },
    ]
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },

  {
    title: "Draft Folder",
    icon: BarChart3,
    children: [
      {
        title: "Draft EDA",
        href: "/metrics",
        icon: FileBarChart,
      },
      {
        title: "Incremental Analysis THIS PAGE IN CHANNEL ANALYSIS",
        href: "/incremental",
        icon: TrendingUp,
      },
    ]
  },
];

export function SidebarNav() {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Overview": true,
    "Analysis": true,
    "Help & Resources": true
  });
  
  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }));
  };
  
  return (
    <div className="flex flex-col gap-1 w-full py-4">
      {navItems.map((item, index) => {
        if (item.children) {
          const isExpanded = expandedGroups[item.title];
          const hasActiveChild = item.children.some(child => location.pathname === child.href);
          
          return (
            <div key={index} className="mb-2">
              <button
                onClick={() => toggleGroup(item.title)}
                className={cn(
                  "w-full flex justify-between items-center px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                  hasActiveChild 
                    ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary" 
                    : "text-muted-foreground hover:bg-accent hover:text-primary"
                )}
              >
                <div className="flex items-center">
                  <item.icon className="h-4 w-4 mr-2.5" />
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 opacity-70" />
                ) : (
                  <ChevronRight className="h-4 w-4 opacity-70" />
                )}
              </button>
              
              {isExpanded && (
                <div className="ml-6 mt-1 flex flex-col gap-1 border-l-2 pl-3 border-border/40">
                  {item.children.map((child, childIndex) => {
                    const isActive = location.pathname === child.href;
                    return (
                      <Link
                        key={`${index}-${childIndex}`}
                        to={child.href || "#"}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all duration-200",
                          isActive 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-muted-foreground hover:bg-accent/50 hover:text-primary"
                        )}
                      >
                        <child.icon className="h-4 w-4" />
                        <span className="text-sm">{child.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        } else {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href || "#"}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-sm" 
                  : "text-muted-foreground hover:bg-accent/50 hover:text-primary"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm">{item.title}</span>
              {(item.title === "Chat AI Assistant" || item.title === "Quick Recommendations") && (
                <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  New
                </span>
              )}
            </Link>
          );
        }
      })}
    </div>
  );
}
