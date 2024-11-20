import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BriefcaseIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentPlusIcon,
  XMarkIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const StatCard = ({ stat, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 cursor-pointer transition-all hover:shadow-xl"
  >
    <div className="flex items-center justify-between mb-4">
      <stat.icon className="h-8 w-8 text-primary-600" />
      <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
    </div>
    <h3 className="text-gray-600 font-medium">{stat.name}</h3>
  </motion.div>
);

const Modal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
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
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
            {children}
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
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Organisation Dashboard
          </h1>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              onClick={() => handleStatClick(stat)}
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
      </div>
    </div>
  );
};

export default Organisation;
