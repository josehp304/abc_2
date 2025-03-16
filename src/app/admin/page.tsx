'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ContactEntry {
  id: number;
  created_at: Date;
  name: string;
  email: string;
  phoneNo: number;
  message: string;
}

interface JobApplication {
  id: number;
  created_at: Date;
  name: string;
  email: string;
  phoneNo: number;
  message: string;
  job_title: string;
}

export default function AdminPage() {
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'contacts' | 'jobs'>('contacts');
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await Promise.all([fetchContacts(), fetchJobApplications()]);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contactus')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData = data?.map(entry => ({
        ...entry,
        created_at: new Date(entry.created_at)
      })) || [];
      
      setContacts(transformedData);
    } catch (err) {
      setError('Failed to fetch contact submissions');
      console.error('Error:', err);
    }
  };

  const fetchJobApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('joinus')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData = data?.map(entry => ({
        ...entry,
        created_at: new Date(entry.created_at)
      })) || [];
      
      setJobApplications(transformedData);
    } catch (err) {
      setError('Failed to fetch job applications');
      console.error('Error:', err);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString();
  };

  const handleLogout = () => {
    // Remove the authentication cookie
    Cookies.remove('admin_authenticated');
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background p-8 pt-[100px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex gap-2">
            <button 
              onClick={fetchData}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Refresh
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'contacts'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Contact Submissions
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'jobs'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Job Applications
          </button>
        </div>

        {activeTab === 'contacts' && (
          <>
            {/* Statistics Section for Contacts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-medium text-muted-foreground">Total Messages</h3>
                <p className="text-3xl font-bold text-card-foreground mt-2">{contacts.length}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-card p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-medium text-muted-foreground">Latest Message</h3>
                <p className="text-3xl font-bold text-card-foreground mt-2">
                  {contacts.length > 0 ? formatDate(contacts[0].created_at).split(',')[0] : 'N/A'}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-card p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-medium text-muted-foreground">Unique Contacts</h3>
                <p className="text-3xl font-bold text-card-foreground mt-2">
                  {new Set(contacts.map(c => c.email)).size}
                </p>
              </motion.div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                {error}
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                No contact form submissions yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg text-card-foreground">
                          {contact.name}
                        </h3>
                        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
                          ID: {contact.id}
                        </span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        {formatDate(contact.created_at)}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-primary mr-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-card-foreground text-sm truncate">
                            {contact.email}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-primary mr-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-card-foreground text-sm">
                            {contact.phoneNo}
                          </span>
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-3">
                        <p className="text-card-foreground text-sm line-clamp-3 whitespace-pre-wrap">
                          {contact.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'jobs' && (
          <>
            {/* Statistics Section for Job Applications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-medium text-muted-foreground">Total Applications</h3>
                <p className="text-3xl font-bold text-card-foreground mt-2">{jobApplications.length}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-card p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-medium text-muted-foreground">Latest Application</h3>
                <p className="text-3xl font-bold text-card-foreground mt-2">
                  {jobApplications.length > 0 ? formatDate(jobApplications[0].created_at).split(',')[0] : 'N/A'}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-card p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-medium text-muted-foreground">Popular Position</h3>
                <p className="text-3xl font-bold text-card-foreground mt-2">
                  {jobApplications.length > 0 
                    ? Object.entries(
                        jobApplications.reduce((acc, curr) => {
                          acc[curr.job_title] = (acc[curr.job_title] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).sort((a, b) => b[1] - a[1])[0][0].split(' ')[0]
                    : 'N/A'}
                </p>
              </motion.div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                {error}
              </div>
            ) : jobApplications.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                No job applications yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobApplications.map((application) => (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg text-card-foreground">
                          {application.name}
                        </h3>
                        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
                          ID: {application.id}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {formatDate(application.created_at)}
                        </div>
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {application.job_title}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-primary mr-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-card-foreground text-sm truncate">
                            {application.email}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-primary mr-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-card-foreground text-sm">
                            {application.phoneNo}
                          </span>
                        </div>
                      </div>

                      {application.message && (
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-card-foreground text-sm line-clamp-3 whitespace-pre-wrap">
                            {application.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
