import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import FindJobs from "./pages/jobseeker/FindJobs";
import PostJob from "./pages/organisation/PostJob";
import CandidateManagement from "./pages/organisation/CandidateManagement";
import PricingPlans from "./pages/organisation/PricingPlans";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import JobSeekerSignUp from "./pages/auth/JobSeekerSignUp";
import EmployerSignUp from "./pages/auth/EmployerSignUp";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Categories />
              <Testimonials />
            </>
          }
        />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organisation/post-job" element={<PostJob />} />
        <Route
          path="/organisation/candidates"
          element={<CandidateManagement />}
        />
        <Route path="/organisation/pricing" element={<PricingPlans />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/job-seeker" element={<JobSeekerSignUp />} />
        <Route path="/signup/organisation" element={<EmployerSignUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify_otp" element={<VerifyOtp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
