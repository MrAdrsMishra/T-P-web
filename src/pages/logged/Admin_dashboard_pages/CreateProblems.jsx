import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAdminTestStore from "../../../store/test-management/admin_test_store";

const CreateProblems = ({ setShowPage }) => {
  const [problems, setProblems] = useState([{
        subject: "",
        problemStatement: "",
        options: "",
        correctOption: "",
        allocatedMark: 0,
      }]);
const createProblemSet = useAdminTestStore((state) => state.createProblemSet);

  const addAnotherProblem = () => {
    const updatedProblems = [...problems];
    updatedProblems.push({
      category: "",
      problemStatement: "",
      options: "",
      answer: "",
      allocatedMark: 0,
    });
    setProblems(updatedProblems);
  };
  const removeProblem = (idx) => {
    const updatedProblems = [...problems];
    updatedProblems.splice(idx, 1);
    setProblems(updatedProblems);
  };
  const handleProblemChange = (idx, field, value) => {
    const updatedProblems = [...problems];
    updatedProblems[idx][field] = value;
    setProblems(updatedProblems);
  };
  const handleAddProblems = async() => {
    // Logic to handle adding problems (e.g., send to backend or update state)
    console.log("Problems added:", problems); 
    const response = await createProblemSet(problems);
    if(response.status==200){
      alert("problems created successfully");
      setShowPage("0");
    }
  }
  return (
    <div className="w-full felx">
      <div className="bg-inherit w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-text-primary">
            Create Problems
          </h2>
        </div>
        {/* */}
        {problems.map((problem, idx) => (
          <form className="space-y-2 p-4 mb-6 border border-gray-300 rounded-2xl shadow-sm bg-white">
            {/* Problems Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  {/* // select subject */}
                  <select
                  value={problems.subject}
                  onChange={(e) =>
                    handleProblemChange(idx, "subject", e.target.value)
                  }
                  className="form-input">
                    <option value="Select">Select</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Fundamental">Fundamental</option>
                    <option value=" Reasoning">Reasoning</option>
                    <option value="Verbal">Verbal</option>
                    <option value="Coding">Coding</option>
                    <option value=" Writing">Writing</option>
                    <option value="Listening">Listening</option>
                  </select>
                  <label className="text-sm font-medium text-gray-700">
                    Problem Statement
                  </label>
                  <textarea
                    className="form-input w-full min-h-[100px] rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter problem statement"
                    value={problems[idx].problemStatement || ""}
                    onChange={(e) =>
                      handleProblemChange(
                        idx,
                        "problemStatement",
                        e.target.value
                      )
                    }
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => removeProblem(idx)}
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
                      value={problems[idx].options || ""}
                      onChange={(e) =>
                        handleProblemChange(idx, "options", e.target.value)
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
                      value={problems[idx].correctOption || ""}
                      onChange={(e) =>
                        handleProblemChange(idx, "correctOption", e.target.value)
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
                      value={problems[idx].allocatedMark || 0}
                      onChange={(e) =>
                        handleProblemChange(
                          idx,
                          "allocatedMark",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Add Another Problem Button */}
            <div className="flex justify-end mb-10">
              <button
                type="button"
                onClick={addAnotherProblem}
                className="px-4 py-2 text-sm font-medium text-white bg-neutral-600 hover:bg-neutral-800 rounded-lg shadow"
              >
                + Add Another Problem
              </button>
            </div>
          </form>
        ))}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
          <button onClick={() => setShowPage("0")} className="btn-outline">
            Cancel
          </button>
          <button className="btn-primary" onClick={handleAddProblems}>
            Create Problems
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProblems;
