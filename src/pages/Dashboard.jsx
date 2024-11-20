// Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Organisation from "./organisation/OrganisationDashboard";
import JobSeeker from "./jobseeker/JobSeeker";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No authentication token found.");
          return;
        }

        const response = await fetch("http://127.0.0.1:5555/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch user data.");
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        setError("An error occurred. Please try again.");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (error) return <p>{error}</p>;

  if (!user) return <p>Loading user data...</p>;

  return (
    <div>
      {user.role === "job_seeker" ? (
        <FindJobs user={user} />
      ) : (
        <JobSeeker user={user} />
      )}
    </div>
  );
}
