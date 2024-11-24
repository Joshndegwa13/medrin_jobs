import {
  ArrowLeftCircleIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  BuildingLibraryIcon,
  BriefcaseIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import GlobalVariables from "../constants/GlobalVariables";
import { motion } from "framer-motion";
import JobConverter from "../constants/JobConverter";
import JobDetailsList from "./JobDetailsList";

export default function ViewJob({}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useLocation().state?.user;

  const [applicantData, setApplicantData] = useState([]);
  const [applicantCount, setApplicantCount] = useState(0);
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(
          `${GlobalVariables.uri}/view_job_applicants/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch applicants");
        }
        const data = await response.json();
        setApplicantData(data.applicants);
        setApplicantCount(data.amount);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchApplicants();
  }, [id]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${GlobalVariables.uri}/view_job/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job data");
        }
        const data = await response.json();
        setJob(data.job);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJob();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="relative w-4/6 bg-white shadow-md p-8 rounded-lg">
        <div className="absolute top-0 left-0 w-full h-20 bg-white shadow-md flex items-center px-4 py-2 z-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 hover:text-blue-500"
          >
            <ArrowLeftCircleIcon className="h-10 w-10 mr-2" />
          </button>
          {user?.role === "organisation" && (
            <>
              <p className="text-l">
                <span>{applicantCount} applicants have applied</span> ·{" "}
                <button>
                  <span className="text-blue-500 underline cursor-pointer">
                    View Applicants
                  </span>
                </button>
              </p>
              <div className="ml-auto flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Update Job Data
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete Job
                </motion.button>
              </div>
            </>
          )}
        </div>
        {/* Job Details Content */}
        {job ? (
          <div className="mb-6">
            <div style={{ display: "inline-block", marginRight: "16px" }}>
              {job.organisation.logo ? (
                <img
                  src={job.organisation.logo}
                  alt="Organisation Logo"
                  className="h-24 w-24"
                />
              ) : (
                <BuildingOffice2Icon className="h-8 w-8" />
              )}
            </div>
            <div style={{ display: "inline-block" }}>
              <h1 className="text-3xl mt-8 font-bold pt-12 mb-1">
                {job.title}
              </h1>
              <h3 className="text-l font-bold mb-2 text-gray-700">
                By {job.organisation.name}
              </h3>
              <p className="text-sm text-gray-700">
                Posted on {JobConverter.formatDate(job.timestamp)}
              </p>
            </div>
          </div>
        ) : (
          <p>"Loading..."</p>
        )}

        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          job && (
            <div className="mb-6">
              <p className="text-gray-700">{job.description}</p>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPinIcon className="h-5 w-5" />
                    <span>{job.organisation.location}</span>
                  </div>
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
              </div>
            </div>
          )
        )}

        <JobDetailsList
          title="Job Responsibilities"
          data={job?.job_responsibilities}
          dataKey="responsibilities"
        />

        <JobDetailsList
          title="Job Benefits"
          data={job?.job_benefits}
          dataKey="benefits"
        />

        <JobDetailsList
          title="Job Requirements"
          data={job?.job_requirements}
          dataKey="requirements"
        />
      </div>
    </div>
  );
}
