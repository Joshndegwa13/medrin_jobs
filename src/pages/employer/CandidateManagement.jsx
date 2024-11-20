import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab } from '@headlessui/react';
import {
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const mockCandidates = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254 712 345 678',
    position: 'Software Developer',
    experience: '5 years',
    status: 'pending'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+254 723 456 789',
    position: 'UI/UX Designer',
    experience: '3 years',
    status: 'shortlisted'
  },
  // Add more mock candidates as needed
];

const CandidateCard = ({ candidate, onAccept, onReject }) => {
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
            </div>
          </div>
        </div>
        
        {candidate.status === 'pending' && (
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

  const handleAccept = (id) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === id
          ? { ...candidate, status: 'shortlisted' }
          : candidate
      )
    );
  };

  const handleReject = (id) => {
    setCandidates(prev =>
      prev.filter(candidate => candidate.id !== id)
    );
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Candidate Management</h1>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-primary-100 p-1 mb-8">
            {['All Applications', 'Shortlisted'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                  ${
                    selected
                      ? 'bg-white text-primary-700 shadow'
                      : 'text-primary-600 hover:bg-white/[0.12] hover:text-primary-700'
                  }`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <AnimatePresence mode="popLayout">
                <div className="space-y-4">
                  {candidates
                    .filter(candidate => candidate.status === 'pending')
                    .map(candidate => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        onAccept={handleAccept}
                        onReject={handleReject}
                      />
                    ))}
                </div>
              </AnimatePresence>
            </Tab.Panel>
            <Tab.Panel>
              <AnimatePresence mode="popLayout">
                <div className="space-y-4">
                  {candidates
                    .filter(candidate => candidate.status === 'shortlisted')
                    .map(candidate => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        onAccept={handleAccept}
                        onReject={handleReject}
                      />
                    ))}
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