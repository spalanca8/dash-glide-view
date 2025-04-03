
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/layout/PageHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Scatter,
  ScatterChart,
  ZAxis,
  Cell
} from "recharts";
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart,
  BarChart2
} from "lucide-react";

// Sample data - in a real implementation, this would come from your API
const mmm_metrics = {
  r_squared: 0.87,
  rmse: 0.14,
  mape: 8.5,
  aic: 342.7,
  bic: 375.2,
  convergence_rate: 98.2,
  iterations: 143
};

const mta_metrics = {
  accuracy: 0.82,
  precision: 0.79,
  recall: 0.81,
  f1_score: 0.80,
  roc_auc: 0.85,
  conversion_rate_lift: 12.4,
  path_identification_accuracy: 0.78
};

// Sample data for MMM actual vs predicted
const mmm_fit_data = [
  { date: '2023-01', actual: 120, predicted: 118, residual: 2 },
  { date: '2023-02', actual: 132, predicted: 135, residual: -3 },
  { date: '2023-03', actual: 145, predicted: 142, residual: 3 },
  { date: '2023-04', actual: 160, predicted: 155, residual: 5 },
  { date: '2023-05', actual: 178, predicted: 175, residual: 3 },
  { date: '2023-06', actual: 163, predicted: 168, residual: -5 },
  { date: '2023-07', actual: 172, predicted: 170, residual: 2 },
  { date: '2023-08', actual: 185, predicted: 188, residual: -3 },
  { date: '2023-09', actual: 195, predicted: 200, residual: -5 },
  { date: '2023-10', actual: 205, predicted: 210, residual: -5 },
  { date: '2023-11', actual: 225, predicted: 222, residual: 3 },
  { date: '2023-12', actual: 240, predicted: 238, residual: 2 },
];

// Sample data for MTA performance
const mta_performance_data = [
  { path: 'Direct', accuracy: 0.87, volume: 2500 },
  { path: 'Paid Search → Direct', accuracy: 0.81, volume: 1800 },
  { path: 'Social → Direct', accuracy: 0.79, volume: 1500 },
  { path: 'Display → Paid Search → Direct', accuracy: 0.76, volume: 1200 },
  { path: 'Email → Direct', accuracy: 0.83, volume: 900 },
  { path: 'Organic Search → Direct', accuracy: 0.84, volume: 1100 },
  { path: 'Display → Direct', accuracy: 0.77, volume: 850 },
  { path: 'Video → Social → Direct', accuracy: 0.75, volume: 780 },
];

// Residuals scatter plot data
const residuals_data = mmm_fit_data.map(item => ({
  predicted: item.predicted,
  residual: item.residual
}));

const ModelMetricsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("mmm");

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Model Metrics"
        description="Performance metrics and diagnostics for MMM and MTA models"
      />

      <Tabs defaultValue="mmm" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="mmm">Media Mix Modeling</TabsTrigger>
          <TabsTrigger value="mta">Multi-Touch Attribution</TabsTrigger>
        </TabsList>

        <TabsContent value="mmm" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="R² (Coefficient of Determination)" 
              value={mmm_metrics.r_squared.toFixed(2)} 
              icon={<LineChartIcon className="h-4 w-4" />}
              description="Higher is better (0-1)"
            />
            <MetricCard 
              title="RMSE" 
              value={mmm_metrics.rmse.toFixed(2)} 
              icon={<BarChart3 className="h-4 w-4" />}
              description="Lower is better"
            />
            <MetricCard 
              title="MAPE (%)" 
              value={`${mmm_metrics.mape.toFixed(1)}%`} 
              icon={<PieChart className="h-4 w-4" />}
              description="Lower is better"
            />
            <MetricCard 
              title="Convergence Rate (%)" 
              value={`${mmm_metrics.convergence_rate}%`} 
              icon={<BarChart2 className="h-4 w-4" />}
              description="Higher is better"
            />
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="text-lg font-medium mb-4">Model Fit: Actual vs Predicted</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={mmm_fit_data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#8884d8" 
                  name="Actual Sales" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#82ca9d" 
                  name="Predicted Sales" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-4">Residual Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis 
                    type="number" 
                    dataKey="predicted" 
                    name="Predicted Value" 
                    domain={['auto', 'auto']}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="residual" 
                    name="Residual" 
                    domain={[-10, 10]}
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Residuals" data={residuals_data} fill="#8884d8">
                    {residuals_data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.residual > 0 ? "#82ca9d" : "#ff7300"} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-4">Model Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-600">AIC (Akaike Info Criterion):</div>
                  <div className="text-sm font-medium">{mmm_metrics.aic.toFixed(1)}</div>
                  
                  <div className="text-sm text-gray-600">BIC (Bayesian Info Criterion):</div>
                  <div className="text-sm font-medium">{mmm_metrics.bic.toFixed(1)}</div>
                  
                  <div className="text-sm text-gray-600">Number of Iterations:</div>
                  <div className="text-sm font-medium">{mmm_metrics.iterations}</div>
                  
                  <div className="text-sm text-gray-600">Estimation Method:</div>
                  <div className="text-sm font-medium">Bayesian with MCMC</div>
                  
                  <div className="text-sm text-gray-600">Decay Functions:</div>
                  <div className="text-sm font-medium">Adstock, Hill-Adstock</div>
                  
                  <div className="text-sm text-gray-600">Regularization:</div>
                  <div className="text-sm font-medium">Ridge (L2)</div>
                  
                  <div className="text-sm text-gray-600">Cross-validation:</div>
                  <div className="text-sm font-medium">5-fold time series CV</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mta" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Attribution Accuracy" 
              value={mta_metrics.accuracy.toFixed(2)} 
              icon={<LineChartIcon className="h-4 w-4" />}
              description="Higher is better (0-1)"
            />
            <MetricCard 
              title="Precision" 
              value={mta_metrics.precision.toFixed(2)} 
              icon={<BarChart3 className="h-4 w-4" />}
              description="Higher is better (0-1)"
            />
            <MetricCard 
              title="Conversion Lift (%)" 
              value={`${mta_metrics.conversion_rate_lift.toFixed(1)}%`} 
              icon={<PieChart className="h-4 w-4" />}
              description="vs baseline"
            />
            <MetricCard 
              title="ROC AUC" 
              value={mta_metrics.roc_auc.toFixed(2)} 
              icon={<BarChart2 className="h-4 w-4" />}
              description="Higher is better (0-1)"
            />
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="text-lg font-medium mb-4">Path Attribution Accuracy</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={mta_performance_data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="path" />
                <YAxis domain={[0, 1]} ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="accuracy" 
                  fill="#8884d8" 
                  name="Attribution Accuracy" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-4">Path Volume Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mta_performance_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="path" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="volume" fill="#82ca9d" name="Path Volume" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-4">Model Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-gray-600">F1 Score:</div>
                  <div className="text-sm font-medium">{mta_metrics.f1_score.toFixed(2)}</div>
                  
                  <div className="text-sm text-gray-600">Recall:</div>
                  <div className="text-sm font-medium">{mta_metrics.recall.toFixed(2)}</div>
                  
                  <div className="text-sm text-gray-600">Path Identification:</div>
                  <div className="text-sm font-medium">{mta_metrics.path_identification_accuracy.toFixed(2)}</div>
                  
                  <div className="text-sm text-gray-600">Model Type:</div>
                  <div className="text-sm font-medium">Probabilistic Markov Chain</div>
                  
                  <div className="text-sm text-gray-600">Data Source:</div>
                  <div className="text-sm font-medium">User-level cookie data</div>
                  
                  <div className="text-sm text-gray-600">Feature Engineering:</div>
                  <div className="text-sm font-medium">Time decay, position-based weighting</div>
                  
                  <div className="text-sm text-gray-600">Validation Method:</div>
                  <div className="text-sm font-medium">Holdout test set (20%)</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelMetricsPage;
