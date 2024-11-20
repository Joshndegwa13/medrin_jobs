import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import JobSeekerNavbar from './components/JobSeekerNavbar';
import EmployerNavbar from './components/EmployerNavbar';
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
import Profile from './pages/Profile';
import CompanyProfile from './pages/employer/CompanyProfile';

function App() {
  const location = useLocation();

  const renderNavbar = () => {
    if (location.pathname.startsWith('/employer')) {
      return <EmployerNavbar />;
    }
    if (location.pathname === '/find-jobs') {
      return <JobSeekerNavbar />;
    }
    return <Navbar />;
  };

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      {renderNavbar()}
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
        <Route path="/employer/profile" element={<CompanyProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/job-seeker" element={<JobSeekerSignUp />} />
        <Route path="/signup/employer" element={<EmployerSignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;