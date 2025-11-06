import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, BarChart, LineChart, TrendingUp } from 'lucide-react';

const Analytics: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="analytics" className="section bg-gradient-to-br from-primary-900 to-primary-800 text-white">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Analytics Dashboard
          </h2>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto">
            Track student performance with detailed metrics and visualizations
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            className="lg:col-span-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4">Performance Overview</h3>
            <div className="bg-gradient-to-br from-primary-950/20 to-primary-800/20 rounded-xl p-6 h-72 flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* This would be a real chart in production */}
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                  <motion.div 
                    className="w-1/6 bg-primary-300 rounded-t-md mx-1"
                    initial={{ height: 0 }}
                    whileInView={{ height: '40%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  ></motion.div>
                  <motion.div 
                    className="w-1/6 bg-primary-300 rounded-t-md mx-1"
                    initial={{ height: 0 }}
                    whileInView={{ height: '65%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  ></motion.div>
                  <motion.div 
                    className="w-1/6 bg-primary-300 rounded-t-md mx-1"
                    initial={{ height: 0 }}
                    whileInView={{ height: '50%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  ></motion.div>
                  <motion.div 
                    className="w-1/6 bg-primary-300 rounded-t-md mx-1"
                    initial={{ height: 0 }}
                    whileInView={{ height: '70%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  ></motion.div>
                  <motion.div 
                    className="w-1/6 bg-primary-300 rounded-t-md mx-1"
                    initial={{ height: 0 }}
                    whileInView={{ height: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  ></motion.div>
                  <motion.div 
                    className="w-1/6 bg-primary-300 rounded-t-md mx-1"
                    initial={{ height: 0 }}
                    whileInView={{ height: '60%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  ></motion.div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/70 text-sm">
                  Student Performance Graph
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-4 grid grid-rows-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Subject Distribution</h3>
              <div className="bg-gradient-to-br from-primary-950/20 to-primary-800/20 rounded-xl p-4 h-36 flex items-center justify-center">
                <PieChart size={80} className="text-primary-200" />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Improvement Trend</h3>
              <div className="bg-gradient-to-br from-primary-950/20 to-primary-800/20 rounded-xl p-4 h-36 flex items-center justify-center">
                <TrendingUp size={80} className="text-accent-400" />
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Coding Performance</h4>
              <BarChart size={24} className="text-primary-200" />
            </div>
            <p className="text-primary-100 mb-3">Track progress in coding challenges</p>
            <div className="h-2 bg-primary-950/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent-500"
                initial={{ width: 0 }}
                whileInView={{ width: '78%' }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              ></motion.div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Progress</span>
              <span>78%</span>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Aptitude Skills</h4>
              <LineChart size={24} className="text-primary-200" />
            </div>
            <p className="text-primary-100 mb-3">Monitor aptitude test performance</p>
            <div className="h-2 bg-primary-950/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-secondary-500"
                initial={{ width: 0 }}
                whileInView={{ width: '65%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              ></motion.div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Progress</span>
              <span>65%</span>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Verbal Reasoning</h4>
              <BarChart size={24} className="text-primary-200" />
            </div>
            <p className="text-primary-100 mb-3">Assess verbal reasoning capabilities</p>
            <div className="h-2 bg-primary-950/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary-400"
                initial={{ width: 0 }}
                whileInView={{ width: '82%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              ></motion.div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Progress</span>
              <span>82%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Analytics;