import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import CreateTestPage from "./CreateTestPage";
import CreateProblems from "./CreateProblems";
 
const TestManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showPage, setShowPage] = useState("0");

  const tests = [
    {
      id: 1,
      title: "Advanced JavaScript Concepts",
      category: "coding",
      duration: 120,
      participants: 45,
      status: "active",
      difficulty: "Hard",
      createdDate: "2024-01-15",
      questions: 25,
    },
    {
      id: 2,
      title: "Logical Reasoning Assessment",
      category: "aptitude",
      duration: 90,
      participants: 32,
      status: "draft",
      difficulty: "Medium",
      createdDate: "2024-01-12",
      questions: 40,
    },
    {
      id: 3,
      title: "English Communication Skills",
      category: "verbal",
      duration: 60,
      participants: 28,
      status: "completed",
      difficulty: "Easy",
      createdDate: "2024-01-10",
      questions: 30,
    },
    {
      id: 4,
      title: "Data Structures & Algorithms",
      category: "coding",
      duration: 150,
      participants: 52,
      status: "active",
      difficulty: "Hard",
      createdDate: "2024-01-08",
      questions: 20,
    },
    {
      id: 5,
      title: "Quantitative Aptitude",
      category: "aptitude",
      duration: 75,
      participants: 38,
      status: "scheduled",
      difficulty: "Medium",
      createdDate: "2024-01-05",
      questions: 35,
    },
  ];
  const filteredTests =
    activeTab === "all"
      ? tests
      : tests.filter((test) => test.category === activeTab);

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "draft":
        return <Edit className="w-4 h-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "scheduled":
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "bg-green-100 text-green-700",
      draft: "bg-yellow-100 text-yellow-700",
      completed: "bg-blue-100 text-blue-700",
      scheduled: "bg-orange-100 text-orange-700",
    };
    return statusClasses[status] || "bg-gray-100 text-gray-700";
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "aptitude":
        return "text-primary-700 bg-primary-50";
      case "verbal":
        return "text-secondary-700 bg-secondary-50";
      case "coding":
        return "text-accent-700 bg-accent-50";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };
  
  let content;
  switch (showPage) {
    case "1":
      content = <CreateProblems setShowPage={setShowPage} />;
      break;
    case "2":
      content = <CreateTestPage setShowPage={setShowPage} />;
      break;
    default:
      content = (
       <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Total Tests
                  </p>
                  <h3 className="text-2xl font-bold text-text-primary">156</h3>
                </div>
                <div className="p-3 rounded-lg bg-primary-50">
                  <CheckCircle className="w-6 h-6 text-primary-700" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Active Tests
                  </p>
                  <h3 className="text-2xl font-bold text-text-primary">23</h3>
                </div>
                <div className="p-3 rounded-lg bg-green-50">
                  <Clock className="w-6 h-6 text-green-700" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Total Participants
                  </p>
                  <h3 className="text-2xl font-bold text-text-primary">
                    1,234
                  </h3>
                </div>
                <div className="p-3 rounded-lg bg-secondary-50">
                  <Users className="w-6 h-6 text-secondary-700" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    Avg. Completion
                  </p>
                  <h3 className="text-2xl font-bold text-text-primary">87%</h3>
                </div>
                <div className="p-3 rounded-lg bg-accent-50">
                  <CheckCircle className="w-6 h-6 text-accent-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="card">
            <div className="flex flex-wrap gap-2">
              {["all", "aptitude", "verbal", "coding"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    activeTab === tab
                      ? "bg-primary-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Tests
                </button>
              ))}
            </div>
          </div>

          {/* Tests Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-text-secondary">
                      Test Details
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-text-secondary">
                      Category
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-text-secondary">
                      Duration
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-text-secondary">
                      Participants
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-text-secondary">
                      Status
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-text-secondary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTests.map((test) => (
                    <tr
                      key={test.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <h3 className="font-medium text-text-primary">
                            {test.title}
                          </h3>
                          <p className="text-sm text-text-secondary">
                            {test.questions} questions • {test.difficulty}
                          </p>
                          <p className="text-xs text-gray-400">
                            Created: {test.createdDate}
                          </p>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            test.category
                          )}`}
                        >
                          {test.category.charAt(0).toUpperCase() +
                            test.category.slice(1)}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="font-medium text-text-primary">
                          {test.duration} min
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="flex items-center justify-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-text-primary">
                            {test.participants}
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(test.status)}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                              test.status
                            )}`}
                          >
                            {test.status.charAt(0).toUpperCase() +
                              test.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-1 rounded hover:bg-primary-50 text-primary-700">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded hover:bg-red-50 text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
  }
    return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
            Test Management
          </h1>
          <p className="text-text-secondary">
            Create, organize and manage tests for your students
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowPage("1")}
            className="btn-primary mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create new Problems
          </button>
          <button
            onClick={() => setShowPage("2")}
            className="btn-primary mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Test
          </button>
        </div>
      </div>
      {content}
    </div>
  );
};

export default TestManagement;
