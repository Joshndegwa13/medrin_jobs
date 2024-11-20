import React from "react";
import { Routes, Route } from "react-router-dom";

// Support Commponents
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

// Main Components
import Dashboard from "./pages/Dashboard";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerifyOtp from "./pages/auth/VerifyOtp";

// Organisation Components
import OrganisationProfile from "./pages/organisation/OrganisationProfile";
import CreateOrganisation from "./pages/auth/CreateOrganisation";
import PostJob from "./pages/organisation/PostJob";
import CandidateManagement from "./pages/organisation/CandidateManagement";
import PricingPlans from "./pages/organisation/PricingPlans";

// Jobseeker Components
import JobSeekerProfile from "./pages/jobseeker/JobSeekerProfile";
import CreateJobSeeker from "./pages/auth/CreateJobSeeker";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Categories />
              <Testimonials />
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organisation/post-job" element={<PostJob />} />
        <Route
          path="/organisation/candidates"
          element={<CandidateManagement />}
        />
        <Route path="/organisation/pricing" element={<PricingPlans />} />
        <Route path="/organisation/profile" element={<OrganisationProfile />} />
        <Route path="/jobseeker/profile" element={<JobSeekerProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-jobseeker" element={<CreateJobSeeker />} />
        <Route path="/create-organisation" element={<CreateOrganisation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify_otp" element={<VerifyOtp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
