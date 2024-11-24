import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import JobConverter from "../../constants/JobConverter";

import {
  BriefcaseIcon,
  MapPinIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const OrganisationJobCard = ({ job, user }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="flex justify-between items-start">
        <div>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                {job.title}
              </h3>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm">
                  Posted on {JobConverter.formatDate(job.timestamp)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPinIcon className="h-5 w-5" />
              <span>{job.organisation.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span>{job.description}</span>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <ChartBarIcon className="h-5 w-5" />
                  <span>{JobConverter.toHumanJobLevel(job.level)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BuildingLibraryIcon className="h-5 w-5" />
                  <span>{JobConverter.toHumanJobType(job.job_type)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BriefcaseIcon className="h-5 w-5" />
                  <span>{JobConverter.toHumanIndustry(job.industry)}</span>
                </div>
              </div>
              <div className="ml-auto">
                <Link to={`/view-job/${job.id}`} state={{ user }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    View Job Details
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ApplicantsModal = ({ isOpen, onClose, job }) => (
  <AnimatePresence>
    {isOpen && job && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-white rounded-xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {job.title}
                </h2>
                <p className="text-gray-600">Applicants ({job.applicants})</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {[...Array(job.applicants)].map((_, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Applicant {index + 1}
                      </h3>
                      <p className="text-gray-600">example@email.com</p>
                    </div>
                    <Link
                      to={`/organisation/candidates`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export { OrganisationJobCard, ApplicantsModal };
