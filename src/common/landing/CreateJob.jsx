import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import JobConverter from "../../constants/JobConverter";

import {
  industries,
  employmentTypes,
  experienceLevels,
} from "../../constants/JobData";
import GlobalVariables from "../../constants/GlobalVariables";

const CreateJob = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    employmentType: "",
    industry: "",
    experienceLevel: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    benefits: [""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInput = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      title: formData.title,
      description: formData.description,
      industry: JobConverter.toDbIndustry(formData.industry),
      level: JobConverter.toDbJobLevel(formData.experienceLevel),
      job_type: JobConverter.toDbJobType(formData.employmentType),
      job_benefits: formData.benefits,
      job_requirements: formData.requirements,
      job_responsibilities: formData.responsibilities,
    };

    // Call backend API to create a job
    fetch(`${GlobalVariables.uri}/create_job/${user.organisation.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Job createed successfully!") {
          toast.success("Job created successfully!");
          navigate("/dashboard");
        } else {
          toast.error(data.error || "Failed to create job");
        }
      })
      .catch((error) => {
        toast.error(`An error occurred while creating the job: ${error}`);
      });
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="h-20 bg-white flex items-center px-4 py-2">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-700 hover:text-blue-500"
              >
                <ArrowLeftCircleIcon className="h-10 w-10 mr-2" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 ml-4">
                Create a New Job
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={(event) => handleInputChange(event)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select Type</option>
                  {employmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={(event) => handleInputChange(event)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={(event) => handleInputChange(event)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select Level</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            {/* Dynamic Fields */}
            {["responsibilities", "requirements", "benefits"].map((field) => {
              const singularField =
                field === "responsibilities"
                  ? "responsibility"
                  : field.slice(0, -1);
              return (
                <div key={field} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {field}
                    </label>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addArrayField(field)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      + Add {singularField}
                    </motion.button>
                  </div>
                  {formData[field].map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayInput(index, field, e.target.value)
                        }
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder={`Enter ${singularField}`}
                        required
                      />
                      {formData[field].length > 1 && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeArrayField(field, index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          &times;
                        </motion.button>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-primary-500 text-white hover:bg-primary-600"
              >
                Create Job
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateJob;
