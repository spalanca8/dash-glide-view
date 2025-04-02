
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart2, Database, BarChart, LineChart, Target, Compass, Cpu, MessageSquare, Settings, HelpCircle, Users, PieChart, Briefcase, TestTube2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavLinkType = {
  href: string;
  icon: React.ElementType;
  title: string;
  isExternal?: boolean;
  subItems?: { href: string; title: string }[];
};

export function SidebarNav() {
  const [expandedSection, setExpandedSection] = React.useState<string | null>("Analytics & Attribution");
  
  const navLinks: { section: string; items: NavLinkType[] }[] = [
    {
      section: "Analytics & Attribution",
      items: [
        { href: "/analytics", icon: Home, title: "Overview" },
        { href: "/incremental", icon: PieChart, title: "Incremental Analysis" },
        { href: "/channels", icon: BarChart2, title: "Channel Performance" },
        { href: "/campaign", icon: Briefcase, title: "Campaign Analysis" },
        { href: "/metrics", icon: LineChart, title: "Core Metrics" },
      ]
    },
    {
      section: "Testing & Experimentation",
      items: [
        { href: "/ab-testing", icon: Target, title: "A/B Testing" },
        { href: "/incrementality-testing", icon: TestTube2, title: "Incrementality Testing" },
      ]
    },
    {
      section: "Planning & Optimization",
      items: [
        { href: "/budget", icon: BarChart, title: "Budget Optimizer" },
        { href: "/recommendations", icon: Compass, title: "Recommendations" },
      ]
    },
    {
      section: "Data & AI",
      items: [
        { href: "/data", icon: Database, title: "Data Sources" },
        { href: "/methodologies", icon: Cpu, title: "Methodologies" },
        { href: "/chat-ai", icon: MessageSquare, title: "Marketing AI" },
      ]
    },
    {
      section: "Help & Support",
      items: [
        { href: "/guide", icon: HelpCircle, title: "Guide" },
        { href: "/faq", icon: HelpCircle, title: "FAQ" },
        { href: "/metrics-guide", icon: HelpCircle, title: "Metrics Guide" },
        { href: "/getting-started", icon: HelpCircle, title: "Getting Started" },
        { href: "/settings", icon: Settings, title: "Settings" },
      ]
    },
  ];

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="flex flex-col gap-10 p-4 mt-6">
      <div className="relative">
        {navLinks.map(({ section, items }) => (
          <div key={section} className="mb-4">
            <button
              onClick={() => toggleSection(section)}
              className="flex items-center justify-between w-full text-left px-2 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white"
            >
              <span>{section}</span>
              <span className="text-xs">{expandedSection === section ? '−' : '+'}</span>
            </button>
            
            {expandedSection === section && (
              <div className="mt-1 ml-2 space-y-1">
                {items.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors",
                      isActive
                        ? "text-white bg-white/10"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon size={16} />
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
