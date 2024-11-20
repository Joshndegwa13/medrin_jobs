import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

const OrganisationProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(
    user?.organisation?.logo || null
  );
  const [formData, setFormData] = useState({
    organisation_name: user?.organisation?.name || "",
    location: user?.organisation?.location || "",
    description: user?.organisation?.description || "",
    mission: user?.organisation?.mission || "",
    vision: user?.organisation?.vision || "",
    organisationLogo: null,
  });

  // Populating form data if user changes
  useEffect(() => {
    console.log(user);

    setFormData({
      organisation_name: user?.organisation?.name || "",
      location: user?.organisation?.location || "",
      description: user?.organisation?.description || "",
      mission: user?.organisation?.mission || "",
      vision: user?.organisation?.vision || "",
      organisationLogo: null,
    });
    setPreviewLogo(user?.organisation?.logo || null);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg")
    ) {
      setFormData((prev) => ({ ...prev, organisationLogo: file }));
      setPreviewLogo(URL.createObjectURL(file)); // Show a preview
    } else {
      toast.error(
        "Invalid file type. Please upload a .png, .jpeg, or .jpg file."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) updatedData.append(key, value);
    });

    try {
      await updateProfile(updatedData);
      setIsEditing(false);
      toast.success("Organisation profile updated successfully");
    } catch (error) {
      toast.error("Failed to update organisation profile");
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Organisation Profile
            </h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(!isEditing)}
              className="text-primary-600 font-medium"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center mb-8">
              <div className="relative">
                {previewLogo ? (
                  <img
                    src={previewLogo}
                    alt="Organisation Logo"
                    className="h-32 w-32 rounded-full object-cover"
                  />
                ) : (
                  <BuildingOfficeIcon className="h-32 w-32 text-gray-400" />
                )}
                {isEditing && (
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".png,.jpeg,.jpg"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organisation Name
                </label>
                <input
                  type="text"
                  name="organisation_name"
                  value={formData.organisation_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                />
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
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mission
                </label>
                <textarea
                  name="mission"
                  value={formData.mission}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vision
                </label>
                <textarea
                  name="vision"
                  value={formData.vision}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Save Changes
                </motion.button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganisationProfile;
