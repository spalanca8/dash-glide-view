
import React from "react";

const leaderboardData = [
  { id: 1, name: "Summer Flash Sale", roi: 4.2, revenue: 125000, spend: 29760 },
  { id: 2, name: "Back to School", roi: 3.8, revenue: 98500, spend: 25920 },
  { id: 3, name: "New Customer Acquisition", roi: 3.5, revenue: 84000, spend: 24000 },
  { id: 4, name: "Loyalty Program", roi: 3.2, revenue: 64000, spend: 20000 },
  { id: 5, name: "Product Launch", roi: 2.8, revenue: 56000, spend: 20000 },
];

export const ROILeaderboard = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border text-sm text-muted-foreground">
            <th className="py-2 px-3 text-left font-medium">Rank</th>
            <th className="py-2 px-3 text-left font-medium">Campaign</th>
            <th className="py-2 px-3 text-right font-medium">ROI</th>
            <th className="py-2 px-3 text-right font-medium">Revenue</th>
            <th className="py-2 px-3 text-right font-medium">Spend</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((item, index) => (
            <tr key={item.id} className="border-b border-border hover:bg-muted/50">
              <td className="py-3 px-3">{index + 1}</td>
              <td className="py-3 px-3 font-medium">{item.name}</td>
              <td className="py-3 px-3 text-right font-medium text-green-600">{item.roi}x</td>
              <td className="py-3 px-3 text-right">${item.revenue.toLocaleString()}</td>
              <td className="py-3 px-3 text-right">${item.spend.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
