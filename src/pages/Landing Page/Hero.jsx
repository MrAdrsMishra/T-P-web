import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Brain, LineChart } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-primary-50 to-white">
      <div className="container-custom">
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:w-1/2">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Elevate Your <span className="text-primary-600">Placement</span> Preparation
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Empower engineering colleges to conduct customized placement tests with advanced analytics. 
              Help students track progress and excel in the placement process.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <a href="/register" className="btn-primary">
                For Institutions <ArrowRight size={20} className="ml-2" />
              </a>
              <a href="/login" className="btn-outline">
                For Students <ArrowRight size={20} className="ml-2" />
              </a>
            </motion.div>
          </div>

          <motion.div 
            className="lg:w-1/2"
            variants={itemVariants}
          >
            <div className="relative bg-white p-6 rounded-2xl shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-primary-50 p-6 rounded-xl flex flex-col items-center text-center"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <Code className="text-primary-600 mb-4" size={40} />
                  <h3 className="text-lg font-semibold mb-2">Coding Tests</h3>
                  <p className="text-sm text-gray-600">Custom challenges with auto-evaluation</p>
                </motion.div>
                
                <motion.div 
                  className="bg-secondary-50 p-6 rounded-xl flex flex-col items-center text-center"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <Brain className="text-secondary-600 mb-4" size={40} />
                  <h3 className="text-lg font-semibold mb-2">Aptitude Tests</h3>
                  <p className="text-sm text-gray-600">Verbal, quantitative, and reasoning</p>
                </motion.div>
                
                <motion.div 
                  className="bg-accent-50 p-6 rounded-xl flex flex-col items-center text-center"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <LineChart className="text-accent-600 mb-4" size={40} />
                  <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                  <p className="text-sm text-gray-600">Detailed insights and progress tracking</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;