import React, { useState } from "react";
import { Plus, Edit, Trash2, Code, Users, Brain } from "lucide-react";
import { mockSkills } from "../../../data/mockData.jsx";
const SkillsSection = () => {
  const [skills, setSkills] = useState(mockSkills);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    level: 0,
    category: "technical",
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case "technical":
        return <Code className="w-5 h-5 text-blue-600" />;
      case "soft":
        return <Users className="w-5 h-5 text-green-600" />;
      case "domain":
        return <Brain className="w-5 h-5 text-purple-600" />;
      default:
        return <Code className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "technical":
        return "bg-blue-100 text-blue-800";
      case "soft":
        return "bg-green-100 text-green-800";
      case "domain":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (level) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleAddSkill = () => {
    if (newSkill.name && newSkill.level !== undefined && newSkill.category) {
      setSkills([...skills, newSkill]);
      setNewSkill({ name: "", level: 0, category: "technical" });
      setIsAddingSkill(false);
    }
  };

  const handleDeleteSkill = (skillName) => {
    setSkills(skills.filter((skill) => skill.name !== skillName));
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
  return (
    <div className="space-y-2">
 
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          You are possessing the skills{" "}
        </h1>
        <button
          onClick={() => setIsAddingSkill(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>
      {/* Add Skill Modal */}
      {isAddingSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Add New Skill
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="e.g., React, Leadership"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newSkill.category}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="technical">Technical</option>
                  <option value="soft">Soft Skills</option>
                  <option value="domain">Domain Knowledge</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proficiency Level: {newSkill.level}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) =>
                    setNewSkill({
                      ...newSkill,
                      level: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsAddingSkill(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Skills by Category */}
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div
          key={category}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 w-auto "
        >
          <div className="flex items-center mb-4">
            {getCategoryIcon(category)}
            <h3 className="text-lg font-medium text-gray-800 ml-2 capitalize">
              {category} Skills
            </h3>
            <span
              className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                category
              )}`}
            >
              {categorySkills.length} skills
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
            {categorySkills.map((skill) => (
              <div key={skill.name} className="p-4 bg-gray-50 rounded-lg border border-primary-100 ">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{skill.name}</h4>
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.name)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(
                        skill.level
                      )}`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {skill.level >= 80
                    ? "Expert"
                    : skill.level >= 60
                    ? "Intermediate"
                    : "Beginner"}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default SkillsSection;
