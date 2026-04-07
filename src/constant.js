  // ============================================
// TEST & ASSESSMENT CONSTANTS
// ============================================

export const tests = [
  {
    id: 1,
    title: "Advanced JavaScript Concepts",
    category: "coding",
    duration: 120,
    participants: 45,
    status: "active",
    difficulty: "Hard",
    createdDate: "2024-01-15",
    questions: 25,
  },
  {
    id: 2,
    title: "Logical Reasoning Assessment",
    category: "aptitude",
    duration: 90,
    participants: 32,
    status: "draft",
    difficulty: "Medium",
    createdDate: "2024-01-12",
    questions: 40,
  },
  {
    id: 3,
    title: "English Communication Skills",
    category: "verbal",
    duration: 60,
    participants: 28,
    status: "completed",
    difficulty: "Easy",
    createdDate: "2024-01-10",
    questions: 30,
  },
  {
    id: 4,
    title: "Data Structures & Algorithms",
    category: "coding",
    duration: 150,
    participants: 52,
    status: "active",
    difficulty: "Hard",
    createdDate: "2024-01-08",
    questions: 20,
  },
  {
    id: 5,
    title: "Quantitative Aptitude",
    category: "aptitude",
    duration: 75,
    participants: 38,
    status: "scheduled",
    difficulty: "Medium",
    createdDate: "2024-01-05",
    questions: 35,
  },
];

// ============================================
// TEST CATEGORIES
// ============================================

export const TEST_CATEGORIES = {
  CODING: "coding",
  APTITUDE: "aptitude",
  VERBAL: "verbal",
  QUANTITATIVE: "quantitative",
  LOGICAL: "logical",
  FUNDAMENTAL: "fundamental",
};

export const TEST_CATEGORY_DISPLAY = {
  coding: "Coding Problems",
  aptitude: "Aptitude",
  verbal: "Verbal",
  quantitative: "Quantitative",
  logical: "Logical Reasoning",
  fundamental: "Core Fundamentals",
};

// ============================================
// SUBJECT CATEGORIES
// ============================================

export const SUBJECTS = [
  "Aptitude",
  "Fundamental",
  "Reasoning",
  "Verbal",
  "Coding",
  "Writing",
  "Listening",
  "Pseudo Code",
];

export const SUBJECT_MAP = {
  APTITUDE: "Aptitude",
  FUNDAMENTAL: "Fundamental",
  REASONING: "Reasoning",
  VERBAL: "Verbal",
  CODING: "Coding",
  WRITING: "Writing",
  LISTENING: "Listening",
  PSEUDO_CODE: "Pseudo Code",
};

// ============================================
// DIFFICULTY LEVELS
// ============================================

export const DIFFICULTY_LEVELS = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

export const DIFFICULTY_COLORS = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

// ============================================
// TEST STATUS
// ============================================

export const TEST_STATUS = {
  ACTIVE: "active",
  DRAFT: "draft",
  COMPLETED: "completed",
  SCHEDULED: "scheduled",
};

export const STATUS_BADGES = {
  active: "bg-green-100 text-green-700",
  draft: "bg-yellow-100 text-yellow-700",
  completed: "bg-blue-100 text-blue-700",
  scheduled: "bg-orange-100 text-orange-700",
};

export const STATUS_DISPLAY = {
  active: "Active",
  draft: "Draft",
  completed: "Completed",
  scheduled: "Scheduled",
};

// ============================================
// STUDENT DATA
// ============================================

export const SAMPLE_STUDENTS = [
  {
    id: 1,
    fullName: "Sarah Smith",
    email: "sarah.smith@email.com",
    phone: "+1 234-567-8901",
    location: "New York, NY",
    joinDate: "2024-01-15",
    testsCompleted: 12,
    avgScore: 95,
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    fullName: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1 234-567-8902",
    location: "Los Angeles, CA",
    joinDate: "2024-01-12",
    testsCompleted: 10,
    avgScore: 92,
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    fullName: "Emily Brown",
    email: "emily.brown@email.com",
    phone: "+1 234-567-8903",
    location: "Chicago, IL",
    joinDate: "2024-01-10",
    testsCompleted: 8,
    avgScore: 88,
    status: "active",
    lastActive: "3 days ago",
  },
  {
    id: 4,
    fullName: "John Davis",
    email: "john.davis@email.com",
    phone: "+1 234-567-8904",
    location: "Houston, TX",
    joinDate: "2024-01-08",
    testsCompleted: 15,
    avgScore: 91,
    status: "active",
    lastActive: "5 hours ago",
  },
  {
    id: 5,
    fullName: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1 234-567-8905",
    location: "Phoenix, AZ",
    joinDate: "2024-01-05",
    testsCompleted: 7,
    avgScore: 85,
    status: "inactive",
    lastActive: "1 week ago",
  },
];

// ============================================
// PROBLEM/QUESTION DATA
// ============================================

export const PROBLEM_TEMPLATE = {
  subject: "",
  problemStatement: "",
  options: "",
  correctOption: "",
  allocatedMark: 0,
};

export const PROBLEM_FORMATS = {
  MCQ: "mcq",
  TRUE_FALSE: "true_false",
  SHORT_ANSWER: "short_answer",
  CODING: "coding",
  ESSAY: "essay",
};

export const PROBLEM_FORMAT_DISPLAY = {
  mcq: "Multiple Choice Question",
  true_false: "True/False",
  short_answer: "Short Answer",
  coding: "Coding Problem",
  essay: "Essay Type",
};

// ============================================
// STUDENT DASHBOARD - ANALYTICS DATA
// ============================================

export const SUBJECT_PERFORMANCE_DATA = [
  { subject: "Math", A: 120, B: 110, fullMark: 150 },
  { subject: "Chinese", A: 98, B: 130, fullMark: 150 },
  { subject: "English", A: 86, B: 130, fullMark: 150 },
  { subject: "Geography", A: 99, B: 100, fullMark: 150 },
  { subject: "Physics", A: 85, B: 90, fullMark: 150 },
  { subject: "History", A: 65, B: 45, fullMark: 150 },
];

export const RANKING_TREND_DATA = [
  { month: "jan", college: 10, batch: 20, branch: 32 },
  { month: "feb", college: 78, batch: 34, branch: 73 },
  { month: "mar", college: 83, batch: 62, branch: 77 },
  { month: "apr", college: 88, batch: 91, branch: 82 },
  { month: "may", college: 90, batch: 55, branch: 86 },
];

// ============================================
// SKILL LEVELS
// ============================================

export const SKILL_LEVELS = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert",
};

export const SKILL_LEVEL_OPTIONS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

// ============================================
// API ENDPOINTS
// ============================================

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: "/api/auth/login",
  AUTH_SIGNUP: "/api/auth/signup",
  AUTH_LOGOUT: "/api/auth/logout",

  // Tests
  TESTS_LIST: "/api/tests",
  TESTS_CREATE: "/api/tests/create",
  TESTS_UPDATE: "/api/tests/:id",
  TESTS_DELETE: "/api/tests/:id",
  TESTS_GET_ONE: "/api/tests/:id",

  // Problems
  PROBLEMS_CREATE: "/api/problems/create",
  PROBLEMS_LIST: "/api/problems",
  PROBLEMS_UPDATE: "/api/problems/:id",
  PROBLEMS_DELETE: "/api/problems/:id",

  // Students
  STUDENTS_LIST: "/api/students",
  STUDENTS_CREATE: "/api/students/create",
  STUDENTS_UPDATE: "/api/students/:id",
  STUDENTS_DELETE: "/api/students/:id",
  STUDENTS_GET_ONE: "/api/students/:id",

  // Analytics
  ANALYTICS_STUDENT: "/api/analytics/student/:id",
  ANALYTICS_TEST: "/api/analytics/test/:id",
  ANALYTICS_LEADERBOARD: "/api/analytics/leaderboard",
  ANALYTICS_TRENDS: "/api/analytics/trends/:id",

  // Practice
  PRACTICE_QUESTIONS: "/api/practice/questions",
  PRACTICE_SUBMIT: "/api/practice/submit",
  PRACTICE_HISTORY: "/api/practice/history/:id",

  // Skills
  SKILLS_LIST: "/api/skills",
  SKILLS_ADD: "/api/skills/add",
  SKILLS_UPDATE: "/api/skills/:id",
  SKILLS_DELETE: "/api/skills/:id",

  // Projects
  PROJECTS_LIST: "/api/projects",
  PROJECTS_CREATE: "/api/projects/create",
  PROJECTS_UPDATE: "/api/projects/:id",
  PROJECTS_DELETE: "/api/projects/:id",

  // Certifications
  CERTIFICATIONS_LIST: "/api/certifications",
  CERTIFICATIONS_ADD: "/api/certifications/add",
  CERTIFICATIONS_DELETE: "/api/certifications/:id",

  // Experience
  EXPERIENCE_LIST: "/api/experience",
  EXPERIENCE_ADD: "/api/experience/add",
  EXPERIENCE_DELETE: "/api/experience/:id",
};

// ============================================
// PAGINATION & FILTERING
// ============================================

export const PAGE_SIZES = {
  SMALL: 10,
  MEDIUM: 20,
  LARGE: 50,
};

export const DEFAULT_PAGE_SIZE = 20;

// ============================================
// TIME FORMATS
// ============================================

export const TIME_FORMATS = {
  FULL_DATE: "YYYY-MM-DD HH:mm:ss",
  DATE_ONLY: "YYYY-MM-DD",
  TIME_ONLY: "HH:mm:ss",
  DISPLAY_DATE: "MMM DD, YYYY",
};

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email",
  INVALID_PASSWORD: "Password must be at least 8 characters",
  SERVER_ERROR: "Server error. Please try again later",
  NETWORK_ERROR: "Network error. Please check your connection",
  UNAUTHORIZED: "You are not authorized to perform this action",
  NOT_FOUND: "Resource not found",
};

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  TEST_CREATED: "Test created successfully",
  PROBLEMS_CREATED: "Problems added successfully",
  STUDENT_REGISTERED: "Student registered successfully",
  STUDENTS_REGISTERED: "Students registered successfully",
  PROFILE_UPDATED: "Profile updated successfully",
  SKILL_ADDED: "Skill added successfully",
  PROJECT_CREATED: "Project created successfully",
  CERTIFICATION_ADDED: "Certification added successfully",
  EXPERIENCE_ADDED: "Experience added successfully",
};