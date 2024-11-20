import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showEmployerDropdown, setShowEmployerDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    setShowEmployerDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowEmployerDropdown(false);
  };

  const handleLogout = () => {

    localStorage.removeItem('userToken'); 
  
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.span
              className="text-2xl sm:text-3xl font-bold text-primary-600 hover:text-primary-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Medrin Jobs
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/find-jobs"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Find Jobs
            </Link>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <span>For Employers</span>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-200 ${
                    showEmployerDropdown ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {showEmployerDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                  >
                    <div className="py-1">
                      <Link
                        to="/employer"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/employer/post-job"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 transition-colors"
                      >
                        Post a Job
                      </Link>
                      <Link
                        to="/employer/candidates"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 transition-colors"
                      >
                        Manage Candidates
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Log In, Sign Up, and Logout Buttons */}
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors px-4 py-2"
                >
                  Log in
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-6 py-2.5 rounded-full hover:bg-primary-700 transition-colors font-medium shadow-lg hover:shadow-primary-500/25"
                >
                  Sign up
                </Link>
              </motion.div>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-primary-600"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/find-jobs"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find Jobs
                </Link>
                <div className="space-y-1 pl-4 border-l-2 border-primary-100">
                  <Link
                    to="/employer"
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Employer Dashboard
                  </Link>
                  <Link
                    to="/employer/post-job"
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Post a Job
                  </Link>
                </div>
                <div className="mt-4 space-y-2 p-2">
                  <Link
                    to="/login"
                    className="block w-full px-3 py-2 rounded-md text-center font-medium text-primary-600 hover:bg-primary-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full px-3 py-2 rounded-md text-center font-medium text-white bg-primary-600 hover:bg-primary-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full px-3 py-2 rounded-md text-center font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
