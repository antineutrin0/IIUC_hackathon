const demoProfile = {
  _id: '1',
  user: {
    _id: 'user1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567'
  },
  headline: 'Full Stack Developer | React & Node.js Specialist',
  bio: 'Passionate software developer with 5+ years of experience building scalable web applications. Love solving complex problems and learning new technologies. Currently focused on cloud architecture and microservices.',
  skills: ['javascript', 'react', 'node.js', 'mongodb', 'typescript', 'aws', 'docker', 'python', 'postgresql', 'graphql'],
  targetRoles: ['Full Stack Developer', 'Senior Frontend Developer', 'Software Engineer'],
  availability: 'open_to_work',
  isPublic: true,
  address: {
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    street: '123 Market Street',
    postalCode: '94103'
  },
  languages: [
    { name: 'English', proficiency: 'Native' },
    { name: 'Spanish', proficiency: 'Fluent' },
    { name: 'French', proficiency: 'Conversational' }
  ],
  education: [
    {
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startYear: 2015,
      endYear: 2019,
      grade: '3.8 GPA'
    },
    {
      institution: 'MIT',
      degree: 'Master of Science',
      fieldOfStudy: 'Software Engineering',
      startYear: 2019,
      endYear: 2021,
      grade: '3.9 GPA'
    }
  ],
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Features include payment integration, real-time inventory management, and admin dashboard.',
      link: 'https://github.com/sarah/ecommerce',
      techStack: ['react', 'node.js', 'mongodb', 'stripe', 'redux'],
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-06-30'),
      isOngoing: false
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates using Socket.io. Includes team features, notifications, and analytics.',
      link: 'https://github.com/sarah/taskmanager',
      techStack: ['react', 'express', 'postgresql', 'socket.io', 'typescript'],
      startDate: new Date('2023-07-01'),
      endDate: null,
      isOngoing: true
    },
    {
      title: 'AI Chat Assistant',
      description: 'Integrated OpenAI API to create an intelligent chat assistant for customer support. Reduced response time by 60%.',
      link: 'https://github.com/sarah/ai-assistant',
      techStack: ['python', 'fastapi', 'openai', 'react', 'docker'],
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-03-20'),
      isOngoing: false
    }
  ],
  cvText: 'Experienced Full Stack Developer with proven track record...',
  lastProfileUpdateAt: new Date('2024-11-10')
};

export default demoProfile;