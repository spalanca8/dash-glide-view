
import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import StatCard from "../components/dashboard/StatCard";
import AreaChart from "../components/dashboard/AreaChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import { Users, BarChart3, DollarSign, ArrowUpRight } from "lucide-react";

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your analytics.
            </p>
          </div>

          <div className="dashboard-grid mb-6">
            <StatCard
              title="Total Users"
              value="2,543"
              icon={Users}
              change={{
                value: 12.5,
                trend: "up",
              }}
            />
            <StatCard
              title="Active Sessions"
              value="1,832"
              icon={ArrowUpRight}
              change={{
                value: 8.2,
                trend: "up",
              }}
            />
            <StatCard
              title="Total Revenue"
              value="$45,231"
              icon={DollarSign}
              change={{
                value: 4.3,
                trend: "down",
              }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AreaChart 
              title="Performance Overview" 
              description="Monthly user activity" 
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
