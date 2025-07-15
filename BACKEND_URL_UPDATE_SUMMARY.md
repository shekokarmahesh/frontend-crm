# Backend URL Update Summary

This document summarizes the changes made to update the frontend application to use the deployed backend URL instead of localhost:5000.

## Changes Made

### 1. Updated API Configuration (`src/services/api.js`)

**File:** `src/services/api.js`
**Changes:**
- Updated `baseURL` from `http://localhost:5000/api` to `https://facilitatorbackend-ahoum-crm.onrender.com/api`
- Updated `getPublicWebsiteData` function to use the deployed backend URL

**Before:**
```javascript
baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : 'http://localhost:5000/api')
```

**After:**
```javascript
baseURL: import.meta.env.VITE_API_URL || 'https://facilitatorbackend-ahoum-crm.onrender.com/api'
```

### 2. Updated Website View Configuration (`src/sections/website/website-view.jsx`)

**File:** `src/sections/website/website-view.jsx`
**Changes:**
- Updated `API_BASE_URL` from `http://localhost:5000/api` to `https://facilitatorbackend-ahoum-crm.onrender.com/api`
- Updated website preview URLs from `localhost:3031` to `ahoum.com`

**Before:**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
setCurrentWebsiteUrl(`http://${data.website.subdomain}.localhost:3031`);
const websiteUrl = `http://${selectedSubdomain}.localhost:3031`;
```

**After:**
```javascript
const API_BASE_URL = 'https://facilitatorbackend-ahoum-crm.onrender.com/api';
setCurrentWebsiteUrl(`https://${data.website.subdomain}.ahoum.com`);
const websiteUrl = `https://${selectedSubdomain}.ahoum.com`;
```

### 3. Updated Vite Configuration (`vite.config.js`)

**File:** `vite.config.js`
**Changes:**
- Updated proxy target from `http://localhost:5000` to `https://facilitatorbackend-ahoum-crm.onrender.com`
- Changed `secure` from `false` to `true` for HTTPS

**Before:**
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    secure: false,
  }
}
```

**After:**
```javascript
proxy: {
  '/api': {
    target: 'https://facilitatorbackend-ahoum-crm.onrender.com',
    secure: true,
  }
}
```

### 4. Created Environment Variables Documentation

**File:** `ENVIRONMENT_SETUP.md`
**Purpose:** Document how to set up environment variables for different environments

**Production Environment Variables:**
```bash
VITE_API_URL=https://facilitatorbackend-ahoum-crm.onrender.com/api
VITE_SERVER_URL=https://facilitatorbackend-ahoum-crm.onrender.com
```

**Development Environment Variables:**
```bash
VITE_API_URL=http://localhost:5000/api
VITE_SERVER_URL=http://localhost:5000
```

## Files That Were NOT Changed

The following files contain localhost references but were intentionally left unchanged as they handle both development and production environments correctly:

1. **`src/components/subdomain-handler.jsx`** - Handles subdomain detection for both localhost (development) and ahoum.com (production)
2. **`src/sections/public/public-website-view.jsx`** - Handles public website rendering for both environments

## How to Apply These Changes

### For Production Deployment:

1. **Create Environment File:**
   ```bash
   # Create .env file in the frontend root directory
   echo "VITE_API_URL=https://facilitatorbackend-ahoum-crm.onrender.com/api" > .env
   echo "VITE_SERVER_URL=https://facilitatorbackend-ahoum-crm.onrender.com" >> .env
   ```

2. **Build and Deploy:**
   ```bash
   npm run build
   # Deploy the built files to your hosting platform
   ```

### For Local Development:

1. **Create Environment File:**
   ```bash
   # Create .env file in the frontend root directory
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   echo "VITE_SERVER_URL=http://localhost:5000" >> .env
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

## Verification Steps

1. **Check API Calls:** Open browser developer tools and verify that API calls are going to the correct backend URL
2. **Test Authentication:** Verify that login and authentication flows work correctly
3. **Test Website Publishing:** Verify that website publishing functionality works with the new domain
4. **Check Subdomain Handling:** Verify that subdomain detection works for both development and production

## Important Notes

- The application will fall back to the production URL if no environment variables are set
- Environment variables prefixed with `VITE_` are exposed to the client-side code
- The `.env` file is already in `.gitignore` and will not be committed to version control
- Make sure to restart the development server after creating or modifying the `.env` file 