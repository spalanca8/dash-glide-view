
import React from "react";

export const TouchpointHeatmap = () => {
  // In a real implementation, we would use a heatmap chart library
  // For now, we'll just use a placeholder grid
  return (
    <div>
      <div className="mb-4">
        <h3 className="font-medium mb-1">Touchpoint Frequency Heatmap</h3>
        <p className="text-sm text-muted-foreground">
          Visualizing frequency of customer touchpoints across the journey
        </p>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {/* Day labels */}
        <div className="font-medium text-xs text-right pr-2">Channel</div>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="font-medium text-xs text-center">{day}</div>
        ))}
        
        {/* Search row */}
        <div className="font-medium text-xs text-right pr-2">Search</div>
        <div className="h-10 bg-blue-500 opacity-90 rounded-md"></div>
        <div className="h-10 bg-blue-500 opacity-70 rounded-md"></div>
        <div className="h-10 bg-blue-500 opacity-80 rounded-md"></div>
        <div className="h-10 bg-blue-500 opacity-100 rounded-md"></div>
        <div className="h-10 bg-blue-500 opacity-60 rounded-md"></div>
        <div className="h-10 bg-blue-500 opacity-30 rounded-md"></div>
        
        {/* Social row */}
        <div className="font-medium text-xs text-right pr-2">Social</div>
        <div className="h-10 bg-purple-500 opacity-50 rounded-md"></div>
        <div className="h-10 bg-purple-500 opacity-60 rounded-md"></div>
        <div className="h-10 bg-purple-500 opacity-100 rounded-md"></div>
        <div className="h-10 bg-purple-500 opacity-90 rounded-md"></div>
        <div className="h-10 bg-purple-500 opacity-80 rounded-md"></div>
        <div className="h-10 bg-purple-500 opacity-70 rounded-md"></div>
        
        {/* Display row */}
        <div className="font-medium text-xs text-right pr-2">Display</div>
        <div className="h-10 bg-pink-500 opacity-30 rounded-md"></div>
        <div className="h-10 bg-pink-500 opacity-50 rounded-md"></div>
        <div className="h-10 bg-pink-500 opacity-40 rounded-md"></div>
        <div className="h-10 bg-pink-500 opacity-60 rounded-md"></div>
        <div className="h-10 bg-pink-500 opacity-70 rounded-md"></div>
        <div className="h-10 bg-pink-500 opacity-20 rounded-md"></div>
        
        {/* Email row */}
        <div className="font-medium text-xs text-right pr-2">Email</div>
        <div className="h-10 bg-orange-500 opacity-100 rounded-md"></div>
        <div className="h-10 bg-orange-500 opacity-20 rounded-md"></div>
        <div className="h-10 bg-orange-500 opacity-10 rounded-md"></div>
        <div className="h-10 bg-orange-500 opacity-90 rounded-md"></div>
        <div className="h-10 bg-orange-500 opacity-30 rounded-md"></div>
        <div className="h-10 bg-orange-500 opacity-20 rounded-md"></div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <div className="text-xs text-muted-foreground">Low frequency</div>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
          <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
          <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
          <div className="w-4 h-4 bg-gray-500 rounded-sm"></div>
          <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
        </div>
        <div className="text-xs text-muted-foreground">High frequency</div>
      </div>
    </div>
  );
};
