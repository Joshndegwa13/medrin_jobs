import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { toast } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import './index.css';

// Create a client with proper error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      onError: (error) => {
        const message = error?.response?.data?.message || 'An error occurred';
        toast.error(message);
      }
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        const message = error?.response?.data?.message || 'An error occurred';
        toast.error(message);
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <JobProvider>
            <SubscriptionProvider>
              <App />
            </SubscriptionProvider>
          </JobProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);