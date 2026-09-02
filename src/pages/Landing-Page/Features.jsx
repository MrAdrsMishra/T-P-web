import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  BarChart2, 
  Settings, 
  Clock, 
  Shield 
} from 'lucide-react';

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: .8,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const features = [
    {
      icon: <FileText size={32} className="text-primary-600" />,
      title: "Diverse Test Types",
      description: "Create custom coding, aptitude, reasoning, and verbal tests tailored to specific company requirements."
    },
    {
      icon: <Settings size={32} className="text-primary-600" />,
      title: "Flexible Configuration",
      description: "Set custom time limits, difficulty levels, and scoring criteria for each test."
    },
    {
      icon: <BarChart2 size={32} className="text-primary-600" />,
      title: "Comprehensive Analytics",
      description: "Track individual and batch performance with detailed metrics and visualizations."
    },
    {
      icon: <Users size={32} className="text-primary-600" />,
      title: "Student Management",
      description: "Organize students by batches, departments, and skill levels for targeted preparation."
    },
    {
      icon: <Clock size={32} className="text-primary-600" />,
      title: "Automated Evaluation",
      description: "Save time with instant test grading and performance analysis."
    },
    {
      icon: <Shield size={32} className="text-primary-600" />,
      title: "Secure Testing Environment",
      description: "Ensure test integrity with proctoring features and plagiarism detection."
    }
  ];

  return (
    <section id="features" className="section bg-white">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Complete Placement Preparation
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Everything engineering colleges need to create, manage, and analyze placement preparation tests
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="card p-8 border border-gray-100 hover:border-primary-200 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;