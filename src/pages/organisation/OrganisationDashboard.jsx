import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { OrganisationJobCard, ApplicantsModal } from "./OrganisationJobCard";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import GlobalVariables from "../../constants/GlobalVariables";

const Organisation = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch jobs from the API
  useEffect(() => {
    fetch(`${GlobalVariables.uri}/get_jobs/${user.organisation.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setJobs(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error(error);
        setJobs([]);
      });
  }, [user.organisation.id]);

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleDeleteJob = (jobId) => {
    const jobIndex = jobs.findIndex((job) => job.id === jobId);
    if (jobIndex !== -1) {
      const updatedJobs = [...jobs];
      updatedJobs.splice(jobIndex, 1);
      setJobs(updatedJobs);
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
          <Link to="/organisation/post-job" state={{ user }}>
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
              <OrganisationJobCard
                key={job.id}
                job={job}
                user={user}
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
