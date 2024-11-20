import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [userOtp, setUserOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setUserOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5555/verify_otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: userOtp,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "OTP verification failed");
      } else {
        const data = await response.json();
        setSuccessMessage(data.message || "Verification successful!");

        const userId = data.user.id;
        localStorage.setItem("userId", userId);

        if (data.user.role === "job_seeker") {
          navigate("/create-jobseeker");
        } else if (data.user.role === "organisation") {
          navigate("/create-organisation");
        } else {
          setErrorMessage("Unknown role. Please contact support.");
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Verify OTP
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              name="otp"
              value={userOtp}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter OTP"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Verify
            </button>
          </div>
        </form>

        {/* Success and Error Messages */}
        {successMessage && (
          <p className="text-green-500 text-sm text-center mt-4">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm text-center mt-4">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyOtp;
