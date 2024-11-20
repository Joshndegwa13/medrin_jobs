import React, { createContext, useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import { jobs } from '../services/api';

const JobContext = createContext(null);

export const JobProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({});

  // Fetch jobs with filters
  const { data: jobsData = [], isLoading } = useQuery(
    ['jobs', filters],
    () => jobs.getAll(filters),
    {
      select: (response) => response?.data ?? [],
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to fetch jobs');
      },
      initialData: []
    }
  );

  // Create job mutation
  const createJobMutation = useMutation(
    (jobData) => jobs.create(jobData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobs');
        toast.success('Job posted successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to post job');
      },
    }
  );

  // Apply to job mutation
  const applyToJobMutation = useMutation(
    ({ jobId, application }) => jobs.apply(jobId, application),
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
    jobs: jobsData,
    isLoading,
    filters,
    setFilters,
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