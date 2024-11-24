import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const DetailSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <ul className="list-disc list-inside space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700 leading-relaxed pl-2">
            <span className="pl-2">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const JobModal = ({ isOpen, onClose, job }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  if (!job) return null;

  const handleApply = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 overflow-hidden"
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                </button>

                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center py-12"
                    >
                      <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Application Successful!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for applying to {job.title}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 max-h-[70vh] overflow-y-auto pr-2"
                    >
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {job.title}
                        </h2>
                        <p className="text-xl text-primary-600">
                          {job.company}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Location</p>
                          <p className="font-medium text-gray-900">
                            {job.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Employment Type
                          </p>
                          <p className="font-medium text-gray-900">
                            {job.employmentType}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Experience Level
                          </p>
                          <p className="font-medium text-gray-900">
                            {job.experienceLevel}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Salary Range
                          </p>
                          <p className="font-medium text-gray-900">
                            {job.salary}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Job Description
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                      <DetailSection
                        title="Key Responsibilities"
                        items={job.responsibilities}
                      />

                      <DetailSection
                        title="Qualifications"
                        items={job.qualifications}
                      />

                      <DetailSection title="Benefits" items={job.benefits} />

                      <div className="flex justify-end gap-4 pt-4">
                        <motion.button
                          onClick={onClose}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          onClick={handleApply}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/25"
                        >
                          Apply Now
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JobModal;
