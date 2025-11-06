import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, School, User } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="section bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Placement Process?
          </h2>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto">
            Join hundreds of engineering colleges and thousands of students already benefiting from T&P
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
              <School size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">For Institutions</h3>
            <p className="mb-6 text-primary-100">
              Streamline your placement preparation process and improve student outcomes with customizable tests and comprehensive analytics.
            </p>
            <a href="#" className="btn bg-white text-primary-700 hover:bg-primary-50 inline-flex items-center">
              Register Your Institution <ChevronRight size={18} className="ml-1" />
            </a>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
              <User size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">For Students</h3>
            <p className="mb-6 text-primary-100">
              Practice with placement-oriented tests, track your progress, and identify areas for improvement to increase your chances of success.
            </p>
            <a href="#" className="btn bg-white text-primary-700 hover:bg-primary-50 inline-flex items-center">
              Join as a Student <ChevronRight size={18} className="ml-1" />
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg mb-6">
            Want to see T&P in action? Schedule a demo with our team.
          </p>
          <a href="#" className="btn-accent">
            Request a Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;