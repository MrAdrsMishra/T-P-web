import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, Clock, CheckCircle, XCircle, TrendingUp, Filter } from 'lucide-react';
import { mockTestHistory } from '../../../data/mockData';
import { format } from 'date-fns';

const TestHistory = () => {
  const [history] = useState(mockTestHistory);
  const [filterType, setFilterType] = useState('all');
  const [selectedTest, setSelectedTest] = useState(null);

  // Generate additional mock data for better visualization
  const extendedHistory = [
    ...mockTestHistory,
    {
      id: '3',
      testId: '3',
      testTitle: 'React Fundamentals',
      studentId: '1',
      score: 78,
      totalQuestions: 20,
      correctAnswers: 16,
      timeSpent: 35,
      completedAt: new Date('2024-01-05'),
      answers: []
    },
    {
      id: '4',
      testId: '4',
      testTitle: 'Logical Reasoning',
      studentId: '1',
      score: 88,
      totalQuestions: 25,
      correctAnswers: 22,
      timeSpent: 40,
      completedAt: new Date('2024-01-03'),
      answers: []
    },
    {
      id: '5',
      testId: '5',
      testTitle: 'Mathematics Aptitude',
      studentId: '1',
      score: 82,
      totalQuestions: 30,
      correctAnswers: 25,
      timeSpent: 50,
      completedAt: new Date('2024-01-01'),
      answers: []
    }
  ];

  const progressData = extendedHistory
    .sort((a, b) => a.completedAt.getTime() - b.completedAt.getTime())
    .map(test => ({
      date: format(test.completedAt, 'MMM dd'),
      score: test.score,
      testTitle: test.testTitle
    }));

  const performanceData = [
    { category: 'Technical', avgScore: 85, testsCount: 2 },
    { category: 'Reasoning', avgScore: 88, testsCount: 1 },
    { category: 'Aptitude', avgScore: 82, testsCount: 1 },
    { category: 'Mixed', avgScore: 80, testsCount: 1 }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    return 'C';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Test History & Analysis</h1>
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="all">All Tests</option>
            <option value="technical">Technical</option>
            <option value="aptitude">Aptitude</option>
            <option value="reasoning">Reasoning</option>
          </select>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tests Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{extendedHistory.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(extendedHistory.reduce((sum, test) => sum + test.score, 0) / extendedHistory.length)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Time/Test</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(extendedHistory.reduce((sum, test) => sum + test.timeSpent, 0) / extendedHistory.length)}m
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-orange-50 rounded-lg">
              <XCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Best Score</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.max(...extendedHistory.map(test => test.score))}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Score Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value}%`,
                  props.payload.testTitle
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#374151" 
                strokeWidth={3} 
                dot={{ fill: '#374151', strokeWidth: 2, r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance by Category */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Performance by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#374151" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Test History Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-800">Detailed Test History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {extendedHistory.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{test.testTitle}</div>
                    <div className="text-sm text-gray-500">{test.totalQuestions} questions</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(test.completedAt, 'MMM dd, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${getScoreColor(test.score)}`}>
                      {test.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getGrade(test.score)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {test.timeSpent}m
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.round((test.correctAnswers / test.totalQuestions) * 100)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedTest(test)}
                      className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Details Modal */}
      {selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Test Analysis</h3>
              <button
                onClick={() => setSelectedTest(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">{selectedTest.testTitle}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Score:</span>
                    <div className="font-medium text-gray-900">{selectedTest.score}%</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Grade:</span>
                    <div className="font-medium text-gray-900">{getGrade(selectedTest.score)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Time Spent:</span>
                    <div className="font-medium text-gray-900">{selectedTest.timeSpent} minutes</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Accuracy:</span>
                    <div className="font-medium text-gray-900">
                      {Math.round((selectedTest.correctAnswers / selectedTest.totalQuestions) * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">Performance Breakdown</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Correct Answers:</span>
                    <span className="font-medium text-green-600">{selectedTest.correctAnswers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Incorrect Answers:</span>
                    <span className="font-medium text-red-600">
                      {selectedTest.totalQuestions - selectedTest.correctAnswers}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Questions:</span>
                    <span className="font-medium text-gray-900">{selectedTest.totalQuestions}</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Completed on {format(selectedTest.completedAt, 'MMMM dd, yyyy')}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedTest(null)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestHistory;