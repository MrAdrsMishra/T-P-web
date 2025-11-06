import React, { useState, useEffect } from "react";
import useAdminTestStore from "../../../store/test-management/admin_test_store";

const CreateTestPage = ({ setShowPage }) => {
  const categories = [
    "Aptitude",
    "Reasoning",
    "Verbal",
    "Fundamentals",
    "Coding",
    "Writing",
    "Listening",
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [problemsByCategory, setProblemsByCategory] = useState({});
  const [testData, setTestData] = useState({
    title: "",
    for_branch: "",
    for_batch: "",
    categories: [],
    duration: 0,
    numberOfQuestions: 0,
    total_marks: 0,
    description: "",
    instructions: "",
  });
  const createTest = useAdminTestStore((state) => state.createTest);

  // Sync testData categories and problemsByCategory whenever they change
  useEffect(() => {
    setTestData((prev) => ({
      ...prev,
      categories: selectedCategories,
      problemsByCategory: problemsByCategory,
    }));
  }, [selectedCategories, problemsByCategory]);

  // Initialize problems for new selected categories
  useEffect(() => {
    const updatedProblems = { ...problemsByCategory };
    selectedCategories.forEach((cat) => {
      if (!updatedProblems[cat]) updatedProblems[cat] = [{}];
    });
    // Remove problems for unselected categories
    Object.keys(updatedProblems).forEach((cat) => {
      if (!selectedCategories.includes(cat)) delete updatedProblems[cat];
    });
    setProblemsByCategory(updatedProblems);
  }, [selectedCategories]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleProblemChange = (category, idx, field, value) => {
    const updated = { ...problemsByCategory };
    if (!updated[category]) updated[category] = [{}];
    updated[category][idx] = {
      ...updated[category][idx],
      [field]: value,
    };
    setProblemsByCategory(updated);
  };

  const addAnotherProblem = (category) => {
    const updated = { ...problemsByCategory };
    if (!updated[category]) updated[category] = [];
    updated[category].push({
      statement: "",
      options: "",
      answer: "",
      marks: 0,
    });
    setProblemsByCategory(updated);
  };
  const removeProblem = (category, idx) => {
    const updated = { ...problemsByCategory };
    if (updated[category]) {
      updated[category].splice(idx, 1);
      if (updated[category].length === 0) {
        delete updated[category];
        setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
      }
      setProblemsByCategory(updated);
    }
  };
  const handleCreateTest = async () => {
    // Prepare problemsByCategory in the correct format
    const formattedProblemsByCategory = {};
    Object.entries(problemsByCategory).forEach(([category, problems]) => {
      formattedProblemsByCategory[category] = problems.map((problem) => ({
        problemStatement: problem.statement,
        options: problem.options.split(",").map((opt) => opt.trim()), // Convert to array
        correctOption: problem.answer,
        markAllocated: Number(problem.marks) || 1,
      }));
    });

    const updatedTestData = {
      ...testData,
      problemsByCategory: formattedProblemsByCategory,
    };

    const res = await createTest(updatedTestData);
    console.log("Create Test Response:", res);
    if (res?.status === 200) {
      alert("Test created successfully");
      setShowPage(false);
    } else {
      alert("test creation failed");
    }
  };

  return (
    <div className="w-full flex ">
      <div className=" bg-inherit w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-text-primary">
            Create New Test
          </h2>
        </div>

        {/* Test Data Form */}
        <div className="p-6 space-y-6">
          <div>
            <label className="form-label">Test Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter test title"
              value={testData.title}
              onChange={(e) =>
                setTestData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          
          <div className="flex-col">
            <label className="form-label">Categories</label>
            {categories.map((category) => (
              <label
                key={category}
                className="basis-1/4 inline-flex items-center space-x-2 mr-4 mb-2"
              >
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCheckboxChange}
                />
                {category}
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                className="form-input"
                placeholder="90"
                value={testData.duration}
                onChange={(e) =>
                  setTestData((prev) => ({ ...prev, duration: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="form-label">Batch</label>
              <select 
              value={testData.for_batch}
                onChange={(e) =>
                  setTestData((prev) => ({ ...prev, for_batch: e.target.value }))
                }
              className="form-input">
                <option value="select">select</option>
                <option value="2020-2024">2020-2024</option>
                <option value="2021-2025">2021-2025</option>
                <option value="2022-2026">2022-2026</option>
              </select>
            </div>
            <div>
              <label className="form-label">Branch</label>
              <select
                value={testData.for_branch}
                onChange={(e) =>
                  setTestData((prev) => ({
                    ...prev,
                    for_branch: e.target.value,
                  }))
                }
                className="form-input"
              >
                {/* ["AIML","CSE","EC","EX","DS","CY","AIDS","BS" */}
                <option value="select">select</option>
                <option value="AIML">AIML</option>
                <option value="CSE">CSE</option>
                <option value="EC">EC</option>
                <option value="EX">EX</option>
                <option value="DS">DS</option>
                <option value="CY">CY</option>
                <option value="AIDS">AIDS</option>
                <option value="BS">BS</option>
              </select>
            </div>
            <div>
              <label className="form-label">Number of Questions</label>
              <input
                type="number"
                className="form-input"
                placeholder="25"
                value={testData.numberOfQuestions}
                onChange={(e) =>
                  setTestData((prev) => ({
                    ...prev,
                    numberOfQuestions: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="form-label">total marks</label>
              <input
                type="number"
                className="form-input"
                placeholder="25"
                value={testData.total_marks}
                onChange={(e) =>
                  setTestData((prev) => ({
                    ...prev,
                    total_marks: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea
              className="form-input h-24"
              placeholder="Enter test description"
              value={testData.description}
              onChange={(e) =>
                setTestData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>

          <div>
            <label className="form-label">Instructions</label>
            <textarea
              className="form-input h-32"
              placeholder="Enter test instructions for students"
              value={testData.instructions}
              onChange={(e) =>
                setTestData((prev) => ({
                  ...prev,
                  instructions: e.target.value,
                }))
              }
            ></textarea>
          </div>

          {/* Problems Section */}
          {selectedCategories.length > 0 && (
            <div>
              <strong className="text-lg">Problems</strong>

              {selectedCategories.map((category) => (
                <div key={category} className="mt-4">
                  {problemsByCategory[category]?.map((problem, idx) => (
                    <div
                      key={`${category}-${idx}`}
                      className="p-4 mb-6 border border-gray-300 rounded-2xl shadow-sm bg-white"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        {category} Problem {idx + 1}
                      </h3>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Problem Statement
                            </label>
                            <textarea
                              className="form-input w-full min-h-[100px] rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter problem statement"
                              value={problem.statement || ""}
                              onChange={(e) =>
                                handleProblemChange(
                                  category,
                                  idx,
                                  "statement",
                                  e.target.value
                                )
                              }
                            ></textarea>
                            <button
                              type="button"
                              onClick={() => removeProblem(category, idx)}
                              className="text-sm font-medium text-red-600 hover:text-red-800 bg-transparent border-none p-0"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="flex flex-col space-y-3">
                            <div>
                              <label className="text-sm font-medium text-gray-700">
                                Options
                              </label>
                              <input
                                type="text"
                                className="form-input w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter options (comma separated)"
                                value={problem.options || ""}
                                onChange={(e) =>
                                  handleProblemChange(
                                    category,
                                    idx,
                                    "options",
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium text-gray-700">
                                Correct Answer
                              </label>
                              <input
                                type="text"
                                className="form-input w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter correct answer"
                                value={problem.answer || ""}
                                onChange={(e) =>
                                  handleProblemChange(
                                    category,
                                    idx,
                                    "answer",
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium text-gray-700">
                                Allocated Marks
                              </label>
                              <input
                                type="number"
                                className="form-input w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter allocated marks"
                                value={problem.marks || 0}
                                onChange={(e) =>
                                  handleProblemChange(
                                    category,
                                    idx,
                                    "marks",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end mb-10">
                    <button
                      type="button"
                      onClick={() => addAnotherProblem(category)}
                      className="px-4 py-2 text-sm font-medium text-white bg-neutral-600 hover:bg-neutral-800 rounded-lg shadow"
                    >
                      + Add Another Problem
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={() => setShowPage(false)}
            className="btn-outline"
          >
            Cancel
          </button>
          <button className="btn-primary" onClick={handleCreateTest}>
            Create Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTestPage;
