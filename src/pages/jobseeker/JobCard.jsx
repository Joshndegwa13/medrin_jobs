import React from "react";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  ClockIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

const formatText = (value) => {
  if (!value) return value;
  return value
    .split("_")
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("-"); // Join the words back with a hyphen
};

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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {job.title}
          </h3>
          <p className="text-primary-600 font-medium mb-4">{job.company}</p>

          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <span>{job.description}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              <span>{job.organisation.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5" />
              <span>{formatText(job.job_type)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              <span>{formatText(job.level)}</span>
            </div>
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5" />
              <span>{formatText(job.industry)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-lg font-semibold text-gray-900">
            {job.salary}
          </span>
          <span className="text-sm text-gray-500 mt-2">
            Posted: {new Date(job.timestamp).toLocaleDateString()}
          </span>

          {/* Add the Apply Job button */}
          <button
            onClick={() => handleApply(job.id)}
            className="mt-4 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700"
          >
            Apply Job
          </button>
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
