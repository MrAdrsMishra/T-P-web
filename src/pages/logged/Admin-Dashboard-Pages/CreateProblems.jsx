import React, { useEffect, useState } from "react";
import useAdminTestStore from "../../../store/test-management/admin_test_store";
import { useAnalyticsStore } from "@/store/analytics-store/useAnalyticsStore";
import { SUCCESS_MESSAGES } from "../../../constant";

const CreateProblems = ({ setShowPage }) => {
  const { flatMetrics, fetchMetricTree } = useAnalyticsStore();

  useEffect(() => {
    fetchMetricTree();
  }, [fetchMetricTree]);

  const [problems, setProblems] = useState([{
    metricId: "",
    tags: "",
    problemStatement: "",
    options: "",
    correctOption: "",
    allocatedMark: 1,
  }]);
  const createProblemSet = useAdminTestStore((state) => state.createProblemSet);

  const addAnotherProblem = () => {
    const updatedProblems = [...problems];
    updatedProblems.push({
      metricId: "",
      tags: "",
      problemStatement: "",
      options: "",
      correctOption: "",
      allocatedMark: 1,
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
    const formattedProblems = problems.map(p => {
      const selectedMetric = flatMetrics.find(m => String(m._id) === String(p.metricId));
      return {
        ...p,
        metrics: selectedMetric ? [{ metricId: selectedMetric._id, weight: 1.0 }] : [],
        metricAncestors: selectedMetric ? [selectedMetric._id, ...(selectedMetric.ancestors || [])] : [],
        tags: p.tags ? p.tags.split(",").map(t => t.trim().toLowerCase()) : [],
      };
    });
    console.log("Problems added:", formattedProblems); 
    const response = await createProblemSet(formattedProblems);
    if(response?.status === 200){
      alert(SUCCESS_MESSAGES.PROBLEMS_CREATED);
      setShowPage("0");
    }
  };
  return (
    <div className="w-full flex">
      <div className="bg-inherit w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-text-primary">
            Create Problems (Bound to Dynamic Metrics)
          </h2>
        </div>
        {/* */}
        {problems.map((problem, idx) => (
          <form key={idx} className="space-y-2 p-4 mb-6 border border-gray-300 rounded-2xl shadow-sm bg-white">
            {/* Problems Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  {/* Select Metric */}
                  <label className="text-sm font-medium text-gray-700">Target Metric Node</label>
                  <select
                    value={problems[idx].metricId}
                    onChange={(e) =>
                      handleProblemChange(idx, "metricId", e.target.value)
                    }
                    className="form-input"
                  >
                    <option value="">Select Metric / Topic / Skill</option>
                    {flatMetrics.map((metric) => (
                      <option key={metric._id} value={metric._id}>
                        {metric.type} — {metric.name} ({metric.slug})
                      </option>
                    ))}
                  </select>

                  <label className="text-sm font-medium text-gray-700">Diagnostic Micro-Tags</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. prepositions-of-time, conditionals"
                    value={problems[idx].tags || ""}
                    onChange={(e) => handleProblemChange(idx, "tags", e.target.value)}
                  />
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
