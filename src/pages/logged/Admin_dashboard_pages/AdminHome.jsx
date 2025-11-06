import React from 'react';
import { Users, BookOpen, Trophy, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Active Tests',
      value: '45',
      change: '+8%',
      trend: 'up',
      icon: BookOpen,
      color: 'secondary'
    },
    {
      title: 'Avg. Score',
      value: '78.5',
      change: '+2.3%',
      trend: 'up',
      icon: Trophy,
      color: 'accent'
    },
    {
      title: 'Completion Rate',
      value: '89%',
      change: '-1.2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'primary'
    }
  ];

  const recentActivities = [
    { student: 'John Doe', action: 'Completed Aptitude Test', time: '2 hours ago', score: '85%' },
    { student: 'Sarah Smith', action: 'Started Coding Challenge', time: '4 hours ago', score: 'In Progress' },
    { student: 'Mike Johnson', action: 'Submitted Verbal Test', time: '6 hours ago', score: '92%' },
    { student: 'Emily Brown', action: 'Joined Platform', time: '1 day ago', score: 'New' },
    { student: 'Alex Wilson', action: 'Completed All Tests', time: '2 days ago', score: '88%' }
  ];

  const topPerformers = [
    { name: 'Sarah Smith', score: 95, tests: 12, badge: 'Gold' },
    { name: 'Mike Johnson', score: 92, tests: 10, badge: 'Silver' },
    { name: 'Emily Brown', score: 89, tests: 8, badge: 'Bronze' },
    { name: 'John Doe', score: 85, tests: 15, badge: 'Merit' },
    { name: 'Alex Wilson', score: 83, tests: 9, badge: 'Merit' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-primary-100">Here's what's happening with your students today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-text-primary">{stat.value}</h3>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-700`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">Recent Activities</h2>
            <button className="text-primary-700 hover:text-primary-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{activity.student}</p>
                  <p className="text-sm text-text-secondary">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  activity.score === 'New' ? 'bg-blue-100 text-blue-700' :
                  activity.score === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {activity.score}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">Top Performers</h2>
            <button className="text-primary-700 hover:text-primary-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">{performer.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{performer.name}</p>
                    <p className="text-sm text-text-secondary">{performer.tests} tests completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-text-primary">{performer.score}%</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    performer.badge === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                    performer.badge === 'Silver' ? 'bg-gray-100 text-gray-700' :
                    performer.badge === 'Bronze' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {performer.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;