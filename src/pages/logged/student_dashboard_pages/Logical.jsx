import React from 'react'
import TestFormate from './TestFormate';

const Logical = () => {
  const logicalReasoningTopics = [
  {
    topic: "Analytical Reasoning",
    sections: [
      "Seating Arrangement",
      "Blood Relations",
      "Direction Sense",
      "Puzzles",
      "Order & Ranking",
      "Syllogism"
    ]
  },
  {
    topic: "Pattern Recognition",
    sections: [
      "Number Series",
      "Alphabet Series",
      "Figure Series",
      "Odd One Out",
      "Coding-Decoding",
      "Analogies"
    ]
  },
  {
    topic: "Logical Deductions",
    sections: [
      "Statement & Conclusion",
      "Statement & Assumption",
      "Cause & Effect",
      "Course of Action",
      "Assertion & Reason"
    ]
  }
];

  return (
      <div>
      <div id="aptitude" className="text-primary-600 text-2xl text-center underline">
        Quantative Aptitude section
      </div>
      <TestFormate Topics={logicalReasoningTopics}/>
    </div>
  )
}

export default Logical