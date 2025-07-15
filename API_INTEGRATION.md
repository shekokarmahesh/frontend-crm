# 🔗 API Integration Guide

This guide explains how to integrate the real API endpoints with your Minimal UI starter template.

## 🚀 Quick Setup

### 1. Environment Configuration

Create a `.env.local` file in your project root:

```bash
# API Configuration
VITE_API_URL=http://localhost:5000

# For production deployment:
# VITE_API_URL=https://your-api-domain.com
```

### 2. Backend Requirements

Ensure your backend API is running and implements the following endpoints:

- `POST /api/auth/send-otp` - Send OTP to phone number
- `POST /api/auth/verify-otp` - Verify OTP and authenticate user
- `POST /api/auth/onboarding/step1-basic-info` - Save basic information
- `POST /api/auth/onboarding/step2-visual-profile` - Save visual profile
- `POST /api/auth/onboarding/step3-professional-details` - Save professional details
- `POST /api/auth/onboarding/step4-bio-about` - Save bio information
- `POST /api/auth/onboarding/step5-experience-certifications` - Complete onboarding
- `GET /api/auth/status` - Check authentication status
- `POST /api/auth/logout` - Logout user

### 3. Start Development

```bash
npm run dev
```

## 🔄 Authentication Flow

### Phone Authentication Process

1. **Phone Number Entry**: User enters phone number in international format
2. **OTP Generation**: Backend sends OTP via SMS/WhatsApp
3. **OTP Verification**: User enters 6-digit code
4. **User Flow Decision**: 
   - **New User**: Receives `onboarding` token → Redirected to onboarding
   - **Existing User**: Receives `auth` token → Redirected to dashboard

### Token Management

The system uses two types of tokens:

#### Onboarding Token
- **Type**: `onboarding`
- **Storage**: `sessionStorage.onboarding_token`
- **Duration**: 2 hours
- **Purpose**: Complete onboarding steps
- **Payload**: `temp_phone_number`, `temp_facilitator_id`, `otp_verified`

#### Authentication Token  
- **Type**: `auth`
- **Storage**: `localStorage.jwt_access_token`
- **Duration**: 7 days
- **Purpose**: Authenticated API calls
- **Payload**: `facilitator_id`, `phone_number`, `is_authenticated`

## 📝 5-Step Onboarding Integration

### Step 1: Basic Information
**Endpoint**: `POST /api/auth/onboarding/step1-basic-info`

**Frontend Data**:
```javascript
{
  firstName: "John",
  lastName: "Doe", 
  email: "john@example.com",
  location: "New York, NY",
  phoneNumber: "+1234567890"
}
```

**API Request**:
```javascript
{
  first_name: "John",
  last_name: "Doe",
  phone_number: "+1234567890", 
  email: "john@example.com",
  location: "New York, NY"
}
```

### Step 2: Visual Profile
**Endpoint**: `POST /api/auth/onboarding/step2-visual-profile`

**Frontend Data**:
```javascript
{
  profilePicture: "https://example.com/profile.jpg",
  bannerImage: "https://example.com/banner.jpg"
}
```

**API Request**:
```javascript
{
  profile_url: "https://example.com/profile.jpg",
  banner_urls: ["https://example.com/banner.jpg"]
}
```

### Step 3: Professional Details
**Endpoint**: `POST /api/auth/onboarding/step3-professional-details`

**Frontend Data**:
```javascript
{
  languages: ["English", "Spanish"],
  teachingStyles: ["Interactive", "Lecture-based"], 
  specializations: ["Yoga", "Meditation"]
}
```

**API Request**:
```javascript
{
  languages: ["English", "Spanish"],
  teaching_styles: ["Interactive", "Lecture-based"],
  specializations: ["Yoga", "Meditation"]
}
```

### Step 4: Bio & About
**Endpoint**: `POST /api/auth/onboarding/step4-bio-about`

**Frontend Data**:
```javascript
{
  shortBio: "Certified instructor with 5+ years experience",
  detailedBio: "I am passionate about helping people achieve wellness..."
}
```

**API Request**:
```javascript
{
  short_bio: "Certified instructor with 5+ years experience",
  detailed_intro: "I am passionate about helping people achieve wellness..."
}
```

### Step 5: Experience & Certifications (Final)
**Endpoint**: `POST /api/auth/onboarding/step5-experience-certifications`

**Frontend Data**:
```javascript
{
  experiences: [{
    jobTitle: "Senior Yoga Instructor",
    company: "Wellness Center NYC", 
    duration: "2020-2024",
    description: "Led group classes and private sessions"
  }],
  certifications: [{
    name: "200-Hour Yoga Teacher Training",
    issuer: "Yoga Alliance",
    year: "2019",
    credentialId: "YA12345"
  }]
}
```

**API Request**:
```javascript
{
  work_experiences: [{
    position: "Senior Yoga Instructor",
    company: "Wellness Center NYC",
    duration: "2020-2024", 
    description: "Led group classes and private sessions"
  }],
  certifications: [{
    name: "200-Hour Yoga Teacher Training",
    issuer: "Yoga Alliance",
    year: "2019",
    credential_id: "YA12345"
  }]
}
```

## 🔒 Security Features

### Request Interceptors
- Automatically adds Authorization header
- Handles token refresh
- Manages different token types

### Response Interceptors  
- Handles 401 Unauthorized responses
- Automatic token cleanup on auth failure
- Redirects to authentication on token expiry

### Error Handling
- User-friendly error messages
- API error response formatting
- Fallback error handling

## 🛠 API Service Functions

The `src/services/api.js` file provides these functions:

### Authentication
- `sendOTP(phoneNumber)` - Send OTP
- `verifyOTP(phoneNumber, otp)` - Verify OTP
- `checkAuthStatus()` - Check auth status
- `logout()` - Logout user

### Onboarding
- `saveBasicInfo(data)` - Step 1
- `saveVisualProfile(data)` - Step 2  
- `saveProfessionalDetails(data)` - Step 3
- `saveBioAbout(data)` - Step 4
- `saveExperienceCertifications(data)` - Step 5

### Utilities
- `storeOnboardingToken(token)` - Store onboarding token
- `storeAuthToken(token)` - Store auth token
- `clearTokens()` - Clear all tokens
- `getCurrentToken()` - Get current token
- `hasOnboardingToken()` - Check onboarding token
- `hasAuthToken()` - Check auth token

## 🎯 Integration Checklist

- [ ] Backend API running on configured URL
- [ ] Environment variables set
- [ ] Phone authentication endpoints working
- [ ] Onboarding endpoints implemented
- [ ] Token management configured
- [ ] Error handling tested
- [ ] CORS configured for frontend domain
- [ ] SMS/OTP service configured

## 🐛 Troubleshooting

### Common Issues

**1. CORS Errors**
- Configure backend to allow your frontend domain
- Check preflight OPTIONS requests

**2. Token Issues**
- Verify token format in API responses
- Check token storage keys match
- Ensure proper token expiration handling

**3. API Connectivity**
- Verify API URL in environment variables
- Check network connectivity
- Test API endpoints directly

**4. OTP Not Received**
- Check phone number format
- Verify SMS service configuration
- Check backend logs for errors

### Debug Mode

Enable debug mode by adding to your `.env.local`:
```bash
VITE_DEBUG_API=true
```

This will log all API requests and responses to the console.

## 📱 Demo vs Production

### Demo Mode (No Backend)
The app will fall back to demo mode if API calls fail:
- Mock OTP verification (accepts any 6-digit code)
- Local storage simulation
- Static demo data

### Production Mode (With Backend)
When properly configured:
- Real OTP via SMS
- Database persistence
- Full authentication flow
- Secure token management

## 🚀 Deployment

### Frontend Deployment
1. Set production API URL in environment variables
2. Build the application: `npm run build`
3. Deploy built files to your hosting service

### Backend Requirements
- HTTPS enabled for production
- CORS configured for your domain
- SMS service configured
- Database connected
- Token secret configured

---

## 💡 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify API endpoint responses
3. Test backend endpoints independently
4. Check token format and expiration
5. Review CORS configuration 