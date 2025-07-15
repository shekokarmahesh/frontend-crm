import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://facilitatorbackend-ahoum-crm.onrender.com/api', // Use deployed backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authorization token
api.interceptors.request.use(
  (config) => {
    // Try to get token from multiple sources
    const authToken = localStorage.getItem('jwt_access_token');
    const onboardingToken = sessionStorage.getItem('onboarding_token');
    
    // Prioritize onboarding token for onboarding endpoints
    let token = null;
    if (config.url && config.url.includes('/onboarding/')) {
      token = onboardingToken || authToken;
      console.log('🔐 Onboarding endpoint - using token:', token ? 'onboarding' : 'auth');
    } else {
      token = authToken || onboardingToken;
      console.log('🔐 Regular endpoint - using token:', token ? 'auth' : 'onboarding');
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Request with token:', token.substring(0, 20) + '...');
    } else {
      console.warn('No token found for API request:', config.url);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('jwt_access_token');
      sessionStorage.removeItem('onboarding_token');
      sessionStorage.removeItem('demo_user');
      window.location.href = '/auth/phone-auth';
    }
    return Promise.reject(error);
  }
);

// =====================================================
// AUTHENTICATION ENDPOINTS
// =====================================================

/**
 * Send OTP to phone number for verification
 * @param {string} phoneNumber - Phone number in international format
 * @returns {Promise<Object>} API response
 */
export const sendOTP = async (phoneNumber) => {
  try {
    const response = await api.post('/auth/send-otp', {
      phone_number: phoneNumber,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to send OTP' };
  }
};

/**
 * Verify OTP and determine user flow
 * @param {string} phoneNumber - Phone number in international format
 * @param {string} otp - 6-digit OTP code
 * @returns {Promise<Object>} API response with user flow information
 */
export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const response = await api.post('/auth/verify-otp', {
      phone_number: phoneNumber,
      otp: otp,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to verify OTP' };
  }
};

/**
 * Check authentication status
 * @returns {Promise<Object>} Authentication status
 */
export const checkAuthStatus = async () => {
  try {
    const response = await api.get('/auth/status');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to check auth status' };
  }
};

/**
 * Logout user
 * @returns {Promise<Object>} Logout response
 */
export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to logout' };
  }
};

// =====================================================
// ONBOARDING ENDPOINTS
// =====================================================

/**
 * Get current onboarding status
 * @returns {Promise<Object>} Onboarding status
 */
export const getOnboardingStatus = async () => {
  try {
    const response = await api.get('/auth/onboarding/status');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to get onboarding status' };
  }
};

/**
 * Step 1: Save basic information
 * @param {Object} data - Basic information data
 * @returns {Promise<Object>} API response
 */
export const saveBasicInfo = async (data) => {
  try {
    const response = await api.post('/auth/onboarding/step1-basic-info', {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      location: data.location,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to save basic information' };
  }
};

/**
 * Step 2: Save visual profile
 * @param {Object} data - Visual profile data
 * @returns {Promise<Object>} API response
 */
export const saveVisualProfile = async (data) => {
  try {
    const response = await api.post('/auth/onboarding/step2-visual-profile', {
      profile_url: data.profilePicture || null,
      banner_urls: data.bannerImage ? [data.bannerImage] : [],
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to save visual profile' };
  }
};

/**
 * Step 3: Save professional details
 * @param {Object} data - Professional details data
 * @returns {Promise<Object>} API response
 */
export const saveProfessionalDetails = async (data) => {
  try {
    const response = await api.post('/auth/onboarding/step3-professional-details', {
      languages: data.languages || [],
      teaching_styles: data.teachingStyles || [],
      specializations: data.specializations || [],
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to save professional details' };
  }
};

/**
 * Step 4: Save bio and about information
 * @param {Object} data - Bio and about data
 * @returns {Promise<Object>} API response
 */
export const saveBioAbout = async (data) => {
  try {
    const response = await api.post('/auth/onboarding/step4-bio-about', {
      short_bio: data.shortBio || '',
      detailed_intro: data.detailedBio || '',
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to save bio and about information' };
  }
};

/**
 * Step 5: Save experience and certifications (completes onboarding)
 * @param {Object} data - Experience and certifications data
 * @returns {Promise<Object>} API response
 */
export const saveExperienceCertifications = async (data) => {
  try {
    const workExperiences = data.experiences?.map(exp => ({
      company: exp.company || '',
      position: exp.jobTitle || '',
      duration: exp.duration || '',
      description: exp.description || '',
    })) || [];

    const certifications = data.certifications?.map(cert => ({
      certificate_name: cert.certificateName || '',
      issuing_organization: cert.issuingOrganization || '',
      date_received: cert.dateReceived || null,
      credential_id: cert.credentialId || '',
    })) || [];

    const response = await api.post('/auth/onboarding/step5-experience-certifications', {
      work_experiences: workExperiences,
      certifications: certifications,
    });

    // Handle enhanced onboarding completion response
    if (response.data && response.data.onboarding_complete) {
      // Store the new auth token if provided
      if (response.data.token) {
        storeAuthToken(response.data.token);
        sessionStorage.setItem('jwt_access_token', response.data.token);
        localStorage.setItem('jwt_access_token', response.data.token);
      }
      
      // Clear onboarding token
      sessionStorage.removeItem('onboarding_token');
      
      // Mark onboarding as completed
      localStorage.setItem('onboarding_completed', 'true');
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to save experience and certifications' };
  }
};

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Store onboarding token
 * @param {string} token - Onboarding token
 */
export const storeOnboardingToken = (token) => {
  sessionStorage.setItem('onboarding_token', token);
};

/**
 * Store authentication token
 * @param {string} token - Authentication token
 */
export const storeAuthToken = (token) => {
  localStorage.setItem('jwt_access_token', token);
};

/**
 * Remove all tokens
 */
export const clearTokens = () => {
  localStorage.removeItem('jwt_access_token');
  sessionStorage.removeItem('onboarding_token');
  sessionStorage.removeItem('demo_user');
};

/**
 * Get current token (auth or onboarding)
 * @returns {string|null} Current token
 */
export const getCurrentToken = () => {
  return localStorage.getItem('jwt_access_token') || sessionStorage.getItem('onboarding_token');
};

/**
 * Debug function to check token status
 * @returns {Object} Token status information
 */
export const debugTokenStatus = () => {
  const authToken = localStorage.getItem('jwt_access_token');
  const onboardingToken = sessionStorage.getItem('onboarding_token');
  const demoUser = sessionStorage.getItem('demo_user');
  
  return {
    hasAuthToken: !!authToken,
    hasOnboardingToken: !!onboardingToken,
    hasDemoUser: !!demoUser,
    authTokenLength: authToken ? authToken.length : 0,
    onboardingTokenLength: onboardingToken ? onboardingToken.length : 0,
    demoUserData: demoUser ? JSON.parse(demoUser) : null,
    authTokenPreview: authToken ? authToken.substring(0, 20) + '...' : null,
    onboardingTokenPreview: onboardingToken ? onboardingToken.substring(0, 20) + '...' : null
  };
};

/**
 * Get the token that should be used for a specific endpoint
 * @param {string} endpoint - The API endpoint
 * @returns {string|null} The appropriate token
 */
export const getTokenForEndpoint = (endpoint) => {
  const authToken = localStorage.getItem('jwt_access_token');
  const onboardingToken = sessionStorage.getItem('onboarding_token');
  
  if (endpoint && endpoint.includes('/onboarding/')) {
    return onboardingToken || authToken;
  } else {
    return authToken || onboardingToken;
  }
};

/**
 * Check if user has onboarding token
 * @returns {boolean} Has onboarding token
 */
export const hasOnboardingToken = () => {
  return !!sessionStorage.getItem('onboarding_token');
};

/**
 * Check if user has auth token
 * @returns {boolean} Has auth token
 */
export const hasAuthToken = () => {
  return !!localStorage.getItem('jwt_access_token');
};

// =====================================================
// WEBSITE PUBLISHING ENDPOINTS
// =====================================================

/**
 * Get public website data for a subdomain
 * @param {string} subdomain - The subdomain to fetch data for
 * @returns {Promise<Object>} Public website data
 */
export const getPublicWebsiteData = async (subdomain) => {
  try {
    const response = await axios.get(`https://facilitatorbackend-ahoum-crm.onrender.com/api/data?subdomain=${subdomain}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch website data' };
  }
};

/**
 * Check subdomain availability
 * @param {string} subdomain - The subdomain to check
 * @returns {Promise<Object>} Availability status
 */
export const checkSubdomainAvailability = async (subdomain) => {
  try {
    const response = await api.get(`/facilitator/check-subdomain/${subdomain}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to check subdomain availability' };
  }
};

/**
 * Publish website with subdomain
 * @param {string} subdomain - The subdomain to publish
 * @returns {Promise<Object>} Publish response
 */
export const publishWebsite = async (subdomain) => {
  try {
    const response = await api.post('/facilitator/publish-website', {
      subdomain: subdomain,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to publish website' };
  }
};

/**
 * Get website status
 * @returns {Promise<Object>} Website status
 */
export const getWebsiteStatus = async () => {
  try {
    const response = await api.get('/facilitator/website/status');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to get website status' };
  }
};

// =====================================================
// COURSE MANAGEMENT ENDPOINTS
// =====================================================

/**
 * Get all courses for authenticated user
 * @returns {Promise<Object>} API response with courses list
 */
export const getCourses = async () => {
  try {
    const response = await api.get('/courses/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to get courses' };
  }
};

/**
 * Get specific course by ID
 * @param {number} courseId - Course ID
 * @returns {Promise<Object>} API response with course data
 */
export const getCourse = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to get course' };
  }
};

/**
 * Create new course
 * @param {Object} courseData - Course data
 * @returns {Promise<Object>} API response
 */
export const createCourse = async (courseData) => {
  try {
    const response = await api.post('/courses/', {
      title: courseData.title,
      timing: courseData.timing,
      prerequisite: courseData.prerequisite || '',
      description: courseData.description,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create course' };
  }
};

/**
 * Update existing course
 * @param {number} courseId - Course ID
 * @param {Object} courseData - Updated course data
 * @returns {Promise<Object>} API response
 */
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await api.put(`/courses/${courseId}`, {
      title: courseData.title,
      timing: courseData.timing,
      prerequisite: courseData.prerequisite || '',
      description: courseData.description,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update course' };
  }
};

/**
 * Delete course
 * @param {number} courseId - Course ID
 * @returns {Promise<Object>} API response
 */
export const deleteCourse = async (courseId) => {
  try {
    const response = await api.delete(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete course' };
  }
};

// =====================================================
// WHATSAPP INTEGRATION ENDPOINTS
// =====================================================

/**
 * Send course details via WhatsApp to specific numbers
 * @param {number} courseId - Course ID
 * @param {Object} data - WhatsApp sending data
 * @returns {Promise<Object>} API response
 */
export const sendCourseWhatsApp = async (courseId, data) => {
  try {
    const response = await api.post(`/courses/${courseId}/send-whatsapp`, {
      phone_numbers: data.phoneNumbers || [],
      student_ids: data.studentIds || [],
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to send WhatsApp message' };
  }
};

/**
 * Send course to all active students
 * @param {number} courseId - Course ID
 * @param {Object} filters - Student filters
 * @returns {Promise<Object>} API response
 */
export const sendCourseToAllStudents = async (courseId, filters = {}) => {
  try {
    const response = await api.post(`/courses/${courseId}/send-to-all-students`, {
      filters: filters,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to send course to all students' };
  }
};

/**
 * Test WhatsApp connection
 * @param {Object} testData - Test message data
 * @returns {Promise<Object>} API response
 */
export const testWhatsApp = async (testData) => {
  try {
    const response = await api.post('/courses/test-whatsapp', {
      test_number: testData.testNumber,
      test_message: testData.testMessage || 'Hello! This is a test message from Ahoum. 🎯',
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to test WhatsApp' };
  }
};

/**
 * Check WhatsApp connection status
 * @returns {Promise<Object>} API response
 */
export const getWhatsAppStatus = async () => {
  try {
    const response = await api.get('/courses/whatsapp-status');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to get WhatsApp status' };
  }
};

// =====================================================
// COURSE CALLING ENDPOINTS
// =====================================================

/**
 * Initiate AI call for course promotion
 * @param {number} courseId - Course ID
 * @param {object} callData - Call data including phone number
 * @returns {Promise<Object>} API response
 */
export const initiateCourseCalls = async (courseId, callData) => {
  try {
    const response = await api.post(`/courses/${courseId}/call-student`, callData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to initiate course call' };
  }
};

/**
 * Get call history for a course
 * @param {number} courseId - Course ID
 * @param {number} limit - Number of calls to retrieve (optional)
 * @returns {Promise<Object>} API response with call history
 */
export const getCourseCallHistory = async (courseId, limit = 50) => {
  try {
    const response = await api.get(`/courses/${courseId}/call-history?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch call history' };
  }
};

/**
 * Get call analytics for a course
 * @param {number} courseId - Course ID
 * @returns {Promise<Object>} API response with call analytics
 */
export const getCourseCallAnalytics = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}/call-analytics`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch call analytics' };
  }
};

/**
 * Get all course promotion call history for practitioner
 * @param {number} limit - Number of calls to retrieve (optional)
 * @returns {Promise<Object>} API response with call history
 */
export const getAllCourseCallHistory = async (limit = 100) => {
  try {
    const response = await api.get(`/courses/all-call-history?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch all call history' };
  }
};

/**
 * Get calling dashboard statistics
 * @param {number} days - Number of days to get stats for
 * @returns {Promise<Object>} API response with dashboard stats
 */
export const getCallingDashboardStats = async (days = 30) => {
  try {
    const response = await api.get(`/courses/calling-dashboard-stats?days=${days}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch dashboard stats' };
  }
};

/**
 * Update call outcome
 * @param {string} callId - Call ID
 * @param {Object} outcomeData - Call outcome data
 * @returns {Promise<Object>} API response
 */
export const updateCallOutcome = async (callId, outcomeData) => {
  try {
    const response = await api.put(`/courses/calls/${callId}/outcome`, outcomeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update call outcome' };
  }
};

/**
 * Update call status
 * @param {string} callId - Call ID
 * @param {Object} statusData - Call status data
 * @returns {Promise<Object>} API response
 */
export const updateCallStatus = async (callId, statusData) => {
  try {
    const response = await api.put(`/courses/calls/${callId}/status`, statusData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update call status' };
  }
};

export default api; 