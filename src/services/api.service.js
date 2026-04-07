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
  registerAdmin: (credentials) => adminAPI.post('/register-admin', credentials),
  
  registerStudent: (studentData, token) => 
    adminAPI.post('/register-student', studentData, getAuthHeader(token)),
  
  deleteStudent: (studentId, token) => 
    adminAPI.post('/delete-student', { studentId }, getAuthHeader(token)),

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
