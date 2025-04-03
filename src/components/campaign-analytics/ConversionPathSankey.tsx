
import React from "react";
import { 
  Sankey, 
  Rectangle,
  Layer,
  ResponsiveContainer, 
  Tooltip, 
  Text 
} from "recharts";

// Define simplified mock data for the Sankey diagram
const data = {
  nodes: [
    { name: "Social Ad" },
    { name: "Email" },
    { name: "Search" },
    { name: "Direct" },
    { name: "Product Page" },
    { name: "Blog" },
    { name: "Cart" },
    { name: "Checkout" },
    { name: "Purchase" },
  ],
  links: [
    { source: 0, target: 4, value: 200 },
    { source: 0, target: 5, value: 120 },
    { source: 1, target: 4, value: 150 },
    { source: 1, target: 6, value: 80 },
    { source: 2, target: 4, value: 250 },
    { source: 3, target: 4, value: 100 },
    { source: 3, target: 6, value: 50 },
    { source: 4, target: 6, value: 400 },
    { source: 5, target: 4, value: 70 },
    { source: 5, target: 6, value: 30 },
    { source: 6, target: 7, value: 450 },
    { source: 7, target: 8, value: 380 },
  ]
};

export const ConversionPathSankey = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="font-medium mb-1">Conversion Path Visualization</h3>
        <p className="text-sm text-muted-foreground">
          Sankey diagram showing the flow of users through the conversion funnel
        </p>
      </div>
      
      <div className="h-96 border rounded-md p-4">
        <ResponsiveContainer width="100%" height="100%">
          <Sankey
            data={data}
            nodeWidth={15}
            nodePadding={10}
            linkCurvature={0.5}
            iterations={64}
            node={<Layer fill="#34d399" opacity={0.8} />}
            link={<Layer stroke="#d1d5db" strokeWidth={2} />}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Tooltip />
            <Text />
          </Sankey>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
