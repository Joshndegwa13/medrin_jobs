import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { z } from "zod";
import axios from "axios";

const schema = z.object({
  firstname: z.string().min(2, "First name is too short"),
  lastname: z.string().min(2, "Last name is too short"),
  phone: z.string().min(10, "Invalid phone number"),
  location: z.string().min(2, "Location is required"),
  dateOfBirth: z.string().refine((date) => new Date(date) < new Date(), {
    message: "Date of birth must be in the past",
  }),
  cv: z.instanceof(File).optional(),
});

const CreateJobSeeker = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    location: "",
    dateOfBirth: "",
  });
  const [cv, setCV] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.includes("pdf")) {
      setErrors((prev) => ({ ...prev, cv: "Please upload a PDF file" }));
      return;
    }
    setCV(file);
    if (errors.cv) {
      setErrors((prev) => ({ ...prev, cv: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const validatedData = schema.parse({ ...formData, cv });

      const formDataToSend = new FormData();
      Object.keys(validatedData).forEach((key) => {
        if (key === "cv" && cv) {
          formDataToSend.append("cv", cv);
        } else {
          formDataToSend.append(key, validatedData[key]);
        }
      });

      const response = await axios.post(
        "http://127.0.0.1:5555/create_jobseeker",
        formDataToSend
      );
      toast.success("Registration successful!");
      navigate("/login"); // Redirect user to login after successful registration
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors); // Update errors state
      } else {
        toast.error(error.response?.data?.error || "Registration failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Create Job Seeker Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.firstname ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500`}
                  required
                />
                {errors.firstname && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstname}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.lastname ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500`}
                  required
                />
                {errors.lastname && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastname}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500`}
                  required
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500`}
                  required
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500`}
                  required
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload CV (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.cv ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500`}
                />
                {errors.cv && (
                  <p className="mt-1 text-sm text-red-500">{errors.cv}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary-600 text-white px-8 py-2.5 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateJobSeeker;
