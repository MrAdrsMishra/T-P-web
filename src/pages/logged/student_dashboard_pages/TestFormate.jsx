import React from "react";
import { Brain } from "lucide-react"; // Make sure Brain is imported

const TestFormate = ({Topics}) => {
    console.log(Topics)
 const handleSectionOpening=()=>{

 }  
  return (
    <div className="min-h-screen py-6 bg-white ">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Topics.map((val, index) => (
          <div
            key={index}
            className="w-64 h-44 bg-white border border-primary-300 rounded-lg shadow-sm p-5 flex-shrink-0 flex flex-col justify-between"
          >
            {/* Top: Topic Name */}
            <div className="flex items-center text-sky-500 text-md font-normal">
              <Brain size={14} className="mr-2 text-primary-500" />
              {val.topic}
            </div>

            {/* Middle: Section List */}
            <div className="mt-2 overflow-hidden text-sm text-primary-600">
              <ul className="list-disc list-inside underline">
                {val.sections.map((sec, idx) => (
                  <li 
                  onClick={handleSectionOpening}
                  key={idx} className="truncate"><a href="">{sec}</a></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestFormate;
