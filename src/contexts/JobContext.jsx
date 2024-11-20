import React, { createContext, useContext, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { jobs as jobsApi } from '../services/api';
import { jobsData } from '../data/jobsData';

const JobContext = createContext(null);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(jobsData); // Using mock data initially

  // This will be replaced with actual API call when backend is ready
  const { isLoading } = useQuery(
    'jobs',
    () => jobsApi.getAll(),
    {
      enabled: false, // Disable auto-fetching for now
      onSuccess: (data) => {
        setJobs(data);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to fetch jobs');
      }
    }
  );

  // Create job mutation
  const createJobMutation = useMutation(
    (jobData) => jobsApi.create(jobData),
    {
      onSuccess: () => {
        toast.success('Job posted successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to post job');
      },
    }
  );

  // Apply to job mutation
  const applyToJobMutation = useMutation(
    ({ jobId, application }) => jobsApi.apply(jobId, application),
    {
      onSuccess: () => {
        toast.success('Application submitted successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to submit application');
      },
    }
  );

  const value = {
    jobs,
    isLoading,
    createJob: createJobMutation.mutate,
    applyToJob: applyToJobMutation.mutate,
    isCreating: createJobMutation.isLoading,
    isApplying: applyToJobMutation.isLoading,
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};