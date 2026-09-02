import React from 'react'
import TestFormate from './TestFormate';

const CoreFundamentals = () => {
  const coreCSFundamentals = [
  {
    topic: "Data Structures",
    sections: [
      "Arrays and Strings",
      "Linked Lists",
      "Stacks and Queues",
      "Trees and Binary Trees",
      "Graphs and Traversals",
      "Hashing and Hash Tables",
      "Heaps and Priority Queues"
    ]
  },
  {
    topic: "Algorithms",
    sections: [
      "Sorting Algorithms",
      "Searching Algorithms",
      "Greedy Algorithms",
      "Dynamic Programming",
      "Backtracking",
      "Divide and Conquer",
      "Graph Algorithms (DFS, BFS, Dijkstra)"
    ]
  },
  {
    topic: "Operating Systems",
    sections: [
      "Process and Threads",
      "CPU Scheduling Algorithms",
      "Deadlocks and Concurrency",
      "Memory Management (Paging, Segmentation)",
      "File Systems",
      "Process Synchronization"
    ]
  },
  {
    topic: "Computer Networks",
    sections: [
      "OSI and TCP/IP Models",
      "IP Addressing and Subnetting",
      "Routing Protocols",
      "HTTP, FTP, DNS, DHCP",
      "UDP vs TCP",
      "Network Security Basics"
    ]
  },
  {
    topic: "DBMS",
    sections: [
      "Relational Model and Keys",
      "SQL and Queries",
      "Normalization",
      "Transactions and Concurrency",
      "Indexing",
      "ER Diagrams"
    ]
  },
  {
    topic: "OOPs & Programming",
    sections: [
      "Classes and Objects",
      "Inheritance and Polymorphism",
      "Encapsulation and Abstraction",
      "Constructor and Destructor",
      "Exception Handling",
      "File I/O"
    ]
  }
];

  return (
      <div>
      <div id="aptitude" className="text-primary-600 text-2xl text-center underline">
        Quantative Aptitude section
      </div>
      <TestFormate Topics={coreCSFundamentals}/>
    </div>
  )
}

export default CoreFundamentals