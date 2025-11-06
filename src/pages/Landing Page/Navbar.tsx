import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, GraduationCap } from 'lucide-react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <GraduationCap size={32} className="text-primary-600" />
            <span className="text-2xl font-bold text-primary-900">T&P</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary-600 font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-primary-600 font-medium">
              How It Works
            </a>
            <a href="#analytics" className="text-gray-700 hover:text-primary-600 font-medium">
              Analytics
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary-600 font-medium">
              Testimonials
            </a>
            <a href="#faq" className="text-gray-700 hover:text-primary-600 font-medium">
              FAQ
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Login
            </NavLink>
            <NavLink to="/register" className="btn-primary">
              Get Started
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4 px-4">
              <a
                href="#features"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#analytics"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Analytics
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </a>
              <div className="flex flex-col space-y-3 pt-4 border-t">
                <a
                  href=""
                  className="text-primary-600 hover:text-primary-700 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </a>
                <a
                  href=""
                  className="btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Navbar;