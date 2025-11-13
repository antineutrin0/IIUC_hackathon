// mockAPI.js
// This file simulates backend API calls for Jobs and Applications
// You’ll later replace these with actual Node.js/Express API calls

const mockAPI = {
  // ======================
  // 📌 JOBS API
  // ======================

  fetchJobs: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Cloud Engineer', date: '2024-10-23', location: 'Hyderabad', applicants: 1, visible: true, category: 'Programming', level: 'Intermediate level', salary: 5000, description: 'We are looking for an experienced Cloud Engineer...' },
          { id: 2, title: 'Network Security Engineer', date: '2024-10-23', location: 'Bangalore', applicants: 1, visible: true, category: 'Programming', level: 'Expert level', salary: 6000, description: 'Join our security team...' },
          { id: 3, title: 'Software Tester', date: '2024-10-23', location: 'Chennai', applicants: 0, visible: true, category: 'Programming', level: 'Beginner level', salary: 3500, description: 'Quality assurance position...' },
          { id: 4, title: 'Graphic Designer', date: '2024-10-23', location: 'Chennai', applicants: 1, visible: true, category: 'Design', level: 'Intermediate level', salary: 4000, description: 'Creative design role...' },
          { id: 5, title: 'Content Marketing Manager', date: '2024-10-23', location: 'Mumbai', applicants: 1, visible: true, category: 'Marketing', level: 'Expert level', salary: 5500, description: 'Lead our marketing efforts...' },
          { id: 6, title: 'Human Resources Specialist', date: '2024-10-23', location: 'Washington', applicants: 1, visible: true, category: 'Management', level: 'Intermediate level', salary: 4500, description: 'HR management position...' },
          { id: 7, title: 'Sales Manager', date: '2024-10-23', location: 'New York', applicants: 0, visible: true, category: 'Sales', level: 'Expert level', salary: 7000, description: 'Drive sales growth...' },
          { id: 8, title: 'DevOps Engineer', date: '2024-10-23', location: 'Bangalore', applicants: 1, visible: true, category: 'Programming', level: 'Intermediate level', salary: 5500, description: 'DevOps engineering role...' },
        ]);
      }, 500);
    });
  },

  addJob: async (jobData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newJob = {
          id: Date.now(),
          ...jobData,
          date: new Date().toISOString().split('T')[0],
          applicants: 0,
          visible: true
        };
        resolve(newJob);
      }, 500);
    });
  },

  updateJobVisibility: async (jobId, visible) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: jobId, visible });
      }, 300);
    });
  },

  deleteJob: async (jobId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id: jobId });
      }, 300);
    });
  },

  // ======================
  // 📌 APPLICATIONS API
  // ======================

  fetchApplications: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, userId: 101, userName: 'Great Stack', userAvatar: 'G', jobId: 8, jobTitle: 'DevOps Engineer', location: 'Bangalore', status: 'pending', resumeUrl: '/resumes/resume1.pdf', appliedDate: '2024-10-20' },
          { id: 2, userId: 101, userName: 'Great Stack', userAvatar: 'G', jobId: 5, jobTitle: 'Content Marketing Manager', location: 'Mumbai', status: 'accepted', resumeUrl: '/resumes/resume2.pdf', appliedDate: '2024-10-19' },
          { id: 3, userId: 102, userName: 'John Doe', userAvatar: 'J', jobId: 2, jobTitle: 'Network Security Engineer', location: 'Bangalore', status: 'accepted', resumeUrl: '/resumes/resume3.pdf', appliedDate: '2024-10-18' },
          { id: 4, userId: 103, userName: 'Jane Smith', userAvatar: 'J', jobId: 1, jobTitle: 'Cloud Engineer', location: 'Hyderabad', status: 'rejected', resumeUrl: '/resumes/resume4.pdf', appliedDate: '2024-10-17' },
          { id: 5, userId: 104, userName: 'Mike Johnson', userAvatar: 'M', jobId: 4, jobTitle: 'Graphic Designer', location: 'Chennai', status: 'accepted', resumeUrl: '/resumes/resume5.pdf', appliedDate: '2024-10-16' },
          { id: 6, userId: 105, userName: 'Sarah Williams', userAvatar: 'S', jobId: 6, jobTitle: 'Human Resources Specialist', location: 'Washington', status: 'pending', resumeUrl: '/resumes/resume6.pdf', appliedDate: '2024-10-15' },
        ]);
      }, 500);
    });
  },

  updateApplicationStatus: async (applicationId, status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: applicationId, status });
      }, 300);
    });
  }
};

export default mockAPI;
