import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  locations,
  categories,
  employmentTypes,
  experienceLevels,
} from "../../data/jobsData";
import JobCard from "./JobCard";
import FilterSection from "../../components/FilterSection";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const JobSeeker = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch applicable jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/applicable_jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data.applicable_jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Update search query from URL params
  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  // Filter jobs based on search and selected filters
  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.organisation.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation =
        !selectedLocation || job.organisation.location === selectedLocation;
      const matchesCategory =
        !selectedCategory || job.industry === selectedCategory;
      const matchesType = !selectedType || job.job_type === selectedType;
      const matchesLevel = !selectedLevel || job.level === selectedLevel;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesType &&
        matchesLevel
      );
    });

    setFilteredJobs(filtered);
  }, [
    searchQuery,
    selectedLocation,
    selectedCategory,
    selectedType,
    selectedLevel,
    jobs,
  ]);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Search Section */}
      <div className="bg-primary-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job Title or Keyword"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-white/20 focus:border-white focus:ring-4 focus:ring-white/20 transition-all outline-none bg-white/10 text-white placeholder-white/60"
                />
                <MagnifyingGlassIcon
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/60"
                  onClick={handleSearch}
                />
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="py-4 px-4 rounded-xl border-2 border-white/20 bg-white/10 text-white outline-none focus:border-white"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option
                    key={location}
                    value={location}
                    className="text-gray-900"
                  >
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <FilterSection
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              employmentTypes={employmentTypes}
              experienceLevels={experienceLevels}
            />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredJobs.length} Jobs Found
              </h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-900 outline-none focus:border-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <AnimatePresence mode="wait">
              <motion.div layout className="space-y-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    user={user}
                    onClick={() => handleJobClick(job)}
                  />
                ))}
                {filteredJobs.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-gray-500"
                  >
                    No jobs found matching your criteria.
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeeker;
