import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, ClockIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const JobCard = ({ job, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-primary-600 font-medium mb-4">{job.company}</p>
          
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5" />
              <span>{job.employmentType}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              <span>{job.experienceLevel}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-lg font-semibold text-gray-900">{job.salary}</span>
          <span className="text-sm text-gray-500 mt-2">Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm">
          {job.category}
        </span>
      </div>
    </motion.div>
  );
};

export default JobCard;