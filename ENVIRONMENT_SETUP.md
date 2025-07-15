# Environment Variables Setup

This document describes the environment variables needed for the frontend application.

## Required Environment Variables

Create a `.env` file in the root directory of the frontend project with the following variables:

```bash
# Production Backend URL
VITE_API_URL=https://facilitatorbackend-ahoum-crm.onrender.com/api
VITE_SERVER_URL=https://facilitatorbackend-ahoum-crm.onrender.com
```

## Development Environment Variables

For local development, you can use:

```bash
# Development Backend URL
VITE_API_URL=http://localhost:5000/api
VITE_SERVER_URL=http://localhost:5000
```

## How to Create the .env File

1. Navigate to the frontend project root directory
2. Create a new file named `.env`
3. Add the environment variables listed above
4. Save the file

## Important Notes

- The `.env` file is already in `.gitignore` and will not be committed to version control
- Environment variables prefixed with `VITE_` are exposed to the client-side code
- The application will fall back to the production URL if no environment variables are set
- Make sure to restart the development server after creating or modifying the `.env` file

## Verification

To verify that the environment variables are working correctly:

1. Start the development server: `npm run dev` or `yarn dev`
2. Open the browser developer tools
3. Check the console for any API-related errors
4. Verify that API calls are going to the correct backend URL 