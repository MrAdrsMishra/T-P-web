import React from "react";
import { BATCH_OPTIONS, BRANCH_OPTIONS } from "../constants";

const FilterControls = ({
  batch,
  setBatch,
  branch,
  setBranch,
  onApply,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border border-slate-200 ${className}`}>
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Filters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Batch
          </label>
          <select
            name="batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="">Select Batch</option>
            {BATCH_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Branch
          </label>
          <select
            name="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="">Select Branch</option>
            {BRANCH_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {onApply && (
          <div className="sm:col-span-2 lg:col-span-1 flex items-end">
            <button
              onClick={onApply}
              className="w-full px-6 py-2 bg-sky-400 hover:bg-sky-500 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterControls;
