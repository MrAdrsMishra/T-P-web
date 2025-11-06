import { useState } from 'react';
import { Plus, Search, Filter, BookOpen, Link, FileText, Video, Download, ExternalLink, Trash2, Edit } from 'lucide-react';
import { mockMaterials } from '../data/mockData';

const Materials = () => {
  const [materials, setMaterials] = useState(mockMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'book',
    category: '',
    url: '',
    content: '',
    tags: []
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'link':
        return <Link className="w-5 h-5 text-green-600" />;
      case 'note':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'book':
        return 'bg-blue-100 text-blue-800';
      case 'link':
        return 'bg-green-100 text-green-800';
      case 'note':
        return 'bg-purple-100 text-purple-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || material.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAddMaterial = () => {
    if (newMaterial.title && newMaterial.category) {
      const material = {
        id: Date.now().toString(),
        title: newMaterial.title,
        type: newMaterial.type || 'book',
        category: newMaterial.category,
        url: newMaterial.url,
        content: newMaterial.content,
        savedAt: new Date(),
        tags: newMaterial.tags || []
      };
      setMaterials([material, ...materials]);
      setNewMaterial({
        title: '',
        type: 'book',
        category: '',
        url: '',
        content: '',
        tags: []
      });
      setIsAddingMaterial(false);
    }
  };

  const handleTagInput = (value) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setNewMaterial({ ...newMaterial, tags });
  };

  const handleDeleteMaterial = (id) => {
    setMaterials(materials.filter(material => material.id !== id));
  };

  return (
  <div>
  <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Study Materials</h1>
        <button
          onClick={() => setIsAddingMaterial(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Material</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {/* <input
            type="text"
            placeholder="Search materials, categories, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          /> */}
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          {/* <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          > */}
            <option value="all">All Types</option>
            <option value="book">Books</option>
            <option value="link">Links</option>
            <option value="note">Notes</option>
            <option value="video">Videos</option>
          {/* </select> */}
        </div>
      </div>

      {/* Add Material Modal */}
      {isAddingMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Add Study Material</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="e.g., Clean Code by Robert Martin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newMaterial.type}
                  onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="book">Book</option>
                  <option value="link">Link</option>
                  <option value="note">Note</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newMaterial.category}
                  onChange={(e) => setNewMaterial({ ...newMaterial, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="e.g., Programming, Mathematics"
                />
              </div>
              {newMaterial.type !== 'note' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    value={newMaterial.url}
                    onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
              )}
              {newMaterial.type === 'note' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={newMaterial.content}
                    onChange={(e) => setNewMaterial({ ...newMaterial, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    rows={4}
                    placeholder="Write your notes here..."
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  onChange={(e) => handleTagInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="programming, javascript, tutorial (comma separated)"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsAddingMaterial(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMaterial}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Add Material
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div key={material.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                {getTypeIcon(material.type)}
                <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(material.type)}`}>
                  {material.type}
                </span>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteMaterial(material.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mb-2 line-clamp-2">{material.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{material.category}</p>
            
            {material.content && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{material.content}</p>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              {material.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {material.savedAt && new Date(material.savedAt).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                {material.url && (
                  <a
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Open</span>
                  </a>
                )}
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Save</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No materials found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start building your study library by adding materials'
            }
          </p>
          <button
            onClick={() => setIsAddingMaterial(true)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Add Your First Material
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Library Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {materials.filter(m => m.type === 'book').length}
            </div>
            <div className="text-sm text-gray-600">Books</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {materials.filter(m => m.type === 'link').length}
            </div>
            <div className="text-sm text-gray-600">Links</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {materials.filter(m => m.type === 'note').length}
            </div>
            <div className="text-sm text-gray-600">Notes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {materials.filter(m => m.type === 'video').length}
            </div>
            <div className="text-sm text-gray-600">Videos</div>
          </div>
        </div>
      </div>
    </div>
     </div>
  );
};

export default Materials;