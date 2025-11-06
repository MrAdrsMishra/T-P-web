import React, { useState } from 'react';
import { Plus, ExternalLink, Edit, Trash2, BookOpen, Building, Download, Search } from 'lucide-react';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const resources = [
    {
      id: 1,
      title: 'Google Software Engineer Guide',
      description: 'Comprehensive guide for preparing for Google software engineering interviews',
      type: 'company',
      company: 'Google',
      url: 'https://careers.google.com/how-we-hire/interview/',
      category: 'coding',
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'JavaScript Complete Course',
      description: 'Complete JavaScript tutorial from basics to advanced concepts',
      type: 'study',
      url: 'https://javascript.info/',
      category: 'coding',
      addedDate: '2024-01-12'
    },
    {
      id: 3,
      title: 'Microsoft Interview Process',
      description: 'Official Microsoft interview preparation guide and process overview',
      type: 'company',
      company: 'Microsoft',
      url: 'https://careers.microsoft.com/us/en/interview-process',
      category: 'aptitude',
      addedDate: '2024-01-10'
    },
    {
      id: 4,
      title: 'Data Structures and Algorithms',
      description: 'Free course on data structures and algorithms with practical examples',
      type: 'study',
      url: 'https://www.coursera.org/learn/algorithms-part1',
      category: 'coding',
      addedDate: '2024-01-08'
    },
    {
      id: 5,
      title: 'Amazon Leadership Principles',
      description: 'Understanding Amazon\'s leadership principles for behavioral interviews',
      type: 'company',
      company: 'Amazon',
      url: 'https://www.amazon.jobs/en/principles',
      category: 'verbal',
      addedDate: '2024-01-05'
    },
    {
      id: 6,
      title: 'English Communication Skills',
      description: 'Improve your verbal communication and presentation skills',
      type: 'study',
      url: 'https://www.edx.org/course/english-communication',
      category: 'verbal',
      addedDate: '2024-01-03'
    }
  ];

  const filteredResources = activeTab === 'all' ? resources : resources.filter(resource => resource.type === activeTab);

  const getTypeIcon = (type) => {
    return type === 'company' ? <Building className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />;
  };

  const getTypeBadge = (type) => {
    return type === 'company' 
      ? 'bg-secondary-100 text-secondary-700' 
      : 'bg-primary-100 text-primary-700';
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'coding':
        return 'text-accent-700 bg-accent-50';
      case 'aptitude':
        return 'text-primary-700 bg-primary-50';
      case 'verbal':
        return 'text-secondary-700 bg-secondary-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const AddResourceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-text-primary">Add New Resource</h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="form-label">Resource Title</label>
            <input type="text" className="form-input" placeholder="Enter resource title" />
          </div>
          
          <div>
            <label className="form-label">Description</label>
            <textarea className="form-input h-24" placeholder="Enter resource description"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Type</label>
              <select className="form-select">
                <option value="">Select type</option>
                <option value="company">Company Resource</option>
                <option value="study">Study Material</option>
              </select>
            </div>
            <div>
              <label className="form-label">Category</label>
              <select className="form-select">
                <option value="">Select category</option>
                <option value="coding">Coding</option>
                <option value="aptitude">Aptitude</option>
                <option value="verbal">Verbal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">URL</label>
            <input type="url" className="form-input" placeholder="https://example.com" />
          </div>

          <div>
            <label className="form-label">Company (if applicable)</label>
            <input type="text" className="form-input" placeholder="Enter company name" />
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button 
            onClick={() => setShowAddModal(false)}
            className="btn-outline"
          >
            Cancel
          </button>
          <button className="btn-primary">Add Resource</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Resources</h1>
          <p className="text-text-secondary">Manage study materials and company resources for students</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary mt-4 md:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">Total Resources</p>
              <h3 className="text-2xl font-bold text-text-primary">156</h3>
            </div>
            <div className="p-3 rounded-lg bg-primary-50">
              <BookOpen className="w-6 h-6 text-primary-700" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">Company Links</p>
              <h3 className="text-2xl font-bold text-text-primary">45</h3>
            </div>
            <div className="p-3 rounded-lg bg-secondary-50">
              <Building className="w-6 h-6 text-secondary-700" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">Study Materials</p>
              <h3 className="text-2xl font-bold text-text-primary">111</h3>
            </div>
            <div className="p-3 rounded-lg bg-accent-50">
              <BookOpen className="w-6 h-6 text-accent-700" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary mb-1">This Month</p>
              <h3 className="text-2xl font-bold text-text-primary">12</h3>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <Plus className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {['all', 'company', 'study'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-primary-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab === 'all' ? 'All Resources' : 
               tab === 'company' ? 'Company Resources' : 'Study Materials'}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getTypeBadge(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary line-clamp-1">{resource.title}</h3>
                  {resource.company && (
                    <p className="text-sm text-text-secondary">{resource.company}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 rounded hover:bg-gray-100">
                  <Edit className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-4 line-clamp-3">{resource.description}</p>

            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(resource.category)}`}>
                {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
              </span>
              <span className="text-xs text-gray-400">Added {resource.addedDate}</span>
            </div>

            <div className="flex space-x-2">
              <button className="btn-outline flex-1 text-sm py-2">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit
              </button>
              <button className="btn-primary flex-1 text-sm py-2">Share</button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No Resources Found</h3>
          <p className="text-text-secondary">Add some resources to get started</p>
        </div>
      )}

      {showAddModal && <AddResourceModal />}
    </div>
  );
};

export default Resources;