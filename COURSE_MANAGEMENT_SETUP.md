# 🎯 Course Management & WhatsApp Integration Frontend

This frontend provides a complete UI for testing your course management and WhatsApp integration backend system.

## 🚀 Quick Setup

### 1. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# API Configuration
VITE_API_URL=http://localhost:5000

# For production deployment:
# VITE_API_URL=https://your-backend-domain.com
```

### 2. Install Dependencies & Start

```bash
# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

### 3. Backend Requirements

Make sure your backend is running on `http://localhost:5000` with the following endpoints:

- Course Management API endpoints
- WhatsApp integration API endpoints
- JWT authentication system

## 📱 Features Implemented

### ✅ Course Management
- **📋 Course List** - View all your courses in a responsive grid
- **➕ Create Course** - Beautiful form with validation
- **✏️ Edit Course** - Update existing course details
- **🗑️ Delete Course** - Remove courses with confirmation
- **🎨 Modern UI** - Clean, responsive design with Material-UI

### ✅ WhatsApp Integration
- **📞 Send to Specific Numbers** - Enter phone numbers manually
- **👥 Send to All Students** - Broadcast to all active students
- **📱 Message Preview** - See exactly how your message will look
- **✅ Delivery Status** - Track sent/failed messages
- **🔍 Connection Testing** - Test WhatsApp API connectivity

### ✅ WhatsApp Testing Interface
- **📊 Connection Status** - Real-time API status monitoring
- **🧪 Test Messages** - Send test messages to verify setup
- **📈 Statistics** - View message counts and session info
- **🛠️ Troubleshooting** - Built-in debugging tools

## 🎨 UI Components

### Course Management
```
📂 src/sections/courses/
├── courses-view.jsx           # Main courses listing page
├── course-create-view.jsx     # Create/edit course page
├── course-form.jsx           # Course form with validation
├── course-card.jsx           # Individual course display card
└── whatsapp-send-dialog.jsx  # WhatsApp sending interface
```

### WhatsApp Testing
```
📂 src/sections/whatsapp/
└── whatsapp-test-view.jsx    # WhatsApp testing interface
```

## 🛣️ Navigation Structure

### Dashboard Menu
- **📚 Course Management**
  - All Courses
  - Create Course
- **📱 WhatsApp**
  - WhatsApp Test

### Routing
- `/dashboard/courses` - Course listing
- `/dashboard/courses/create` - Create new course
- `/dashboard/courses/edit/:id` - Edit existing course
- `/dashboard/whatsapp-test` - WhatsApp testing interface

## 🔧 API Integration

### Course Management APIs
```javascript
// Get all courses
GET /api/courses/

// Create course
POST /api/courses/
{
  "title": "Yoga for Beginners",
  "timing": "Monday & Wednesday 6:00 PM - 7:00 PM",
  "prerequisite": "No prior experience needed",
  "description": "A gentle introduction to yoga..."
}

// Update course
PUT /api/courses/:id

// Delete course
DELETE /api/courses/:id
```

### WhatsApp APIs
```javascript
// Send course via WhatsApp
POST /api/courses/:id/send-whatsapp
{
  "phone_numbers": ["+919876543210", "+919123456789"]
}

// Send to all students
POST /api/courses/:id/send-to-all-students

// Test WhatsApp
POST /api/courses/test-whatsapp
{
  "test_number": "+919876543210",
  "test_message": "Test message"
}

// Check WhatsApp status
GET /api/courses/whatsapp-status
```

## 🎯 Message Format Preview

The WhatsApp messages will be formatted beautifully:

```
🎯 *Yoga for Beginners*

📅 *Timing:* Monday & Wednesday 6:00 PM - 7:00 PM

📋 *Prerequisites:* No prior experience needed

📝 *Description:*
A gentle introduction to yoga focusing on basic poses, breathing techniques, and relaxation. Perfect for beginners who want to start their wellness journey.

---
✨ *Ahoum - Your Wellness Journey*

For more information or to register, please reply to this message.

Thank you! 🙏
```

## 🔒 Authentication

- All API calls include JWT authentication
- Login required to access course management
- Secure token handling with auto-refresh

## 🎨 User Experience

### Responsive Design
- ✅ Mobile-friendly interface
- ✅ Tablet optimized layouts
- ✅ Desktop full experience

### Error Handling
- ✅ Comprehensive error messages
- ✅ Loading states for all operations
- ✅ Form validation with helpful hints
- ✅ Connection status indicators

### Performance
- ✅ Lazy loading for optimal performance
- ✅ Efficient state management
- ✅ Minimal re-renders

## 🚀 Ready to Test!

1. **Start your backend** (make sure it's running on port 5000)
2. **Create the `.env.local` file** with the API URL
3. **Run `npm run dev`** to start the frontend
4. **Navigate to `/dashboard/courses`** to start testing
5. **Try the WhatsApp test page** at `/dashboard/whatsapp-test`

## 📸 What You'll See

### Course Management
- Beautiful course cards with all details
- Easy-to-use creation/editing forms
- One-click WhatsApp sending
- Responsive grid layout

### WhatsApp Integration
- Real-time connection status
- Message preview before sending
- Delivery confirmation
- Test message functionality

## 🎉 Perfect for Testing!

This frontend provides everything you need to thoroughly test your course management and WhatsApp integration system. The UI is intuitive, responsive, and feature-complete for validation purposes.

---

Happy testing! 🚀 