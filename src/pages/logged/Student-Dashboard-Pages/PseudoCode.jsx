import React from 'react'
import TestFormate from './TestFormate';

const PseudoCode = () => {
  const pseudoCodeTopics = [
  {
    topic: "Basic Constructs",
    sections: [
      "Variables and Data Types",
      "Input and Output",
      "Conditional Statements (if-else, switch)",
      "Loops (for, while, do-while)"
    ]
  },
  {
    topic: "Functions and Modularity",
    sections: [
      "Function Declaration & Invocation",
      "Parameters and Return Values",
      "Recursion",
      "Scope of Variables"
    ]
  },
  {
    topic: "Arrays and Strings",
    sections: [
      "1D and 2D Arrays",
      "String Manipulation",
      "Array Traversal",
      "Searching and Sorting (pseudo)"
    ]
  },
  {
    topic: "Logical & Mathematical Problems",
    sections: [
      "Pattern Problems",
      "Mathematical Series",
      "Prime, Factorial, Fibonacci",
      "Number Conversion (Binary, Decimal)"
    ]
  },
  {
    topic: "Flow Control and Debugging",
    sections: [
      "Dry Run & Trace Tables",
      "Identifying Logic Errors",
      "Test Case-Based Analysis",
      "Time & Space Considerations"
    ]
  },
  {
    topic: "Problem Solving Approach",
    sections: [
      "Understanding the Problem",
      "Breaking into Subtasks",
      "Using Flowcharts or Diagrams",
      "Edge Cases & Constraints"
    ]
  }
];

  return (
     <div>
      <div id="aptitude" className="text-primary-600 text-2xl text-center underline">
        Quantative Aptitude section
      </div>
      <TestFormate Topics={pseudoCodeTopics}/>
    </div>
  )
}

export default PseudoCode