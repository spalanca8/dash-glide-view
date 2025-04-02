import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ChevronRight, DollarSign, TrendingUp, Users, Zap } from 'lucide-react';

interface SaturationData {
  channel: string;
  currentSpending: number;
  maxSpending: number;
  newSpending: number;
  curve: number[];
}

const renderSaturationCurve = (data: SaturationData, index: number) => {
  const points = data.curve.map((y, i) => ({
    x: (i / (data.curve.length - 1)) * 100,
    y: y * 100
  }));

  // Calculate key points
  const currentSpendingIndex = Math.floor((data.currentSpending / data.maxSpending) * (data.curve.length - 1));
  const maxSaturationIndex = data.curve.indexOf(Math.max(...data.curve));
  const newSpendingIndex = Math.floor((data.newSpending / data.maxSpending) * (data.curve.length - 1));

  return (
    <div key={index} className="relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-white">{data.channel}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Current: ${data.currentSpending.toLocaleString()}</span>
          <span className="text-xs text-gray-400">→</span>
          <span className="text-xs text-green-400">New: ${data.newSpending.toLocaleString()}</span>
        </div>
      </div>
      <div className="relative h-32 bg-black/20 rounded-lg p-2">
        <svg className="w-full h-full">
          {/* Draw the curve */}
          <path
            d={`M ${points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}`}
            fill="none"
            stroke="rgba(155, 135, 245, 0.5)"
            strokeWidth="1"
          />
          
          {/* Draw points */}
          {[
            { index: currentSpendingIndex, color: 'rgba(155, 135, 245, 0.8)', label: 'Current' },
            { index: maxSaturationIndex, color: 'rgba(99, 102, 241, 0.8)', label: 'Max Saturation' },
            { index: newSpendingIndex, color: 'rgba(167, 139, 250, 0.8)', label: 'New' }
          ].map((point, i) => (
            <g key={i}>
              {/* Point circle */}
              <circle
                cx={points[point.index].x}
                cy={points[point.index].y}
                r="4"
                fill={point.color}
                stroke="white"
                strokeWidth="1"
              />
              {/* Label */}
              <text
                x={points[point.index].x}
                y={points[point.index].y - 8}
                textAnchor="middle"
                className="text-xs fill-white"
              >
                {point.label}
              </text>
              {/* Vertical line */}
              <line
                x1={points[point.index].x}
                y1={points[point.index].y}
                x2={points[point.index].x}
                y2="100"
                stroke={point.color}
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}; 