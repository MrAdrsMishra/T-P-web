import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Layers, UserCheck, ChevronRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 }
    }
  };

  const collegePath = [
    {
      icon: <ClipboardList size={32} className="text-white" />,
      title: "Create Tests",
      description: "Design custom tests with flexible question types, time limits, and scoring systems"
    },
    {
      icon: <Layers size={32} className="text-white" />,
      title: "Organize Batches",
      description: "Group students by department, year, or skill level for targeted preparation"
    },
    {
      icon: <UserCheck size={32} className="text-white" />,
      title: "Track Progress",
      description: "Analyze performance data and identify improvement areas"
    }
  ];

  const studentPath = [
    {
      icon: <ClipboardList size={32} className="text-white" />,
      title: "Practice Tests",
      description: "Take a variety of tests designed to match real placement assessments"
    },
    {
      icon: <Layers size={32} className="text-white" />,
      title: "Review Performance",
      description: "Get detailed feedback on strengths and weaknesses"
    },
    {
      icon: <UserCheck size={32} className="text-white" />,
      title: "Improve Skills",
      description: "Focus on areas needing improvement with targeted practice"
    }
  ];

  return (
    <section id="how-it-works" className="section bg-gray-50">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How T&P Works
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            A streamlined process for both institutions and students
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Institutions */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-primary-600 px-6 py-4 text-white">
              <h3 className="text-2xl font-bold">For Institutions</h3>
            </div>
            <motion.div 
              className="p-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {collegePath.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="flex mb-8 last:mb-0"
                  variants={itemVariants}
                >
                  <div className="mr-5 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center">
                      {step.icon}
                    </div>
                    {index < collegePath.length - 1 && (
                      <div className="w-0.5 h-8 bg-primary-200 ml-7 mt-2"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </motion.div>
              ))}
              <motion.div
                className="mt-8"
                variants={itemVariants}
              >
                <a href="/register" className="btn-primary inline-flex items-center">
                  Get Started for Colleges <ChevronRight size={18} className="ml-1" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* For Students */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-secondary-600 px-6 py-4 text-white">
              <h3 className="text-2xl font-bold">For Students</h3>
            </div>
            <motion.div 
              className="p-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {studentPath.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="flex mb-8 last:mb-0"
                  variants={itemVariants}
                >
                  <div className="mr-5 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-secondary-600 flex items-center justify-center">
                      {step.icon}
                    </div>
                    {index < studentPath.length - 1 && (
                      <div className="w-0.5 h-8 bg-secondary-200 ml-7 mt-2"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </motion.div>
              ))}
              <motion.div
                className="mt-8"
                variants={itemVariants}
              >
                <a href="#" className="btn-secondary inline-flex items-center">
                  learn more.. <ChevronRight size={18} className="ml-1" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;