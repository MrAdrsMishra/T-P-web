import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
} from 'recharts';

// ============================================
// REUSABLE CHART COMPONENTS
// ============================================

/**
 * Performance Trend Line Chart
 */
export const PerformanceTrendChart = ({ data, height = 300, title = 'Performance Trend' }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Percentile Trend Multi-line Chart
 */
export const PercentileTrendChart = ({ data, height = 300, title = 'Percentile Trend' }) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b'];
  const lineNames = ['college', 'batch', 'branch'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} stroke="#64748b" />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          {lineNames.map((name, idx) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              name={name.charAt(0).toUpperCase() + name.slice(1)}
              stroke={colors[idx]}
              strokeWidth={2}
              dot={{ fill: colors[idx], r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Category Performance Bar Chart
 */
export const CategoryPerformanceChart = ({ data, height = 300, title = 'Performance by Category' }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="category" stroke="#64748b" />
          <YAxis domain={[0, 100]} stroke="#64748b" />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgScore" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Average Score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Subject Performance Radar Chart
 */
export const SubjectPerformanceRadarChart = ({ data, height = 300, title = 'Subject Performance' }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" stroke="#64748b" />
          <PolarRadiusAxis stroke="#64748b" />
          <Radar name="Performance" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Distribution Pie Chart
 */
export const DistributionPieChart = ({
  data,
  height = 300,
  title = 'Distribution',
  dataKey = 'value',
  nameKey = 'name',
}) => {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#3b82f6"
            dataKey={dataKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Time Series Area Chart
 */
export const TimeSeriesAreaChart = ({
  data,
  height = 300,
  title = 'Time Series',
  dataKey = 'value',
  color = '#3b82f6',
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Area type="monotone" dataKey={dataKey} fill={color} stroke={color} fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Multi-value Bar Chart
 */
export const MultiBarChart = ({
  data,
  height = 300,
  title = 'Comparison',
  bars = [],
  xAxisKey = 'name',
}) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey={xAxisKey} stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Legend />
          {bars.map((barConfig, idx) => (
            <Bar
              key={barConfig.dataKey}
              dataKey={barConfig.dataKey}
              fill={barConfig.fill || colors[idx % colors.length]}
              name={barConfig.name || barConfig.dataKey}
              radius={[8, 8, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Student Progress Comparison Chart
 */
export const StudentProgressChart = ({ data, height = 300, title = 'Student Progress' }) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Legend />
          {data.length > 0 &&
            Object.keys(data[0])
              .filter((key) => key !== 'date')
              .map((key, idx) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[idx % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Accuracy Distribution Chart
 */
export const AccuracyDistributionChart = ({
  data,
  height = 300,
  title = 'Accuracy Distribution',
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="range" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Students" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Leaderboard Score Distribution
 */
export const ScoreDistributionChart = ({ data, height = 300, title = 'Score Distribution' }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="scoreRange" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            fill="#10b981"
            stroke="#059669"
            fillOpacity={0.3}
            name="Students"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default {
  PerformanceTrendChart,
  PercentileTrendChart,
  CategoryPerformanceChart,
  SubjectPerformanceRadarChart,
  DistributionPieChart,
  TimeSeriesAreaChart,
  MultiBarChart,
  StudentProgressChart,
  AccuracyDistributionChart,
  ScoreDistributionChart,
};
