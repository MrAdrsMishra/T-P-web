import axios from 'axios';

/**
 * Central API Service
 * Handles all HTTP requests with automatic token injection and error handling
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instances for different API prefixes
export const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/v1/user/auth`,
  withCredentials: true,
});

export const adminAPI = axios.create({
  baseURL: `${API_BASE_URL}/v1/admin`,
  withCredentials: true,
});

export const studentAPI = axios.create({
  baseURL: `${API_BASE_URL}/v1/student`,
  withCredentials: true,
});

export const practiceAPI = axios.create({
  baseURL: `${API_BASE_URL}/v1/practice`,
  withCredentials: true,
});

export const metricsAPI = axios.create({
  baseURL: `${API_BASE_URL}/v1/metrics`,
  withCredentials: true,
});

export const analyticsV1API = axios.create({
  baseURL: `${API_BASE_URL}/v1/analytics`,
  withCredentials: true,
});

/**
 * Utility function to get authorization header
 * @param {string} token - Access token
 * @returns {object} Authorization header object
 */
export const getAuthHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * AUTH ENDPOINTS
 */
export const authService = {
  login: (credentials) => authAPI.post('/login', credentials),
  
  logout: (token) => authAPI.post('/logout', {}, getAuthHeader(token)),

  registerAdmin: (credentials) => adminAPI.post('/register-admin', credentials),
  
  registerStudent: (studentData, token) => 
    adminAPI.post('/register-student', studentData, getAuthHeader(token)),
  
  deleteStudent: (studentId, token) => 
    adminAPI.post('/delete-student', { studentId }, getAuthHeader(token)),
  
  updateUserProfile: (data, token) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return authAPI.post('/update-user-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  },
  
  getProblems: (token) => 
    authAPI.get('/get-problems', getAuthHeader(token)),
  
  getOngoingTestsInfo: (token) => 
    authAPI.get('/get-ongoing-tests-info', getAuthHeader(token)),
  
  getOngoingTestData: (testId, token) => 
    authAPI.get(`/get-ongoing-test-data?testId=${testId}`, getAuthHeader(token)),
};

/**
 * ADMIN ENDPOINTS
 */
export const adminService = {
  createTest: (testData, token) => 
    adminAPI.post('/create-test', testData, getAuthHeader(token)),
  
  createProblemSet: (problemData, token) => 
    adminAPI.post('/create-problem-set', problemData, getAuthHeader(token)),
  
  getProblemSet: (token) => 
    adminAPI.get('/get-problem-set', getAuthHeader(token)),
  
  createResources: (resourceData, token) => 
    adminAPI.post('/create-resources', resourceData, getAuthHeader(token)),
  
  createAssignments: (assignmentData, token) => 
    adminAPI.post('/create-assignments', assignmentData, getAuthHeader(token)),
  
  getQuery: (token) => 
    adminAPI.get('/get-query', getAuthHeader(token)),
  
  responseQuery: (queryData, token) => 
    adminAPI.post('/response-query', queryData, getAuthHeader(token)),
  
  getStudentAnalytics: (token) => 
    adminAPI.get('/get-student-details', getAuthHeader(token)),
  
  getStudentProjectsDetail: (token) => 
    adminAPI.get('/get-student-projects-details', getAuthHeader(token)),
  
  getAnalytics: (token) => 
    adminAPI.get('/get-analytics', getAuthHeader(token)),
  
  getTestAnalytics: (testId, token) => 
    adminAPI.get(`/get-test-analytics/${testId}`, getAuthHeader(token)),
  
  getTotalTestAnalytics: (token) => 
    adminAPI.get('/get-total-test-analytics', getAuthHeader(token)),
  
  getTotalResourcesAnalytics: (token) => 
    adminAPI.get('/get-total-resources-analytics', getAuthHeader(token)),
};

/**
 * STUDENT ENDPOINTS
 */
export const studentService = {
  submitTest: (testData, token) => 
    studentAPI.post('/submit-test-data', testData, getAuthHeader(token)),
  
  submitSolution: (solutionData, token) => 
    studentAPI.post('/submit-solution', solutionData, getAuthHeader(token)),
  
  getAnalytics: (token) => 
    studentAPI.post('/get-analytics', {}, getAuthHeader(token)),
  
  submitQuery: (queryData, token) => 
    studentAPI.post('/submit-query', queryData, getAuthHeader(token)),
  
  getResources: (resourceData, token) => 
    studentAPI.post('/get-resources', resourceData, getAuthHeader(token)),
  
  getTestHistory: (token) => 
    studentAPI.post('/get-test-history', {}, getAuthHeader(token)),
};

/**
 * PRACTICE ENDPOINTS
 */
export const practiceService = {
  runCode: (codeData) => 
    practiceAPI.post('/run-code', codeData),
};

/**
 * SKILLS ENDPOINTS
 * NOTE: These endpoints are placeholders. Implement in backend when ready.
 */
export const skillsService = {
  getAllSkills: (token) => 
    studentAPI.get('/skills', getAuthHeader(token)),
  
  addSkill: (skillData, token) => 
    studentAPI.post('/skills/add', skillData, getAuthHeader(token)),
  
  updateSkill: (skillId, skillData, token) => 
    studentAPI.put(`/skills/${skillId}`, skillData, getAuthHeader(token)),
  
  deleteSkill: (skillId, token) => 
    studentAPI.delete(`/skills/${skillId}`, getAuthHeader(token)),
};

/**
 * PROJECTS ENDPOINTS
 * NOTE: These endpoints are placeholders. Implement in backend when ready.
 */
export const projectsService = {
  getAllProjects: (token) => 
    studentAPI.get('/projects', getAuthHeader(token)),
  
  createProject: (projectData, token) => 
    studentAPI.post('/projects/create', projectData, getAuthHeader(token)),
  
  updateProject: (projectId, projectData, token) => 
    studentAPI.put(`/projects/${projectId}`, projectData, getAuthHeader(token)),
  
  deleteProject: (projectId, token) => 
    studentAPI.delete(`/projects/${projectId}`, getAuthHeader(token)),
};

/**
 * CERTIFICATIONS ENDPOINTS
 * NOTE: These endpoints are placeholders. Implement in backend when ready.
 */
export const certificationsService = {
  getAllCertifications: (token) => 
    studentAPI.get('/certifications', getAuthHeader(token)),
  
  addCertification: (certData, token) => 
    studentAPI.post('/certifications/add', certData, getAuthHeader(token)),
  
  deleteCertification: (certId, token) => 
    studentAPI.delete(`/certifications/${certId}`, getAuthHeader(token)),
};

/**
 * EXPERIENCE ENDPOINTS
 * NOTE: These endpoints are placeholders. Implement in backend when ready.
 */
export const experienceService = {
  getAllExperience: (token) => 
    studentAPI.get('/experience', getAuthHeader(token)),
  
  addExperience: (expData, token) => 
    studentAPI.post('/experience/add', expData, getAuthHeader(token)),
  
  updateExperience: (expId, expData, token) => 
    studentAPI.put(`/experience/${expId}`, expData, getAuthHeader(token)),
  
  deleteExperience: (expId, token) => 
    studentAPI.delete(`/experience/${expId}`, getAuthHeader(token)),
};

/**
 * METRICS ENDPOINTS
 */
export const metricsService = {
  getMetricTree: (token) => 
    metricsAPI.get('/', token ? getAuthHeader(token) : {}),
  
  getTagDiagnostics: (metricId, token) => 
    metricsAPI.get(`/${metricId || 'all'}/diagnostics`, getAuthHeader(token)),
};

/**
 * ANALYTICS/PERFORMANCE ENDPOINTS
 */
export const analyticsService = {
  getStudentStats: (token) => 
    studentAPI.get('/stats', getAuthHeader(token)),
  
  getSubjectPerformance: (token) => 
    studentAPI.get('/performance/subject', getAuthHeader(token)),
  
  getPerformanceTrends: (token) => 
    studentAPI.get('/performance/trends', getAuthHeader(token)),
  
  getAccuracyMatrix: (token) => 
    studentAPI.get('/performance/accuracy', getAuthHeader(token)),
  
  getLeaderboard: (token) => 
    studentAPI.get('/leaderboard', getAuthHeader(token)),
  
  getPersonalRanking: (token) => 
    studentAPI.get('/ranking', getAuthHeader(token)),

  getMetricLeaderboard: ({ metricId, scopeType = 'GLOBAL', scopeId = 'ALL', rankFrom, rankTo, page = 1, limit = 20 }, token) => {
    let url = `/rankings?metricId=${metricId}&scopeType=${scopeType}&scopeId=${scopeId}&page=${page}&limit=${limit}`;
    if (rankFrom) url += `&rankFrom=${rankFrom}`;
    if (rankTo) url += `&rankTo=${rankTo}`;
    return analyticsV1API.get(url, token ? getAuthHeader(token) : {});
  },

  getStudentTreePerformance: (token) =>
    analyticsV1API.get('/student-tree-performance', getAuthHeader(token)),

  // New Student Analytics Endpoints
  getStudentSummary: (token) =>
    analyticsV1API.get('/student/summary', getAuthHeader(token)),

  getSkillsClassification: (token) =>
    analyticsV1API.get('/student/skills', getAuthHeader(token)),

  getPerformanceTrendsV1: (token) =>
    analyticsV1API.get('/student/trends', getAuthHeader(token)),

  getCodingAnalytics: (token) =>
    analyticsV1API.get('/student/coding', getAuthHeader(token)),

  getPlacementReadiness: (token) =>
    analyticsV1API.get('/student/placement-readiness', getAuthHeader(token)),

  getPeerComparison: (token) =>
    analyticsV1API.get('/student/comparison', getAuthHeader(token)),

  // New Admin Analytics Endpoints
  getAdminOverview: (token) =>
    analyticsV1API.get('/admin/overview', getAuthHeader(token)),

  getAcademicPerformance: (token) =>
    analyticsV1API.get('/admin/performance', getAuthHeader(token)),

  getTopicHeatmap: (token) =>
    analyticsV1API.get('/admin/topics', getAuthHeader(token)),

  getQuestionAnalyticsAdmin: (token) =>
    analyticsV1API.get('/admin/questions', getAuthHeader(token)),

  getAssessmentAnalyticsAdmin: (testId, token) =>
    analyticsV1API.get(`/admin/assessments${testId ? `?testId=${testId}` : ''}`, getAuthHeader(token)),

  getAtRiskStudents: (token) =>
    analyticsV1API.get('/admin/students/at-risk', getAuthHeader(token)),

  getImprovementAnalytics: (token) =>
    analyticsV1API.get('/admin/improvement', getAuthHeader(token)),

  getParticipationAnalytics: (token) =>
    analyticsV1API.get('/admin/participation', getAuthHeader(token)),
};

/**
 * Error handler utility
 */
export const handleApiError = (error) => {
  const message = error.response?.data?.message || error.message || 'An error occurred';
  const status = error.response?.status;
  
  return {
    message,
    status,
    isAuthError: status === 401,
    isNotFoundError: status === 404,
    isServerError: status === 500,
  };
};

export default {
  authService,
  adminService,
  studentService,
  practiceService,
  skillsService,
  projectsService,
  certificationsService,
  experienceService,
  analyticsService,
  handleApiError,
};