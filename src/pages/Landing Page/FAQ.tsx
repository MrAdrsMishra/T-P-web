import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How do colleges set up custom tests on the platform?",
      answer: "Colleges can easily create custom tests through our intuitive test builder. You can choose from various question types (coding, MCQs, subjective), set time limits, and customize scoring criteria. The platform supports test templates for quick setup and reuse."
    },
    {
      question: "What types of analytics are available for tracking student performance?",
      answer: "Our platform provides comprehensive analytics including performance trends over time, subject-wise analysis, strength/weakness identification, comparative batch statistics, and detailed individual student reports. All data can be exported in various formats for further analysis."
    },
    {
      question: "Can students practice on their own, or do tests need to be assigned?",
      answer: "Both options are available. Colleges can assign specific tests to batches or individual students, and students can also access a practice section with various self-paced tests and exercises to improve their skills independently."
    },
    {
      question: "How does the coding assessment work?",
      answer: "Our coding assessment module supports multiple programming languages and automatically evaluates solutions against test cases. It checks for correctness, efficiency, and code quality. Colleges can create custom problem statements and define their own test cases."
    },
    {
      question: "Is there a limit to the number of students or tests?",
      answer: "Different subscription plans offer varying limits. Our basic plan supports up to 500 students and 50 tests per month, while premium plans offer unlimited testing capabilities and advanced features like custom integrations and priority support."
    },
    {
      question: "Can we integrate this with our existing college management system?",
      answer: "Yes, T&P offers API integration capabilities that allow seamless connection with existing college management systems, making it easy to sync student data, schedules, and test results without manual intervention."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section bg-white">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Find answers to common questions about the T&P platform
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-6 border-b border-gray-200 pb-6 last:border-0 last:pb-0"
            >
              <button
                className="flex justify-between items-center w-full text-left font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg">{faq.question}</span>
                {activeIndex === index ? 
                  <ChevronUp size={20} /> : 
                  <ChevronDown size={20} />
                }
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-700 mt-4">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center bg-gray-50 p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
          <p className="mb-6 text-gray-700">Our team is ready to help you with any additional questions you may have.</p>
          <a href="#" className="btn-primary">
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;