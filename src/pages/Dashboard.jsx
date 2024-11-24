import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrganisationDashboard from "./organisation/OrganisationDashboard";
import JobSeeker from "./jobseeker/JobSeeker";
import OrganisationNavbar from "./organisation/OrganisationNavbar";
import JobSeekerNavbar from "./jobseeker/JobSeekerNavbar";
import GlobalVariables from "../constants/GlobalVariables";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await fetch(`${GlobalVariables.uri}/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();

          if (errorData.error === "Invalid token") {
            navigate("/");
          }
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

  if (!user) return;

  return (
    <div>
      {user.role === "job_seeker" ? (
        <>
          <JobSeekerNavbar user={user} />
          <JobSeeker user={user} />
        </>
      ) : (
        <>
          <OrganisationNavbar user={user} />
          <OrganisationDashboard user={user} />
        </>
      )}
    </div>
  );
}
