import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { GraduationCap, Building, Users, TrendingUp } from 'lucide-react';

const Performance = () => {
  const collegePerformanceData = [
    { college: 'MIT', avgScore: 92, students: 150 },
    { college: 'Stanford', avgScore: 89, students: 120 },
    { college: 'CMU', avgScore: 87, students: 100 },
    { college: 'Berkeley', avgScore: 85, students: 180 },
    { college: 'Caltech', avgScore: 88, students: 80 }
  ];

  const skillsRadarData = [
    { skill: 'Programming', score: 90 },
    { skill: 'Problem Solving', score: 85 },
    { skill: 'Communication', score: 78 },
    { skill: 'Teamwork', score: 82 },
    { skill: 'Leadership', score: 75 },
    { skill: 'Analytics', score: 88 }
  ];

  const placementStats = {
    totalPlacements: 1250,
    averagePackage: 12.5,
    topPackage: 45.0,
    placementRate: 89
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Performance in College</h1>
        <div className="text-sm text-gray-600">
          Academic Year 2023-24
        </div>
      </div>

      {/* Placement Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Placements</p>
              <p className="text-2xl font-semibold text-gray-900">{placementStats.totalPlacements}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Placement Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{placementStats.placementRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Package</p>
              <p className="text-2xl font-semibold text-gray-900">₹{placementStats.averagePackage}L</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-orange-50 rounded-lg">
              <GraduationCap className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Highest Package</p>
              <p className="text-2xl font-semibold text-gray-900">₹{placementStats.topPackage}L</p>
            </div>
          </div>
        </div>
      </div>

      {/* College Performance Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">College Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={collegePerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="college" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === 'avgScore' ? `${value}%` : value,
                name === 'avgScore' ? 'Average Score' : 'Students'
              ]}
            />
            <Bar dataKey="avgScore" fill="#374151" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Skills Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Skills Assessment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillsRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Score" dataKey="score" stroke="#374151" fill="#374151" fillOpacity={0.1} strokeWidth={2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Companies */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Top Recruiting Companies</h3>
          <div className="space-y-4">
            {[
              { company: 'Google', hires: 45, package: '₹35L' },
              { company: 'Microsoft', hires: 38, package: '₹32L' },
              { company: 'Amazon', hires: 52, package: '₹28L' },
              { company: 'Apple', hires: 25, package: '₹40L' },
              { company: 'Meta', hires: 30, package: '₹38L' }
            ].map((company, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{company.company}</p>
                  <p className="text-sm text-gray-600">{company.hires} hires</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{company.package}</p>
                  <p className="text-sm text-gray-600">avg package</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department-wise Performance */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Department-wise Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placement %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Package</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { dept: 'Computer Science', students: 120, placed: 115, rate: 96, package: '₹15.2L' },
                { dept: 'Electronics', students: 80, placed: 72, rate: 90, package: '₹12.8L' },
                { dept: 'Mechanical', students: 100, placed: 85, rate: 85, package: '₹10.5L' },
                { dept: 'Civil', students: 60, placed: 48, rate: 80, package: '₹8.2L' }
              ].map((dept, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.dept}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.students}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.placed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      dept.rate >= 90 ? 'bg-green-100 text-green-800' : 
                      dept.rate >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {dept.rate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.package}</td>
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