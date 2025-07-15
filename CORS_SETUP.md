# 🌐 CORS Setup Guide

## Problem
```
Access to XMLHttpRequest at 'http://localhost:5000/api/auth/send-otp' from origin 'http://localhost:3031' has been blocked by CORS policy
```

This happens because browsers block cross-origin requests by default for security reasons.

## 🛠 Solution 1: Backend CORS Configuration (Recommended)

Configure your backend to allow requests from your frontend origin.

### For Express.js Backend

Install CORS middleware:
```bash
npm install cors
```

Add CORS configuration:
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3031',  // Your frontend URL
    'http://localhost:3000',  // Alternative frontend port
    'http://127.0.0.1:3031',  // Alternative localhost format
  ],
  credentials: true,           // Allow cookies/auth headers
  optionsSuccessStatus: 200,   // For legacy browser support
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
};

app.use(cors(corsOptions));

// Your API routes
app.post('/api/auth/send-otp', (req, res) => {
  // Your OTP sending logic
});

// ... other routes
```

### For Python Flask Backend

Install Flask-CORS:
```bash
pip install flask-cors
```

Add CORS configuration:
```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# CORS configuration
CORS(app, origins=[
    "http://localhost:3031",
    "http://localhost:3000",
    "http://127.0.0.1:3031"
], supports_credentials=True)

@app.route('/api/auth/send-otp', methods=['POST'])
def send_otp():
    # Your OTP sending logic
    pass
```

### For Python FastAPI Backend

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3031",
        "http://localhost:3000", 
        "http://127.0.0.1:3031"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/auth/send-otp")
async def send_otp():
    # Your OTP sending logic
    pass
```

### For .NET Core Backend

In `Program.cs` or `Startup.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3031",
            "http://localhost:3000"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

// After building the app
app.UseCors("AllowFrontend");
```

## 🔄 Solution 2: Frontend Proxy (Alternative)

If you can't modify the backend immediately, you can configure Vite to proxy requests.

### Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  // ... other config
})
```

### Update API Base URL:

```javascript
// In src/services/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // Use proxy path
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## 🧪 Quick Test

### Test CORS Headers
Check if your backend is sending proper CORS headers:

```bash
curl -H "Origin: http://localhost:3031" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:5000/api/auth/send-otp
```

Expected response should include:
```
Access-Control-Allow-Origin: http://localhost:3031
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Test from Browser Console
Open browser dev tools and run:

```javascript
fetch('http://localhost:5000/api/auth/send-otp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phone_number: '+1234567890'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## 🎯 Quick Fix Checklist

- [ ] Backend CORS middleware installed and configured
- [ ] Frontend origin (`http://localhost:3031`) added to allowed origins
- [ ] `credentials: true` enabled if using authentication
- [ ] All required headers allowed (`Content-Type`, `Authorization`)
- [ ] All required methods allowed (`GET`, `POST`, `OPTIONS`)
- [ ] Backend restarted after CORS configuration
- [ ] Test with browser dev tools or curl

## 🚨 Production Notes

### For Production Deployment:

1. **Replace localhost with actual domains**:
   ```javascript
   origin: [
     'https://yourdomain.com',
     'https://www.yourdomain.com'
   ]
   ```

2. **Use environment variables**:
   ```javascript
   origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3031']
   ```

3. **Be specific with origins** (avoid `*` in production):
   ```javascript
   // ❌ Don't do this in production
   origin: '*'
   
   // ✅ Do this instead
   origin: ['https://yourdomain.com']
   ```

## 🐛 Common Issues

### Issue: Still getting CORS errors after configuration
**Solution**: Make sure to restart your backend server after adding CORS configuration.

### Issue: OPTIONS requests failing
**Solution**: Ensure your backend handles preflight OPTIONS requests:
```javascript
app.options('*', cors(corsOptions)); // Enable preflight for all routes
```

### Issue: Authorization headers not working
**Solution**: Make sure `credentials: true` is set and `Authorization` is in allowed headers.

---

## 💡 Need Help?

If you're still having issues:
1. Check browser Network tab for exact error details
2. Verify backend logs for incoming requests
3. Test API endpoints directly with Postman/curl
4. Ensure backend is actually running on localhost:5000 