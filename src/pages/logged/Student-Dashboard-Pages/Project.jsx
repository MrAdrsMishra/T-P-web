// import React from "react";
// import ProjectsAndSkills from "../student_dashboard_pages/ProjectsAndSkills";
// import {
//   PolarAngleAxis,
//   PolarGrid,
//   PolarRadiusAxis,
//   RadarChart,
//   Radar,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// const Project = () => {
//   const skillsRadarData = [
//     { skill: "Programming", score: 90 },
//     { skill: "Problem Solving", score: 64 },
//     { skill: "Communication", score: 78 },
//     { skill: "Teamwork", score: 34 },
//     { skill: "Leadership", score: 75 },
//     { skill: "Analytics", score: 88 },
//   ];

//   return (
//     <div>
//       <div className="flex flex-col justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//        <ResponsiveContainer width="100%" height={300}>
//           <RadarChart data={skillsRadarData}>
//             <PolarGrid />
//             <PolarAngleAxis dataKey="skill" color={`${ <50 ?"#ef4444":(color>=50 && color<=80) ?"#f59e0b":"#10b981"}`}/>
//             <PolarRadiusAxis angle={90} domain={[0, 100]} />
//             <Radar
//               name="Score"
//               dataKey="score"
//               stroke="#374151"
//               fill="#374151"
//               fillOpacity={0.1}
//               strokeWidth={2}
//             />
//             <Tooltip />
//           </RadarChart>
//         </ResponsiveContainer>

//       </div>
//     </div>
//   );
// };

// export default Project;

import React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadarChart,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const skillsRadarData = [
  { skill: "Programming", score: 90 },
  { skill: "Problem Solving", score: 64 },
  { skill: "Communication", score: 78 },
  { skill: "Teamwork", score: 34 },
  { skill: "Leadership", score: 75 },
  { skill: "Analytics", score: 88 },
];

const getColorForScore = (score) => {
  if (score < 50) return "#ef4444";
  if (score <= 80) return "#f59e0b";
  return "#10b981";
};

const CustomAngleTick = ({ payload, x, y, textAnchor }) => {
  const skill = payload.value;
  const scoreObj = skillsRadarData.find((item) => item.skill === skill);
  const color = getColorForScore(scoreObj?.score ?? 0);

  return (
    <text x={x} y={y} textAnchor={textAnchor} fill={color} fontSize={12}>
      {skill}
    </text>
  );
};

const Project = () => {
  return (
    <div className="flex flex-col justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={skillsRadarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" tick={<CustomAngleTick />} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#7F8CAA"
            fill="#077A7D"
            fillOpacity={0.1}
            strokeWidth={1}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Project;
