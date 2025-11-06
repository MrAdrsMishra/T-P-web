import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';
import {mockStudents} from '../../../data/mockData.jsx'; // Adjust the import path as necessary
const StudentAnalysis = () => {
  const currentStudent = mockStudents[0]; // Assuming current user

  const performanceData = [
    { subject: 'Technical', score: currentStudent.technicalScore },
    { subject: 'Aptitude', score: currentStudent.aptitudeScore },
    { subject: 'Reasoning', score: currentStudent.reasoningScore }
  ];

  const progressData = [
    { month: 'Sep', score: 75 },
    { month: 'Oct', score: 82 },
    { month: 'Nov', score: 88 },
    { month: 'Dec', score: 90 },
    { month: 'Jan', score: currentStudent.overallScore }
  ];

  const distributionData = [
    { name: 'Correct', value: 75, color: '#10B981' },
    { name: 'Incorrect', value: 20, color: '#EF4444' },
    { name: 'Unattempted', value: 5, color: '#6B7280' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Student Analysis</h1>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overall Score</p>
              <p className="text-2xl font-semibold text-gray-900">{currentStudent.overallScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Rank</p>
              <p className="text-2xl font-semibold text-gray-900">#{currentStudent.rank}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tests Attempted</p>
              <p className="text-2xl font-semibold text-gray-900">{currentStudent.testsAttempted}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Time/Test</p>
              <p className="text-2xl font-semibold text-gray-900">45m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Subject */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Performance by Subject</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#374151" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Over Time */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#374151" strokeWidth={3} dot={{ fill: '#374151' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Answer Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Answer Distribution</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          {distributionData.map((item) => (
            <div key={item.name} className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentAnalysis;