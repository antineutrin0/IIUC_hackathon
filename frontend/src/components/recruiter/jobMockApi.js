// src/lib/MockApi.js
let jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "Build responsive React applications with Tailwind CSS and integrate REST APIs.",
    category: "Programming",
    location: "Bangalore",
    level: "Intermediate level",
    salary: "4500",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    description:
      "Design clean and user-friendly interfaces using Figma and Adobe XD.",
    category: "Design",
    location: "New York",
    level: "Beginner level",
    salary: "4000",
  },
  {
    id: 3,
    title: "Marketing Intern",
    description:
      "Assist in digital marketing campaigns and social media management.",
    category: "Marketing",
    location: "Mumbai",
    level: "Beginner level",
    salary: "3000",
  },
  {
    id: 4,
    title: "Project Manager",
    description:
      "Oversee cross-functional teams and ensure timely project delivery.",
    category: "Management",
    location: "California",
    level: "Expert level",
    salary: "8000",
  },
];

export const mockAPI = {
  // ✅ Simulate a GET request
  getJobs: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...jobs]), 300);
    });
  },

  // ✅ Simulate a POST request (Add Job)
  addJob: async (jobData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newJob = { ...jobData, id: jobs.length + 1 };
          jobs.push(newJob);
          resolve(newJob);
        } catch (err) {
          reject(err);
        }
      }, 500);
    });
  },

  // ✅ Optional: simulate DELETE
  deleteJob: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        jobs = jobs.filter((job) => job.id !== id);
        resolve(true);
      }, 300);
    });
  },
};
