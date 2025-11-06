import React, { useState } from 'react';
import { Plus, ExternalLink, Github, Calendar, Code, CheckCircle, Clock, Circle } from 'lucide-react';
import { mockProjects } from '../data/mockData';

const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [],
    status: 'planned',
    startDate: new Date(),
    githubUrl: '',
    liveUrl: ''
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'planned':
        return <Circle className="w-5 h-5 text-gray-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies || [],
        status: newProject.status || 'planned',
        startDate: newProject.startDate || new Date(),
        githubUrl: newProject.githubUrl,
        liveUrl: newProject.liveUrl
      };
      setProjects([...projects, project]);
      setNewProject({
        title: '',
        description: '',
        technologies: [],
        status: 'planned',
        startDate: new Date(),
        githubUrl: '',
        liveUrl: ''
      });
      setIsAddingProject(false);
    }
  };

  const handleTechnologyInput = (value) => {
    const technologies = value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setNewProject({ ...newProject, technologies });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Projects Portfolio</h1>
        <button
          onClick={() => setIsAddingProject(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Add Project Modal */}
      {isAddingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="e.g., E-commerce Platform"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  rows={3}
                  placeholder="Brief description of your project"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
                <input
                  type="text"
                  onChange={(e) => handleTechnologyInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="React, Node.js, MongoDB (comma separated)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="planned">Planned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="https://github.com/username/project"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                <input
                  type="url"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="https://myproject.com"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsAddingProject(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <Code className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-800">{project.title}</h3>
              </div>
              {getStatusIcon(project.status)}
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
            
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                {project.status.replace('-', ' ').toUpperCase()}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {project.startDate instanceof Date
                  ? project.startDate.toLocaleDateString()
                  : new Date(project.startDate).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex space-x-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Live</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Project Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {projects.length}
            </div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {projects.filter(p => p.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-600 mb-2">
              {projects.filter(p => p.status === 'planned').length}
            </div>
            <div className="text-sm text-gray-600">Planned</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;