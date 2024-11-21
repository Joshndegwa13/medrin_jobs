import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  DocumentPlusIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CalendarIcon,
  MapPinIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const JobCard = ({ job, onViewApplicants, onDeleteJob }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPinIcon className="h-5 w-5" />
            <span>{job.organisation.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span>{job.description}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span>{formatText(job.level)}</span> {/* Format the level */}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span>{formatText(job.job_type)}</span> {/* Format the job_type */}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <BriefcaseIcon className="h-5 w-5" />
            <span>{formatText(job.industry)}</span> {/* Format the industry */}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarIcon className="h-5 w-5" />
            <span>Posted: {new Date(job.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Buttons at the bottom */}
    <div className="mt-4 flex justify-between items-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewApplicants(job)}
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        View Applicants
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onDeleteJob(job.id)}
        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Delete Job
      </motion.button>
    </div>
  </motion.div>
);

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

const Organisation = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch jobs from the API
  useEffect(() => {
    fetch(`http://127.0.0.1:5555/get_jobs/${user.organisation.id}`)
      .then((response) => response.json())
      .then((data) => setJobs(data || []))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleDeleteJob = (jobId) => {
    // Find the index of the job to be deleted
    const jobIndex = jobs.findIndex((job) => job.id === jobId);
    if (jobIndex !== -1) {
      // Create a copy of the jobs array and remove the job by popping
      const updatedJobs = [...jobs];
      updatedJobs.splice(jobIndex, 1); // Remove the job at the found index
      setJobs(updatedJobs);
      console.log(`Job with id ${jobId} has been deleted.`);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Organisation Dashboard
          </h1>
          <Link to="/organisation/post-job">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 shadow-lg flex items-center gap-2"
            >
              <DocumentPlusIcon className="h-5 w-5" />
              Post New Job
            </motion.button>
          </Link>
        </div>

        <div className="space-y-6">
          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewApplicants={handleViewApplicants}
                onDeleteJob={handleDeleteJob}
              />
            ))
          )}
        </div>
      </div>

      <ApplicantsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        job={selectedJob}
      />
    </div>
  );
};

export default Organisation;
