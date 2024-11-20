import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import {
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

// Mock data - will be replaced with real data from backend
const mockCandidates = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254 712 345 678',
    position: 'Software Developer',
    experience: '5 years',
    status: 'pending',
    appliedDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+254 723 456 789',
    position: 'UI/UX Designer',
    experience: '3 years',
    status: 'pending',
    appliedDate: '2024-01-18'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+254 734 567 890',
    position: 'Product Manager',
    experience: '7 years',
    status: 'pending',
    appliedDate: '2024-01-20'
  }
];

const CandidateCard = ({ candidate, onAccept, onReject, isShortlisted }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
            <p className="text-primary-600">{candidate.position}</p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <EnvelopeIcon className="h-4 w-4" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <PhoneIcon className="h-4 w-4" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DocumentTextIcon className="h-4 w-4" />
                <span>{candidate.experience} experience</span>
              </div>
              <div className="text-sm text-gray-500">
                Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        
        {!isShortlisted && candidate.status === 'pending' && (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAccept(candidate.id)}
              className="p-2 rounded-full text-green-600 hover:bg-green-50"
            >
              <CheckCircleIcon className="h-6 w-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onReject(candidate.id)}
              className="p-2 rounded-full text-red-600 hover:bg-red-50"
            >
              <XCircleIcon className="h-6 w-6" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const handleAccept = (id) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === id
          ? { ...candidate, status: 'accepted' }
          : candidate
      )
    );
    setSelectedCandidates(prev => [...prev, id]);
  };

  const handleReject = (id) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === id
          ? { ...candidate, status: 'rejected' }
          : candidate
      )
    );
  };

  const handleShortlist = () => {
    setCandidates(prev =>
      prev.map(candidate => ({
        ...candidate,
        status: selectedCandidates.includes(candidate.id) ? 'accepted' : 'rejected'
      }))
    );
    toast.success('Candidates have been shortlisted');
  };

  const pendingCandidates = candidates.filter(c => c.status === 'pending');
  const acceptedCandidates = candidates.filter(c => c.status === 'accepted');

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Applications</h1>
          {pendingCandidates.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShortlist}
              className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Shortlist Selected
            </motion.button>
          )}
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-primary-100 p-1 mb-8">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${
                  selected
                    ? 'bg-white text-primary-700 shadow'
                    : 'text-primary-600 hover:bg-white/[0.12] hover:text-primary-700'
                }`
              }
            >
              Pending ({pendingCandidates.length})
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${
                  selected
                    ? 'bg-white text-primary-700 shadow'
                    : 'text-primary-600 hover:bg-white/[0.12] hover:text-primary-700'
                }`
              }
            >
              Shortlisted ({acceptedCandidates.length})
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <AnimatePresence mode="popLayout">
                <div className="space-y-4">
                  {pendingCandidates.map(candidate => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      onAccept={handleAccept}
                      onReject={handleReject}
                    />
                  ))}
                  {pendingCandidates.length === 0 && (
                    <p className="text-center text-gray-600 py-8">
                      No pending applications
                    </p>
                  )}
                </div>
              </AnimatePresence>
            </Tab.Panel>

            <Tab.Panel>
              <AnimatePresence mode="popLayout">
                <div className="space-y-4">
                  {acceptedCandidates.map(candidate => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      isShortlisted
                    />
                  ))}
                  {acceptedCandidates.length === 0 && (
                    <p className="text-center text-gray-600 py-8">
                      No shortlisted candidates
                    </p>
                  )}
                </div>
              </AnimatePresence>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default CandidateManagement;