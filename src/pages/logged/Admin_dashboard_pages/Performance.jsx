import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Filter, Calendar, Download } from 'lucide-react';

const Performance = () => {
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const performanceData = {
    overall: [
      { name: 'Jan', aptitude: 75, verbal: 82, coding: 68 },
      { name: 'Feb', aptitude: 78, verbal: 85, coding: 72 },
      { name: 'Mar', aptitude: 82, verbal: 88, coding: 75 },
      { name: 'Apr', aptitude: 80, verbal: 90, coding: 78 },
      { name: 'May', aptitude: 85, verbal: 87, coding: 82 },
      { name: 'Jun', aptitude: 88, verbal: 92, coding: 85 }
    ],
    categories: [
      { name: 'Aptitude', value: 85, color: '#3B82F6' },
      { name: 'Verbal', value: 92, color: '#0F766E' },
      { name: 'Coding', value: 78, color: '#EA580C' }
    ]
  };

  const topStudents = [
    { name: 'Sarah Smith', aptitude: 95, verbal: 98, coding: 92, overall: 95 },
    { name: 'Mike Johnson', aptitude: 88, verbal: 95, coding: 89, overall: 91 },
    { name: 'Emily Brown', aptitude: 92, verbal: 87, coding: 94, overall: 91 },
    { name: 'John Doe', aptitude: 85, verbal: 90, coding: 88, overall: 88 },
    { name: 'Alex Wilson', aptitude: 89, verbal: 85, coding: 86, overall: 87 }
  ];

  const MockBarChart = ({ data }) => (
    <div className="space-y-4 mt-6">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{item.name}</span>
            <div className="flex space-x-4">
              <span className="text-primary-700">Apt: {item.aptitude}%</span>
              <span className="text-secondary-700">Ver: {item.verbal}%</span>
              <span className="text-accent-700">Cod: {item.coding}%</span>
            </div>
          </div>
          <div className="flex space-x-1 h-2">
            <div 
              className="bg-primary-700 rounded-l" 
              style={{ width: `${(item.aptitude / 100) * 33.33}%` }}
            ></div>
            <div 
              className="bg-secondary-700" 
              style={{ width: `${(item.verbal / 100) * 33.33}%` }}
            ></div>
            <div 
              className="bg-accent-700 rounded-r" 
              style={{ width: `${(item.coding / 100) * 33.33}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );

  const MockPieChart = ({ data }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {data.map((item, index) => (
        <div key={index} className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-3">
            <div 
              className="w-24 h-24 rounded-full border-8 border-gray-200"
              style={{
                background: `conic-gradient(${item.color} 0deg ${item.value * 3.6}deg, #e5e7eb ${item.value * 3.6}deg 360deg)`
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">{item.value}%</span>
            </div>
          </div>
          <p className="font-medium text-text-primary">{item.name}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Performance Analytics</h1>
          <p className="text-text-secondary">Track and analyze student performance across all categories</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="btn-outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="btn-primary">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="form-label">Time Period</label>
            <select 
              className="form-select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <div>
            <label className="form-label">Category</label>
            <select 
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="aptitude">Aptitude</option>
              <option value="verbal">Verbal</option>
              <option value="coding">Coding</option>
            </select>
          </div>
          <div>
            <label className="form-label">View Type</label>
            <select 
              className="form-select"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="overall">Overall Performance</option>
              <option value="categories">By Category</option>
              <option value="trends">Trends</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary">Performance Trends</h2>
            <BarChart3 className="w-6 h-6 text-primary-700" />
          </div>
          <MockBarChart data={performanceData.overall} />
        </div>

        {/* Category Distribution */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-primary">Category Performance</h2>
            <PieChart className="w-6 h-6 text-primary-700" />
          </div>
          <MockPieChart data={performanceData.categories} />
        </div>
      </div>

      {/* Top Performers Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Top Performers</h2>
          <button className="text-primary-700 hover:text-primary-800 text-sm font-medium">
            View All Students
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-text-secondary">Student</th>
                <th className="text-center py-3 px-4 font-medium text-text-secondary">Aptitude</th>
                <th className="text-center py-3 px-4 font-medium text-text-secondary">Verbal</th>
                <th className="text-center py-3 px-4 font-medium text-text-secondary">Coding</th>
                <th className="text-center py-3 px-4 font-medium text-text-secondary">Overall</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((student, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{student.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-text-primary">{student.name}</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="font-semibold text-primary-700">{student.aptitude}%</span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="font-semibold text-secondary-700">{student.verbal}%</span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="font-semibold text-accent-700">{student.coding}%</span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="font-bold text-text-primary">{student.overall}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Performance;