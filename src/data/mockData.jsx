 
export const mockStudents = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    college: 'MIT',
    branch: 'Computer Science',
    year: 3,
    overallScore: 92,
    technicalScore: 95,
    aptitudeScore: 88,
    reasoningScore: 93,
    rank: 1,
    testsAttempted: 15,
    lastActive: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    college: 'Stanford',
    branch: 'Software Engineering',
    year: 4,
    overallScore: 89,
    technicalScore: 91,
    aptitudeScore: 85,
    reasoningScore: 91,
    rank: 2,
    testsAttempted: 12,
    lastActive: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    college: 'Carnegie Mellon',
    branch: 'Computer Science',
    year: 2,
    overallScore: 87,
    technicalScore: 89,
    aptitudeScore: 83,
    reasoningScore: 89,
    rank: 3,
    testsAttempted: 10,
    lastActive: new Date('2024-01-13')
  }
];

export const mockTests  = [
  {
    id: '1',
    title: 'Full Stack Development Assessment',
    description: 'Comprehensive test covering React, Node.js, and database concepts',
    type: 'technical',
    duration: 120,
    totalQuestions: 50,
    difficulty: 'medium',
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-01-25'),
    isActive: true,
    maxAttempts: 2
  },
  {
    id: '2',
    title: 'Logical Reasoning Challenge',
    description: 'Test your analytical and logical thinking abilities',
    type: 'reasoning',
    duration: 90,
    totalQuestions: 40,
    difficulty: 'hard',
    startDate: new Date('2024-01-18'),
    endDate: new Date('2024-01-22'),
    isActive: true,
    maxAttempts: 1
  },
  {
    id: '3',
    title: 'Quantitative Aptitude Test',
    description: 'Mathematics and numerical ability assessment',
    type: 'aptitude',
    duration: 60,
    totalQuestions: 30,
    difficulty: 'medium',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-30'),
    isActive: true,
    maxAttempts: 3
  }
];

export const mockTestHistory = [
  {
    id: '1',
    testId: '1',
    testTitle: 'JavaScript Fundamentals',
    studentId: '1',
    score: 85,
    totalQuestions: 25,
    correctAnswers: 21,
    timeSpent: 45,
    completedAt: new Date('2024-01-10'),
    answers: []
  },
  {
    id: '2',
    testId: '2',
    testTitle: 'Data Structures & Algorithms',
    studentId: '1',
    score: 92,
    totalQuestions: 30,
    correctAnswers: 28,
    timeSpent: 60,
    completedAt: new Date('2024-01-08'),
    answers: []
  }
];

export const mockQuestions  = [
  {
    id: '1',
    type: 'technical',
    category: 'JavaScript',
    difficulty: 'medium',
    question: 'What is the output of console.log(typeof null)?',
    options: ['null', 'undefined', 'object', 'boolean'],
    correctAnswer: 'object',
    explanation: 'In JavaScript, typeof null returns "object" due to a historical bug in the language.'
  },
  {
    id: '2',
    type: 'aptitude',
    category: 'Mathematics',
    difficulty: 'easy',
    question: 'If a train travels 120 km in 2 hours, what is its speed?',
    options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
    correctAnswer: '60 km/h',
    explanation: 'Speed = Distance / Time = 120 km / 2 hours = 60 km/h'
  }
];

export const mockMaterials  = [
  {
    id: '1',
    title: 'Clean Code by Robert Martin',
    type: 'book',
    category: 'Programming',
    url: 'https://example.com/clean-code',
    savedAt: new Date('2024-01-01'),
    tags: ['programming', 'best-practices', 'software-engineering']
  },
  {
    id: '2',
    title: 'React Documentation',
    type: 'link',
    category: 'Frontend',
    url: 'https://react.dev',
    savedAt: new Date('2024-01-05'),
    tags: ['react', 'frontend', 'javascript']
  },
  {
    id: '3',
    title: 'Algorithm Notes',
    type: 'note',
    category: 'Computer Science',
    content: 'Personal notes on sorting algorithms and their time complexities...',
    savedAt: new Date('2024-01-10'),
    tags: ['algorithms', 'data-structures', 'notes']
  }
];

export const mockSkills  = [
  { name: 'JavaScript', level: 90, category: 'technical' },
  { name: 'React', level: 85, category: 'technical' },
  { name: 'Node.js', level: 80, category: 'technical' },
  { name: 'Python', level: 75, category: 'technical' },
  { name: 'Communication', level: 88, category: 'soft' },
  { name: 'Problem Solving', level: 92, category: 'soft' },
  { name: 'Machine Learning', level: 70, category: 'domain' }
];

export const mockProjects  = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce application with React and Node.js',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    status: 'completed',
    startDate: new Date('2023-09-01'),
    endDate: new Date('2023-12-15'),
    githubUrl: 'https://github.com/example/ecommerce',
    liveUrl: 'https://myecommerce.com'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates',
    technologies: ['React', 'Firebase', 'Material-UI'],
    status: 'in-progress',
    startDate: new Date('2024-01-01'),
    githubUrl: 'https://github.com/example/taskmanager'
  }
];