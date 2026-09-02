import React from "react";
import { Brain } from "lucide-react";

const Reccomondation = () => {
  const recommendationItems1 = [
    {
      strongLine: "Strengthen with React",
      description:
        "Solve real-world problems involving dynamic, customizable, and logical components. Build interfaces that scale.",
    },
    {
      strongLine: "Master building with C++",
      description:
        "Sharpen your problem-solving abilities and learn how software communicates at a lower level.",
    },
    {
      strongLine: "Design using Tailwind CSS",
      description: "Create responsive and modern UIs with utility-first CSS.",
    },
    {
      strongLine: "Bring life with JavaScript",
      description:
        "Handle events, manipulate the DOM, and create engaging apps.",
    },
    {
      strongLine: "Backend APIs with Node.js",
      description: "Create RESTful APIs and work with real-time data.",
    },
    {
      strongLine: "Manage data with MongoDB",
      description: "Work with document-oriented databases that scale easily.",
    },
    {
      strongLine: "Visualize logic with DSA",
      description: "Learn trees, graphs, and arrays for interviews.",
    },
    {
      strongLine: "Secure skills Git & GitHub",
      description: "Track changes and collaborate with others.",
    },
    {
      strongLine: "Level up with Python",
      description: "Use Python for automation and AI prototyping.",
    },
    {
      strongLine: "Automate with Linux and Shell",
      description: "Control systems and automate tasks efficiently.",
    },
  ];

  return (
    <div className="overflow-hidden py-6 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <Brain className="w-5 h-5 mr-2 text-sky-500" /> Recommendations for You
      </h3>
      <div className="whitespace-break-spaces flex space-x-6 overflow-x-auto pb-2">
        {recommendationItems1.map((val, index) => (
          <div
            key={index}
            className="w-64 h-44 bg-white border border-sky-300 rounded-lg shadow-sm p-5 flex-shrink-0 flex flex-col justify-between"
          >
            {/* Top: Strong Line */}
            <div className="flex items-center justify-start text-primary-700 text-sm font-normal">
              <Brain size={16} className="mr-2 text-sky-500" />
              <p className="font-semibold text-sky-600">{val.strongLine}</p>
            </div>

            {/* Middle: Description */}
            <p className="mt-2 overflow-hidden text-sm text-gray-600 line-clamp-3">
              {val.description}
            </p>
            {/* Bottom: Button */}
            <button className="mt-4 px-4 py-1.5 border border-sky-400 text-sky-600 text-sm rounded-md hover:bg-sky-50 transition-colors">
              Take test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reccomondation;
