import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

const data = [
  { month: "jan", college: 10, batch: 20, branch: 32 },
  { month: "feb", college: 78, batch: 34, branch: 73 },
  { month: "mar", college: 83, batch: 62, branch: 77 },
  { month: "apr", college: 88, batch: 91, branch: 82 },
  { month: "may", college: 90, batch: 55, branch: 86 },
];

const RankingTrendGraph = () => {
  return (
    <div className=" w-full bg-white p-2 rounded-xl shadow">
      <h2 className="text-center text-lg font-sans font-normal text-black ">
        Percentile Trend (College vs Batch vs Branch)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ right: 30 }}>
          <CartesianGrid  strokeDasharray="5 3" horizontal={true} vertical={true} />
          {/* XAxis hidden */}
          <XAxis dataKey="month" />
          <YAxis domain={[10, 100]} tickFormatter={(tick) => `${tick}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="line"
            iconSize={16}
          />
          <Line type="linear" dataKey="college" name="College" stroke="#3b82f6" strokeWidth={2} />
          <Line type="linear" dataKey="batch" name="Batch" stroke="#10b981" strokeWidth={2} />
          <Line type="linear" dataKey="branch" name="Branch" stroke="#f59e0b" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RankingTrendGraph;
