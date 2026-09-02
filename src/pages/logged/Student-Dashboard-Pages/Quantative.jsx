import React from "react";
import TestFormate from "./TestFormate";

const Quantative = () => {
  const aptitudeTopics = [
  {
    topic: "Percentage",
    sections: [
      "Type 1: Discount on Prices",
      "Type 2: Percentage as Ratio",
      "Type 3: Change in Error",
      "Type 4: Successive Percentage Change",
      "Type 5: Population Increase/Decrease"
    ]
  },
  {
    topic: "Profit and Loss",
    sections: [
      "Type 1: Basic CP, SP, and Profit % Problems",
      "Type 2: Successive Profit and Loss",
      "Type 3: Marked Price and Discounts",
      "Type 4: Dishonest Shopkeeper Cases"
    ]
  },
  {
    topic: "Time and Work",
    sections: [
      "Type 1: Work and Wages",
      "Type 2: Pipes and Cisterns",
      "Type 3: Efficiency Ratio Method",
      "Type 4: Alternative Days Work"
    ]
  },
  {
    topic: "Speed, Time and Distance",
    sections: [
      "Type 1: Relative Speed",
      "Type 2: Trains",
      "Type 3: Boats and Streams",
      "Type 4: Average Speed",
      "Type 5: Circular Track and Chasing"
    ]
  },
  {
    topic: "Ratio and Proportion",
    sections: [
      "Type 1: Basic Ratio Problems",
      "Type 2: Mixture and Alligation",
      "Type 3: Inverse Proportion",
      "Type 4: Age-Based Ratio Questions"
    ]
  },
  {
    topic: "Simple and Compound Interest",
    sections: [
      "Type 1: Simple Interest Basics",
      "Type 2: Compound Interest Basics",
      "Type 3: Difference Between CI and SI",
      "Type 4: CI with Varying Rates"
    ]
  }
];

  return (
    <div>
      <div id="aptitude" className="text-primary-600 text-2xl text-center underline">
        Quantative Aptitude section
      </div>
      <TestFormate Topics={aptitudeTopics}/>
    </div>
  );
};

export default Quantative;
