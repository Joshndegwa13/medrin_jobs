import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { locations } from "../../constants/JobData";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import GlobalVariables from "../../constants/GlobalVariables";

const CreateOrganisation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: localStorage.getItem("userId"),
    name: "",
    location: "",
    description: "",
    mission: "",
    vision: "",
  });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      toast.error("User not found. Please log in first.");
      navigate("/login");
    }
  }, [userId, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        logo: "Please upload a PNG, JPG, or JPEG file",
      }));
      return;
    }
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
    if (errors.logo) {
      setErrors((prev) => ({ ...prev, logo: "" }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const { name, location, description, mission, vision } = formData;

    // Validation
    if (!name || !location || !description || !mission || !vision) {
      setErrors({
        general: "All fields are required.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("user_id", userId);
      formDataToSend.append("name", name);
      formDataToSend.append("location", location);
      formDataToSend.append("description", description);
      formDataToSend.append("mission", mission);
      formDataToSend.append("vision", vision);
      if (logo) {
        formDataToSend.append("logo", logo);
      }

      const response = await fetch(
        `${GlobalVariables.uri}/create_organisation`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Organisation created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to create organisation");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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
            Create Organisation
          </h2>
          {errors.general && (
            <p className="text-sm text-red-500 mb-4">{errors.general}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo
                </label>
                <div className="flex items-center space-x-4">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-lg bg-primary-100 flex items-center justify-center">
                      <UserCircleIcon className="h-14 w-14 text-primary-600" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-gray-700 hover:file:bg-gray-100"
                  />
                </div>
                {errors.logo && (
                  <p className="text-sm text-red-500 mt-2">{errors.logo}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organisation Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className={`py-4 px-4 rounded-xl border-2 ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  } bg-white text-gray-900 outline-none focus:border-primary-500 focus:ring-primary-500`}
                >
                  <option value="">Select a location</option>
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
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500`}
                  required
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mission
                </label>
                <textarea
                  name="mission"
                  value={formData.mission}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.mission ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500`}
                  required
                />
                {errors.mission && (
                  <p className="mt-1 text-sm text-red-500">{errors.mission}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vision
                </label>
                <textarea
                  name="vision"
                  value={formData.vision}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.vision ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-primary-500`}
                  required
                />
                {errors.vision && (
                  <p className="mt-1 text-sm text-red-500">{errors.vision}</p>
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
                {isLoading ? "Creating Organisation..." : "Create Organisation"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateOrganisation;
