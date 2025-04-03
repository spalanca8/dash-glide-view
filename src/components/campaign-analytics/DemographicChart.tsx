
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const demographicData = [
  { age: "18-24", male: -18, female: 15 },
  { age: "25-34", male: -25, female: 28 },
  { age: "35-44", male: -20, female: 22 },
  { age: "45-54", male: -15, female: 16 },
  { age: "55-64", male: -10, female: 12 },
  { age: "65+", male: -5, female: 8 },
];

export const DemographicChart = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={demographicData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={(value) => `${Math.abs(value)}%`} />
          <YAxis dataKey="age" type="category" />
          <Bar dataKey="male" fill="#4361ee" name="Male" />
          <Bar dataKey="female" fill="#f472b6" name="Female" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
