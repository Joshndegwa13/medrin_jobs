import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FindJobs from './pages/FindJobs';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import PostJob from './pages/employer/PostJob';
import CandidateManagement from './pages/employer/CandidateManagement';
import PricingPlans from './pages/employer/PricingPlans';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import JobSeekerSignUp from './pages/auth/JobSeekerSignUp';
import EmployerSignUp from './pages/auth/EmployerSignUp';
import Register from './pages/auth/Register'
import VerifyOtp from './pages/auth/VerifyOtp';


function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Categories />
            <Testimonials />
          </>
        } />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/employer" element={<EmployerDashboard />} />
        <Route path="/employer/post-job" element={<PostJob />} />
        <Route path="/employer/candidates" element={<CandidateManagement />} />
        <Route path="/employer/pricing" element={<PricingPlans />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/job-seeker" element={<JobSeekerSignUp />} />
        <Route path="/signup/employer" element={<EmployerSignUp />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/verify_otp' element={<VerifyOtp/>} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;