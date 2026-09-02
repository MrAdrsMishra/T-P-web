 import React from 'react'
import TestFormate from './TestFormate';
 
 const Verbal = () => {
  const verbalReasoningTopics = [
  {
    topic: "English Grammar & Usage",
    sections: [
      "Parts of Speech",
      "Tenses and Voices",
      "Subject-Verb Agreement",
      "Articles and Prepositions",
      "Modifiers",
      "Direct and Indirect Speech"
    ]
  },
  {
    topic: "Comprehension",
    sections: [
      "Reading Comprehension",
      "Passage-Based Questions",
      "Theme and Tone Detection",
      "Inference and Fact-based Questions"
    ]
  },
  {
    topic: "Vocabulary",
    sections: [
      "Synonyms and Antonyms",
      "Word Usage",
      "Idioms and Phrases",
      "One Word Substitution",
      "Homonyms and Homophones"
    ]
  },
  {
    topic: "Critical Reasoning",
    sections: [
      "Argument Evaluation",
      "Assumptions and Conclusions",
      "Strengthening/Weakening Arguments",
      "Logical Flow"
    ]
  }
];

   return (
    <div>
      <div id="aptitude" className="text-primary-600 text-2xl text-center underline">
        Quantative Aptitude section
      </div>
      <TestFormate Topics={verbalReasoningTopics}/>
    </div>
   )
 }
 
 export default Verbal