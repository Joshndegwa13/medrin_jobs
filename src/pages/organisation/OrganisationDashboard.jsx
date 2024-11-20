import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  DocumentPlusIcon,
  EyeIcon,
  UserGroupIcon,
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  XMarkIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// Mock data - will be replaced with real data from backend
const mockJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    location: 'Nairobi',
    type: 'Full-time',
    postedDate: '2024-01-15',
    applicants: 12,
    status: 'active'
  },
  {
    id: 2,
    title: 'Product Manager',
    location: 'Mombasa',
    type: 'Full-time',
    postedDate: '2024-01-18',
    applicants: 8,
    status: 'active'
  },
  {
    id: 3,
    title: 'UX Designer',
    location: 'Remote',
    type: 'Contract',
    postedDate: '2024-01-20',
    applicants: 15,
    status: 'active'
  }
];

const JobCard = ({ job, onViewApplicants }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPinIcon className="h-5 w-5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <BriefcaseIcon className="h-5 w-5" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarIcon className="h-5 w-5" />
            <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-primary-600">
            <UserGroupIcon className="h-5 w-5" />
            <span>{job.applicants} Applicants</span>
          </div>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewApplicants(job)}
        className="p-2 rounded-full text-primary-600 hover:bg-primary-50"
      >
        <EyeIcon className="h-6 w-6" />
      </motion.button>
    </div>
  </motion.div>
);

const ApplicantsModal = ({ isOpen, onClose, job }) => (
  <AnimatePresence>
    {isOpen && job && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-white rounded-xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                <p className="text-gray-600">Applicants ({job.applicants})</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Mock applicants - will be replaced with real data */}
              {[...Array(job.applicants)].map((_, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Applicant {index + 1}
                      </h3>
                      <p className="text-gray-600">example@email.com</p>
                    </div>
                    <Link
                      to={`/employer/candidates`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const ActivityItem = ({ activity }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
  >
    <div className="flex items-center gap-4">
      <div
        className={`h-10 w-10 rounded-full ${activity.iconBg} flex items-center justify-center`}
      >
        {activity.icon}
      </div>
      <div>
        <p className="font-medium text-gray-900">{activity.title}</p>
        <p className="text-sm text-gray-600">{activity.description}</p>
      </div>
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <ClockIcon className="h-4 w-4" />
      <span>{activity.time}</span>
    </div>
  </motion.div>
);

const Organisation = ({ user }) => {
  const [selectedStat, setSelectedStat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    {
      name: "Active Jobs",
      value: "12",
      icon: BriefcaseIcon,
      items: [
        {
          title: "Senior Software Engineer",
          applicants: 45,
          deadline: "2024-02-28",
        },
        { title: "Product Manager", applicants: 32, deadline: "2024-03-15" },
        { title: "UX Designer", applicants: 28, deadline: "2024-03-10" },
      ],
    },
    {
      name: "Total Applicants",
      value: "148",
      icon: UserGroupIcon,
      items: [
        {
          name: "John Doe",
          position: "Senior Software Engineer",
          status: "Under Review",
        },
        {
          name: "Jane Smith",
          position: "Product Manager",
          status: "Shortlisted",
        },
        { name: "Mike Johnson", position: "UX Designer", status: "New" },
      ],
    },
    {
      name: "Shortlisted",
      value: "24",
      icon: ChartBarIcon,
      items: [
        {
          name: "Alice Brown",
          position: "Senior Software Engineer",
          rating: 4.8,
        },
        { name: "Bob Wilson", position: "Product Manager", rating: 4.9 },
        { name: "Carol White", position: "UX Designer", rating: 4.7 },
      ],
    },
    {
      name: "New Applications",
      value: "8",
      icon: DocumentPlusIcon,
      items: [
        {
          name: "David Lee",
          position: "Senior Software Engineer",
          appliedAt: "2 hours ago",
        },
        {
          name: "Emma Davis",
          position: "Product Manager",
          appliedAt: "3 hours ago",
        },
        {
          name: "Frank Miller",
          position: "UX Designer",
          appliedAt: "4 hours ago",
        },
      ],
    },
  ];

  const recentActivities = [
    {
      title: "New Application Received",
      description: "David Lee applied for Senior Software Engineer position",
      time: "2 minutes ago",
      icon: <UserGroupIcon className="h-6 w-6 text-blue-600" />,
      iconBg: "bg-blue-100",
    },
    {
      title: "Candidate Shortlisted",
      description: "Emma Davis was shortlisted for Product Manager position",
      time: "1 hour ago",
      icon: <CheckCircleIcon className="h-6 w-6 text-green-600" />,
      iconBg: "bg-green-100",
    },
    {
      title: "New Job Posted",
      description: "UX Designer position has been published",
      time: "2 hours ago",
      icon: <BriefcaseIcon className="h-6 w-6 text-purple-600" />,
      iconBg: "bg-purple-100",
    },
  ];

  const handleStatClick = (stat) => {
    setSelectedStat(stat);
    setIsModalOpen(true);
  };

  const renderModalContent = () => {
    if (!selectedStat) return null;

    return (
      <div className="space-y-4">
        {selectedStat.items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {selectedStat.name === "Active Jobs" ? (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    {item.applicants} applicants
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Deadline: {item.deadline}
                </p>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.position}</p>
                </div>
                <span className="text-sm">
                  {item.status || item.rating || item.appliedAt}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
    
const EmployerDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    setShowApplicantsModal(true);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Organisation Dashboard
          </h1>
          <h1 className="text-3xl font-bold text-gray-900">Posted Jobs</h1>
          <Link to="/employer/post-job">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/25 flex items-center gap-2"
            >
              <DocumentPlusIcon className="h-5 w-5" />
              Post New Job
            </motion.button>
          </Link>
        </div>

        <div className="space-y-6">
          {mockJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onViewApplicants={handleViewApplicants}
            />
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedStat?.name}
        >
          {renderModalContent()}
        </Modal>
        <ApplicantsModal
          isOpen={showApplicantsModal}
          onClose={() => setShowApplicantsModal(false)}
          job={selectedJob}
        />
      </div>
    </div>
  );
};

export default Organisation;
